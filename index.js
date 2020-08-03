const https = require('https');
const http = require('http');
let films = []
let response = []
let filName 
let planets 
let people
let starships

async function searchPlanets(planets){
    
    for(let planet of planets) {
        
        https.get(planet, (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
            data += chunk;
            });


            resp.on('end', () => {
                let planet = JSON.parse(data).results;
                let arrayOfPlanets = []
                for(let eachPlanet of planet){
                    name = eachPlanet['terrain']

                    arrayOfPlanets.push({name: name})
                }
                return arrayOfPlanets
            });

            }).on("error", (err) => {
            console.log("Error: " + err.message);
            });

    }
}

async function runAPI() {

        https.get('https://swapi.dev/api/films/', (resp) => {
            let data = '';

            resp.on('data', (chunk) => {
            data += chunk;
            });


            resp.on('end', () => {
                films = JSON.parse(data).results;
                for(let film of films){
                    filName = film['title'];
                    planets = film['planets'];
                    people = film['characters'];
                    starships =film['starships'];

                    //response['planets'] = searchPlanets(film['planets'])
                    response.push({name: filName, planets: planets, people: people, starships: starships})
                }
                console.log(response)
            });

            }).on("error", (err) => {
            console.log("Error: " + err.message);
            });

}

runAPI();

