import random
import requests, os
import time
import json
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from .initiatebrowser import initiatebrowser
from dotenv import load_dotenv


load_dotenv()
TOKEN = os.getenv("TOKEN")
API_URL = "https://api.gologin.com/browser"

# Set up the headers with your API token
headers = {
    "Authorization": f"Bearer {TOKEN}",  # Replace with your actual token
    "Content-Type": "application/json",
}


def delete_gologin_profile(profile_id):
    try:
        requests.delete(f"{API_URL}/{profile_id}", headers=headers)
    except Exception as e:
        print(e)


def get_fingerprint(os="win", resolution="1680x1050"):
    # Define the API endpoint and parameters
    url = f"{API_URL}/fingerprint"
    params = {
        "os": os,
        "resolution": resolution,
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
    fingerprints["navigator"]["language"] = "en-US,en;q=0.9"
    profile = {
        "name": profile_name,
        "notes": "",
        "browserType": "chrome",
        "os": fingerprints["os"],
        "googleServicesEnabled": True,
        "lockEnabled": False,
        "debugMode": False,
        "navigator": fingerprints["navigator"],
        "autoLang": False,
        "geoProxyInfo": {},
        "storage": {
            "local": True,
            "cookies": True,
            "extensions": True,
            "bookmarks": True,
            "history": True,
            "passwords": True,
            "session": True,
        },
        "proxyEnabled": False,  # Specify 'false' if not using proxy
        "proxy": {
            "mode": "none",
        },
        "plugins": {"enableVulnerable": True, "enableFlash": True},
        "timezone": {
            "enabled": True,
            "fillBasedOnIp": True,
        },
        "audioContext": {"mode": "off", "noise": 0},
        "canvas": {"mode": "off"},
        "fonts": {"families": fingerprints["fonts"]},
        "mediaDevices": fingerprints["mediaDevices"],
        "webRTC": {
            "mode": "alerted",
            "enabled": True,
            "customize": True,
            "localIpMasking": False,
            "fillBasedOnIp": True,
        },
        "clientRects": {"mode": "noise", "noise": 0},
        "webGL": fingerprints["webGL"],
        "webglParams": fingerprints["webglParams"],
    }
    resp = requests.post(API_URL, headers=headers, json=profile)
    print(resp.json())
    profile_id = resp.json().get("id")
    print("profile id=", profile_id)
    return profile_id


class InstaBot:

    def __init__(self, profile_id):
        self.profile_id = profile_id
        self.driver = None
        self.wait = None
        self.action = None

    def start_browser(self, first_time=True):
        self.driver = initiatebrowser.initiate_driver(self.profile_id, first_time)
        if self.driver:
            self.wait = WebDriverWait(self.driver, 15)
            self.action = ActionChains(self.driver)
            return True
        return False

    def login(self, username, password):
        try:
            url = "https://www.instagram.com/?hl=en"
            self.driver.get(url)
            self.wait.until(
                EC.visibility_of_element_located(("xpath", '//input[@name="username"]'))
            ).send_keys(username)
            password_element = self.driver.find_element(
                "xpath", '//input[@name="password"]'
            )
            password_element.send_keys(password)
            time.sleep(2)
            password_element.send_keys(Keys.ENTER)
            try:
                self.wait.until(
                    EC.presence_of_element_located(
                        ("xpath", '//div[@role="button" and text()="Not now"]')
                    )
                ).click()
                if self.driver.current_url != url:
                    self.driver.get(url)
                self.wait.until(
                    EC.presence_of_element_located(("xpath", '//span[text()="Home"]'))
                )
                return True
            except:
                pass
        except Exception as e:
            print(e)
        return False

    def story_viewer(self, username, like_story, like_option):
        try:
            self.driver.get(f"https://www.instagram.com/stories/{username}")
            if "stories" in self.driver.current_url:
                stories = self.wait.until(
                    EC.presence_of_all_elements_located(
                        ("xpath", '//div[@class="x1ned7t2 x78zum5"]/div')
                    )
                )
                try:
                    self.driver.find_element(
                        "xpath", '//div[text()="View story"]'
                    ).click()
                except:
                    pass

                filtered_stories = []
                for i, story in enumerate(stories):
                    try:
                        # Check if the inner div is present within the current story
                        inner_div = story.find_element(By.XPATH, "./div")
                        if inner_div:
                            # Process the inner div as needed
                            filtered_stories = stories[i:]
                            break
                    except:
                        pass

                for i, story in enumerate(filtered_stories):
                    try:
                        if like_story:
                            if (
                                like_option == "all"
                                or (like_option in ["first", "last & first"] and i == 0)
                                or (
                                    like_option in ["last", "last & first"]
                                    and i == len(stories) - 1
                                )
                            ):
                                self.like_function()

                        time.sleep(random.uniform(2, 4))

                        next_button = self.wait.until(
                            EC.presence_of_element_located(
                                (By.CSS_SELECTOR, 'svg[aria-label="Next"]')
                            )
                        )
                        self.driver.execute_script(
                            "arguments[0].parentNode.click();", next_button
                        )
                    except Exception as e:
                        print(f"Error processing story: {e}")
                        break
        except Exception as e:
            print(f"There is an {e}. Please Retry!")

    def like_function(self):
        try:
            like_button = self.wait.until(
                EC.presence_of_element_located(
                    (By.CSS_SELECTOR, 'svg[aria-label="Like"]')
                )
            )
            self.driver.execute_script("arguments[0].parentNode.click();", like_button)
        except Exception as e:
            print(f"Failed to like story: {e}")

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

        except Exception as e:
            print(f"There is an {e}. Please Retry!")

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

        except Exception as e:
            print(f"There is an {e}. Please Retry!")

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

        except Exception as e:
            print(f"There is an {e}. Please Retry!")

    def feed_scroller(self):
        try:
            self.driver.get("https://www.instagram.com/")
            time.sleep(3)
            for i in range(15):
                self.driver.execute_script("window.scrollBy(0, 1000);")
                time.sleep(2)
        except Exception as e:
            print(f"There is an {e}. Please Retry!")

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
        except Exception as e:
            print(f"There is an {e}. Please Retry!")

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

                else:
                    print("There is no # in your Input. This is a Hashtag post!")

        except Exception as e:
            print(f"There is an {e}. Please Retry!")

    def comment_liker(self, username):
        try:
            self.driver.get("https://www.instagram.com/" + username)
            posts_list = self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aagu"]'))
            )
            if posts_list:
                random_number = random.randint(0, (len(posts_list) - 1))
                posts_list[random_number].click()
                try:
                    comment_list = self.wait.until(
                        EC.presence_of_all_elements_located(
                            (By.CSS_SELECTOR, 'svg[aria-label="Like"]')
                        )
                    )
                    if comment_list:
                        random_number = random.randint(1, (len(comment_list) - 1))
                        self.driver.execute_script("arguments[0].parentNode.click();", comment_list[random_number])
                except:
                    pass
                time.sleep(3)
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def hashtag_postLiker(self, user_input):
        try:
            link = user_input.replace("#", "")
            self.driver.get(
                f"https://www.instagram.com/explore/search/keyword/?q=%23{link}"
            )
            link_list = self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aagu"]'))
            )
            if link_list:
                random_number = random.randint(0, (len(link_list) - 1))
                link_list[random_number].click()
                self.like_function()
                time.sleep(2.5)
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def hashtag_postCommenter(self, user_input, comment):
        try:
            link = user_input.replace("#", "")
            self.driver.get(
                f"https://www.instagram.com/explore/search/keyword/?q=%23{link}"
            )
            link_list = self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aagu"]'))
            )
            if link_list:
                random_number = random.randint(0, (len(link_list) - 1))
                link_list[random_number].click()
                commenter = self.wait.until(
                    EC.presence_of_element_located(
                        ("xpath", "//textarea[contains(@aria-label,'Add a comment')]")
                    )
                )
                self.action.send_keys_to_element(
                    commenter, comment + Keys.ENTER
                ).perform()
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def post_liker(self, username):
        try:
            self.driver.get("https://www.instagram.com/" + username)
            link_list = self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aagu"]'))
            )
            if link_list:
                random_number = random.randint(0, (len(link_list) - 1))
                link_list[random_number].click()
                self.like_function()
                time.sleep(3)
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def post_liker_url(self, url):
        try:
            self.driver.get(url)
            time.sleep(5)
            self.like_function()
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def post_comment_url(self, url, comment):
        try:
            self.driver.get(url)
            time.sleep(5)
            commenter = self.wait.until(
                EC.presence_of_element_located(
                    ("xpath", "//textarea[contains(@aria-label,'Add a comment')]")
                )
            )
            self.action.send_keys_to_element(commenter, comment + Keys.ENTER).perform()
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def post_commenter(self, username, comment):
        try:
            self.driver.get("https://www.instagram.com/" + username)
            link_list = self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aagu"]'))
            )
            if link_list:
                random_number = random.randint(0, (len(link_list) - 1))
                link_list[random_number].click()
                time.sleep(5)
                commenter = self.wait.until(
                    EC.presence_of_element_located(
                        ("xpath", "//textarea[contains(@aria-label,'Add a comment')]")
                    )
                )
                self.action.send_keys_to_element(
                    commenter, comment + Keys.ENTER
                ).perform()
                time.sleep(1)
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def reel_viewer(self, username):
        try:
            self.driver.get(f"https://www.instagram.com/{username}/reels")
            link_list = self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aajy"]'))
            )
            if link_list:
                random_number = random.randint(0, (len(link_list) - 1))
                link_list[random_number].click()
                time.sleep(5)
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def reel_viewer_url(self, url):
        try:
            self.driver.get(url)
            time.sleep(5)
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def reel_liker(self, username):
        try:
            self.driver.get(f"https://www.instagram.com/{username}/reels")
            link_list = self.wait.until(
                EC.presence_of_all_elements_located(
                    (
                        "xpath",
                        '//div[@class="_aajy"]'
                    )
                )
            )
            if link_list:
                random_number = random.randint(0, (len(link_list) - 1))
                link_list[random_number].click()
                self.like_function()
                time.sleep(3)
                return True
        except Exception as e:
            print(f"Error: {e}")
        return False

    def reel_commenter(self, username, comment):
        try:
            self.driver.get(f"https://www.instagram.com/{username}/reels")
            self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aajy"]'))
            )
            link_list = self.driver.find_elements("xpath", '//div[@class="_aajy"]')
            if link_list:
                random_number = random.randint(0, (len(link_list) - 1))
                link_list[random_number].click()
                commenter = self.wait.until(
                    EC.presence_of_element_located(
                        ("xpath", "//textarea[contains(@aria-label,'Add a comment')]")
                    )
                )
                self.action.send_keys_to_element(commenter, comment + Keys.ENTER).perform()
                time.sleep(3)
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def reel_commenter_url(self, url, comment):
        try:
            self.driver.get(url)
            time.sleep(5)
            commenter = self.wait.until(
                EC.presence_of_element_located(
                    ("xpath", "//textarea[contains(@aria-label,'Add a comment')]")
                )
            )
            self.action.send_keys_to_element(commenter, comment + Keys.ENTER).perform()
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def single_reel_liker(self, url):
        try:
            self.driver.get(url)
            time.sleep(5)
            self.like_function()
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False


def insta_login(profile_id, username, password):
    user_bot = InstaBot(profile_id)
    user_bot.start_browser(False)
    if user_bot.driver:
        check = user_bot.login(username, password)
        user_bot.driver.close()
        return check
    return False
