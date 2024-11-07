import requests
import threading
from .instaBot import InstaBot
from datetime import datetime
from userapi.host_url import BASE_URL


def main(url_string, user):
    header = requests.post(f"{url_string}token/", data={"user_id": user}).json()
    targets = requests.get(f"{url_string}target/", headers=header).json()

    for target in targets:
        current_status = target["status"]
        if current_status == 0:
            current_id = target["id"]
            activity_times = requests.get(
                f"{url_string}activity-time/",
                params={"target_id": current_id},
                headers=header,
            ).json()
            for activity_time in activity_times:
                target_day = activity_time["day"]
                current_datetime = datetime.now()

                if target_day == current_datetime.weekday():
                    target_times = activity_time["time"].split(",")
                    for target_time in target_times:

                        if int(target_time.strip()) == current_datetime.hour:
                            target["status"] = 1
                            update_status = requests.put(
                                f"{url_string}target/{current_id}/",
                                headers=header,
                                data=target,
                            )
                            profile_id = target["insta_user"]["profile_id"]
                            # create insta bot object with relevant profile_id
                            user_bot = InstaBot(profile_id)
                            check = user_bot.start_browser()
                            status = False

                            if check:
                                username = target["insta_user"]["username"]
                                password = target["insta_user"]["password"]
                                user_bot.login(username, password)
                                current_target = target["target_type"]
                                urls = target["url"].split("\r\n")
                                for url in urls:
                                    if current_target == "hashtag-like":
                                        status = user_bot.hashtag_postLiker(url)

                                    elif current_target == "hashtag-comment":
                                        comment = target["user_comment"]
                                        status = user_bot.hashtag_postCommenter(
                                            url, comment
                                        )

                                    elif current_target == "post-like":
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
                                        comment = target["user_comment"]
                                        if "/p/" in url:
                                            status = user_bot.post_comment_url(
                                                url, comment
                                            )
                                        else:
                                            username = url.split("/")
                                            if username[-1] == "":
                                                username = username[-2]
                                            else:
                                                username = username[-1]

                                            status = user_bot.post_commenter(
                                                username, comment
                                            )

                                    elif current_target == "comment-like":
                                        username = url.split("/")
                                        if username[-1] == "":
                                            username = username[-2]
                                        else:
                                            username = username[-1]

                                        status = user_bot.comment_liker(username)

                                    elif current_target == "reels-view":
                                        url = url.replace("/reel/", "/reels/")
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
                                        url = url.replace("/reel/", "/reels/")
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
                                        url = url.replace("/reels/", "/reel/")
                                        comment = target["user_comment"]
                                        if "/reel/" in url:
                                            status = user_bot.reel_commenter_url(
                                                url, comment
                                            )
                                        else:
                                            username = url.split("/")
                                            if username[-1] == "":
                                                username = username[-2]
                                            else:
                                                username = username[-1]

                                            status = user_bot.reel_commenter(
                                                username, comment
                                            )

                                    if target["view_story"]:
                                        username = url.split("/")
                                        if username[-1] == "":
                                            username = username[-2]
                                        else:
                                            username = username[-1]
                                        user_bot.story_viewer(username)

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
                            activity_log = {
                                "activity": f"{current_target} for {insta_account}"
                            }
                            update_activity = requests.post(
                                f"{url_string}activity-log/",
                                headers=header,
                                data=activity_log,
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


def fetch_users():
    url_string = BASE_URL
    users = requests.get(f"{url_string}all-users/").json()
    for user in users:
        t = threading.Thread(target=main, args=(url_string, user))
        t.start()


def thread_func():
    s = threading.Thread(target=fetch_users)
    s.start()


def daily_update_target():
    resp = requests.get(f"{BASE_URL}target-update/")
