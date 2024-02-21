import random
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import json
from .initiatebrowser import initiatebrowser
from selenium.webdriver.common.action_chains import ActionChains

class InstaBot:

    def __init__(self, profile_id):
        # profile_id = initiatebrowser.get_profiles()[0]
        self.profile_id = profile_id

    def start_browser(self):
        self.driver = initiatebrowser.initiate_driver(self.profile_id)
        # self.driver.maximize_window()
        self.driver.get("https://www.instagram.com/")
        self.wait = WebDriverWait(self.driver, 10)
        self.action = ActionChains(self.driver)

    def login(self, username, password):
        try:
            username = self.driver.find_element(By.XPATH, '//input[@aria-label="Phone number, username, or email"]').send_keys(username)
            password = self.driver.find_element(By.XPATH, '//input[@aria-label="Password"]').send_keys(password)
            login = self.wait.until(EC.element_to_be_clickable((By.XPATH,  '//button[@class=" _acan _acap _acas _aj1- _ap30"]')))
            login.click()
            not_now1 = self.wait.until(EC.presence_of_element_located((By.XPATH,  '//div[@class="_ac8f"]')))
            not_now1.click()
            not_now2 = self.wait.until(EC.presence_of_element_located((By.XPATH,  '//div[@class="_a9-z"]//button[@class="_a9-- _ap36 _a9_1"]')))
            not_now2.click()
            return True
        except:
            return False


    def story_viewer(self, username):
        try:
            self.driver.get("https://www.instagram.com/" + username)
            story = self.wait.until(EC.presence_of_element_located((By.XPATH, '//div[@class="_aarf _aarg"]//img[@class="xpdipgo x972fbf xcfux6l x1qhh985 xm0m39n xk390pu x5yr21d xdj266r x11i5rnm xat24cr x1mh8g0r xl1xv1r xexx8yu x4uap5 x18d9i69 xkhd6sd x11njtxf xh8yej3"]')))
            story.click()
        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def feed_storyViewer(self, numberof_stories):
        try:
            count = 0
            self.driver.get("https://www.instagram.com/")
            self.wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(@aria-label,'Story')]")))
            stories = self.driver.find_element(By.XPATH, "//button[contains(@aria-label,'Story')]")
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

            self.driver.find_element(By.XPATH, '//div[@class="xjbqb8w x1ypdohk xw7yly9 xktsk01 x1yztbdb x1d52u69 x10l6tqk x13vifvy xds687c"]//div[@class="x6s0dn4 x78zum5 xdt5ytf xl56j7k"]').click()   

        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def post_liker(self, username):
        try:
            random_number = random.randint(0, 5)
            self.driver.get("https://www.instagram.com/" + username)
            self.wait.until(EC.presence_of_all_elements_located((By.XPATH,  '//div[@class="_aagw"]')))
            link_list = self.driver.find_elements(By.XPATH,  '//div[@class="_aagw"]')
            link_list[random_number].click()
            like_button = self.wait.until(EC.presence_of_element_located((By.XPATH,  '//div[@class="x6s0dn4 x78zum5 xdt5ytf xl56j7k"]//span')))
            like_button.click()
            time.sleep(3)
        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def post_commenter(self, username, comment):
        try:
            random_number = random.randint(0, 5)
            self.driver.get("https://www.instagram.com/" + username)
            self.wait.until(EC.presence_of_all_elements_located((By.XPATH,  '//div[@class="_aagw"]')))
            link_list = self.driver.find_elements(By.XPATH,  '//div[@class="_aagw"]')
            link_list[random_number].click()
            time.sleep(5)
            self.wait.until(EC.presence_of_element_located((By.XPATH,  "//textarea[contains(@aria-label,'Add a comment')]")))
            commenter = self.driver.find_element("xpath","//textarea[contains(@aria-label,'Add a comment')]")
            self.action.send_keys_to_element(commenter,comment+Keys.ENTER).perform()
            time.sleep(3)
        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def likes_scrapper(self, username):
        try:
            likers_names = []
            random_number = random.randint(0, 5)
            self.driver.get("https://www.instagram.com/" + username)
            self.wait.until(EC.presence_of_all_elements_located((By.XPATH,  '//div[@class="_aagu"]')))
            link_list = self.driver.find_elements(By.XPATH,  '//div[@class="_aagu"]')
            link_list[random_number].click()
            current_url = self.driver.current_url.split("?")[0]+"liked_by"
            self.driver.get(current_url)
            self.wait.until(EC.presence_of_all_elements_located((By.XPATH,  "//section//div//a[@role='link'][not(descendant::img)]")))
            names = self.driver.find_elements(By.XPATH,  "//section//div//a[@role='link'][not(descendant::img)]")
            for i in names:
                likers_names.append(i.text)

            json_data = json.dumps({'Liker\'s Names:': likers_names}, indent=2)
            print(json_data)
            return json_data
        
        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def followers_scrapper(self, username):
        try:

            followers_names=[]
            self.driver.get("https://www.instagram.com/" + username)
            follow_button = self.wait.until(EC.presence_of_element_located((By.XPATH, '//a[@class="x1i10hfl xjbqb8w x6umtig x1b1mbwd xaqea5y xav7gou x9f619 x1ypdohk xt0psk2 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz _alvs _a6hd"]')))
            follow_button.click()    
            self.wait.until(EC.presence_of_all_elements_located((By.XPATH, '//span[@class="_ap3a _aaco _aacw _aacx _aad7 _aade"]'))) 
            followers = self.driver.find_elements(By.XPATH, '//span[@class="_ap3a _aaco _aacw _aacx _aad7 _aade"]')
            for i in followers:
                followers_names.append(i.text)

            json_data = json.dumps({'Follower\'s Names:': followers_names}, indent=2)
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
            highlight = self.wait.until(EC.presence_of_element_located((By.XPATH,  '//div[@class="xnz67gz x14yjl9h xudhj91 x18nykt9 xww2gxu x1lliihq x6ikm8r x10wlt62 x1n2onr6"]')))
            highlight.click()
        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def comment_liker(self, username):
        try:
            posts_list = []
            comment_list = []
            random_number = random.randint(0, 5)
            self.driver.get("https://www.instagram.com/" + username)
            self.wait.until(EC.presence_of_all_elements_located((By.XPATH,  '//div[@class="_aagu"]')))
            posts_list = self.driver.find_elements(By.XPATH,  '//div[@class="_aagu"]')
            posts_list[random_number].click()
            self.wait.until(EC.presence_of_all_elements_located((By.XPATH,  '//span[@class="_a9zu"]')))                                       
            comment_list = self.driver.find_elements(By.XPATH,  '//span[@class="_a9zu"]')
            comment_list[random_number].click()
            time.sleep(3)
        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def hashtag_postLiker(self, user_input):
        try:
            random_number = random.randint(0, 5)
            link = user_input.replace('#', '')
            self.driver.get("https://www.instagram.com/explore/tags/" + link)
            time.sleep(5)
            link_list = self.driver.find_elements(by= 'xpath', value= '//div[@class="_aagu"]')
            link_list[random_number].click()
            time.sleep(5)
            self.driver.find_element(by= 'xpath', value= '//div[@class="x6s0dn4 x78zum5 xdt5ytf xl56j7k"]//span').click()
            time.sleep(7)

        except Exception as error:
            print(f"There is an {error}. Please Retry!")
    

    def hashtag_postCommenter(self, user_input, comment):
        try:
            random_number = random.randint(0, 5)
            link = user_input.replace('#', '')
            self.driver.get("https://www.instagram.com/explore/tags/" + link)
            time.sleep(7)
            link_list = self.driver.find_elements(by= 'xpath', value= '//div[@class="_aagw"]')
            link_list[random_number].click()
            self.wait.until(EC.presence_of_element_located((By.XPATH,  "//textarea[contains(@aria-label,'Add a comment')]")))
            commenter = self.driver.find_element("xpath","//textarea[contains(@aria-label,'Add a comment')]")
            self.action.send_keys_to_element(commenter,comment+Keys.ENTER).perform()

        except Exception as error:
            print(f"There is an {error}. Please Retry!")


    def hashtag_postLike_scrapper(self, user_input):
        try:
            hashtag_loop = True
            likers_names = []
            random_number = random.randint(0, 5)
            while hashtag_loop == True:
                if '#' in user_input:
                    if user_input[0] == '#':
                        link = user_input.replace('#', '')
                        self.driver.get("https://www.instagram.com/explore/tags/" + link)
                        self.wait.until(EC.presence_of_all_elements_located((By.XPATH,  '//div[@class="_aagu"]')))
                        link_list = self.driver.find_elements(By.XPATH,  '//div[@class="_aagu"]')
                        link_list[random_number].click()
                        current_url = self.driver.current_url.split("?")[0]+"liked_by"
                        self.driver.get(current_url)
                        self.wait.until(EC.presence_of_all_elements_located((By.XPATH,  "//section//div//a[@role='link'][not(descendant::img)]")))
                        names = self.driver.find_elements(By.XPATH,  "//section//div//a[@role='link'][not(descendant::img)]")
                        for i in names:
                            likers_names.append(i.text)

                        json_data = json.dumps({'Liker\'s Names:': likers_names}, indent=2)
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

    def reel_viewer(self, username):
        try:
            random_number = random.randint(0, 5)
            self.driver.get("https://www.instagram.com/" + username + '/reels')
            self.wait.until(EC.presence_of_all_elements_located((By.XPATH, '//div[@class="_aajy"]')))
            link_list = self.driver.find_elements(By.XPATH, '//div[@class="_aajy"]')
            link_list[random_number].click()
        except Exception as error:
            print(f"There is an {error}. Please Retry!")

    def reel_liker(self, username):
        link_list = []
        random_number = random.randint(0, 5)
        self.driver.get("https://www.instagram.com/"+username+"/reels")
        self.wait.until(EC.presence_of_all_elements_located((By.XPATH,  '//div[@class="_aajy"]')))
        link_list = self.driver.find_elements(By.XPATH,  '//div[@class="_aajy"]')
        link_list[random_number].click()
        current_url = self.driver.current_url
        modified_url = current_url.replace("reel", "reels")
        self.driver.get(modified_url)
        self.wait.until(EC.presence_of_element_located((By.XPATH, '//div[@class="html-div xe8uvvx xdj266r x11i5rnm x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x6s0dn4 x1ypdohk x78zum5 xdt5ytf xieb3on"]//span')))
        span_element = self.driver.find_element(By.XPATH, '//div[@class="html-div xe8uvvx xdj266r x11i5rnm x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x6s0dn4 x1ypdohk x78zum5 xdt5ytf xieb3on"]//span')
        span_element.click()
        time.sleep(3)

    def reel_commenter(self, username, comment):
        try:
            random_number = random.randint(0, 5)
            self.driver.get("https://www.instagram.com/" + username + '/reels')
            self.wait.until(EC.presence_of_all_elements_located((By.XPATH,  '//div[@class="_aajy"]')))
            link_list = self.driver.find_elements(By.XPATH,  '//div[@class="_aajy"]')
            link_list[random_number].click()
            self.wait.until(EC.presence_of_element_located((By.XPATH,  "//textarea[contains(@aria-label,'Add a comment')]")))
            commenter = self.driver.find_element("xpath","//textarea[contains(@aria-label,'Add a comment')]")
            self.action.send_keys_to_element(commenter,comment+Keys.ENTER).perform()
            time.sleep(3)
        except Exception as error:
            print(f"There is an {error}. Please Retry!")


    def single_reel_liker(self, url):
        try:
            url=url.replace("reel/","reels/")
            self.driver.get(url)
            self.wait.until(EC.presence_of_element_located((By.XPATH, '//div[@class="html-div xe8uvvx xdj266r x11i5rnm x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x6s0dn4 x1ypdohk x78zum5 xdt5ytf xieb3on"]//span')))
            like_button = self.driver.find_element(By.XPATH, '//div[@class="html-div xe8uvvx xdj266r x11i5rnm x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x6s0dn4 x1ypdohk x78zum5 xdt5ytf xieb3on"]//span')
            like_button.click()
            time.sleep(2)
        except Exception as e:
            print(f"Error in liking reel: {e}")

