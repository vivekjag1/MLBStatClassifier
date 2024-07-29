import psycopg2
from psycopg2 import OperationalError

# Replace these variables with your PostgreSQL credentials
HOST = "localhost"
PORT = "5432"  # Default port for PostgreSQL
DATABASE = "postgres"
USER = "postgres"
PASSWORD = "postgres"

def test_connection():
    """Test the connection to the PostgreSQL database"""
    try:
        # Connect to the PostgreSQL server
        connection = psycopg2.connect(
            host=HOST,
            port=PORT,
            dbname=DATABASE,
            user=USER,
            password=PASSWORD
        )

        # Create a cursor object
        cursor = connection.cursor()

        # Execute a test query
        cursor.execute("SELECT version();")
        db_version = cursor.fetchone()
        print(f"Connected to PostgreSQL Database. Version: {db_version[0]}")

        # Close the cursor and connection
        cursor.close()
        connection.close()

    except OperationalError as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    test_connection()
