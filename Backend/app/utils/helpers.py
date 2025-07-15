"""
Utility functions
"""
import re
from typing import Optional


def is_valid_email(email: str) -> bool:
    """
    Validate email format
    """
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def generate_slug(text: str) -> str:
    """
    Generate URL-friendly slug from text
    """
    # Convert to lowercase and replace spaces with hyphens
    slug = re.sub(r'[^a-zA-Z0-9\s-]', '', text.lower())
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')


def truncate_text(text: str, max_length: int = 100) -> str:
    """
    Truncate text to specified length
    """
    if len(text) <= max_length:
        return text
    return text[:max_length].rstrip() + "..."


def validate_password_strength(password: str) -> dict:
    """
    Validate password strength
    """
    result = {
        "is_valid": True,
        "errors": []
    }
    
    if len(password) < 8:
        result["errors"].append("Password must be at least 8 characters long")
    
    if not re.search(r'[A-Z]', password):
        result["errors"].append("Password must contain at least one uppercase letter")
    
    if not re.search(r'[a-z]', password):
        result["errors"].append("Password must contain at least one lowercase letter")
    
    if not re.search(r'\d', password):
        result["errors"].append("Password must contain at least one digit")
    
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        result["errors"].append("Password must contain at least one special character")
    
    result["is_valid"] = len(result["errors"]) == 0
    return result
