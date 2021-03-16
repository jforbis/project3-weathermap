from flask import Flask, render_template, redirect, jsonify, request
import pymongo 
import scrape_weather
import json
from bson import ObjectId
from pprint import pprint

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

app = Flask(__name__)

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
db = client.weather
col = db.data

# weather_data = scrape_weather.scrape()
# from pprint import pprint
# pprint(weather_data['alabama'])
# col.remove()
# col.insert(weather_data)

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/scrape")
def scrape():

    weather_data = scrape_weather.scrape()
    col.insert(weather_data)
    return redirect("/")

@app.route("/maps")
def statemap():
    return render_template("maps.html")

@app.route("/data")
def getdata():
    return render_template("data.html")

@app.route('/state', methods=['GET'])
def testfn():
    # GET request
    data = list(col.find())
    if request.method == 'GET':
        data = JSONEncoder().encode(data)
        message = json.load(open("./static/data/statesData.geojson"))
        return message

# Route for population map
# @app.route('/????', methods=['GET'])
# def testfn():
#     # GET request
#     data = list(col.find())
#     if request.method == 'GET':
#         data = JSONEncoder().encode(data)
#         message = json.load(open("./static/data/statesData.geojson"))
#         return message

@app.route('/master', methods=['GET'])
def testfn2():
    # GET request
    data = list(col.find())
    if request.method == 'GET':
        data = JSONEncoder().encode(data)
        message = json.load(open("./static/data/masterdata.geojson"))
        return message

@app.route('/complete', methods=['GET'])
def testfn3():
    # GET request
    data = list(col.find())
    if request.method == 'GET':
        data = JSONEncoder().encode(data)
        message = json.load(open("./static/data/complete_us.geojson"))
        return message

if __name__ == "__main__":
    app.run(debug=True)


