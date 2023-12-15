import requests
from django.test import TestCase
from rest_framework import status


class ViewsTestCase(TestCase):
    def setUp(self):
        self.api_url = "http://localhost:8088/userapi"  # Update with your API URL
        self.token = "9145bac82cf3a312796dbbd69401e3b7e93144bd"
        self.headers = {"Authorization": f"Token {self.token}"}
        self.id = 1

    def test_signup_view(self):
        data = {
            "username": "test1",
            "email": "test1@example.com",
            "password": "Testpassword1.",
        }
        response = requests.post(f"{self.api_url}/signup/", data=data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["message"], "User registered successfully.")

    def test_login_view(self):
        data = {
            "username": "testuser",
            "password": "Testpassw0rd.",
        }
        response = requests.post(f"{self.api_url}/login/", data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["message"], "Login successfully!")
        self.assertEqual(response.json()["token"], self.token)

    def test_profile_view(self):
        response = requests.get(f"{self.api_url}/profile/", headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["username"], "testuser")
        self.assertEqual(response.json()["email"], "testuser@example.com")

    def test_update_profile_view(self):
        headers = {"Authorization": "Token a33c7d889c8358194dd960a7df2b58165dc37f39"}
        data = {"username": "updated", "email": "test@test.com"}
        response = requests.put(f"{self.api_url}/profile/", data=data, headers=headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["username"], "updated")
        self.assertEqual(response.json()["email"], "test@test.com")

    # def test_delete_profile_view(self):
    #     response = requests.delete(f"{self.api_url}/profile/", headers=self.headers)
    #     self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_password_change_view(self):
        response = requests.post(
            f"{self.api_url}/password-change/",
            data={"new_password": "New_password1"},
            headers=self.headers,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["message"], "Password changed successfully.")

    def test_activity_time_view(self):
        response = requests.post(f"{self.api_url}/activity-time/", headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        activity_time_id = response.json()["id"]

        response = requests.get(f"{self.api_url}/activity-time/", headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["id"], activity_time_id)

        response = requests.put(
            f"{self.api_url}/activity-time/{activity_time_id}/", headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["id"], activity_time_id)

        response = requests.delete(
            f"{self.api_url}/activity-time/{activity_time_id}/", headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_insta_credential_view(self):
        data = {"username": "test_username", "password": "test_password"}
        response = requests.post(
            f"{self.api_url}/credential/", data=data, headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["username"], "test_username")
        self.assertEqual(response.json()["password"], "test_password")
        insta_credential_id = response.json()["id"]

        response = requests.get(
            f"{self.api_url}/credential/", headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["id"], insta_credential_id)

        response = requests.put(
            f"{self.api_url}/credential/{insta_credential_id}/",
            {"username": "updated_username", "password": "updated_password"},
            headers=self.headers,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["username"], "updated_username")
        self.assertEqual(response.json()["password"], "updated_password")
        self.assertEqual(response.json()["id"], insta_credential_id)

        response = requests.delete(
            f"{self.api_url}/credential/{insta_credential_id}/",
            headers=self.headers,
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_hashtag_view(self):
        data = {"hashtag": "test_hashtag", "target": self.id}
        response = requests.post(
            f"{self.api_url}/hashtag/", data=data, headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["hashtag"], "test_hashtag")
        self.assertEqual(response.json()["target"], self.id)
        hashtag_id = response.json()["id"]

        response = requests.get(f"{self.api_url}/hashtag/", headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["id"], hashtag_id)

        put_data = {"hashtag": "updated_hashtag", "target": self.id}
        response = requests.put(
            f"{self.api_url}/hashtag/{hashtag_id}/", data=put_data, headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["hashtag"], "updated_hashtag")
        self.assertEqual(response.json()["target"], self.id)
        self.assertEqual(response.json()["id"], hashtag_id)

        response = requests.delete(
            f"{self.api_url}/hashtag/{hashtag_id}/", headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_target_user_view(self):
        data = {"username": "test_username", "target": self.id}
        response = requests.post(
            f"{self.api_url}/target-user/", data=data, headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["username"], "test_username")
        target_user_id = response.json()["id"]

        response = requests.get(f"{self.api_url}/target-user/", headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["id"], target_user_id)

        response = requests.put(
            f"{self.api_url}/target-user/{target_user_id}/",
            {"username": "updated_username", "target": self.id},
            headers=self.headers,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["username"], "updated_username")
        self.assertEqual(response.json()["id"], target_user_id)

        response = requests.delete(
            f"{self.api_url}/target-user/{target_user_id}/", headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_post_view(self):
        data = {"url": "https://example.com/post", "target": self.id}
        response = requests.post(
            f"{self.api_url}/post/", data=data, headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["url"], "https://example.com/post")
        post_id = response.json()["id"]

        response = requests.get(f"{self.api_url}/post/", headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["id"], post_id)

        response = requests.put(
            f"{self.api_url}/post/{post_id}/",
            {"url": "https://example.com/updated-post", "target": self.id},
            headers=self.headers,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["url"], "https://example.com/updated-post")
        self.assertEqual(response.json()["id"], post_id)

        response = requests.delete(
            f"{self.api_url}/post/{post_id}/", headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_reel_view(self):
        data = {"url": "https://example.com/reel", "target": self.id}
        response = requests.post(
            f"{self.api_url}/reel/", data=data, headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["url"], "https://example.com/reel")
        reel_id = response.json()["id"]

        response = requests.get(f"{self.api_url}/reel/", headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["id"], reel_id)

        response = requests.put(
            f"{self.api_url}/reel/{reel_id}/",
            {"url": "https://example.com/updated-reel", "target": self.id},
            headers=self.headers,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["url"], "https://example.com/updated-reel")
        self.assertEqual(response.json()["id"], reel_id)

        response = requests.delete(
            f"{self.api_url}/reel/{reel_id}/", headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_activity_log_view(self):
        data = {
            "activity": "Test Activity",
        }
        response = requests.post(
            f"{self.api_url}/activity-log/", data=data, headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["activity"], "Test Activity")
        activity_log_id = response.json()["id"]

        response = requests.get(f"{self.api_url}/activity-log/", headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["id"], activity_log_id)

        response = requests.put(
            f"{self.api_url}/activity-log/{activity_log_id}/",
            {"activity": "Updated Activity"},
            headers=self.headers,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["activity"], "Updated Activity")
        self.assertEqual(response.json()["id"], activity_log_id)

        response = requests.delete(
            f"{self.api_url}/activity-log/{activity_log_id}/", headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_stat_view(self):
        data = {
            "followers": 1000,
            "engagement_rate": 2.5,
        }
        response = requests.post(
            f"{self.api_url}/stat/", data=data, headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.json()["followers"], 1000)
        self.assertEqual(response.json()["engagement_rate"], 2.5)
        stat_id = response.json()["id"]

        response = requests.get(f"{self.api_url}/stat/", headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["id"], stat_id)

        response = requests.put(
            f"{self.api_url}/stat/{stat_id}/",
            {"followers": 1500, "engagement_rate": 3.0},
            headers=self.headers,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["followers"], 1500)
        self.assertEqual(response.json()["engagement_rate"], 3.0)
        self.assertEqual(response.json()["id"], stat_id)

        response = requests.delete(
            f"{self.api_url}/stat/{stat_id}/", headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_target_type_view(self):
        post_data = {"type": "option_1"}
        response = requests.post(
            f"{self.api_url}/target-type/", data=post_data, headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        target_type_id = response.json()["id"]

        response = requests.get(f"{self.api_url}/target-type/", headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["id"], target_type_id)

        put_data = {"type": "option_2"}
        response = requests.put(
            f"{self.api_url}/target-type/{target_type_id}/",
            data=put_data,
            headers=self.headers,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["id"], target_type_id)

        response = requests.delete(
            f"{self.api_url}/target-type/{target_type_id}/", headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_target_view(self):
        post_data = {"target_type": "1", "activity_time": "1", "actions": "1"}
        response = requests.post(
            f"{self.api_url}/target/",
            #  data=post_data,
            headers=self.headers,
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        target_id = response.json()["id"]

        response = requests.get(f"{self.api_url}/target/", headers=self.headers)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]["id"], target_id)

        put_data = {"target_type": "4", "activity_time": "7", "actions": "2"}
        response = requests.put(
            f"{self.api_url}/target/{target_id}/",
            # data=put_data,
            headers=self.headers,
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.json()["id"], target_id)

        response = requests.delete(
            f"{self.api_url}/target/{target_id}/", headers=self.headers
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


"""
Command:

python manage.py test userapi.tests.test_views_requests


Result:

Found 15 test(s).
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
...............
----------------------------------------------------------------------
Ran 15 tests in 101.362s

OK
Destroying test database for alias 'default'...
"""
