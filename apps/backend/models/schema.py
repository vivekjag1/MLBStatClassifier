#models
from server import db 
class Pitch(db.Model):
    __tablename__ = "Pitch"
    pitchID = db.Column(db.Integer, primary_key = True)
    pitcherName = db.Column(db.String(100), db.ForeignKey('Player.pitcherName'))
    velocity = db.Column(db.Float )
    pitchBreakZ = db.Column(db.Float)
    rise = db.Column(db.Float)
    pitchBreakX = db.Column(db.Float)
    tail = db.Column(db.Float)
    pitchType = db.Column(db.String(100))
    def __repr__(self):
        return f'<Pitch from {self.pitcherName}>'
    def toDict(self): 
        return { 
            "pitchID": self.pitchID, 
            "pitcherName": self.pitcherName, 
            "velocity": self.velocity, 
            "z-break": self.pitchBreakZ,
            "tail": self.tail, 
            "rise": self.rise, 
            "x-break": self.pitchBreakX, 
            "type": self.pitchType
        }
class Player(db.Model):
    __tablename__ = "Player"
    playerID = db.Column(db.Integer, unique=True, primary_key = True)
    pitcherName = db.Column(db.String, unique = True)
    handedness = db.Column(db.String)
    team = db.Column(db.String)
    pitches = db.relationship('Pitch', backref='Player')

    def __repr__(self):
        return f'<Pitcher {self.name}>'
    def toDict(self): 
        # pitches = []
        # for pitch in self.pitches: 
        #     pitches.append(pitch.toDict())

        return{
            "playerID": self.playerID, 
            "pitcherName": self.pitcherName, 
            "handedness": self.handedness, 
            "team": self.team,
        }
    
    