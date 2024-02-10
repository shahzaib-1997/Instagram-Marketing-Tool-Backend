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

    def stop_driver(incogniton_profile_id):
        try:
            stop_url = "http://127.0.0.1:35000/profile/stop/" + incogniton_profile_id
            resp = requests.get(stop_url)

        except Exception as e:
            pass

        time.sleep(6)

    def initiate_driver(incogniton_profile_id):
        # localhost:35000/profile/launch/{profile_id}/force/cloud

        try:
            stop_url = "http://127.0.0.1:35000/profile/stop/" + incogniton_profile_id
            resp = requests.get(stop_url)
            print(resp.json())
        except Exception as e:
            print("Failed to stop")

        incogniton_url = "http://127.0.0.1:35000/automation/launch/python/"
        time.sleep(6)

        data = {"profileID": incogniton_profile_id}
        for i in range(12):
            try:
                resp = requests.post(incogniton_url, data)
                incomingJson = resp.json()

                python_dict = literal_eval(incomingJson["dataDict"])
                options = webdriver.ChromeOptions()
                options.add_argument("--disable-browser-side-navigation")
                driver = webdriver.Remote(
                    command_executor=incomingJson["url"], options=options
                )

                time.sleep(2)

                # driver.get("https://www.incogniton.com")
                return driver
            except Exception as e:
                print(e)
                continue

    def proxy_change(profile_id):
        user_data = requests.get(
            f"http://localhost:35000/profile/get/{profile_id}"
        ).json()

        url = f"http://localhost:35000/profile/update/"
        data = {
            "profileData": json.dumps(
                {
                    "profile_browser_id": profile_id,
                    "general_profile_information": user_data["profileData"]["general_profile_information"],
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

        if  res["status"] == "ok":
            return True

        return False
    