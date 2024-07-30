from flask import Flask
from flask_sqlalchemy import SQLAlchemy

api = Flask(__name__)
from myRoute import myRoute
from routes.exampleRoute import exampleRoute
from routes.seedDB import seedDatabase
from configORM import ConfigORM
api.config.from_object(ConfigORM)   
api.register_blueprint(myRoute, url_prefix='/api')
api.register_blueprint(exampleRoute, url_prefix='/api')
api.register_blueprint(seedDatabase, url_prefix='/api')
client = SQLAlchemy(api)


@api.route('/health')
def healthCheck():
    response = {
        "message":"backend healthy!!"
    }
    return response
#models 

    




# class Pitcher(client.model): 
#     playerID = client.Column(client.Integer, primary_key = True)







if __name__ == '__main__':
    api.run(debug=True)