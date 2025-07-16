import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv

# load_dotenv()
from pathlib import Path
load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / ".env")

print("DB_URL from .env:", os.getenv("DB_URL"))

sqlAlchemyDatabaseUrl = os.getenv("DB_URL")

engine = create_engine(sqlAlchemyDatabaseUrl)

SessionLocal = sessionmaker(autocommit =False, autoflush= False, bind= engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
