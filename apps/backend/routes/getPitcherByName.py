from flask import Blueprint, jsonify, request
import numpy as np 
getPitcherByName = Blueprint('getPitcherByName', __name__)
@getPitcherByName.route('/getPitcherByName/<string:name>', methods=['POST'])
def handler(name): 
    from models.schema import Player, Pitch
    myPlayer = Player.query.filter_by(name = name).first()
    return jsonify(myPlayer.toDict())


