from flask import Blueprint, jsonify, request
import numpy as np 
getPitchesByPitcher = Blueprint('getPitchesByPitcher', __name__)
@getPitchesByPitcher.route('/getPitchesByPitcher/<string:name>', methods=['POST'])
def handler(name): 
    from models.schema import Player, Pitch
    myPlayer = Player.query.filter_by(pitcherName = name).first()
    pitches = myPlayer.pitches
    retList = []
    for pitch in pitches: 
        retList.append(pitch.toDict())
    return jsonify(retList)

