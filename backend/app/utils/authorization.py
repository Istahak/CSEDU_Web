from fastapi import HTTPException, status
from models.user import User

def is_admin(user: User) -> bool:
    """
    Check if a user has admin role
    """
    if not user or not user.role:
        return False
    return user.role.name.lower() == "admin"

def admin_required(user: User) -> None:
    """
    Verify that the user has admin privileges
    Raises HTTPException if user is not an admin
    """
    if not is_admin(user):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You don't have permission to perform this action. Admin privileges required."
        )
