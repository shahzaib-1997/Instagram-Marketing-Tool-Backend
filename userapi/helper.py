import re


def check_password(password):
    # Check if password is at least 8 characters long
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    # Check if password contains at least 1 uppercase letter
    if not any(char.isupper() for char in password):
        return False, "Password must contain at least 1 uppercase letter"
    
    # Check if password contains at least 1 lowercase letter
    if not any(char.islower() for char in password):
        return False, "Password must contain at least 1 lowercase letter"
    
    # Check if password contains at least 1 digit
    if not any(char.isdigit() for char in password):
        return False, "Password must contain at least 1 digit"
    
    # Check if password contains at least 1 special character
    special_chars = "!@#$%^&*()_-+={}[]|\:;'<>,.?/~`"
    if not any(char in special_chars for char in password):
        return False, "Password must contain at least 1 special character"
    
    # If all requirements are met, return True
    return True, "Password meets all requirements"


def check_email(email):
    emailregix = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

    if(re.match(emailregix, email)):
        return True
    else:
       return False