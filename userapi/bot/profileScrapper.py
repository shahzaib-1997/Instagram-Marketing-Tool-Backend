from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.action_chains import ActionChains
from .initiatebrowser import initiatebrowser
import requests


def get_profile_data():
    url = "http://localhost:8000"
    credentials = requests.get(f"{url}/all-credentials/").json()

    profile_id = credentials[0]["profile_id"]
    driver = initiatebrowser.initiate_driver(profile_id)
    driver.maximize_window()
    wait = WebDriverWait(driver, 10)
    for credential in credentials:
        username = credential["username"]
        data = {'user': credential['user'], 'insta_account': credential['id']}
        try:
            driver.get(f"https://www.instagram.com/{username}")
            wait.until(
                EC.presence_of_element_located(
                    (
                        By.XPATH,
                        '//span[@class="html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs"]',
                    )
                )
            )
            no_of_posts = driver.find_element(
                By.XPATH,
                '//span[@class="html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs"]',
            ).text
            if "K" in no_of_posts:
                count = int(float(no_of_posts.split("K")[0]) * 1000)
            elif "M" in no_of_posts:
                count = int(float(no_of_posts.split("M")[0]) * 1000000)
            else:
                count = int(no_of_posts.replace(',', ''))
            data['type'] = "posts"
            data['count'] = count
            requests.post(f"{url}/all-credentials/", data=data)

            # followers scrapper
            followers = driver.find_element(
                By.XPATH,
                '(//span[@class="html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs"])[2]',
            ).text
            if "K" in followers:
                count = int(float(followers.split("K")[0]) * 1000)
            elif "M" in followers:
                count = int(float(followers.split("M")[0]) * 1000000)
            else:
                count = int(followers.replace(',', ''))
            data['type'] = "followers"
            data['count'] = count
            requests.post(f"{url}/all-credentials/", data=data)

            # Following scrapper
            following = driver.find_element(
                By.XPATH,
                '(//span[@class="html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs"])[3]',
            ).text
            if "K" in following:
                count = int(float(following.split("K")[0]) * 1000)
            elif "M" in following:
                count = int(float(following.split("M")[0]) * 1000000)
            else:
                count = int(following.replace(',', ''))
            data['type'] = "following"
            data['count'] = count
            requests.post(f"{url}/all-credentials/", data=data)

            total_likes = 0
            total_comments = 0
            if no_of_posts != '0':
                wait.until(
                    EC.presence_of_all_elements_located(
                        (By.XPATH, '//div[@class="_aagu"]')
                    )
                )
                posts = driver.find_elements(By.XPATH, '//div[@class="_aagu"]')

                try:
                    pinned = len(
                        driver.find_elements(
                            By.CSS_SELECTOR, "svg[aria-label='Pinned post icon']"
                        )
                    )
                except:
                    pinned = 0

                for i in posts[pinned:5+pinned]:
                    # Create an ActionChains object
                    actions = ActionChains(driver)

                    # Move the cursor to the element
                    actions.move_to_element(i).perform()

                    try:
                        likes = driver.find_element(By.XPATH, '//li[@class="_abpm"]').text
                        print("likes:", likes)
                        if "K" in likes:
                            count = int(float(likes.split("K")[0]) * 1000)
                        elif "M" in likes:
                            count = int(float(likes.split("M")[0]) * 1000000)
                        else:
                            count = int(likes.replace(',', ''))
                        total_likes += count
                    except:
                        pass

                    try:
                        comments = driver.find_element(By.XPATH, '(//li[@class="_abpm"])[2]').text
                        print("comments:", comments)
                        if "K" in comments:
                            count = int(float(comments.split("K")[0]) * 1000)
                        elif "M" in comments:
                            count = int(float(comments.split("M")[0]) * 1000000)
                        else:
                            count = int(comments.replace(',', ''))
                        total_comments += count
                    except:
                        pass
            else:
                print(f"No posts yet by {username}.")

            data['type'] = "like"
            data['count'] = total_likes
            requests.post(f"{url}/all-credentials/", data=data)

            data['type'] = "comment"
            data['count'] = total_comments
            requests.post(f"{url}/all-credentials/", data=data)

        except Exception as e:
            print(e)

    driver.close()
    print("Got all profiles stats.")
