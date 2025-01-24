from dotenv import load_dotenv
import requests, os, traceback, json


load_dotenv()
TOKEN = os.getenv("TOKEN")
API_URL = "https://api.gologin.com/browser"

# Set up the headers with your API token
headers = {
    "Authorization": f"Bearer {TOKEN}",  # Replace with your actual token
    "Content-Type": "application/json",
}


def delete_gologin_profile(profile_id):
    try:
        print("Deleting Profile")
        response = requests.delete(f"{API_URL}/{profile_id}", headers=headers, timeout=30)
        if response.status_code == 204:
            return {"status": True}
        print(f"Failed to delete profile: {response.status_code} - {response.text}")
    except Exception as e:
        print(e)
    return {"status": False}


def get_fingerprint(os="win", resolution="1680x1050"):
    # Define the API endpoint and parameters
    url = f"{API_URL}/fingerprint"
    params = {
        "os": os,
        "resolution": resolution,
    }
    # Make the GET request
    response = requests.get(url, headers=headers, params=params, timeout=30)
    # Check the response
    if response.status_code != 200:
        print(f"Unable to get fingerprint: {response.status_code} - {response.text}")
    return response.json()


def create_profile(profile_name):
    fingerprints = get_fingerprint()
    if "message" in fingerprints:
        print(f"Error getting fingerprints: {fingerprints['message']}")
        return None
    if not isinstance(fingerprints, dict):
        print("Invalid fingerprint data received")
        return None
    fingerprints["navigator"]["language"] = "en-US,en;q=0.9"
    profile = {
        "name": profile_name,
        "notes": "",
        "browserType": "chrome",
        "os": fingerprints["os"],
        "googleServicesEnabled": True,
        "lockEnabled": False,
        "debugMode": False,
        "navigator": fingerprints["navigator"],
        "autoLang": False,
        "geoProxyInfo": {},
        "storage": {
            "local": True,
            "cookies": True,
            "extensions": True,
            "bookmarks": True,
            "history": True,
            "passwords": True,
            "session": True,
        },
        "proxyEnabled": False,  # Specify 'false' if not using proxy
        "proxy": {
            "mode": "none",
        },
        "timezone": {
            "enabled": True,
            "fillBasedOnIp": True,
        },
        "audioContext": {"mode": "noise", "noise": 1},
        "canvas": {"mode": "noise"},
        "fonts": {"families": fingerprints["fonts"]},
        "mediaDevices": fingerprints["mediaDevices"],
        "webRTC": {
            "mode": "disabled",
            "enabled": False,
            "customize": False,
            "localIpMasking": True,
        },
        "clientRects": {"mode": "noise", "noise": 0},
        "webGL": fingerprints["webGL"],
        "webglParams": fingerprints["webglParams"],
    }
    resp = requests.post(API_URL, headers=headers, json=profile)
    print(f"Profile creation response: {resp.text[:500]}")
    print(f"status_code: {resp.status_code}")
    profile_id = resp.json().get("id")
    return profile_id


def add_cookies_to_profile(profile_id: str, cookies_data: str):
    """
    Add cookies to a GoLogin profile

    Args:
        profile_id (str): GoLogin profile ID
        cookies_data (Union[str, List[Dict]]): a JSON string or list of cookie dictionaries

    Returns:
        Dict: Response containing status and message
    """
    try:
        print("Adding cookies")

        # API endpoint
        url = f"https://api.gologin.com/browser/{profile_id}/cookies"

        # Make the request
        response = requests.post(url, headers=headers, json=cookies_data, timeout=30)
        response.raise_for_status()

        print("Cookies added successfully")

        return {
            "status": "success",
            "message": "Cookies added successfully",
        }

    except json.JSONDecodeError as e:
        traceback.print_exc()
        return {
            "status": "error",
            "message": f"Invalid JSON format: {str(e)}",
            "profile_id": profile_id,
        }
    except requests.exceptions.RequestException as e:
        error_message = str(e)
        traceback.print_exc()
        if hasattr(e, "response") and e.response is not None:
            try:
                error_data = e.response.json()
                error_message = error_data.get("message", str(e))
            except:
                pass

        return {"status": "error", "message": error_message, "profile_id": profile_id}
    except Exception as e:
        traceback.print_exc()
        return {"status": "error", "message": str(e), "profile_id": profile_id}
