from .instaBot import InstaBot
import requests
import threading
from userapi.host_url import BASE_URL

url = BASE_URL


def scrape_profile_data(credential):
    profile_id = credential["profile_id"]
    user_bot = InstaBot(profile_id)
    check = user_bot.start_browser()
    if check:
        username = credential["username"]
        password = credential["password"]
        username = user_bot.login(username, password)
        data = {"insta_account": credential["id"]}
        try:
            no_of_posts = user_bot.get_posts(username)
            data["type"] = "posts"
            data["count"] = no_of_posts
            requests.post(f"{url}all-credentials/", data=data)

            followers = user_bot.get_followers(username)
            data["type"] = "followers"
            data["count"] = followers
            requests.post(f"{url}all-credentials/", data=data)

            following = user_bot.get_following(username)
            data["type"] = "following"
            data["count"] = following
            requests.post(f"{url}all-credentials/", data=data)

            total_likes, total_comments = user_bot.get_likes_comments(username)

            data["type"] = "like"
            data["count"] = total_likes
            requests.post(f"{url}all-credentials/", data=data)

            data["type"] = "comment"
            data["count"] = total_comments
            requests.post(f"{url}all-credentials/", data=data)

        except Exception as e:
            print(e)

        finally:
            user_bot.driver.close()


def get_profile_data():
    credentials = requests.get(f"{url}all-credentials/").json()
    for credential in credentials:
        t = threading.Thread(target=scrape_profile_data, args=(credential,))
        t.start()
    print("Got all profiles stats.")
