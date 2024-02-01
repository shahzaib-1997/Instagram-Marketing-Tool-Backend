import requests, json, time
from .bot.instaBot import InstaBot


def create_profile(profile_name):
    url = "http://localhost:35000/profile/add"

    data = {
        "profileData": json.dumps(
            {
                "general_profile_information": {
                    "profile_name": profile_name,
                    "profile_notes": "",
                    "profile_group": "Unassigned",
                    "profile_last_edited": "",
                    "simulated_operating_system": "Windows",
                }
            }
        )
    }

    res = requests.post(url, data).json()

    print(res)

    return res["profile_browser_id"]


def insta_login(profile_id, username, password):
    user_bot = InstaBot(profile_id)
    user_bot.start_browser()
    time.sleep(5)
    check = user_bot.login(username, password)
    time.sleep(5)
    user_bot.driver.close()
    return check
