import asyncio
from concurrent.futures import ThreadPoolExecutor

from flask import Flask, jsonify, request
from flask_cors import CORS
from GetPictureByName import GetInfoByName

app = Flask(__name__)
CORS(app, resources={r"/get/*": {"origins": "*"}})
executor = ThreadPoolExecutor()



@app.route('/get/InfoByName', methods=['POST'])
def get_nft():
  data = request.get_json()
  if not data or "name" not in data or "id" not in data:
    return jsonify({"error": "Invalid data"}), 400

  name = data["name"]
  id = data["id"]

  return jsonify(GetInfoByName(name, id)), 200

if __name__ == '__main__':
  app.run(debug=False, port=4999, host='0.0.0.0')