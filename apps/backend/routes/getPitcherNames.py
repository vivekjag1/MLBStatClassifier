from flask import Blueprint, jsonify

getPitcherNames = Blueprint('getPitcherNames', __name__)
@getPitcherNames.route('/getPitcherNames', methods=['GET'])
def handler(): 
    from models.schema import Player, Pitch
    allPlayers = Player.query.all()
    res = [player.pitcherName for player in allPlayers]
    return jsonify(res)