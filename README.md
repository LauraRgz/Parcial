# Parcial

## Project


## Getting Started

### Installation
1. Install NPM packages
```
npm install
```
2. Start
```
npm start
```
3. Url
**127.0.0.1:4000**

### Usage
Data types and queries:
#### Types
##### Character
```
 type Character{
      name: String
      genero: String
      url: String
    }
```
##### Film
```
 type Film{
      title: String
      episode_id: Int
    }
```

#### Queries
##### people
* Schema
```
people(page: Int, number: Int, name: String, gender: String): [Character]
```
* Query
```
query{
  people(page: 2, number: 3, name: "a", gender: "male" ){
    name
    genero
    url
  }
}

```

##### character
* Schema
```
character(id: Int!): Character
```

* Query
```
query{
  character(id: 1){
    name
    genero
    url
  }
}

query{
  character(id: 1){
    name
    genero
   	films{
      title
      episode_id
    }
  }
}

```

## Built With
* [graphql-yoga](https://www.npmjs.com/package/graphql-yoga)
* [SWAPI](https://swapi.co/)
