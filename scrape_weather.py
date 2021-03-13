import pandas as pd

def scrape():

        master_dict = {}

        url1 = "https://en.wikipedia.org/wiki/List_of_capitals_in_the_United_States"
        state_names = pd.read_html(url1)

        state_namesdf = pd.DataFrame(state_names[1])

        states = list(state_namesdf["State"]["State"])
        cities = list(state_namesdf["Capital"]["Capital"])

        #ABOVE ^ we set up empty master_dict, grab a url, get all state names and capital names

        for i in range(0,(len(states)-1)):
                state=states[i]
                state = state.replace(" ", "-").lower()
        
                city=cities[i]
                city = city.replace(" ", "_").lower()
                
                url="https://www.usclimatedata.com/climate/"+city+"/"+state+"/united-states/"
                
                response=pd.read_html(url)
                df0=response[0]
                df1=response[1]
                #ABOVE ^ we are looping through all capitals and states, formatting them to use as variables in URL, and then grabbing the response

                if city == "concord":
                        dict_1 = {
                        "average high" : {
                        "jan" : df0.iloc[0,1],
                        "feb" : df0.iloc[0,2],
                        "mar" : df0.iloc[0,3],
                        "apr" : df0.iloc[0,4],
                        "may" : df0.iloc[0,5],
                        "jun" : df0.iloc[0,6],
                        "jul" : df1.iloc[0,1],
                        "aug" : df1.iloc[0,2],
                        "sep" : df1.iloc[0,3],
                        "oct" : df1.iloc[0,4],
                        "nov" : df1.iloc[0,5],
                        "dec" : df1.iloc[0,6]
                        },
                        "average low" : {
                        "jan" : df0.iloc[1,1],
                        "feb" : df0.iloc[1,2],
                        "mar" : df0.iloc[1,3],
                        "apr" : df0.iloc[1,4],
                        "may" : df0.iloc[1,5],
                        "jun" : df0.iloc[1,6],
                        "jul" : df1.iloc[1,1],
                        "aug" : df1.iloc[1,2],
                        "sep" : df1.iloc[1,3],
                        "oct" : df1.iloc[1,4],
                        "nov" : df1.iloc[1,5],
                        "dec" : df1.iloc[1,6]
                        },
                        "average rain" : {
                        "jan" : df0.iloc[2,1],
                        "feb" : df0.iloc[2,2],
                        "mar" : df0.iloc[2,3],
                        "apr" : df0.iloc[2,4],
                        "may" : df0.iloc[2,5],
                        "jun" : df0.iloc[2,6],
                        "jul" : df1.iloc[2,1],
                        "aug" : df1.iloc[2,2],
                        "sep" : df1.iloc[2,3],
                        "oct" : df1.iloc[2,4],
                        "nov" : df1.iloc[2,5],
                        "dec" : df1.iloc[2,6]
                        },
                        "capital":city,
                        "bitch?":"Yes."
                        }
                else:
                        dict_1 = {
                        "average high" : {
                        "jan" : df0.iloc[0,1],
                        "feb" : df0.iloc[0,2],
                        "mar" : df0.iloc[0,3],
                        "apr" : df0.iloc[0,4],
                        "may" : df0.iloc[0,5],
                        "jun" : df0.iloc[0,6],
                        "jul" : df1.iloc[0,1],
                        "aug" : df1.iloc[0,2],
                        "sep" : df1.iloc[0,3],
                        "oct" : df1.iloc[0,4],
                        "nov" : df1.iloc[0,5],
                        "dec" : df1.iloc[0,6]
                        },
                        "average low" : {
                        "jan" : df0.iloc[1,1],
                        "feb" : df0.iloc[1,2],
                        "mar" : df0.iloc[1,3],
                        "apr" : df0.iloc[1,4],
                        "may" : df0.iloc[1,5],
                        "jun" : df0.iloc[1,6],
                        "jul" : df1.iloc[1,1],
                        "aug" : df1.iloc[1,2],
                        "sep" : df1.iloc[1,3],
                        "oct" : df1.iloc[1,4],
                        "nov" : df1.iloc[1,5],
                        "dec" : df1.iloc[1,6]
                        },
                        "average rain" : {
                        "jan" : df0.iloc[2,1],
                        "feb" : df0.iloc[2,2],
                        "mar" : df0.iloc[2,3],
                        "apr" : df0.iloc[2,4],
                        "may" : df0.iloc[2,5],
                        "jun" : df0.iloc[2,6],
                        "jul" : df1.iloc[2,1],
                        "aug" : df1.iloc[2,2],
                        "sep" : df1.iloc[2,3],
                        "oct" : df1.iloc[2,4],
                        "nov" : df1.iloc[2,5],
                        "dec" : df1.iloc[2,6]
                        },
                        "capital":city
                        }
                master_dict[state]=dict_1
                #ABOVE ^ We are filling up a dictionary variable with all of the capital/state specific data, then pushing it out to master_dict
        from pprint import pprint
        return (master_dict)

