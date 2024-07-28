from flask import Blueprint 

exampleRoute = Blueprint('exampleRoute', __name__)
@exampleRoute.route('/exampleRoute', methods=['GET'])
def handler(): 
    res = {
        "message":"hello world!"
    }
    return res
