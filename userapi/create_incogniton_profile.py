import requests, json

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
