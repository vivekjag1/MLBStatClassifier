#models
from server import db 
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
class Player(db.Model):
    __tablename__ = "Player"
    playerID = db.Column(db.Integer, unique=True, primary_key = True)
    name = db.Column(db.String, unique = True)
    handedness = db.Column(db.String)
    def __repr__(self):
        return f'<Pitcher {self.name}>'