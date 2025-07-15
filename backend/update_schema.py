import os
from sqlalchemy import create_engine, text
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from environment
db_url = os.getenv("DB_URL")
print(f"Connecting to database: {db_url}")

# Create engine
engine = create_engine(db_url)

# SQL statements to update the profiles table
sql_statements = [
    "ALTER TABLE profiles ADD COLUMN IF NOT EXISTS full_name VARCHAR;",
    "ALTER TABLE profiles ADD COLUMN IF NOT EXISTS contact_number VARCHAR;",
    "ALTER TABLE profiles ADD COLUMN IF NOT EXISTS reg_no VARCHAR;",
    "ALTER TABLE profiles ADD COLUMN IF NOT EXISTS bio VARCHAR;",
    "ALTER TABLE profiles ADD COLUMN IF NOT EXISTS image_id UUID;",
    "ALTER TABLE profiles ALTER COLUMN full_name DROP NOT NULL;",
    "ALTER TABLE profiles ALTER COLUMN contact_number DROP NOT NULL;"
]

# Execute SQL statements
with engine.connect() as connection:
    for statement in sql_statements:
        try:
            print(f"Executing: {statement}")
            connection.execute(text(statement))
            print("Success!")
        except Exception as e:
            print(f"Error executing statement: {e}")

print("Schema update completed.")
