import mysql.connector

# Database connection details
db_endpoint = "petdb.cfcchkqq9yiy.us-east-1.rds.amazonaws.com"
db_name = "petdb"
db_user = "admin"
db_password = "kilo2023"

print("Hello, IWantAPet App!")

try:
    # Connect to the database
    conn = mysql.connector.connect(
        host=db_endpoint,
        database=db_name,
        user=db_user,
        password=db_password
    )
    
    if conn.is_connected():
        print("Database connection successful")
        
        # Perform a test query
        cursor = conn.cursor()
        cursor.execute("SELECT 1")
        result = cursor.fetchone()
        if result:
            print("Test query successful")

        # Close the cursor and connection
        cursor.close()
        conn.close()
    else:
        print("Database connection failed")

except mysql.connector.Error as err:
    print("Error:", err)