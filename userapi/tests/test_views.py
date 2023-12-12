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

    def test_signup_view(self):
        data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "Newpassword1.",
        }
        response = self.client.post("/userapi/signup/", data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'User registered successfully.')

    def test_login_view(self):
        data = {
            "username": "testuser",
            "password": "testpassword",
        }
        response = self.client.post("/userapi/login/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], 'Login successfully!')
        self.assertEqual(response.data['user'], self.user.id)
        self.assertEqual(response.data["token"], self.token.key)

    def test_profile_view(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response = self.client.get("/userapi/profile/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "testuser")
        self.assertEqual(response.data["email"], "test@example.com")

    def test_update_profile_view(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        data = {"username": "updated", "email": "test@test.com"}
        response = self.client.put("/userapi/profile/", data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], "updated")
        self.assertEqual(response.data["email"], "test@test.com")

    def test_delete_profile_view(self):
        self.client.credentials(HTTP_AUTHORIZATION=f"Token {self.token.key}")
        response = self.client.delete("/userapi/profile/")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data['message'], 'User deleted successfully')

    def test_activity_time_view(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        data = {'time': '2023-12-12T12:00:00'}
        response = self.client.post('/userapi/activity-time/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['time'], '2023-12-12T12:00:00')
        self.assertEqual(response.data['user'], self.user.id)
        activity_time_id = response.data['id']

        response = self.client.get('/userapi/activity-time/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data['id'], activity_time_id)

        response = self.client.put(f'/userapi/activity-time/{activity_time_id}/', {'time': '2023-12-13T12:00:00'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['time'], '2023-12-13T12:00:00')
        self.assertEqual(response.data['user'], self.user.id)
        self.assertEqual(response.data['id'], activity_time_id)

        response = self.client.delete(f'/userapi/activity-time/{activity_time_id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(response.data['message'], 'ActivityTime deleted successfully')

    def test_hashtag_view(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Token {self.token.key}')
        data = {'hashtag': 'test_hashtag'}
        response = self.client.post('/userapi/hashtag/', data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['hashtag'], 'test_hashtag')
        self.assertEqual(response.data['user'], self.user.id)
        hashtag_id = response.data['id']

        response = self.client.get('/userapi/hashtag/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data['id'], hashtag_id)

        response = self.client.put(f'/userapi/hashtag/{hashtag_id}/', {'hashtag': 'updated_hashtag'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.delete(f'/userapi/hashtag/{hashtag_id}/')
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)


"""
Command:

python manage.py test userapi.tests.test_views


Result:



"""
