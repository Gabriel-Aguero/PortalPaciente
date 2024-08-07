from flask import Flask
from flask_cors import CORS
from app.database import init_app
from app.views import *

app= Flask(__name__)
# Inicializar la base de datos con la aplicación Flask
init_app(app)
#permitir solicitudes desde un origen específico
CORS(app)
#permitir solicitudes desde un origen específico
#CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5000"}})

# Rutas para el CRUD de la entidad Usuarios
app.route('/',methods=['GET'])(index)
app.route('/api/users/', methods=['POST'])(create_user)
app.route('/api/users/', methods=['GET'])(get_all_users)
app.route('/api/users/<int:user_id>', methods=['GET'])(get_user)
app.route('/api/users/<int:user_id>', methods=['PUT'])(update_user)
app.route('/api/users/<int:user_id>', methods=['DELETE'])(delete_user)

if __name__=='__main__':
    app.run(debug=True)

