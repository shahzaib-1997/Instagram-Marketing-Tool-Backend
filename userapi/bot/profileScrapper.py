from .instaBot import InstaBot
import requests
import threading
from userapi.host_url import BASE_URL

url = BASE_URL


def scrape_profile_data(credential, user_bot=None):
    if user_bot is None:
        profile_id = credential["profile_id"]
        user_bot = InstaBot(profile_id)
        check = user_bot.start_browser()
    else:
        check = True
    if check:
        username = credential["username"]
        password = credential["password"]
        if user_bot.check_login() is None:
            username = user_bot.login(username, password)
        data = {"insta_account": credential["id"]}
        print(f"Scrapping data for insta credential: {credential}")
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
            user_bot.stop_browser()
    else:
        print(f"Unable to start browser for insta credential: {credential}")


def get_profile_data():
    print("Started scrapping profiles data!")
    credentials = requests.get(f"{url}all-credentials/").json()
    for credential in credentials:
        t = threading.Thread(target=scrape_profile_data, args=(credential,))
        t.start()
    print("Got all profiles stats.")


def profile_thread(credential, user_bot):
    t = threading.Thread(target=scrape_profile_data, args=(credential, user_bot))
    t.start()
