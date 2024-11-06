import time, json, requests
from ast import literal_eval
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from gologin import GoLogin
from sys import platform

if platform == "linux" or platform == "linux2":
    chrome_driver_path = "./chromedriver"
elif platform == "darwin":
    chrome_driver_path = "./mac/chromedriver"
elif platform == "win32":
    chrome_driver_path = "chromedriver.exe"


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
            print(e)

        time.sleep(6)

    def initiate_driver(profile_id):
        # localhost:35000/profile/launch/{profile_id}/force/cloud

        try:
            gl = GoLogin(
                {
                    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzJhYTk1MDUzOTY4MzFkMjYxOWQ2MzQiLCJ0eXBlIjoiZGV2Iiwiand0aWQiOiI2NzJhYWJiMjRjMjQ2MmNhMDBiZTc4NTEifQ.hsp-WTRcol0UDv8so1S8-OzTPBLNMu15JgLHInT-JGg",
                    "profile_id": profile_id,
                }
            )
            debugger_address = gl.start()
            service = Service(executable_path=chrome_driver_path)
            chrome_options = webdriver.ChromeOptions()
            chrome_options.add_experimental_option("debuggerAddress", debugger_address)
            driver = webdriver.Chrome(service=service, options=chrome_options)
            driver.maximize_window()
            return driver
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
