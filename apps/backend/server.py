from flask import Flask

api = Flask(__name__)
from myRoute import myRoute
from routes.exampleRoute import exampleRoute





api.register_blueprint(myRoute, url_prefix='/api')

api.register_blueprint(exampleRoute, url_prefix='/api')

@api.route('/health')
def healthCheck():
    response = {
        "message":"backend healthy!!"
    }
    return response
if __name__ == '__main__':
    api.run(debug=True)