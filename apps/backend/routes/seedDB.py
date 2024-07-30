from flask import Blueprint, jsonify
import numpy as np 
seedDatabase = Blueprint('seedDB', __name__)
@seedDatabase.route('/seedDB', methods=['GET'])
def parseFile(): 
    from server import db
    from models.schema import Player 
    count = db.session.query(Player).count()
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
    pitchers = []
    tempArray = splitArray.copy()
    for pitch in tempArray:
        pitcherName =  pitch[1] + ' ' + pitch[0]
        if(pitcherName in pitchers): 
            pass 
        else:
            playerID = pitch[2]
            handedness = pitch[3]
            newPlayer = Player(playerID = playerID, name = pitcherName, handedness = handedness)
            pitchers.append(pitcherName)
            db.session.add(newPlayer)
            db.session.commit()
    return jsonify(splitArray)