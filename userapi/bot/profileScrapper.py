from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from initiatebrowser import initiatebrowser
import time

profile_id = "8f03f922-0c14-423f-8bf8-13cda5d329e2"
driver = initiatebrowser.initiate_driver(profile_id)
wait = WebDriverWait(driver, 10)

while True:
    username = input("Enter Username or press enter to exit:")
    if username:
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
            posts = driver.find_element(
                By.XPATH,
                '//span[@class="html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs"]',
            )
            no_of_posts = int(posts.text)
            print(f"Number of posts = {no_of_posts}")

            # followers scrapper
            followers = driver.find_element(
                By.XPATH,
                '(//span[@class="html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs"])[2]',
            ).text

            print("Total Followers: ", followers)

            # Following scrapper
            numberof_following = driver.find_element(
                By.XPATH,
                '(//span[@class="html-span xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x1hl2dhg x16tdsg8 x1vvkbs"])[3]',
            ).text
            print("Total Following: ", numberof_following)

            if no_of_posts:
                wait.until(
                    EC.presence_of_all_elements_located(
                        (By.XPATH, '//div[@class="_aagu"]')
                    )
                )
                posts = driver.find_elements(By.XPATH, '//div[@class="_aagu"]')
                for e, i in enumerate(posts[:5], 2):
                    i.click()
                    print(f"Post {e+1}:")
                    try:
                        wait.until(
                            EC.presence_of_all_elements_located(
                                (By.XPATH, '//ul[@class="_a9ym"]//div[@class="_a9zs"]')
                            )
                        )
                        time.sleep(1.5)
                        comments = driver.find_elements(
                            By.XPATH, '//ul[@class="_a9ym"]//div[@class="_a9zs"]'
                        )
                        print(f"Number of comments: {len(comments)}")
                    except:
                        print("Comments on this post: 0 comments")
                    likes = driver.find_element(
                        By.XPATH, '//section[@class="_ae5m _ae5n _ae5o"]'
                    ).text
                    if "Be the first to like this" in likes:
                        print("Likes on this post: 0 likes")
                    elif ("Liked by" or "and" or "others") in likes:
                        wait.until(
                            EC.presence_of_element_located(
                                (
                                    By.XPATH,
                                    '(//div[@class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh xr1yuqi xkrivgy x4ii5y1 x1gryazu x1n2onr6 x1plvlek xryxfnj x1iyjqo2 x2lwn1j xeuugli xdt5ytf x1a02dak xqjyukv x1cy8zhl x1oa3qoh x1nhvcw1"]//a)[2]',
                                )
                            )
                        )
                        others_button = driver.find_element(
                            By.XPATH,
                            '(//div[@class="x9f619 xjbqb8w x78zum5 x168nmei x13lgxp2 x5pf9jr xo71vjh xr1yuqi xkrivgy x4ii5y1 x1gryazu x1n2onr6 x1plvlek xryxfnj x1iyjqo2 x2lwn1j xeuugli xdt5ytf x1a02dak xqjyukv x1cy8zhl x1oa3qoh x1nhvcw1"]//a)[2]',
                        ).click()
                        time.sleep(5)
                        other_likes = driver.find_elements(
                            By.XPATH,
                            '//div[@class="x1dm5mii x16mil14 xiojian x1yutycm x1lliihq x193iq5w xh8yej3"]',
                        )
                        total_likes = 1 + len(other_likes)
                        print(f"Number of Likes: {total_likes}")
                        close_button = driver.find_element(
                            By.XPATH, '//div[@class="_ac7b _ac7d"]//button'
                        ).click()
                    else:
                        print(f"Number of Likes: {likes}")
                    driver.find_element(
                        By.XPATH,
                        '//div[@class="x160vmok x10l6tqk x1eu8d0j x1vjfegm"]//div[@class="x6s0dn4 x78zum5 xdt5ytf xl56j7k"]',
                    ).click()
            else:
                print("No posts yet.")
        except Exception as e:
            print(e)
            break
    else:
        break

driver.close()
