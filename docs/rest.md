
# StarWars API

- Topics
    - [Introduction](#introduction)
    - [Status codes](#status-codes)
- Resources
    - [People](#people)
    - [Planets](#planets)
    - [Species](#species)
    - [Starships](#starships)
    - [Vehicles](#vehicles)


## Introduction

The StarWars API is organised around [REST](https://en.wikipedia.org/wiki/Representational_state_transfer). Each resource is accessed using a unique URL and we use built-in HTTP features like authentication headers, HTTP verbs and error codes, which are understood by off-the-shelf HTTP clients.

All data is sent and received in [JSON](http://www.json.org/) format. When you make a request that returns a list of resources, then the response includes a "summary" representation of each resource (i.e. a subset of the attributes for that resource). The summary will contain a link to the "detailed" representation which typically includes all of the attributes. 

The examples in this guide use the following endpoint:


```bash
export server=web:3000 && echo http://$server
```

    http://web:3000


Feel free to try any of the sample requests against this environment.


## Status codes

StarWars uses conventional HTTP response codes to indicate the success or failure of an API request. In general, codes in the `2xx` range indicate success, codes in the `4xx` range indicate a validation error with data that has been submitted, and codes in the `5xx` range indicate an error with the server (these are rare).

Codes in the `3xx` range redirect to a different URL, they will be accompanied with a `Location` header which contains the target URL. Clients should assume that any request may result in a redirection.

Codes              | &nbsp;
-------------------|------------
200 - OK           | Everything worked as expected.
201 - Created      | A new resource was created, its URL provided in the `Location` header.
302 - Found        | The request has been temporarily redirected to the URL in the `Location` header.
400 - Bad Request  | The request was unacceptable, often due to missing parameters or validation errors.
404 - Not Found    | The requested resource doesn't exist.
500 - Server Error | Something unexpected went wrong on our end.


## People

An individual person or character within the Star Wars universe.  The API allows you to retrieve an individual person via their unique ID, or list all of the people recorded in the system.

[List people](#list-people) · [Retrieve a person](#retrieve-a-person) · [Retrieve a person's species](#retrieve-a-persons-species) · [Retrieve a person's homeworld](#retrieve-a-persons-homeworld) · [Retrieve a person's starships](#retrieve-a-persons-starships) · [Retrieve a person's vehicles](#retrieve-a-persons-vehicles)

### List people

Retrieves a list of people recorded in the system:

```
http://server/people
    ?name={name}               # filters by the person's name using * as a wildcard
    &birth_year={birth_year}   # filters by the person's birth year
```

List all people whose name ends with "Skywalker":


```bash
curl "http://$server/people?name=*Skywalker"
```

    [
      {
        "name": "Luke Skywalker",
        "gender": "male",
        "birth_year": "19BBY",
        "details_url": "http://web:3000/people/1",
        "species_url": "http://web:3000/people/1/species",
        "homeworld_url": "http://web:3000/people/1/homeworld",
        "starships_url": "http://web:3000/people/1/starships",
        "vehicles_url": "http://web:3000/people/1/vehicles"
      },
      {
        "name": "Anakin Skywalker",
        "gender": "male",
        "birth_year": "41.9BBY",
        "details_url": "http://web:3000/people/11",
        "species_url": "http://web:3000/people/11/species",
        "homeworld_url": "http://web:3000/people/11/homeworld",
        "starships_url": "http://web:3000/people/11/starships",
        "vehicles_url": "http://web:3000/people/11/vehicles"
      },
      {
        "name": "Shmi Skywalker",
        "gender": "female",
        "birth_year": "72BBY",
        "details_url": "http://web:3000/people/43",
        "species_url": "http://web:3000/people/43/species",
        "homeworld_url": "http://web:3000/people/43/homeworld",
        "starships_url": "http://web:3000/people/43/starships",
        "vehicles_url": "http://web:3000/people/43/vehicles"
      }
    ]

List the people born in "19BBY":


```bash
curl "http://$server/people?birth_year=19BBY"
```

    [
      {
        "name": "Luke Skywalker",
        "gender": "male",
        "birth_year": "19BBY",
        "details_url": "http://web:3000/people/1",
        "species_url": "http://web:3000/people/1/species",
        "homeworld_url": "http://web:3000/people/1/homeworld",
        "starships_url": "http://web:3000/people/1/starships",
        "vehicles_url": "http://web:3000/people/1/vehicles"
      },
      {
        "name": "Leia Organa",
        "gender": "female",
        "birth_year": "19BBY",
        "details_url": "http://web:3000/people/5",
        "species_url": "http://web:3000/people/5/species",
        "homeworld_url": "http://web:3000/people/5/homeworld",
        "starships_url": "http://web:3000/people/5/starships",
        "vehicles_url": "http://web:3000/people/5/vehicles"
      }
    ]

### Retrieve a person

Retrieves a detailed view of an individual person.  The URL for the person can be found in the `details_url` attribute from the list above.



```bash
curl "http://$server/people/1"
```

    {
      "id": 1,
      "name": "Luke Skywalker",
      "gender": "male",
      "skin_color": "fair",
      "hair_color": "blond",
      "height": "172",
      "eye_color": "blue",
      "mass": "77",
      "birth_year": "19BBY"
    }

### Retrieve a person's species

Retrieves the details of a person's species.  The URL for the person can be found in the `species_url` attribute from the list above.


```bash
curl "http://$server/people/66/species"
```

    {
      "id": 1,
      "name": "Human",
      "classification": "mammal",
      "designation": "sentient",
      "eye_colors": "brown, blue, green, hazel, grey, amber",
      "skin_colors": "caucasian, black, asian, hispanic",
      "language": "Galactic Basic",
      "hair_colors": "blonde, brown, black, red",
      "homeworld": 9,
      "average_lifespan": "120",
      "average_height": "180"
    }

### Retrieve a person's homeworld

Retrieves the details of a person's homeworld.  The URL can be found in the `homeworld_url` attribute from the list above.


```bash
curl "http://$server/people/1/homeworld"
```

    {
      "id": 1,
      "name": "Tatooine",
      "terrain": "desert",
      "climate": "arid",
      "surface_water": "1",
      "diameter": "10465",
      "rotation_period": "23",
      "gravity": "1 standard",
      "orbital_period": "304",
      "population": "200000"
    }

### Retrieve a person's starships

Retrieves a list of starships that the person has piloted.  The URL can be found in the `starships_url` attribute from the list above.


```bash
curl "http://$server/people/1/starships"
```

    [
      {
        "name": "X-wing",
        "model": "T-65 X-wing",
        "manufacturer": "Incom Corporation",
        "url": "http://web:3000/starships/12"
      },
      {
        "name": "Imperial shuttle",
        "model": "Lambda-class T-4a shuttle",
        "manufacturer": "Sienar Fleet Systems",
        "url": "http://web:3000/starships/22"
      }
    ]

### Retrieve a person's vehicles

Retrieves a list of vehicles that the person has piloted. The URL can be found in the `vehicles_url` attribute from the list above.


```bash
curl "http://$server/people/1/vehicles"
```

    [
      {
        "name": "Snowspeeder",
        "model": "t-47 airspeeder",
        "manufacturer": "Incom corporation",
        "url": "http://web:3000/vehicles/14"
      },
      {
        "name": "Imperial Speeder Bike",
        "model": "74-Z speeder bike",
        "manufacturer": "Aratech Repulsor Company",
        "url": "http://web:3000/vehicles/30"
      }
    ]

## Planets

A large mass, planet or planetoid in the Star Wars Universe, at the time of 0 ABY. The API allows you to retrieve an individual planet via its unique ID, or list all of the planets recorded in the system.

[List planets](#list-planets) · [Retrieve a planet](#retrieve-a-planet) · [Retrieve a planet's people](#retrieve-a-planets-people)

### List planets

Retrieves a list of planets recorded in the system:

```
http://server/planets
    ?name={name}   # filters by the planet's name using * as a wildcard
```

List all planets whose name starts with "Cor":


```bash
curl "http://$server/planets?name=Cor*"
```

    [
      {
        "name": "Coruscant",
        "terrain": "cityscape, mountains",
        "climate": "temperate",
        "details_url": "http://web:3000/planets/9",
        "people_url": "http://web:3000/planets/9/people"
      },
      {
        "name": "Corellia",
        "terrain": "plains, urban, hills, forests",
        "climate": "temperate",
        "details_url": "http://web:3000/planets/22",
        "people_url": "http://web:3000/planets/22/people"
      }
    ]

### Retrieve a planet

Retrieves a detailed view of an individual planet. The URL for the planet can be found in the `details_url` attribute from the list above.


```bash
curl "http://$server/planets/9"
```

    {
      "id": 9,
      "name": "Coruscant",
      "terrain": "cityscape, mountains",
      "climate": "temperate",
      "surface_water": "unknown",
      "diameter": "12240",
      "rotation_period": "24",
      "gravity": "1 standard",
      "orbital_period": "368",
      "population": "1000000000000"
    }

### Retrieve a planet's people

Retrieves a list of people that come from a planet. The URL can be found in the `people_url` attribute from the list above.


```bash
curl "http://$server/planets/22/people"
```

    [
      {
        "name": "Han Solo",
        "gender": "male",
        "birth_year": "29BBY",
        "url": "http://web:3000/people/14"
      },
      {
        "name": "Wedge Antilles",
        "gender": "male",
        "birth_year": "21BBY",
        "url": "http://web:3000/people/18"
      }
    ]

## Species

A type of person or character within the Star Wars Universe. The API allows you to retrieve an individual species via its unique ID, or list all species recorded in the system.

[List species](#list-species) · [Retrieve a species](#retrieve-a-species) · [Retrieve a species' people](#retrieve-a-species-people)

### List species

Retrieves a list of species recorded in the system:

```
http://server/species
    ?name={name}   # filters by the species name using * as a wildcard
```

List all species whose name contains "wo":


```bash
curl "http://$server/species?name=*wo*"
```

    [
      {
        "name": "Wookie",
        "classification": "mammal",
        "designation": "sentient",
        "details_url": "http://web:3000/species/3",
        "people_url": "http://web:3000/species/3/people"
      },
      {
        "name": "Ewok",
        "classification": "mammal",
        "designation": "sentient",
        "details_url": "http://web:3000/species/9",
        "people_url": "http://web:3000/species/9/people"
      }
    ]

### Retrieve a species

Retrieves a detailed view of an individual species. The URL for the species can be found in the `details_url` attribute from the list above.


```bash
curl "http://$server/species/3"
```

    {
      "id": 3,
      "name": "Wookie",
      "classification": "mammal",
      "designation": "sentient",
      "eye_colors": "blue, green, yellow, brown, golden, red",
      "skin_colors": "gray",
      "language": "Shyriiwook",
      "hair_colors": "black, brown",
      "homeworld": 14,
      "average_lifespan": "400",
      "average_height": "210"
    }

### Retrieve a species' people

Retrieves a list of people belonging to the species. The URL can be found in the `people_url` attribute from the list above.


```bash
curl "http://$server/species/3/people"
```

    [
      {
        "name": "Chewbacca",
        "gender": "male",
        "birth_year": "200BBY",
        "url": "http://web:3000/people/13"
      },
      {
        "name": "Tarfful",
        "gender": "male",
        "birth_year": "unknown",
        "url": "http://web:3000/people/80"
      }
    ]

## Starships

A single transport craft that has hyperdrive capability. The API allows you to retrieve an individual starship via its unique ID, or list all of the starships recorded in the system.

[List starships](#list-starships) · [Retrieve a starship](#retrieve-a-starship) · [Retrieve a starship's pilots](#retrieve-a-starships-pilots)

### List starships

Retrieves a list of starships recorded in the system:

```
http://server/starships
    ?name={name}   # filters by the starship's name using * as a wildcard
```

List all starships whose name ends with "wing":


```bash
curl "http://$server/starships?name=*wing"
```

    [
      {
        "name": "Y-wing",
        "model": "BTL Y-wing",
        "manufacturer": "Koensayr Manufacturing",
        "details_url": "http://web:3000/starships/11",
        "pilots_url": "http://web:3000/starships/11/pilots"
      },
      {
        "name": "X-wing",
        "model": "T-65 X-wing",
        "manufacturer": "Incom Corporation",
        "details_url": "http://web:3000/starships/12",
        "pilots_url": "http://web:3000/starships/12/pilots"
      },
      {
        "name": "A-wing",
        "model": "RZ-1 A-wing Interceptor",
        "manufacturer": "Alliance Underground Engineering, Incom Corporation",
        "details_url": "http://web:3000/starships/28",
        "pilots_url": "http://web:3000/starships/28/pilots"
      },
      {
        "name": "B-wing",
        "model": "A/SF-01 B-wing starfighter",
        "manufacturer": "Slayn & Korpil",
        "details_url": "http://web:3000/starships/29",
        "pilots_url": "http://web:3000/starships/29/pilots"
      },
      {
        "name": "V-wing",
        "model": "Alpha-3 Nimbus-class V-wing starfighter",
        "manufacturer": "Kuat Systems Engineering",
        "details_url": "http://web:3000/starships/75",
        "pilots_url": "http://web:3000/starships/75/pilots"
      }
    ]

### Retrieve a starship

Retrieves a detailed view of an individual starship. The URL for the vehicle can be found in the `details_url` attribute from the list above.


```bash
curl "http://$server/starships/12"
```

    {
      "id": 12,
      "name": "X-wing",
      "model": "T-65 X-wing",
      "manufacturer": "Incom Corporation",
      "consumables": "1 week",
      "cargo_capacity": "110",
      "passengers": "0",
      "max_atmosphering_speed": "1050",
      "crew": "1",
      "length": "12.5",
      "cost_in_credits": "149999",
      "MGLT": "100",
      "starship_class": "Starfighter",
      "hyperdrive_rating": "1.0"
    }

### Retrieve a starship's pilots

Retrieves a list of people who have piloted the starship. The URL can be found in the `pilots_url` attribute from the list above.


```bash
curl "http://$server/starships/12/pilots"
```

    [
      {
        "name": "Luke Skywalker",
        "gender": "male",
        "birth_year": "19BBY",
        "url": "http://web:3000/people/1"
      },
      {
        "name": "Biggs Darklighter",
        "gender": "male",
        "birth_year": "24BBY",
        "url": "http://web:3000/people/9"
      },
      {
        "name": "Wedge Antilles",
        "gender": "male",
        "birth_year": "21BBY",
        "url": "http://web:3000/people/18"
      },
      {
        "name": "Jek Tono Porkins",
        "gender": "male",
        "birth_year": "unknown",
        "url": "http://web:3000/people/19"
      }
    ]

## Vehicles

A single transport craft that does not have hyperdrive capability. The API allows you to retrieve an individual vehicle via its unique ID, or list all of the vehicles recorded in the system.

[List vehicles](#list-vehicles) · [Retrieve a vehicle](#retrieve-a-vehicle) · [Retrieve a vehicle's pilots](#retrieve-a-vehicles-pilots)

### List vehicles

Retrieves a list of vehicles recorded in the system:

```
http://server/vehicles
    ?name={name}   # filters by the vehicle's name using * as a wildcard
```

List all vehicles whose name ends with "bike":


```bash
curl "http://$server/vehicles?name=*bike"
```

    [
      {
        "name": "Imperial Speeder Bike",
        "model": "74-Z speeder bike",
        "manufacturer": "Aratech Repulsor Company",
        "details_url": "http://web:3000/vehicles/30",
        "pilots_url": "http://web:3000/vehicles/30/pilots"
      },
      {
        "name": "Zephyr-G swoop bike",
        "model": "Zephyr-G swoop bike",
        "manufacturer": "Mobquet Swoops and Speeders",
        "details_url": "http://web:3000/vehicles/44",
        "pilots_url": "http://web:3000/vehicles/44/pilots"
      },
      {
        "name": "Tsmeu-6 personal wheel bike",
        "model": "Tsmeu-6 personal wheel bike",
        "manufacturer": "Z-Gomot Ternbuell Guppat Corporation",
        "details_url": "http://web:3000/vehicles/60",
        "pilots_url": "http://web:3000/vehicles/60/pilots"
      }
    ]

### Retrieve a vehicle

Retrieves a detailed view of an individual vehicle. The URL for the vehicle can be found in the `details_url` attribute from the list above.


```bash
curl "http://$server/vehicles/30"
```

    {
      "id": 30,
      "name": "Imperial Speeder Bike",
      "model": "74-Z speeder bike",
      "manufacturer": "Aratech Repulsor Company",
      "consumables": "1 day",
      "cargo_capacity": "4",
      "passengers": "1",
      "max_atmosphering_speed": "360",
      "crew": "1",
      "length": "3",
      "cost_in_credits": "8000",
      "vehicle_class": "speeder"
    }

### Retrieve a vehicle's pilots

Retrieves a list of people who have piloted the vehicle. The URL can be found in the `pilots_url` attribute from the list above.


```bash
curl "http://$server/vehicles/30/pilots"
```

    [
      {
        "name": "Luke Skywalker",
        "gender": "male",
        "birth_year": "19BBY",
        "url": "http://web:3000/people/1"
      },
      {
        "name": "Leia Organa",
        "gender": "female",
        "birth_year": "19BBY",
        "url": "http://web:3000/people/5"
      }
    ]
