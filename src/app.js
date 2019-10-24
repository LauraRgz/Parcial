import { fetchPeople, fetchFilms } from './fetchdata';
import { GraphQLServer } from 'graphql-yoga'; //npm install graphql-yoga


// rickymorty entry point
const urlFilms = 'https://swapi.co/api/films/';
const urlPeople = 'https://swapi.co/api/people/';

/**
 * Main App
 * @param data all rickyandmorty database
 */
const runApp = (people, films) => {
  const typeDefs=`
    type Character{
      name: String
      genero: String
      url: String
      films: [Film]
    }

    type Film{
      title: String
      episode_id: Int
    }

    type Query{
      people (page: Int, number: Int, name: String, gender: String): [Character]
      character (id: Int!): Character
    }
  `

  const resolvers = {
    Query:{
      people:(parent, args, ctx, info) => {
        const pagina = args.page || 1;
        const paginaSize = args.number || 10;
        const inicio =((pagina-1)* paginaSize);
        const fin = (pagina*paginaSize);
        
        let arrayResults = people.slice();
        
        if(args.name){
          arrayResults = arrayResults.filter(obj => obj.name.includes(args.name));
        }
        if(args.gender){
          arrayResults = arrayResults.filter(obj => obj.gender === args.gender); // === beacuse female includes "male"
        }

        return arrayResults
            .slice(inicio, fin)
            .map(character => {
            return {
              name: character.name,
              genero: character.gender,
              url: character.url
            }
        });
      },
      character:(parent, args, ctx, info) => {
        let result = "";
        let index = args.id;
        let ind = index - 1;
        let pelis = [];
        let p = "";
        
        people.forEach((element,i) => {
          if (i == ind) 
          result = element;
        });
        
        result.films.forEach((elem, i) => {
          pelis = films.find(obj => obj.url.includes(result.films[i]));
        })
        
          return {
            name: result.name,
            genero: result.gender,
            url: result.url,
            title: pelis.title,
            episode: pelis.episode
          }
      
      
        // let result = "";
        // let index = args.id;
        // let ind = index - 1;
        // people.forEach((element,i) => {
        //   if (i == ind) 
        //   result = element;
        // });
        // if(result){
        //   return {
        //     name: result.name,
        //     genero: result.gender,
        //     url: result.url
        //   }
        // }else return null;
      }
    } 
  }
  const server = new GraphQLServer({typeDefs, resolvers});
  server.start(); 
};


// main program
fetchPeople(runApp, urlPeople);
