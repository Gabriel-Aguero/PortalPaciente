from app.database import get_db

class Users:
    def __init__(self, id_user=None, nombre=None, correo=None, password=None, banner=None):
        self.id_user = id_user
        self.nombre = nombre
        self.correo = correo
        self.password = password
        self.banner = banner

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_user:
            cursor.execute("""
                UPDATE users SET nombre = %s, correo = %s, password = %s, banner = %s
                WHERE id_user = %s
            """, (self.nombre, self.correo, self.password, self.banner, self.id_user))
        else:
            cursor.execute("""
                INSERT INTO users (nombre, correo, password, banner) VALUES (%s, %s, %s, %s)
            """, (self.nombre, self.correo, self.password, self.banner))
            self.id_user = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users")
        rows = cursor.fetchall()
        users = [Users(id_user=row[0], nombre=row[1], correo=row[2], password=row[3], banner=row[4]) for row in rows]
        cursor.close()
        return users

    @staticmethod
    def get_by_id(user_id):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM users WHERE id_user = %s", (user_id,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Users(id_user=row[0], nombre=row[1], correo=row[2], password=row[3], banner=row[4])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM users WHERE id_user = %s", (self.id_user,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id_user': self.id_user,
            'nombre': self.nombre,
            'correo': self.correo,      
            'password': self.password,                        
            'banner': self.banner
        }