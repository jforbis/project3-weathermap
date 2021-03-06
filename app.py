from flask import Flask, render_template, redirect
import pymongo 
import scrape_weather

app = Flask(__name__)

conn = "mongodb://localhost:27017"
client = pymongo.MongoClient(conn)
db = client.weather

col = db.data


@app.route("/")
def home():
    
    data = col.find_one()
    return render_template("index.html", weather=data)


@app.route("/scrape")
def scrape():

    weather_data = scrape_weather.scrape()
    col.insert_one(weather_data)
    print("start")
    print (list(col.find()))
    print("finish")
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)


