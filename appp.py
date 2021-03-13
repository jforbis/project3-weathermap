from flask import Flask, render_template, redirect
import pymongo 
import scrape_weather

# Instantiate Flask
app = Flask(__name__)

# Utilize PyMongo to establish a connect to MongoDB
mongo = pymongo(app, uri="mongodb://localhost:27017/weather")

# Store the database in a varaible for reference
col = mongo.data

# Default scrape and CRUD operations
weather_data = scrape_weather.scrape()
from pprint import pprint
pprint(weather_data['alabama'])
col.remove()
col.insert(weather_data)

# Route to render index.html using the data from Mongo
@app.route("/")
def home():
    
    data = list(col.find())
    print ("squid")
    print (data)
    return render_template("index.html", weather=data)

# Route to render scrape route for when button event is triggered
@app.route("/scrape")
def scrape():

    # store scraped data in variable 
    weather_data = scrape_weather.scrape()

    # Update the database with newly scraped data 
    col.collection.update({}, weather_data, upsert=True)

    # print statements to terminal for procedural checks
    print("start")
    print (list(col.find()))
    print("finish")
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
