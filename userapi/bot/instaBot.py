import random
import time
import traceback
import json
import re
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException
from .initiatebrowser import InitiateBrowser


def random_sleep(min_sec=1, max_sec=3):
    time.sleep(random.uniform(min_sec, max_sec))


class InstaBot:

    def __init__(self, profile_id):
        self.profile_id = profile_id
        self.driver = None
        self.wait = None
        self.action = None
        self.url = "https://www.instagram.com"

    def start_browser(self, cookies_data=None):
        self.driver = InitiateBrowser.initiate_driver(self.profile_id, cookies_data)
        if self.driver:
            self.wait = WebDriverWait(self.driver, 10)
            self.action = ActionChains(self.driver)
            return True
        return False

    def stop_browser(self):
        if self.driver:
            try:
                self.driver.close()
            except:
                pass
            self.driver = None
        InitiateBrowser.stop_driver(self.profile_id)
        time.sleep(5)

    def check_login(self, username):
        """Verify login status for given username"""
        try:
            self.driver.get(f"{self.url}/{username}/?hl=en")

            return self.wait.until(
                EC.presence_of_element_located(
                    ("xpath", f'//a/h2/span[text()="{username}"]')
                )
            ).text
        except:
            print("Not Logged in")
        return None

    def get_otp_input(self):
        try:
            return self.wait.until(
                EC.presence_of_element_located((By.XPATH, "//input[@autocomplete]"))
            )
        except:
            return None

    def click_not_now(self):
        try:
            print("Checking for Not Now button")
            # Wait for potential "Not Now" button and click if present
            self.wait.until(
                EC.presence_of_element_located(
                    ("xpath", '//div[@role="button" and text()="Not now"]')
                )
            ).click()
            print("Clicked on Not Now button")
        except:
            print("Not Now button not found.")

    def handle_notifications(self, username):
        try:
            time.sleep(10)
            return self.handle_post_login(username)
        except:
            traceback.print_exc()
            return None

    def handle_otp(self, otp_code, username):
        try:
            otp_input = self.get_otp_input()
            otp_input.send_keys(otp_code)
            otp_input.send_keys(Keys.ENTER)
            time.sleep(10)
            current_url = self.driver.current_url
            if "/auth_platform/" in current_url or "/two_factor" in current_url:
                return None
            return self.handle_post_login(username)
        except:
            traceback.print_exc()
            return None

    def handle_cookies(self):
        try:
            print("Checking cookies")
            self.wait.until(
                EC.presence_of_element_located(
                    ("xpath", '//div[@role="dialog"]/div/button')
                )
            ).click()
            print("Clicked on cookies button")
        except:
            print("cookies dialog not found")

    def handle_post_login(self, username):
        self.click_not_now()
        return self.check_login(username)

    def login(self, username: str, password: str):
        """Enhanced login with human-like behavior and better error handling"""
        try:
            en_url = f"{self.url}/?hl=en"
            self.driver.get(en_url)
            random_sleep(1, 2)  # Wait for page load

            self.handle_cookies()

            # Wait for username field and move mouse to it naturally
            username_element = self.wait.until(
                EC.visibility_of_element_located(("xpath", '//input[@name="username"]'))
            )
            self.action.move_to_element(username_element).pause(
                random.uniform(0.2, 0.5)
            ).perform()

            # Type username with random delays between characters
            for char in username:
                username_element.send_keys(char)
                random_sleep(0.05, 0.15)

            # Move to password field naturally
            password_element = self.driver.find_element(
                "xpath", '//input[@name="password"]'
            )
            self.action.move_to_element(password_element).pause(
                random.uniform(0.2, 0.5)
            ).perform()

            # Type password with random delays
            for char in password:
                password_element.send_keys(char)
                random_sleep(0.05, 0.15)

            # Submit login
            if random.random() < 0.7:  # 70% chance to use Enter
                password_element.send_keys(Keys.ENTER)
            else:
                login_button = self.driver.find_element(
                    "xpath", "//button[@type='submit']"
                )
                self.action.move_to_element(login_button).click().perform()

            # Handle post-login scenarios
            time.sleep(10)
            current_url = self.driver.current_url
            if current_url == en_url:
                reason = self.driver.find_element("xpath", "//form/span").text
                return False, reason

            if "reactivated" in current_url:
                self.driver.get(en_url)
                random_sleep(2, 3)

            current_url = self.driver.current_url
            print(current_url)
            # Check for 2FA/OTP
            if "/auth_platform/" in current_url or "/two_factor" in current_url:
                print("Verification page detected.")
                otp_input = self.get_otp_input()
                if otp_input:
                    return False, "OTP"
                return False, "notifications"
            else:
                print("Not on OTP page.")

            username = self.handle_post_login(username)
            if username:
                print(f"Successfully logged in as: {username}")
                return True, username
        except Exception as e:
            print(f"Login failed: {e}")
            return False, "Something went wrong. Please Try again."
        return False, "Login failed."

    def story_viewer(self, username, like_story, like_option):
        try:
            self.driver.get(f"{self.url}/stories/{username}/?hl=en")
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
                        inner_div = story.find_element("xpath", "./div")
                        if inner_div:
                            # Process the inner div as needed
                            filtered_stories = stories[i:]
                            break
                    except:
                        pass

                for i, story in enumerate(filtered_stories):
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

                    random_sleep(2, 4)

                    try:
                        next_button = self.wait.until(
                            EC.presence_of_element_located(
                                (By.CSS_SELECTOR, 'svg[aria-label="Next"]')
                            )
                        )
                        self.driver.execute_script(
                            "arguments[0].parentNode.click();", next_button
                        )
                    except Exception as e:
                        print(f"No next story")
                        break
        except:
            print(f"Error in story_viewer")
            traceback.print_exc()

    def like_function(self):
        try:
            like_button = self.wait.until(
                EC.presence_of_element_located(
                    (By.CSS_SELECTOR, 'svg[aria-label="Like"]')
                )
            )
            self.driver.execute_script("arguments[0].parentNode.click();", like_button)
        except Exception as e:
            print("Error in like_function")
            traceback.print_exc()

    def feed_storyViewer(self, numberof_stories):
        try:
            count = 0
            self.driver.get(f"{self.url}/?hl=en")
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
            self.driver.get(f"{self.url}/{username}/?hl=en")
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
            self.driver.get(f"{self.url}/{username}/?hl=en")
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
            self.driver.get(f"{self.url}/?hl=en")
            time.sleep(3)
            for i in range(15):
                self.driver.execute_script("window.scrollBy(0, 1000);")
                time.sleep(2)
        except Exception as e:
            print(f"There is an {e}. Please Retry!")

    def highlights_viewer(self, username):
        try:
            self.driver.get(f"{self.url}/{username}/?hl=en")
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
                        self.driver.get(f"{self.url}/explore/tags/{link}/?hl=en")
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
            self.driver.get(f"{self.url}/{username}/?hl=en")
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
                        self.driver.execute_script(
                            "arguments[0].parentNode.click();",
                            comment_list[random_number],
                        )
                except:
                    pass
                time.sleep(3)
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def hashtag_postLiker(self, user_input):
        try:
            link = user_input.replace("#", "").replace(" ", "")
            self.driver.get(f"{self.url}/explore/search/keyword/?q=%23{link}&hl=en")
            link_list = self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aagu"]'))
            )
            if link_list:
                random_number = random.randint(0, (len(link_list) - 1))
                self.action.move_to_element(link_list[random_number]).click().perform()
                self.like_function()
                time.sleep(2.5)
            return True
        except Exception as e:
            print(f"Error in hashtag_postLiker.")
            traceback.print_exc()
            return False

    def hashtag_postCommenter(self, user_input, comment):
        try:
            link = user_input.replace("#", "").replace(" ", "")
            self.driver.get(f"{self.url}/explore/search/keyword/?q=%23{link}&hl=en")
            link_list = self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aagu"]'))
            )
            if link_list:
                random_number = random.randint(0, (len(link_list) - 1))
                link_list[random_number].click()
                comment_box = self.wait.until(
                    EC.presence_of_element_located(
                        ("xpath", "//textarea[contains(@aria-label,'Add a comment')]")
                    )
                )
                self.action.move_to_element(comment_box).send_keys(
                    comment, Keys.ENTER
                ).perform()
            return True
        except Exception as e:
            print(f"Error in hashtag_postCommenter.")
            traceback.print_exc()
            return False

    def post_liker(self, username):
        try:
            self.driver.get(f"{self.url}/{username}/?hl=en")
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
            print(f"Error in post_liker.")
            traceback.print_exc()
            return False

    def post_liker_url(self, url):
        try:
            self.driver.get(f"{url}/?hl=en")
            time.sleep(5)
            self.like_function()
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def post_comment_url(self, url, comment):
        try:
            self.driver.get(f"{url}/?hl=en")
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
            self.driver.get(f"{self.url}/{username}/?hl=en")
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
            self.driver.get(f"{self.url}/{username}/reels/?hl=en")
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
            self.driver.get(f"{url}/?hl=en")
            time.sleep(5)
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def reel_liker(self, username):
        try:
            self.driver.get(f"{self.url}/{username}/reels/?hl=en")
            link_list = self.wait.until(
                EC.presence_of_all_elements_located(("xpath", '//div[@class="_aajy"]'))
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
            self.driver.get(f"{self.url}/{username}/reels/?hl=en")
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
                self.action.send_keys_to_element(
                    commenter, comment + Keys.ENTER
                ).perform()
                time.sleep(3)
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def reel_commenter_url(self, url, comment):
        try:
            self.driver.get(f"{url}/?hl=en")
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
            self.driver.get(f"{url}/?hl=en")
            time.sleep(5)
            self.like_function()
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def get_username(self, url):
        try:
            self.driver.get(f"{url}/?hl=en")
            username = self.wait.until(
                EC.presence_of_element_located(
                    ("xpath", "//a[contains(@class,'notranslate')]")
                )
            ).text
            return username
        except Exception as e:
            print(f"Error: {e}")
            return False

    def load_profile_page(self, username):
        """Load the profile page for the given username, only if not already loaded."""
        url = f"{self.url}/{username}/?hl=en"
        if self.driver.current_url != url:
            self.driver.get(url)

    def get_count_by_index(self, index):
        """Helper to get post, followers, or following count by index."""
        try:
            count_text = self.wait.until(
                EC.presence_of_element_located(
                    (
                        By.XPATH,
                        f'(//span[@class="html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs"])[{index}]',
                    )
                )
            ).text
            return self.parse_count(count_text)
        except:
            print(f"Unable to locate count element at index {index}")
            return 0

    def get_posts(self, username):
        self.load_profile_page(username)
        return self.get_count_by_index(1)

    def get_followers(self, username):
        self.load_profile_page(username)
        return self.get_count_by_index(2)

    def get_following(self, username):
        self.load_profile_page(username)
        return self.get_count_by_index(3)

    def get_likes_comments(self, username):
        self.load_profile_page(username)

        total_likes = 0
        total_comments = 0

        try:
            posts = self.wait.until(
                EC.presence_of_all_elements_located((By.XPATH, '//div[@class="_aagu"]'))
            )
        except:
            print("No posts found or page load took too long.")
            return total_likes, total_comments

        try:
            pinned_count = len(
                self.driver.find_elements(
                    By.CSS_SELECTOR, "svg[aria-label='Pinned post icon']"
                )
            )
        except:
            pinned_count = 0

        for post in posts[pinned_count : pinned_count + 5]:
            try:
                self.action.move_to_element(post).perform()
                likes = post.find_element(
                    By.XPATH, "./following-sibling::div[2]/ul/li"
                ).text
                total_likes += self.parse_count(likes)
            except:
                print(f"Likes element not found for post: {posts.index(post)}.")

            try:
                comments = post.find_element(
                    By.XPATH, "./following-sibling::div[2]/ul/li[2]"
                ).text
                total_comments += self.parse_count(comments)
            except:
                print(f"Comments element not found for post: {posts.index(post)}.")

        return total_likes, total_comments

    def parse_count(self, text):
        """Parse the like/comment text into an integer count with support for 'K' and 'M' suffixes."""
        try:
            if "K" in text:
                return int(float(text.replace("K", "")) * 1000)
            elif "M" in text:
                return int(float(text.replace("M", "")) * 1000000)
            else:
                return int(re.sub(r"[^\d]", "", text))
        except ValueError:
            print(f"Error parsing count from text: {text}")
            return 0
