import requests
import random
import time
from .instaBot import InstaBot
from datetime import datetime


def fetch_users():
    users = requests.get("http://127.0.0.1:8000/all-users/").json()
    for user in users:
   
        header = requests.post("http://127.0.0.1:8000/token/", data={"user_id": user}).json()
        targets = requests.get("http://127.0.0.1:8000/target/", headers=header).json()
        insta_credentials = requests.get("http://127.0.0.1:8000/credential/", data={"user_id": user}, headers=header).json()
        while True:
            for current_user in insta_credentials:
                profile_id = current_user["profile_id"]
                #create insta bot object with relevant profile_id     
                user_bot = InstaBot(profile_id)
        

                for target in targets:
                    current_id = target["id"]
                    current_target = target["target_type"]["type"]
                    target_time = target["activity_time"]["time"].split("T")
                    target_date = target_time[0]
                    temp = target_time[1].split(":")
                    target_time = target_date+"T"+temp[0]+":"+temp[1]
                    updated_target_time = datetime.strptime(target_time, "%Y-%m-%dT%H:%M")
                    current_time = datetime.now()
                    current_status = target["status"]

                    # print(updated_target_time)
                    # print(current_time)

           
                    if updated_target_time.hour == current_time.hour and updated_target_time.minute==current_time.minute:
                        print("Time Matched")
                        if current_status == 0:
                            user_bot.start_browser()
                            target["status"] = 1
                            update_status = requests.put(f"http://127.0.0.1:8000/target/{current_id}/", headers=header, data=target)
                            if current_target == "hashtags":
                                data = requests.get("http://127.0.0.1:8000/hashtag/", params={"target_id": current_id}, headers=header).json()
                                #perform hashtag function
                                for current in data:
                                    current_hashtag = current['hashtag']
                                    user_bot.hashtag_postLiker(current_hashtag)
                                    random_sleep()
                                    user_bot.hashtag_postCommenter(current_hashtag)
                                    random_sleep()
                                    user_bot.hashtag_postLike_scrapper(current_hashtag)
                                    random_sleep()
                                    

                            elif current_target == "posts":
                                data = requests.get("http://127.0.0.1:8000/post/", params={"target_id": current_id}, headers=header).json()
                                #perform post function
                                for post_url in data:
                                    url = post_url["url"]
                                    username = url.split("/")
                                    if username[-1]=="":
                                        username = username[-2]
                                    else:
                                        username = username[-1]

                                    user_bot.post_liker(username)
                                    random_sleep()
                                    user_bot.post_commenter(username)
                                    random_sleep()
                                    user_bot.comment_liker(username)
                                    random_sleep()
                                    user_bot.reel_viewer(username)
                                    random_sleep()
                                    user_bot.reel_liker(username)
                                    random_sleep()
                                    user_bot.reel_commenter(username)
                                    random_sleep()
                                                        

                            elif current_target == "reels":
                                data = requests.get("http://127.0.0.1:8000/reel/", params={"target_id": current_id}, headers=header).json()
                                #perform reels function
                                for reel_url in data:
                                    url = reel_url["url"]
                                    user_bot.single_reel_liker(url)
                                    random_sleep()    

                            target["status"] = 2
                            update_status = requests.put(f"http://127.0.0.1:8000/target/{current_id}/", headers=header, data=target)
                        
                        elif current_status == 1:
                            print("The program is currently running")

                        elif current_status == 2:
                            print("The target is already fullfilled")  

                        try:
                            user_bot.driver.close()
                        except:
                            pass
                

def random_sleep():
    random_time = random.randint(4, 15)
    return time.sleep(random_time)

