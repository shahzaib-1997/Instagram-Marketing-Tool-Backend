from apscheduler.schedulers.background import BackgroundScheduler
from userapi.bot.fetch_users import thread_func, daily_update_target
from userapi.bot.profileScrapper import get_profile_data
import atexit


def start_scheduler():
    try:
        # Initialize the scheduler
        print("Initializing scheduler...")
        scheduler = BackgroundScheduler()

        scheduler.add_job(
            daily_update_target,
            "interval",
            hours=1,
            max_instances=1,  # Prevent overlapping
            coalesce=True,  # Combine missed runs
        )
        scheduler.add_job(thread_func, "interval", hours=1, coalesce=True)

        # Schedule the second function to run once a day at a specific time
        # For example, let's say you want it to run every day at 5 AM
        scheduler.add_job(
            get_profile_data, "cron", hour=5, max_instances=1, coalesce=True
        )

        # Start the scheduler
        print("Starting scheduler...")
        scheduler.start()
        print("Scheduler started successfully!")

        def cleanup():
            if scheduler.running:
                print("Shutting down scheduler...")
                scheduler.shutdown()

        # Register a function to be called on program exit
        atexit.register(cleanup)
    except Exception as e:
        print(f"Error starting scheduler: {str(e)}")
