# import sqlite3

# conn = sqlite3.connect('Reviews.db')
# cursor = conn.cursor()

# try:
# 	cursor.execute("DROP TABLE Reviews;")
# except sqlite3.OperationalError:
# 	pass # Table might not exist. Just pass.

# conn.commit()
# conn.close()