#models
from server import db 
class Pitch(db.Model):
    __tablename__ = "Pitch"
    pitchID = db.Column(db.Integer, primary_key = True)
    pitcherName = db.Column(db.String(100), db.ForeignKey('Player.name'))
    pitchType = db.Column(db.String(100))
    releaseSpeed = db.Column(db.Float )
    spinRate = db.Column(db.Float)
    movementInches = db.Column(db.Float)
    alanActiveSpinPct = db.Column(db.Float)
    activeSpin = db.Column(db.Float)
    hawkeyeMeasured = db.Column(db.Float)
    movementInferred = db.Column(db.Float)
    def __repr__(self):
        return f'<Pitch from {self.pitcherName}>'
class Player(db.Model):
    __tablename__ = "Player"
    playerID = db.Column(db.Integer, unique=True, primary_key = True)
    name = db.Column(db.String, unique = True)
    handedness = db.Column(db.String)
    def __repr__(self):
        return f'<Pitcher {self.name}>'