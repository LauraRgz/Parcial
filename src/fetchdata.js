import request from 'request'; //npm i --save request
import fs from 'fs'; //npm i --save fs
import { runApp } from './app.js';

const fetchFilms = (callback, people, url, films) => {
  if (!films) films = [];
  try{ //Intento leer el archivo
    films = JSON.parse(fs.readFileSync("./films.json").toString());
    callback(people, films);
  }catch(e){
    console.log('fechting films...');
    request({ url, json: true }, (error, response) => {
      if (response.body) {
        films = [...films, ...response.body.results];
      }
      if (response.body.next !== null)
        fetchFilms(callback, people, response.body.next, films);
      else{
        fs.writeFileSync("./films.json", JSON.stringify(films));
        callback(people, films);
      }
    });
  }
}

const fetchPeople = (callback, url, people) => {
  const urlFilms = 'https://swapi.co/api/films/';

  if (!people) people = [];
  try{ //Intento leer el archivo
    people = JSON.parse(fs.readFileSync("./people.json").toString());
    fetchFilms(callback, people, urlFilms);
  }catch(e){
    console.log('fechting people...');
    request({ url, json: true }, (error, response) => {
      if (response.body) {
        people = [...people, ...response.body.results];
      }
      if (response.body.next !== null)
        fetchPeople(callback, response.body.next, people);
      else{
        fs.writeFileSync("./people.json", JSON.stringify(people));
        fetchFilms(callback, people, urlFilms)
      }
    });
  }
}

export {fetchPeople, fetchFilms};
