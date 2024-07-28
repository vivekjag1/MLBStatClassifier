# blueprints/user_routes.py
from flask import Blueprint



myRoute = Blueprint('myRoute', __name__)

@myRoute.route('/myRoute', methods=['GET'])
def get_users():
    retVal = {
        "message":"Hello, World!"
    }
    return retVal
