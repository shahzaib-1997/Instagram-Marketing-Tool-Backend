import time, json, requests
from ast import literal_eval
from selenium import webdriver


class initiatebrowser:
    def get_profiles():
        res = requests.get("http://localhost:35000/profile/all").json()
        profiles = []
        for profile in res["profileData"]:
            profile_id = profile["general_profile_information"]["browser_id"]
            profiles.append(profile_id)
        return profiles

    def stop_driver(profile_id):
        try:
            stop_url = "http://127.0.0.1:35000/profile/stop/" + profile_id
            resp = requests.get(stop_url)

        except Exception as e:
            pass

        time.sleep(6)

    def initiate_driver(profile_id):
        # localhost:35000/profile/launch/{profile_id}/force/cloud

        try:
            stop_url = "http://127.0.0.1:35000/profile/stop/" + profile_id
            resp = requests.get(stop_url)
            print(resp.json())

            incogniton_url = "http://127.0.0.1:35000/automation/launch/python/"

            data = {
                "profileID": profile_id,
                "customArgs": "--disable-notifications",
            }
            for i in range(12):
                try:
                    incomingJson = requests.post(incogniton_url, data).json()

                    if incomingJson["status"] == "ok":

                        python_dict = literal_eval(incomingJson["dataDict"])
                        incomingUrl = incomingJson["url"]
                        driver = webdriver.Remote(
                            command_executor=incomingUrl, options=webdriver.ChromeOptions()
                        )
                        driver.set_page_load_timeout(45)

                        return driver
                except Exception as e:
                    print(e)
        except Exception as e:
            print(f"Error in initiate_driver: {e}")
            return False

    def proxy_change(profile_id):
        user_data = requests.get(
            f"http://localhost:35000/profile/get/{profile_id}"
        ).json()

        url = f"http://localhost:35000/profile/update/"
        data = {
            "profileData": json.dumps(
                {
                    "profile_browser_id": profile_id,
                    "general_profile_information": user_data["profileData"][
                        "general_profile_information"
                    ],
                    "Proxy": {
                        "connection_type": "HTTP proxy",
                        "proxy_url": "",
                        "proxy_username": "",
                        "proxy_password": "",
                        "proxy_rotating": "0",
                    },
                }
            ),
        }
        res = requests.post(url, data=data).json()

        print(res)

        if res["status"] == "ok":
            return True

        return False
