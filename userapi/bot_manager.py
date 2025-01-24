from threading import Lock
import time

class BotManager:
    def __init__(self):
        self._bots = {}
        self._lock = Lock()  # For thread safety
        self._last_access = {}  # Track when bots were last accessed

    def _update_access_time(self, session_id):
        """Updates the last access time for a given session"""
        self._last_access[session_id] = time.time()

    def store_bot(self, session_id, bot):
        with self._lock:
            self._bots[session_id] = bot
            self._update_access_time(session_id)

    def get_bot(self, session_id):
        with self._lock:
            bot = self._bots.get(session_id)
            if bot:
                self._update_access_time(session_id)
            return bot

    def remove_bot(self, session_id):
        with self._lock:
            if session_id in self._bots:
                del self._bots[session_id]
            if session_id in self._last_access:
                del self._last_access[session_id]

    def cleanup_expired_sessions(self, timeout=1800):  # 30 minutes
        """Remove bot instances that haven't been accessed for a while"""
        current_time = time.time()
        cleaned_count = 0
        with self._lock:
            try:
                # Find expired sessions
                expired = [
                    session_id for session_id, last_access
                    in self._last_access.items()
                    if current_time - last_access > timeout
                ]

                # Clean up expired sessions
                for session_id in expired:
                    if session_id in self._bots:
                        try:
                            self._bots[session_id].stop_browser()
                            del self._bots[session_id]
                            cleaned_count += 1
                        except Exception as e:
                            print(f"Error cleaning up bot {session_id}: {e}")
                    del self._last_access[session_id]

                print(f"Cleaned up {cleaned_count} expired bot instances")
            except Exception as e:
                print(f"Error during cleanup: {e}")


# Create a singleton instance
bot_manager = BotManager()