from typing import List, Optional
from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from models.course import Course
from schemas.requests.course import CourseCreate, CourseUpdate


class CourseService:
    @staticmethod
    def create_course(db: Session, course_data: CourseCreate) -> Course:
        """
        Create a new course in the database
        """
        try:
            # Create new course object
            db_course = Course(
                course_code=course_data.course_code,
                course_title=course_data.course_title,
                instructor_id=course_data.instructor_id,
                credits=course_data.credits,
                semester=course_data.semester,
                year=course_data.year,
                duration=course_data.duration,
                difficulty_level=course_data.difficulty_level,
                description=course_data.description,
                learning_outcomes=course_data.learning_outcomes,
                prerequisites=course_data.prerequisites,
                syllabus_topics=course_data.syllabus_topics,
                schedule=course_data.schedule,
                location=course_data.location,
                max_students=course_data.max_students,
                language=course_data.language,
                department=course_data.department,
                status=course_data.status,
                assessment_methods=course_data.assessment_methods,
                required_textbooks=course_data.required_textbooks,
                references=course_data.references,
                course_image=course_data.course_image
            )
            
            # Add to database
            db.add(db_course)
            db.commit()
            db.refresh(db_course)
            return db_course
            
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Course with code '{course_data.course_code}' already exists"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create course: {str(e)}"
            )
    
    @staticmethod
    def get_all_courses(db: Session, skip: int = 0, limit: int = 100) -> List[Course]:
        """
        Get all courses with pagination
        """
        return db.query(Course).filter(Course.is_active == True).offset(skip).limit(limit).all()
    
    @staticmethod
    def get_course_by_id(db: Session, course_id: int) -> Course:
        """
        Get a specific course by ID
        """
        course = db.query(Course).filter(Course.id == course_id, Course.is_active == True).first()
        if not course:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Course with ID {course_id} not found"
            )
        return course
    
    @staticmethod
    def update_course(db: Session, course_id: int, course_data: CourseUpdate) -> Course:
        """
        Update an existing course
        """
        course = CourseService.get_course_by_id(db, course_id)
        
        # Update course attributes
        update_data = course_data.dict(exclude_unset=True)
        if "instructor_id" in update_data:
            course.instructor_id = update_data.pop("instructor_id")
        for key, value in update_data.items():
            setattr(course, key, value)
        
        try:
            db.commit()
            db.refresh(course)
            return course
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Course with code '{course_data.course_code}' already exists"
            )
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to update course: {str(e)}"
            )
    
    @staticmethod
    def delete_course(db: Session, course_id: int) -> dict:
        """
        Delete a course (soft delete by setting is_active to False)
        """
        course = CourseService.get_course_by_id(db, course_id)
        
        # Soft delete
        course.is_active = False
        
        try:
            db.commit()
            return {"message": f"Course with ID {course_id} has been deleted"}
        except Exception as e:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to delete course: {str(e)}"
            )
