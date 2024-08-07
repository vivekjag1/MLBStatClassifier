from flask import Blueprint, jsonify

getAllPitchers = Blueprint('getAllPitchers', __name__)
@getAllPitchers.route('/getAllPitchers', methods=['GET'])
def handler(): 
    from models.schema import Player, Pitch
    allPlayers = Player.query.all()
    res = [player.toDict() for player in allPlayers]
    return jsonify(res)