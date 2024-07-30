from flask import Blueprint, jsonify, request
import numpy as np 
def getPitches(): 
    from models.schema import Player, Pitch
    allPitches = Pitch.query.all()
    pitchList = [pitch.toDict() for pitch in allPitches]
    
