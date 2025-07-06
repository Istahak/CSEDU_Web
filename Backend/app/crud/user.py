from typing import Optional, List
from sqlalchemy.orm import Session

from app.core.security import get_password_hash, verify_password
from app.models.user import User, UserRole
from app.schemas.user import UserCreate, UserUpdate


class UserCRUD:
    """
    CRUD operations for User model.
    """
    
    @staticmethod
    def get_by_id(db: Session, user_id: int) -> Optional[User]:
        """
        Get a user by ID.
        
        Args:
            db: Database session
            user_id: User ID
            
        Returns:
            User object if found, None otherwise
        """
        return db.query(User).filter(User.id == user_id).first()
    
    @staticmethod
    def get_by_email(db: Session, email: str) -> Optional[User]:
        """
        Get a user by email.
        
        Args:
            db: Database session
            email: User email
            
        Returns:
            User object if found, None otherwise
        """
        return db.query(User).filter(User.email == email).first()
    
    @staticmethod
    def get_by_username(db: Session, username: str) -> Optional[User]:
        """
        Get a user by username.
        
        Args:
            db: Database session
            username: Username
            
        Returns:
            User object if found, None otherwise
        """
        return db.query(User).filter(User.username == username).first()
    
    @staticmethod
    def get_all(db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        """
        Get all users with pagination.
        
        Args:
            db: Database session
            skip: Number of records to skip
            limit: Maximum number of records to return
            
        Returns:
            List of User objects
        """
        return db.query(User).offset(skip).limit(limit).all()
    
    @staticmethod
    def create(db: Session, user_in: UserCreate) -> User:
        """
        Create a new user.
        
        Args:
            db: Database session
            user_in: User creation data
            
        Returns:
            Created User object
        """
        db_user = User(
            email=user_in.email,
            username=user_in.username,
            hashed_password=get_password_hash(user_in.password),
            full_name=user_in.full_name,
            role=user_in.role
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def update(db: Session, db_user: User, user_in: UserUpdate) -> User:
        """
        Update a user.
        
        Args:
            db: Database session
            db_user: Existing user object
            user_in: User update data
            
        Returns:
            Updated User object
        """
        update_data = user_in.dict(exclude_unset=True)
        
        if "password" in update_data and update_data["password"]:
            update_data["hashed_password"] = get_password_hash(update_data.pop("password"))
        
        for field, value in update_data.items():
            setattr(db_user, field, value)
        
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    
    @staticmethod
    def delete(db: Session, db_user: User) -> None:
        """
        Delete a user.
        
        Args:
            db: Database session
            db_user: User object to delete
        """
        db.delete(db_user)
        db.commit()
    
    @staticmethod
    def authenticate(db: Session, username: str, password: str) -> Optional[User]:
        """
        Authenticate a user.
        
        Args:
            db: Database session
            username: Username
            password: Plain password
            
        Returns:
            User object if authentication successful, None otherwise
        """
        user = UserCRUD.get_by_username(db, username)
        if not user:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user
    
    @staticmethod
    def is_active(user: User) -> bool:
        """
        Check if a user is active.
        
        Args:
            user: User object
            
        Returns:
            True if user is active, False otherwise
        """
        return user.is_active


user_crud = UserCRUD()
