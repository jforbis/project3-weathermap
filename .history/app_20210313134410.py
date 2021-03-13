from flask import Flask, render_template, redirect
import pymongo 
import scrape_weather

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
    
    data = list(col.find())
    print ("squid")
    print (data)
    return render_template("index.html", weather=data)


@app.route("/scrape")
def scrape():

    weather_data = scrape_weather.scrape()
    col.insert(weather_data)
    print("start")
    print (list(col.find()))
    print("finish")
    return redirect("/")

@app.route("/hightemp")
def highmap():
    return render_template("hightemp.html", weather=data)


if __name__ == "__main__":
    app.run(debug=True)


