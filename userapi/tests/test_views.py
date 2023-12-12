from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token


class ViewsTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "username": "testuser",
            "password": "testpassword",
            "email": "test@example.com",
        }
        self.user = User.objects.create_user(**self.user_data)
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        
    def test_signup_view(self):
        data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "Newpassword1.",
        }
        response = self.client.post("/userapi/signup/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["message"], "User registered successfully.")

    def test_login_view(self):
        data = {
            "username": "testuser",
            "password": "testpassword",
        }
        response = self.client.post("/userapi/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["message"], "Login successfully!")
        self.assertEqual(response.data["token"], self.token.key)

    def test_profile_view(self):
        response = self.client.get("/userapi/profile/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "testuser")
        self.assertEqual(response.data["email"], "test@example.com")

    def test_update_profile_view(self):
        data = {"username": "updated", "email": "test@test.com"}
        response = self.client.put("/userapi/profile/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "updated")
        self.assertEqual(response.data["email"], "test@test.com")

    def test_delete_profile_view(self):
        response = self.client.delete("/userapi/profile/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["message"], "User deleted successfully")

    def test_activity_time_view(self):
        response = self.client.post("/userapi/activity-time/")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        activity_time_id = response.data["id"]

        response = self.client.get("/userapi/activity-time/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], activity_time_id)

        response = self.client.put(
            f"/userapi/activity-time/{activity_time_id}/",
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], activity_time_id)

        response = self.client.delete(f"/userapi/activity-time/{activity_time_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["message"], "ActivityTime deleted successfully")

    def test_insta_credential_view(self):
        data = {'username': 'test_username', 'password': 'test_password'}
        response = self.client.post("/userapi/insta-credential/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["username"], "test_username")
        self.assertEqual(response.data["password"], "test_password")
        insta_credential_id = response.data["id"]

        response = self.client.get("/userapi/insta-credential/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], insta_credential_id)

        response = self.client.put(
            f"/userapi/insta-credential/{insta_credential_id}/", 
            {
                'username': 'updated_username',
                'password': 'updated_password'
            }
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "updated_username")
        self.assertEqual(response.data["password"], "updated_password")
        self.assertEqual(response.data["user"], self.user.id)
        self.assertEqual(response.data["id"], insta_credential_id)

        response = self.client.delete(f"/userapi/insta-credential/{insta_credential_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["message"], "Insta Credential deleted successfully")

    def test_hashtag_view(self):
        data = {"hashtag": "test_hashtag"}
        response = self.client.post("/userapi/hashtag/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["hashtag"], "test_hashtag")
        self.assertEqual(response.data["user"], self.user.id)
        hashtag_id = response.data["id"]

        response = self.client.get("/userapi/hashtag/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], hashtag_id)

        response = self.client.put(
            f"/userapi/hashtag/{hashtag_id}/", {"hashtag": "updated_hashtag"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["hashtag"], "updated_hashtag")
        self.assertEqual(response.data["user"], self.user.id)
        self.assertEqual(response.data["id"], hashtag_id)

        response = self.client.delete(f"/userapi/hashtag/{hashtag_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["message"], "Hashtag deleted successfully")

    def test_target_user_view(self):
        data = {"username": "test_username"}
        response = self.client.post("/userapi/target-user/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["username"], "test_username")
        self.assertEqual(response.data["user"], self.user.id)
        target_user_id = response.data["id"]

        response = self.client.get("/userapi/target-user/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], target_user_id)

        response = self.client.put(
            f"/userapi/target-user/{target_user_id}/", {"username": "updated_username"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "updated_username")
        self.assertEqual(response.data["user"], self.user.id)
        self.assertEqual(response.data["id"], target_user_id)

        response = self.client.delete(f"/userapi/target-user/{target_user_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["message"], "Target User deleted successfully")

    def test_post_view(self):
        data = {
            "url": "https://example.com/post",
        }
        response = self.client.post("/userapi/post/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["url"], "https://example.com/post")
        self.assertEqual(response.data["user"], self.user.id)
        post_id = response.data["id"]

        response = self.client.get("/userapi/post/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], post_id)

        response = self.client.put(
            f"/userapi/post/{post_id}/", {"url": "https://example.com/updated-post"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["url"], "https://example.com/updated-post")
        self.assertEqual(response.data["user"], self.user.id)
        self.assertEqual(response.data["id"], post_id)

        response = self.client.delete(f"/userapi/post/{post_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["message"], "Post deleted successfully")

    def test_reel_view(self):
        data = {
            "url": "https://example.com/reel",
        }
        response = self.client.post("/userapi/reel/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["url"], "https://example.com/reel")
        self.assertEqual(response.data["user"], self.user.id)
        reel_id = response.data["id"]

        response = self.client.get("/userapi/reel/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], reel_id)

        response = self.client.put(
            f"/userapi/reel/{reel_id}/", {"url": "https://example.com/updated-reel"}
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["url"], "https://example.com/updated-reel")
        self.assertEqual(response.data["user"], self.user.id)
        self.assertEqual(response.data["id"], reel_id)

        response = self.client.delete(f"/userapi/reel/{reel_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["message"], "Reel deleted successfully")

    def test_activity_log_view(self):
        data = {
            "activity": "Test Activity",
        }
        response = self.client.post("/userapi/activity-log/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["activity"], "Test Activity")
        self.assertEqual(response.data["user"], self.user.id)
        activity_log_id = response.data["id"]

        response = self.client.get("/userapi/activity-log/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], activity_log_id)

        response = self.client.put(
            f"/userapi/activity-log/{activity_log_id}/",
            {"activity": "Updated Activity"},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["activity"], "Updated Activity")
        self.assertEqual(response.data["user"], self.user.id)
        self.assertEqual(response.data["id"], activity_log_id)

        response = self.client.delete(f"/userapi/activity-log/{activity_log_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["message"], "Activity Log deleted successfully")

    def test_stat_view(self):
        data = {
            "followers": 1000,
            "engagement_rate": 2.5,
        }
        response = self.client.post("/userapi/stat/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["followers"], 1000)
        self.assertEqual(response.data["engagement_rate"], 2.5)
        self.assertEqual(response.data["user"], self.user.id)
        stat_id = response.data["id"]

        response = self.client.get("/userapi/stat/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["id"], stat_id)

        response = self.client.put(
            f"/userapi/stat/{stat_id}/",
            {"followers": 1500, "engagement_rate": 3.0},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["followers"], 1500)
        self.assertEqual(response.data["engagement_rate"], 3.0)
        self.assertEqual(response.data["user"], self.user.id)
        self.assertEqual(response.data["id"], stat_id)

        response = self.client.delete(f"/userapi/stat/{stat_id}/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data["message"], "Stat deleted successfully")



"""
Command:

python manage.py test userapi.tests.test_views


Result:

Found 13 test(s).
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
.............
----------------------------------------------------------------------
Ran 13 tests in 9.895s

OK
Destroying test database for alias 'default'...

"""
