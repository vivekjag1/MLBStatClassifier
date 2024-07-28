from flask import Flask

api = Flask(__name__)

@api.route('/health')
def healthCheck():
    response = {
        "message":"backend healthy!!"
    }

    return response
