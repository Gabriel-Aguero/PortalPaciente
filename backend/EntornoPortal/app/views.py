from flask import jsonify
from flask import jsonify, request
from app.models import Users

def index():
    return jsonify({
        'message':'Hola soy un archivo json'
    })
    
def create_user():
    data = request.json
    new_user = Users(nombre=data['nombre'], correo=data['correo'], password=data['password'], banner=data['banner'])
    new_user.save()
    return jsonify({'message': 'Usuario Creado Correctamente'}), 201
    
def get_all_users():
    users = Users.get_all()
    return jsonify([user.serialize() for user in users])

def get_user(user_id):
    user = Users.get_by_id(user_id)
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    return jsonify(user.serialize())

def update_user(user_id):
    user = Users.get_by_id(user_id)
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    data = request.json
    user.nombre = data['nombre']
    user.correo = data['correo']
    user.password = data['password']
    user.banner = data['banner']
    user.save()
    return jsonify({'message': 'Usuario actualizado correctamente'})

def delete_user(user_id):
    user = Users.get_by_id(user_id)
    if not user:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    user.delete()
    return jsonify({'message': 'Usuario eliminado correctamente'})


