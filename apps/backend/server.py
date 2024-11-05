from flask import Flask, jsonify 
from flask_sqlalchemy import SQLAlchemy
import numpy as np 
from flask_cors import CORS

from configORM import ConfigORM
from myRoute import myRoute
from routes.exampleRoute import exampleRoute
from routes.seedDB import seedDatabase
from routes.getPitchesByName import getPitchesByPitcher
from routes.getPitcherByName import getPitcherByName 
from routes.getPitches import getPitches
from routes.buildArrays import buildArrays
from routes.makeClassification import makeClassification
from routes.getAverages import getAverages
from routes.getLeagueLeaders import getLeagueLeaders
from routes.getAllPitchers import getAllPitchers
from routes.getPitcherNames import getPitcherNames
from flask_migrate import Migrate
db = SQLAlchemy()
migrate = Migrate()
def createApp(): 
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(ConfigORM)
    db.init_app(app)
    migrate.init_app(app, db)
    app.register_blueprint(myRoute, url_prefix='/api')
    app.register_blueprint(exampleRoute, url_prefix='/api')
    app.register_blueprint(seedDatabase, url_prefix='/api')
    app.register_blueprint(getPitchesByPitcher, url_prefix='/api')
    app.register_blueprint(getPitcherByName, url_prefix='/api')
    app.register_blueprint(getPitches, url_prefix='/api')
    app.register_blueprint(buildArrays, url_prefix='/api')
    app.register_blueprint(makeClassification, url_prefix = '/api')
    app.register_blueprint(getAverages, url_prefix = "/api")
    app.register_blueprint(getLeagueLeaders, url_prefix="/api")
    app.register_blueprint(getAllPitchers, url_prefix="/api")
    app.register_blueprint(getPitcherNames, url_prefix = "/api")
    
    with app.app_context(): 
        from models.schema import Player, Pitch 
        db.create_all()
    
    return app 

app = createApp()
if __name__ == "__main__": 
    app.run(debug=True)
