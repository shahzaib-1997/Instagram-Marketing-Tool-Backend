import requests
import threading
from .instaBot import InstaBot
from datetime import datetime
from userapi.host_url import BASE_URL


def fetch_users():
    url_string = BASE_URL
    users = requests.get(f"{url_string}all-users/").json()
    for user in users:
        header = requests.post(f"{url_string}token/", data={"user_id": user}).json()
        targets = requests.get(f"{url_string}target/", headers=header).json()

        for target in targets:
            current_status = target["status"]
            target_time = target["activity_time"]["time"]
            target_datetime = datetime.fromisoformat(target_time)
            current_datetime = datetime.now()

            if current_status == 0 and target_datetime.hour == current_datetime.hour and target_datetime.minute <= current_datetime.minute:
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
                check = user_bot.start_browser()
                status = False

                if check:
                    if current_target == "hashtag-like":
                        data = requests.get(
                            f"{url_string}hashtag/",
                            params={"target_id": current_id},
                            headers=header,
                        ).json()
                        # perform hashtag function
                        hashtags = data[0]["url"].split("\r\n")
                        for current_hashtag in hashtags:
                            status = user_bot.hashtag_postLiker(current_hashtag)

                    elif current_target == "hashtag-comment":
                        data = requests.get(
                            f"{url_string}hashtag/",
                            params={"target_id": current_id},
                            headers=header,
                        ).json()
                        # perform hashtag function
                        hashtags = data[0]["url"].split("\r\n")
                        comment = target["user_comment"]
                        for current_hashtag in hashtags:
                            status = user_bot.hashtag_postCommenter(current_hashtag, comment)

                    elif current_target == "post-like":
                        data = requests.get(
                            f"{url_string}post/",
                            params={"target_id": current_id},
                            headers=header,
                        ).json()
                        # perform post function
                        urls = data[0]["url"].split("\r\n")
                        for url in urls:
                            if "/p/" in url:
                                status = user_bot.post_liker_url(url)
                            else:
                                username = url.split("/")
                                if username[-1] == "":
                                    username = username[-2]
                                else:
                                    username = username[-1]

                                status = user_bot.post_liker(username)

                    elif current_target == "post-comment":
                        data = requests.get(
                            f"{url_string}post/",
                            params={"target_id": current_id},
                            headers=header,
                        ).json()
                        # perform post function
                        urls = data[0]["url"].split("\r\n")
                        for url in urls:
                            comment = target["user_comment"]
                            if "/p/" in url:
                                status = user_bot.post_comment_url(url, comment)
                            else:
                                username = url.split("/")
                                if username[-1] == "":
                                    username = username[-2]
                                else:
                                    username = username[-1]

                                status = user_bot.post_commenter(username, comment)

                    elif current_target == "comment-like":
                        data = requests.get(
                            f"{url_string}comment/",
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

                            status = user_bot.comment_liker(username)

                    elif current_target == "reels-view":
                        data = requests.get(
                            f"{url_string}reel/",
                            params={"target_id": current_id},
                            headers=header,
                        ).json()
                        # perform post function
                        urls = data[0]["url"].split("\r\n")
                        for url in urls:
                            url = url.replace('/reel/', '/reels/')
                            if "/reels/" in url:
                                status = user_bot.reel_viewer_url(url)
                            else:
                                username = url.split("/")
                                if username[-1] == "":
                                    username = username[-2]
                                else:
                                    username = username[-1]

                                status = user_bot.reel_viewer(username)

                    elif current_target == "reels-like":
                        data = requests.get(
                            f"{url_string}reel/",
                            params={"target_id": current_id},
                            headers=header,
                        ).json()
                        # perform post function
                        urls = data[0]["url"].split("\r\n")
                        for url in urls:
                            url = url.replace('/reel/', '/reels/')
                            if "/reels/" in url:
                                status = user_bot.single_reel_liker(url)
                            else:
                                username = url.split("/")
                                if username[-1] == "":
                                    username = username[-2]
                                else:
                                    username = username[-1]

                                status = user_bot.reel_liker(username)

                    elif current_target == "reels-comment":
                        data = requests.get(
                            f"{url_string}reel/",
                            params={"target_id": current_id},
                            headers=header,
                        ).json()
                        urls = data[0]["url"].split("\r\n")
                        for url in urls:
                            url = url.replace('/reels/', '/reel/')
                            comment = target["user_comment"]
                            if "/reel/" in url:
                                status = user_bot.reel_commenter_url(url, comment)
                            else:
                                username = url.split("/")
                                if username[-1] == "":
                                    username = username[-2]
                                else:
                                    username = username[-1]

                                status = user_bot.reel_commenter(username, comment)

                if status:
                    target["status"] = 2
                else:
                    target["status"] = 0
                update_status = requests.put(
                    f"{url_string}target/{current_id}/",
                    headers=header,
                    data=target,
                )

                insta_account = target["insta_user"]["username"]
                activity_log= {"activity": f"{current_target} for {insta_account}"}
                update_activity = requests.post(
                    f"{url_string}activity-log/",
                    headers= header,
                    data = activity_log,
                )
                print(activity_log["activity"])

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


def daily_update_target():
    resp = requests.get("http://localhost:8000/target-update/")
