import requests
import threading
from .instaBot import InstaBot
from datetime import datetime


def fetch_users():
    url_string = "https://instabotminsoft.pythonanywhere.com/"
    users = requests.get(f"{url_string}all-users/").json()
    for user in users:
        header = requests.post(f"{url_string}token/", data={"user_id": user}).json()
        targets = requests.get(f"{url_string}target/", headers=header).json()

        for target in targets:
            current_status = target["status"]
            target_time = target["activity_time"]["time"][:-4]
            current_time = datetime.now().strftime("%Y-%m-%dT%H:%M")

            if current_status == 0 and target_time == current_time:
                current_id = target["id"]
                target["status"] = 1
                update_status = requests.put(
                    f"{url_string}target/{current_id}/",
                    headers=header,
                    data=target,
                )
                current_target = target["target_type"]["type"]
                profile_id = target["insta_user"]["profile_id"]
                # create insta bot object with relevant profile_id
                user_bot = InstaBot(profile_id)
                user_bot.start_browser()

                if current_target == "hashtag-like":
                    data = requests.get(
                        f"{url_string}hashtag/",
                        params={"target_id": current_id},
                        headers=header,
                    ).json()
                    # perform hashtag function
                    hashtags = data[0]["url"].split("\r\n")
                    for current_hashtag in hashtags:
                        user_bot.hashtag_postLiker(current_hashtag)

                elif current_target == "hashtag-comment":
                    data = requests.get(
                        f"{url_string}hashtag/",
                        params={"target_id": current_id},
                        headers=header,
                    ).json()
                    # perform hashtag function
                    hashtags = data[0]["url"].split("\r\n")
                    for current_hashtag in hashtags:
                        user_bot.hashtag_postCommenter(current_hashtag)

                elif current_target == "post-like":
                    data = requests.get(
                        f"{url_string}post/",
                        params={"target_id": current_id},
                        headers=header,
                    ).json()
                    # perform post function
                    urls = data[0]["url"].split("\r\n")
                    for url in urls:
                        username = url.split("/")
                        if username[-1] == "":
                            username = username[-2]
                        else:
                            username = username[-1]

                        user_bot.post_liker(username)

                elif current_target == "post-comment":
                    data = requests.get(
                        f"{url_string}post/",
                        params={"target_id": current_id},
                        headers=header,
                    ).json()
                    # perform post function
                    urls = data[0]["url"].split("\r\n")
                    for url in urls:
                        username = url.split("/")
                        if username[-1] == "":
                            username = username[-2]
                        else:
                            username = username[-1]

                        user_bot.post_commenter(username)

                elif current_target == "comment-like":
                    data = requests.get(
                        f"{url_string}post/",
                        params={"target_id": current_id},
                        headers=header,
                    ).json()
                    # perform post function
                    urls = data[0]["url"].split("\r\n")
                    for url in urls:
                        username = url.split("/")
                        if username[-1] == "":
                            username = username[-2]
                        else:
                            username = username[-1]

                        user_bot.comment_liker(username)

                elif current_target == "reels-view":
                    data = requests.get(
                        f"{url_string}reel/",
                        params={"target_id": current_id},
                        headers=header,
                    ).json()
                    # perform post function
                    urls = data[0]["url"].split("\r\n")
                    for url in urls:
                        username = url.split("/")
                        if username[-1] == "":
                            username = username[-2]
                        else:
                            username = username[-1]

                        user_bot.reel_viewer(username)

                elif current_target == "reels-like":
                    data = requests.get(
                        f"{url_string}reel/",
                        params={"target_id": current_id},
                        headers=header,
                    ).json()
                    # perform post function
                    urls = data[0]["url"].split("\r\n")
                    for url in urls:
                        username = url.split("/")
                        if username[-1] == "":
                            username = username[-2]
                        else:
                            username = username[-1]

                        user_bot.reel_liker(username)

                elif current_target == "reels-comment":
                    data = requests.get(
                        f"{url_string}reel/",
                        params={"target_id": current_id},
                        headers=header,
                    ).json()
                    urls = data[0]["url"].split("\r\n")
                    for url in urls:
                        username = url.split("/")
                        if username[-1] == "":
                            username = username[-2]
                        else:
                            username = username[-1]

                        user_bot.reel_commenter(username)

                elif current_target == "reels":
                    data = requests.get(
                        f"{url_string}reel/",
                        params={"target_id": current_id},
                        headers=header,
                    ).json()
                    # perform reels function
                    for reel_url in data:
                        url = reel_url["url"]

                        user_bot.single_reel_liker(url)

                target["status"] = 2
                update_status = requests.put(
                    f"{url_string}target/{current_id}/",
                    headers=header,
                    data=target,
                )

                try:
                    user_bot.driver.close()
                    print("driver closed")
                except:
                    pass

            # elif current_status == 1:
            #     print("The program is currently running")

            # elif current_status == 2:
            #     print("The target is already fullfilled")


def thread_func():
    s = threading.Thread(target=lambda: fetch_users())
    s.start()
