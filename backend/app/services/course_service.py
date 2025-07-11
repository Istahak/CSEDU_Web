from typing import List, Optional
from uuid import UUID
from sqlalchemy.orm import Session
from models.course import Course, CourseSyllabusItem, LearningOutcome, AssessmentMethod, RequiredTextbook
from schemas.requests.course import CourseCreate, CourseUpdate

# CRUD operations for Course

def get_course(db: Session, course_id: UUID) -> Optional[Course]:
    return db.query(Course).filter(Course.id == course_id).first()

def get_course_by_code(db: Session, course_code: str) -> Optional[Course]:
    return db.query(Course).filter(Course.course_code == course_code).first()

def get_courses(db: Session, skip: int = 0, limit: int = 100) -> List[Course]:
    return db.query(Course).offset(skip).limit(limit).all()

def create_course(db: Session, course_in: CourseCreate) -> Course:
    course = Course(
        course_title=course_in.course_title,
        course_code=course_in.course_code,
        intro=course_in.intro,
        credit=course_in.credit,
        duration=course_in.duration,
        instructor_id=course_in.instructor_id,
        instructor_other=course_in.instructor_other,
        schedule=course_in.schedule,
        classroom_id=course_in.classroom_id,
        semester=course_in.semester,
        is_active=course_in.is_active
    )
    # Prerequisites
    if course_in.pre_requisite_ids:
        course.pre_requisites = db.query(Course).filter(Course.id.in_(course_in.pre_requisite_ids)).all()
    # Syllabus Items
    for item in course_in.syllabus_items or []:
        course.syllabus_items.append(CourseSyllabusItem(title=item.title, topic=item.topic))
    # Learning Outcomes
    for outcome in course_in.learning_outcomes or []:
        course.learning_outcomes.append(LearningOutcome(outcome=outcome.outcome))
    # Assessment Methods
    for method in course_in.assessment_methods or []:
        course.assessment_methods.append(AssessmentMethod(method_type=method.method_type, value=method.value))
    # Required Textbooks
    for book in course_in.required_textbooks or []:
        course.required_textbooks.append(RequiredTextbook(title=book.title, author=book.author, edition=book.edition, isbn=book.isbn))
    db.add(course)
    db.commit()
    db.refresh(course)
    return course

def update_course(db: Session, course: Course, course_in: CourseUpdate) -> Course:
    for attr, value in course_in.dict(exclude_unset=True).items():
        if attr == 'pre_requisite_ids' and value is not None:
            course.pre_requisites = db.query(Course).filter(Course.id.in_(value)).all()
        elif attr == 'syllabus_items':
            course.syllabus_items.clear()
            for item in value or []:
                course.syllabus_items.append(CourseSyllabusItem(title=item['title'], topic=item['topic']))
        elif attr == 'learning_outcomes':
            course.learning_outcomes.clear()
            for outcome in value or []:
                course.learning_outcomes.append(LearningOutcome(outcome=outcome['outcome']))
        elif attr == 'assessment_methods':
            course.assessment_methods.clear()
            for method in value or []:
                course.assessment_methods.append(AssessmentMethod(method_type=method['method_type'], value=method['value']))
        elif attr == 'required_textbooks':
            course.required_textbooks.clear()
            for book in value or []:
                course.required_textbooks.append(RequiredTextbook(title=book['title'], author=book.get('author'), edition=book.get('edition'), isbn=book.get('isbn')))
        elif hasattr(course, attr):
            setattr(course, attr, value)
    db.commit()
    db.refresh(course)
    return course

def delete_course(db: Session, course: Course):
    db.delete(course)
    db.commit()
