from flask import Blueprint, jsonify
import numpy as np 
seedDatabase = Blueprint('seedDB', __name__)
@seedDatabase.route('/seedDB', methods=['GET'])
def parseFile(): 
    from server import db
    from models.schema import Player, Pitch
    count = db.session.query(Player).count()
    #this route should ONLY run once to prevent PK collisions. 
    if(count > 0): 
        message = {
            "message":"Database is already seeded!"
        }
        return message 
    with open('./data/allPitchMovement24.csv',  encoding='utf-8') as f: 
        allPitches = [i for i in f.readlines() if i!=',']
    allPitches = np.array(allPitches)
    allPitches = allPitches[1:]
    #now we need to split into individual lines 
    splitArray = []
    rowLen = len(allPitches[1])
    for pitch in allPitches:
        thisRow = np.zeros(rowLen)
        thisRow = pitch.split(',')
        #have to handle the first, second, and last items 
        #last 
        lastItem = pitch[-1]
        thisRow[-1] = thisRow[-1].replace('\n', '')
          #first
        thisRow[1] = thisRow[1].replace("\"", '')
        #second
        thisRow[2] = thisRow[2].replace("\"", '').strip()
        splitArray.append(thisRow[1:])
    #now we need to make a list of all the pitchers 
    pitchArray = np.array(splitArray.copy())

    names = []
    for pitch in pitchArray:
        pitcherName =  pitch[1] + ' ' + pitch[0]
        playerID = pitch[2]
        if(pitcherName in names): 
            continue
        else: 
            names.append(pitcherName)
        handedness = pitch[5]    
        team = pitch[4] + ' ' +  pitch[3]     
        newPlayer = Player(playerID = playerID, pitcherName = pitcherName, handedness = handedness, team = team)
        db.session.add(newPlayer)
    db.session.commit()
    i = 0
    pitcherNames = np.zeros((455)) 
    for pitch in pitchArray:
        pitcherName =  pitch[1] + ' ' + pitch[0]
        velocity = pitch[6]
        pitchBreakZ = pitch[13]
        rise = pitch[16]
        pitchBreakX = pitch[17]
        tail = pitch[20]
        pitchType = pitch[12]
        newPitch = Pitch(pitchID = i, pitcherName = pitcherName, velocity = velocity, pitchBreakZ = pitchBreakZ, rise = rise, pitchBreakX = pitchBreakX, tail = tail, pitchType = pitchType)
        db.session.add(newPitch)
        i += 1
    db.session.commit()
    return jsonify(splitArray)