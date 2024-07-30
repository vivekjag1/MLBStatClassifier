from flask import Flask
from flask_sqlalchemy import SQLAlchemy

api = Flask(__name__)
from myRoute import myRoute
from routes.exampleRoute import exampleRoute
from routes.seedDB import seedDatabase
from configORM import ConfigORM
api.config['SQLALCHEMY_DATABASE_URI'] = ConfigORM.SQLALCHEMY_DATABASE_URI
api.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(api)


api.register_blueprint(myRoute, url_prefix='/api')
api.register_blueprint(exampleRoute, url_prefix='/api')
api.register_blueprint(seedDatabase, url_prefix='/api')


#tables 
class Player(db.Model): 
    __tablename__ = "Player"
    playerID = db.Column(db.Integer, unique=True, primary_key = True)
    name = db.Column(db.String, unique = True)
    handedness = db.Column(db.String)
    def __repr__(self):
        return f'<Pitcher {self.name}>'
class Pitch(db.Model): 
    __tablename__ = "Pitch"
    pitcherName = db.Column(db.String(100), db.ForeignKey('Player.name'), primary_key = True)
    pitchType = db.Column(db.String(100), primary_key=True)
    releaseSpeed = db.Column(db.Integer)
    spinRate = db.Column(db.Integer)
    movementInches = db.Column(db.Integer)
    alanActiveSpinPct = db.Column(db.Integer)
    activeSpin = db.Column(db.Integer)
    hawkeyeMeasured = db.Column(db.Integer)
    movementInferred = db.Column(db.Integer)
    def __repr__(self):
        return f'<Pitch from {self.pitcherName}>'
    
@api.route('/initDB')
def initDB(): 
    with api.app_context(): 
        db.create_all()
    return "Success!"


    
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