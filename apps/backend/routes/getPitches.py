from flask import Blueprint, jsonify, request
import numpy as np 
getPitches = Blueprint('getPitches', __name__)
@getPitches.route("/getPitches", methods = ['GET'])
def handler(): 
    from models.schema import  Pitch
    allPitches = Pitch.query.all()
    pitchList = [pitch.toDict() for pitch in allPitches]
    return jsonify(pitchList)
