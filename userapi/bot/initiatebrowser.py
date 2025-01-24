import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from gologin import GoLogin
from dotenv import load_dotenv
import json


load_dotenv()
TOKEN = os.getenv("TOKEN")

chrome_driver_path = "chromedriver.exe"


class InitiateBrowser:
    _instances = {}  # Class variable to store GoLogin instances

    @classmethod
    def stop_driver(cls, profile_id):
        try:
            if profile_id in cls._instances:
                cls._instances[profile_id].stop()
                del cls._instances[profile_id]
        except Exception as e:
            print(f"stop_driver: {e}")

    @classmethod
    def initiate_driver(cls, profile_id, cookies_data=None):
        try:
            # Stop existing instance if any
            cls.stop_driver(profile_id)
            gl = GoLogin(
                {
                    "token": TOKEN,
                    "profile_id": profile_id,
                    "uploadCookiesToServer": True,
                    "writeCookiesFromServer": True,
                    "restore_last_session": True,
                }
            )
            if cookies_data:
                print("Adding cookies")
                try:
                    # Parse JSON string to Python object
                    if isinstance(cookies_data, (str, bytes, bytearray)):
                        cookies = json.loads(cookies_data)
                        print("Cookies parsed")
                    else:
                        cookies = cookies_data

                    # Upload cookies
                    gl.uploadCookies(profile_id, cookies)
                    print("Cookies added")
                except json.JSONDecodeError as e:
                    print(f"Invalid JSON format in file: {e}")
                except Exception as e:
                    print(f"Error processing cookie data: {e}")


            cls._instances[profile_id] = gl  # Store the instance
            debugger_address = gl.start()

            service = Service(executable_path=chrome_driver_path)

            chrome_options = webdriver.ChromeOptions()
            chrome_options.add_experimental_option("debuggerAddress", debugger_address)
            chrome_options.add_argument("--disable-infobars")
            chrome_options.add_argument("--disable-extensions")
            chrome_options.add_argument("--disable-notifications")

            driver = webdriver.Chrome(service=service, options=chrome_options)
            try:
                driver.maximize_window()
            except:
                pass
            return driver
        except Exception as e:
            print(f"Error in initiate_driver: {e}")
            # Make sure to clean up if initialization fails
            cls.stop_driver(profile_id)
            return False
