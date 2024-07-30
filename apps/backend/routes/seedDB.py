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
    with open('./data/allPitches2024.csv') as f: 
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
    ids = []
    for pitch in pitchArray:
        pitcherName =  pitch[1] + ' ' + pitch[0]
        playerID = pitch[2]
        if(playerID in ids): 
            continue
        else: 
            ids.append(playerID)
        handedness = pitch[3]         
        newPlayer = Player(playerID = playerID, name = pitcherName, handedness = handedness)
        db.session.add(newPlayer)
    db.session.commit()
    i = 0
    for pitch in pitchArray: 
        pitcherName =  pitch[1] + ' ' + pitch[0]
        pitchType = pitch[4]
        releaseSpeed = pitch[6]
        spinRate = pitch[7]
        movementInches = pitch[8]
        alanActiveSpinPct = pitch[9]
        activeSpin = pitch[10]
        hawkeyeMeasured = pitch[11]
        movementInferred = pitch[12]
        newPitch = Pitch(pitchID = i, pitcherName = pitcherName, pitchType = pitchType, releaseSpeed = releaseSpeed, spinRate = spinRate, movementInches = movementInches, alanActiveSpinPct = alanActiveSpinPct, activeSpin = activeSpin, hawkeyeMeasured = hawkeyeMeasured, movementInferred = movementInferred)
        db.session.add(newPitch)
        i += 1
    db.session.commit()
    return jsonify(splitArray)