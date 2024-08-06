from flask import Blueprint, jsonify

getLeagueLeaders = Blueprint('getLeagueLeaders', __name__)
@getLeagueLeaders.route('/getLeagueLeaders', methods=['GET'])
def handler(): 
    from models.schema import Player, Pitch
    
    maxTail = -100
    
    allPitches = Pitch.query.all()
    velocityLeader = ""
    ZBreakLeader = ""
    RiseLeader = ""
    XBreakLeader = ""
    TailLeader = ""
    maxVelo = -100
    maxZ = -100
    maxRise = -100
    maxX = -100
    maxTail = -100
    for pitch in allPitches: 
        if(pitch.velocity > maxVelo ): 
            maxVelo = pitch.velocity
            velocityLeader = pitch.pitcherName 
        if(pitch.pitchBreakZ > maxZ ): 
            maxZ = pitch.pitchBreakZ
            ZBreakLeader = pitch.pitcherName 
        if(pitch.rise > maxRise ): 
            maxRise = pitch.rise
            RiseLeader = pitch.pitcherName 
        if(pitch.pitchBreakX > maxX ): 
            maxX = pitch.pitchBreakX
            XBreakLeader = pitch.pitcherName 
        if(pitch.tail > maxTail ): 
            maxTail = pitch.tail
            TailLeader = pitch.pitcherName 
    retVal = {
        "players": [velocityLeader, ZBreakLeader, RiseLeader, XBreakLeader, TailLeader], 
        "stats":[maxVelo, maxZ, maxRise, maxX, maxTail]
       
    }
            
    return jsonify(retVal)



