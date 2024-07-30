from flask import Flask, jsonify 
from flask_sqlalchemy import SQLAlchemy
import numpy as np 
from configORM import ConfigORM
from myRoute import myRoute
from routes.exampleRoute import exampleRoute
from routes.seedDB import seedDatabase
from routes.getPitchesByName import getPitchesByPitcher
from routes.getPitcherByName import getPitcherByName 
from routes.getPitches import getPitches
db = SQLAlchemy()
def createApp(): 
    app = Flask(__name__)
    app.config.from_object(ConfigORM)
    db.init_app(app)
    app.register_blueprint(myRoute, url_prefix='/api')
    app.register_blueprint(exampleRoute, url_prefix='/api')
    app.register_blueprint(seedDatabase, url_prefix='/api')
    app.register_blueprint(getPitchesByPitcher, url_prefix='/api')
    app.register_blueprint(getPitcherByName, url_prefix='/api')
    app.register_blueprint(getPitches, url_prefix='/api')

    with app.app_context(): 
        from models.schema import Player, Pitch 
        db.create_all()
    
    return app 

app = createApp()
if __name__ == "__main__": 
    app.run(debug=True)
