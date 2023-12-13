from django.test import TestCase
from django.contrib.auth.models import User
from userapi.models import (
    ActivityTime,
    InstaCredential,
    Hashtag,
    TargetUser,
    Post,
    Reel,
    ActivityLog,
    Stat,
    Target,
    TargetType,
    Action,
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
        insta_credential = InstaCredential.objects.create(
            user=self.user, username="test_username", password="test_password"
        )
        self.assertEqual(insta_credential.user, self.user)
        self.assertEqual(insta_credential.username, "test_username")
        self.assertEqual(insta_credential.password, "test_password")

    def test_hashtag_model(self):
        hashtag = Hashtag.objects.create(user=self.user, hashtag="test_hashtag")
        self.assertEqual(hashtag.user, self.user)
        self.assertEqual(hashtag.hashtag, "test_hashtag")

    def test_target_user_model(self):
        target_user = TargetUser.objects.create(
            user=self.user, username="test_target_user"
        )
        self.assertEqual(target_user.user, self.user)
        self.assertEqual(target_user.username, "test_target_user")

    def test_post_model(self):
        post = Post.objects.create(user=self.user, url="https://example.com")
        self.assertEqual(post.user, self.user)
        self.assertEqual(post.url, "https://example.com")

    def test_reel_model(self):
        reel = Reel.objects.create(user=self.user, url="https://example.com")
        self.assertEqual(reel.user, self.user)
        self.assertEqual(reel.url, "https://example.com")

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

    def test_target_type_model(self):
        target_type = TargetType.objects.create(user=self.user, type="option_1")
        self.assertEqual(target_type.user, self.user)
        self.assertEqual(target_type.type, "option_1")

    def test_action_model(self):
        target_type = TargetType.objects.create(user=self.user, type="option_1")
        action = Action.objects.create(
            user=self.user, type="option_2", action_target_type=target_type
        )
        self.assertEqual(action.user, self.user)
        self.assertEqual(action.type, "option_2")
        self.assertEqual(action.action_target_type, target_type)

    def test_target_model(self):
        target_type = TargetType.objects.create(user=self.user, type="option_1")
        activity_time = ActivityTime.objects.create(user=self.user)
        action = Action.objects.create(
            user=self.user, type="option_2", action_target_type=target_type
        )
        target = Target.objects.create(
            user=self.user,
            target_type=target_type,
            activity_time=activity_time,
            actions=action,
        )
        self.assertEqual(target.user, self.user)
        self.assertEqual(target.target_type, target_type)
        self.assertEqual(target.activity_time, activity_time)
        self.assertEqual(target.actions, action)


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
