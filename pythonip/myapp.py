# coding:utf-8

from flask import Flask, jsonify, request
from flask_cors import CORS
from tools import get_ip_info


app = Flask(__name__)
CORS(app=app)


@app.route('/v1/ip/<ip>', methods=['GET'])
def ip(ip):
    if request.method == 'GET':
        if ip:
            data = get_ip_info(ip)
            if data.get("ip"):
                return jsonify(data)
            else:
                return jsonify(data), 400
        else:
            data = {
                'errcode': 1001,
                'errmsg': '输入出错' 
            }
            return jsonify(data), 400


if __name__ == '__main__':
    app.run(
        debug=True
    )