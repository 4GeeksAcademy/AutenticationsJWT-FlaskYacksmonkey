from flask import Blueprint, request, jsonify, url_for
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException, hash_password, verify_password
from flask_cors import CORS

api = Blueprint('api', __name__)

CORS(api)


# Auth Endpoints Unificados


@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email', '').lower().strip()
    password = data.get('password', '')

    if not email or not password:
        raise APIException("Email y contraseña requeridos", status_code=400)

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException("Este email ya está registrado", status_code=409)

    user = User(email=email, password=hash_password(password), is_active=True)
    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "Usuario creado correctamente"}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', '').lower().strip()
    password = data.get('password', '')

    user = User.query.filter_by(email=email).first()
    if not user or not verify_password(user.password, password):
        raise APIException("Credenciales inválidas", status_code=401)

    token = create_access_token(identity=str(user.id))
    return jsonify({
        "access_token": token,
        "token_type": "Bearer"
    }), 200


@api.route('/me', methods=['GET'])
@jwt_required()
def me():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify(user.serialize()), 200


@api.route('/private', methods=['GET'])
@jwt_required()
def private_route():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    return jsonify({"msg": f"Bienvenido {user.email}, esta es una ruta privada 🔐"}), 200


# Hello & Sitemap

@api.route('/hello', methods=['GET'])
def handle_hello():
    return jsonify({
        "message": "Hello! I'm a message that came from the backend, check the network tab on the Google inspector"
    }), 200
