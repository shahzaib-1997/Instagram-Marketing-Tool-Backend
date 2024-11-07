from django.test import TestCase
from django.contrib.auth.models import User
from userapi.models import (
    ActivityTime,
    Credential,
    ActivityLog,
    Stat,
    Target,
)


class ModelsTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username="testuser", password="testpassword"
        )

    def test_activity_time_model(self):
        activity_time = ActivityTime.objects.create(user=self.user)
        self.assertIsNotNone(activity_time.time)
        self.assertEqual(activity_time.user, self.user)

    def test_insta_credential_model(self):
        insta_credential = Credential.objects.create(
            user=self.user, username="test_username", password="test_password"
        )
        self.assertEqual(insta_credential.user, self.user)
        self.assertEqual(insta_credential.username, "test_username")
        self.assertEqual(insta_credential.password, "test_password")

    def test_activity_log_model(self):
        activity_log = ActivityLog.objects.create(
            user=self.user, activity="test_activity"
        )
        self.assertEqual(activity_log.user, self.user)
        self.assertEqual(activity_log.activity, "test_activity")
        self.assertIsNotNone(activity_log.time_stamp)

    def test_stat_model(self):
        stat = Stat.objects.create(user=self.user, followers=100, engagement_rate=5.0)
        self.assertEqual(stat.user, self.user)
        self.assertEqual(stat.followers, 100)
        self.assertEqual(stat.engagement_rate, 5.0)
        self.assertIsNotNone(stat.time_stamp)

    def test_target_model(self):
        target = Target.objects.create(
            user=self.user,
        )
        self.assertEqual(target.user, self.user)


"""
Command:

python manage.py test userapi.tests.test_models


Result:

Found 11 test(s).
Creating test database for alias 'default'...
System check identified no issues (0 silenced).
...........
----------------------------------------------------------------------
Ran 11 tests in 10.241s

OK
Destroying test database for alias 'default'...
"""
