import os
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from gologin import GoLogin
from dotenv import load_dotenv


load_dotenv()
TOKEN = os.getenv("TOKEN")

chrome_driver_path = "chromedriver.exe"
gl = None


class initiatebrowser:
    def stop_driver(profile_id):
        try:
            if gl:
                gl.stop()
        except Exception as e:
            print(f"stop_driver: {e}")

    def initiate_driver(profile_id):
        try:
            global gl
            gl = GoLogin(
                {
                    "token": TOKEN,
                    "profile_id": profile_id,
                    "uploadCookiesToServer": True,
                    "writeCookiesFromServer": True,
                    "restore_last_session": True,
                }
            )
            debugger_address = gl.start()
            service = Service(executable_path=chrome_driver_path)
            chrome_options = webdriver.ChromeOptions()
            chrome_options.add_experimental_option("debuggerAddress", debugger_address)
            driver = webdriver.Chrome(service=service, options=chrome_options)
            try:
                driver.maximize_window()
            except:
                pass
            return driver
        except Exception as e:
            print(f"Error in initiate_driver: {e}")
            return False