# Weather Map Application

## Project Mission

The overall goal of this project was to produce a Flask application to render HTML templates and deploy web pages that use Choropleth maps to display the differences in population and precipitation as they vary from state to state.

![Project 3 Flowchart Mk II](https://user-images.githubusercontent.com/72842416/111401356-27bfd880-8697-11eb-84c9-3bf9596d894a.png)

### Web Scraping

Acquired data from US and Census Python libraries alondg with PyPi - scraped data from both a [Wikipedia](https://en.wikipedia.org/wiki/List_of_capitals_in_the_United_States”) site that housed state capitals and their geo-coordinates as well as [US climate data](https://www.usclimatedata.com/climate/) for historical weather data: average high temps, average low temps, and precipitation.

From this juncture, we imported the data into Pandas for cleaning. Once completed, the two dataframes, "US Climate Data" and "State Geo Coordinates" were merged using the "[pd.merge](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.merge.html)" function. Once our master dataframe was formed, it was then converted into a dictionary for data easy manipulation. In order to combine this dictionary and the State Boundary GeoJson file, we unfortunately had to copy and paste our data into the State Boundary GeoJson file, one state at a time.

### Flask

We developed a simple flask application that made route calls to all our applications along with 3 fetch routes that were able to deliver all our GeoJson files into our JavaScript. MongoDB was also utilized in order to store scraped data.

### GeoJson

A state boundary GeoJson file was provided by leaflet to assist in the geometry production for the map we were designing. Midway through, we realized the GeoJson file we were using was not going to work as it was only rendering markers based on state capital coordinates - whereas we required state boundaries based on polygon and multipolygon coordinates. In essence, we had to write a full GeoJson script from scratch.


## Disclaimer

"We once got the Flask app to render the choropleth map, as shown in this screenshot, but due to unknown technical issues it no longer renders. 3/16/2021 we sat with instructor Matt who was unable to identify the issue, even with prior working data from past activities, and have decided to therefore call it a night on this project."






