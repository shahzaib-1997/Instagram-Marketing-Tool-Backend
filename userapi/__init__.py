from apscheduler.schedulers.background import BackgroundScheduler
from .bot.fetch_users import fetch_users
import atexit

# Initialize the scheduler
scheduler = BackgroundScheduler()
scheduler.add_job(fetch_users, "interval", seconds=10)

# Start the scheduler
scheduler.start()
print("process started")

# Register a function to be called on program exit
atexit.register(lambda: scheduler.shutdown())