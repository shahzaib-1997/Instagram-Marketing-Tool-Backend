import random
import requests, os
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import json
from .initiatebrowser import initiatebrowser
from selenium.webdriver.common.action_chains import ActionChains
from gologin import GoLogin
from dotenv import load_dotenv


load_dotenv()
TOKEN = os.getenv("TOKEN")

gl = GoLogin(
    {
        "token": TOKEN,
    }
)


def delete_gologin_profile(profile_id):
    try:
        gl.delete(profile_id)
    except Exception as e:
        print(e)


def get_fingerprint(os="win", resolution="1680x1050"):
    # Define the API endpoint and parameters
    url = "https://api.gologin.com/browser/fingerprint"
    params = {
        "os": os,
        "resolution": resolution,
    }
    print(TOKEN)
    # Set up the headers with your API token
    headers = {
        "Authorization": f"Bearer {TOKEN}",  # Replace with your actual token
        "Content-Type": "application/json",
    }

    # Make the GET request
    response = requests.get(url, headers=headers, params=params)

    # Check the response
    if response.status_code == 200:
        # If the request was successful, you can process the response data
        data = response.json()  # Parse the JSON response
        return data
    else:
        # Handle errors
        print(f"Error: {response.status_code} - {response.text}")
        return response.json()


def create_profile(profile_name):
    fingerprints = get_fingerprint()
    if "message" in fingerprints:
        return fingerprints
    profile_id = gl.create(
        {
            "name": profile_name,
            "notes": "",
            "browserType": "chrome",
            "os": fingerprints["os"],
            "googleServicesEnabled": False,
            "lockEnabled": False,
            "debugMode": False,
            "navigator": fingerprints["navigator"],
            "geoProxyInfo": {},
            "proxyEnabled": False,  # Specify 'false' if not using proxy
            "proxy": {
                "mode": "none",
            },
            "webRTC": {
                "mode": "alerted",
                "enabled": True,
                "customize": True,
                "localIpMasking": False,
                "fillBasedOnIp": True,
            },
            "storage": {
                "local": True,
                "extensions": True,
                "bookmarks": True,
                "history": True,
                "passwords": True,
                "session": True,
            },
            "plugins": {"enableVulnerable": True, "enableFlash": True},
            "canvas": fingerprints["canvas"],
            "fonts": {"families": fingerprints["fonts"]},
            "mediaDevices": fingerprints["mediaDevices"],
            "timezone": {
                "enabled": True,
                "fillBasedOnIp": True,
            },
            "webGL": fingerprints["webGL"],
            "clientRects": {"mode": "noise", "noise": 0},
            "webglParams": fingerprints["webglParams"],
            "updateExtensions": True,
        }
    )
    print("profile id=", profile_id)
    return profile_id


class InstaBot:

    def __init__(self, profile_id):
        self.profile_id = profile_id
        self.driver = None
        self.wait = None
        self.action = None

    def start_browser(self):
        self.driver = initiatebrowser.initiate_driver(self.profile_id)
        if self.driver:
            self.wait = WebDriverWait(self.driver, 15)
            self.action = ActionChains(self.driver)
            return True
        return False

    def login(self, username, password):
        try:
            self.driver.get("https://www.instagram.com/?hl=en")
            username_element = self.wait.until(
                EC.visibility_of_element_located(("xpath", '//input[@name="username"]'))
            )
            username_element.send_keys(username)
            password_element = self.driver.find_element(
                "xpath", '//input[@name="password"]'
            )
            password_element.send_keys(password)
            time.sleep(1)
            password_element.send_keys(Keys.ENTER)
            input(".")
            try:
                self.wait.until(
                    EC.presence_of_element_located(
                        ("xpath", '//div[@role="button" and text()="Not now"]')
                    )
                ).click()
                self.wait.until(
                    EC.presence_of_element_located(("xpath", '//span[text()="Home"]'))
                )
            except:
                pass
            return True
        except:
            return False

    def story_viewer(self, username):
        try:
            self.driver.get("https://www.instagram.com/" + username)
            story = self.wait.until(
                EC.presence_of_element_located(
                    (
                        "xpath",
                        '//canvas[@class="x1upo8f9 xpdipgo x87ps6o"]',
                    )
                )
            )
            story.click()
        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def feed_storyViewer(self, numberof_stories):
        try:
            count = 0
            self.driver.get("https://www.instagram.com/")
            self.wait.until(
                EC.presence_of_element_located(
                    ("xpath", "//button[contains(@aria-label,'Story')]")
                )
            )
            stories = self.driver.find_element(
                "xpath", "//button[contains(@aria-label,'Story')]"
            )
            stories.click()
            time.sleep(6)
            link = self.driver.current_url

            while count < numberof_stories:
                new_link = self.driver.current_url
                if link != new_link:
                    link = new_link
                    new_link = self.driver.current_url
                    count += 1
                else:
                    time.sleep(1)

            self.driver.find_element(
                "xpath",
                '//div[@class="xjbqb8w x1ypdohk xw7yly9 xktsk01 x1yztbdb x1d52u69 x10l6tqk x13vifvy xds687c"]//div[@class="x6s0dn4 x78zum5 xdt5ytf xl56j7k"]',
            ).click()

        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def likes_scrapper(self, username):
        try:
            likers_names = []
            random_number = random.randint(0, 5)
            self.driver.get("https://www.instagram.com/" + username)
            self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aagu"]'))
            )
            link_list = self.driver.find_elements("xpath", '//div[@class="_aagu"]')
            link_list[random_number].click()
            current_url = self.driver.current_url.split("?")[0] + "liked_by"
            self.driver.get(current_url)
            self.wait.until(
                EC.presence_of_all_elements_located(
                    ("xpath", "//section//div//a[@role='link'][not(descendant::img)]")
                )
            )
            names = self.driver.find_elements(
                "xpath", "//section//div//a[@role='link'][not(descendant::img)]"
            )
            for i in names:
                likers_names.append(i.text)

            json_data = json.dumps({"Liker's Names:": likers_names}, indent=2)
            print(json_data)
            return json_data

        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def followers_scrapper(self, username):
        try:

            followers_names = []
            self.driver.get("https://www.instagram.com/" + username)
            follow_button = self.wait.until(
                EC.presence_of_element_located(
                    (
                        "xpath",
                        '//a[@class="x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _alvs _a6hd"]',
                    )
                )
            )
            follow_button.click()
            self.wait.until(
                EC.presence_of_all_elements_located(
                    ("xpath", '//span[@class="_ap3a _aaco _aacw _aacx _aad7 _aade"]')
                )
            )
            followers = self.driver.find_elements(
                "xpath", '//span[@class="_ap3a _aaco _aacw _aacx _aad7 _aade"]'
            )
            for i in followers:
                followers_names.append(i.text)

            json_data = json.dumps({"Follower's Names:": followers_names}, indent=2)
            print(json_data)
            return json_data

        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def feed_scroller(self):
        try:
            self.driver.get("https://www.instagram.com/")
            time.sleep(3)
            for i in range(15):
                self.driver.execute_script("window.scrollBy(0, 1000);")
                time.sleep(2)
        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def highlights_viewer(self, username):
        try:
            self.driver.get("https://www.instagram.com/" + username)
            highlight = self.wait.until(
                EC.presence_of_element_located(
                    (
                        "xpath",
                        '//div[@class="xnz67gz x14yjl9h xudhj91 x18nykt9 xww2gxu x1lliihq x6ikm8r x10wlt62 x1n2onr6"]',
                    )
                )
            )
            highlight.click()
        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def hashtag_postLike_scrapper(self, user_input):
        try:
            hashtag_loop = True
            likers_names = []
            random_number = random.randint(0, 5)
            while hashtag_loop == True:
                if "#" in user_input:
                    if user_input[0] == "#":
                        link = user_input.replace("#", "")
                        self.driver.get(
                            "https://www.instagram.com/explore/tags/" + link
                        )
                        self.wait.until(
                            EC.presence_of_all_elements_located(
                                ("xpath", '//div[@class="_aagu"]')
                            )
                        )
                        link_list = self.driver.find_elements(
                            "xpath", '//div[@class="_aagu"]'
                        )
                        link_list[random_number].click()
                        current_url = self.driver.current_url.split("?")[0] + "liked_by"
                        self.driver.get(current_url)
                        self.wait.until(
                            EC.presence_of_all_elements_located(
                                (
                                    "xpath",
                                    "//section//div//a[@role='link'][not(descendant::img)]",
                                )
                            )
                        )
                        names = self.driver.find_elements(
                            "xpath",
                            "//section//div//a[@role='link'][not(descendant::img)]",
                        )
                        for i in names:
                            likers_names.append(i.text)

                        json_data = json.dumps(
                            {"Liker's Names:": likers_names}, indent=2
                        )
                        hashtag_loop = False
                        return json_data
                    else:
                        print("The # is not in 1st position. This is a Hashtag post!")
                        user_input = input("Enter a Hastag: ")

                else:
                    print("There is no # in your Input. This is a Hashtag post!")
                    user_input = input("Enter a Hastag: ")

        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def comment_liker(self, username):
        try:
            posts_list = []
            comment_list = []
            random_number = random.randint(0, 5)
            self.driver.get("https://www.instagram.com/" + username)
            self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aagu"]'))
            )
            posts_list = self.driver.find_elements("xpath", '//div[@class="_aagu"]')
            posts_list[random_number].click()
            self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//span[@class="_a9zu"]'))
            )
            comment_list = self.driver.find_elements("xpath", '//span[@class="_a9zu"]')
            comment_list[random_number].click()
            time.sleep(3)
            return True
        except Exception as error:
            print(f"Error: {error}")
            return False

    def hashtag_postLiker(self, user_input):
        try:
            random_number = random.randint(0, 5)
            link = user_input.replace("#", "")
            self.driver.get("https://www.instagram.com/explore/tags/" + link)
            time.sleep(5)
            link_list = self.driver.find_elements(
                by="xpath", value='//div[@class="_aagu"]'
            )
            link_list[random_number].click()
            time.sleep(5)
            self.driver.find_element(
                by="xpath",
                value='//div[@class="x6s0dn4 x78zum5 xdt5ytf xl56j7k"]//span',
            ).click()
            time.sleep(7)
            return True
        except Exception as error:
            print(f"Error: {error}")
            return False

    def hashtag_postCommenter(self, user_input, comment):
        try:
            random_number = random.randint(0, 5)
            link = user_input.replace("#", "")
            self.driver.get("https://www.instagram.com/explore/tags/" + link)
            time.sleep(7)
            link_list = self.driver.find_elements(
                by="xpath", value='//div[@class="_aagw"]'
            )
            link_list[random_number].click()
            self.wait.until(
                EC.presence_of_element_located(
                    ("xpath", "//textarea[contains(@aria-label,'Add a comment')]")
                )
            )
            commenter = self.driver.find_element(
                "xpath", "//textarea[contains(@aria-label,'Add a comment')]"
            )
            self.action.send_keys_to_element(commenter, comment + Keys.ENTER).perform()
            return True
        except Exception as error:
            print(f"Error: {error}")
            return False

    def post_liker(self, username):
        try:
            random_number = random.randint(0, 5)
            self.driver.get("https://www.instagram.com/" + username)
            self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aagw"]'))
            )
            link_list = self.driver.find_elements("xpath", '//div[@class="_aagw"]')
            link_list[random_number].click()
            like_button = self.wait.until(
                EC.presence_of_element_located(
                    ("xpath", '//div[@class="x6s0dn4 x78zum5 xdt5ytf xl56j7k"]//span')
                )
            )
            like_button.click()
            time.sleep(3)
            return True
        except Exception as error:
            print(f"Error: {error}")
            return False

    def post_liker_url(self, url):
        try:
            self.driver.get(url)
            time.sleep(5)
            like_button = self.wait.until(
                EC.presence_of_element_located(("xpath", '//span[@class="xp7jhwk"]'))
            )
            like_button.click()
            return True
        except Exception as error:
            print(f"Error: {error}")
            return False

    def post_comment_url(self, url, comment):
        try:
            self.driver.get(url)
            time.sleep(5)
            self.wait.until(
                EC.presence_of_element_located(
                    ("xpath", "//textarea[contains(@aria-label,'Add a comment')]")
                )
            )
            commenter = self.driver.find_element(
                "xpath", "//textarea[contains(@aria-label,'Add a comment')]"
            )
            self.action.send_keys_to_element(commenter, comment + Keys.ENTER).perform()
            return True
        except Exception as error:
            print(f"Error: {error}")
            return False

    def post_commenter(self, username, comment):
        try:
            random_number = random.randint(0, 5)
            self.driver.get("https://www.instagram.com/" + username)
            self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aagw"]'))
            )
            link_list = self.driver.find_elements("xpath", '//div[@class="_aagw"]')
            link_list[random_number].click()
            time.sleep(5)
            self.wait.until(
                EC.presence_of_element_located(
                    ("xpath", "//textarea[contains(@aria-label,'Add a comment')]")
                )
            )
            commenter = self.driver.find_element(
                "xpath", "//textarea[contains(@aria-label,'Add a comment')]"
            )
            self.action.send_keys_to_element(commenter, comment + Keys.ENTER).perform()
            time.sleep(3)
            return True
        except Exception as error:
            print(f"Error: {error}")
            return False

    def reel_viewer(self, username):
        try:
            self.driver.get("https://www.instagram.com/" + username + "/reels")
            link_list = self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aajy"]'))
            )
            random_number = random.randint(0, (len(link_list) - 1))
            link_list[random_number].click()
            time.sleep(5)
            return True
        except Exception as error:
            print(f"Error: {error}")
            return False

    def reel_viewer_url(self, url):
        try:
            self.driver.get(url)
            time.sleep(5)
            return True
        except Exception as error:
            print(f"Error: {error}")
            return False

    def reel_liker(self, username):
        try:
            self.driver.get("https://www.instagram.com/" + username + "/reels")
            link_list = self.wait.until(
                EC.presence_of_all_elements_located(
                    (
                        "xpath",
                        f'//a[@role="link" and contains(@href, "/{username}/reel")]',
                    )
                )
            )
            if link_list:
                random_number = random.randint(0, (len(link_list) - 1))
                link_list[random_number].click()
                current_url = self.driver.current_url
                modified_url = current_url.replace("reel", "reels")
                self.driver.get(modified_url)
                self.wait.until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, 'svg[aria-label="Like"]'))
                ).click()
                span_element = self.driver.find_element(
                    "xpath",
                    '//div[@class="html-div xe8uvvx xdj266r x11i5rnm x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x6s0dn4 x1ypdohk x78zum5 xdt5ytf xieb3on"]//span',
                )
                span_element.click()
                time.sleep(3)
                return True
        except Exception as error:
            print(f"Error: {error}")
        return False

    def reel_commenter(self, username, comment):
        try:
            random_number = random.randint(0, 5)
            self.driver.get("https://www.instagram.com/" + username + "/reels")
            self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aajy"]'))
            )
            link_list = self.driver.find_elements("xpath", '//div[@class="_aajy"]')
            link_list[random_number].click()
            self.wait.until(
                EC.presence_of_element_located(
                    ("xpath", "//textarea[contains(@aria-label,'Add a comment')]")
                )
            )
            commenter = self.driver.find_element(
                "xpath", "//textarea[contains(@aria-label,'Add a comment')]"
            )
            self.action.send_keys_to_element(commenter, comment + Keys.ENTER).perform()
            time.sleep(3)
            return True
        except Exception as error:
            print(f"Error: {error}")
            return False

    def reel_commenter_url(self, url, comment):
        try:
            self.driver.get(url)
            time.sleep(5)
            self.wait.until(
                EC.presence_of_element_located(
                    ("xpath", "//textarea[contains(@aria-label,'Add a comment')]")
                )
            )
            commenter = self.driver.find_element(
                "xpath", "//textarea[contains(@aria-label,'Add a comment')]"
            )
            self.action.send_keys_to_element(commenter, comment + Keys.ENTER).perform()
            return True
        except Exception as error:
            print(f"Error: {error}")
            return False

    def single_reel_liker(self, url):
        try:
            self.driver.get(url)
            self.wait.until(
                EC.presence_of_element_located(
                    (
                        "xpath",
                        '//div[@class="html-div xe8uvvx xdj266r x11i5rnm x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x6s0dn4 x1ypdohk x78zum5 xdt5ytf xieb3on"]//span',
                    )
                )
            )
            like_button = self.driver.find_element(
                "xpath",
                '//div[@class="html-div xe8uvvx xdj266r x11i5rnm x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x6s0dn4 x1ypdohk x78zum5 xdt5ytf xieb3on"]//span',
            )
            like_button.click()
            time.sleep(2)
            return True
        except Exception as error:
            print(f"Error: {error}")
            return False


def insta_login(profile_id, username, password):
    user_bot = InstaBot(profile_id)
    user_bot.start_browser()
    print(user_bot.driver)
    check = user_bot.login(username, password)
    user_bot.driver.close()
    return check
