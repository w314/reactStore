# Tutorial
Step by step guide to create rStore

## Setup Project
```bash
# create
yarn create vite
# setup git
git init
# start
yarn run dev
```

## Create Product Model
```bash
mkdir src/models
touch src/models/ProductModel.ts
```
`src/models/ProductInterface.ts`:
```typescript
export default interface ProductInterface {
  id: number
  name: string
  categoryId: number
  description: string
  price: number
  url: string
}
```

## Get products from server
In lieu of server add: `mock_products.json` to `public`
```bash
touch public/mock_products.json
```
```javascript
[{"id":6,"name":"Book","price":9.99,"url":"https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"You can read it!","category_id":1},
{"id":7,"name":"Headphones","price":249.99,"url":"https://images.unsplash.com/photo-1583394838336-acd977736f90?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"Listen to stuff!","category_id":2},
{"id":8,"name":"Backpack","price":79.99,"url":"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"Carry things around town!","category_id":8},
{"id":9,"name":"Glasses","price":129.99,"url":"https://images.unsplashcom/photo-1591076482161-42ce6da69f67?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"Now you can see!","category_id":8},
{"id":10,"name":"Cup","price":4.99,"url":"https://images.unsplash.com/photo-1517256064527-09c73fc73e38?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80","description":"Drink anything with it!","category_id":7},
{"id":11,"name":"Shirt","price":29.99,"url":"https://images.unsplash.com/photo-1581655353564-df123a1eb820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80","description":"Wear it with style!","category_id":3}
]
```

### Create Product Context
```bash
touch src/ProductContext.tsx
```

`src/ProductContext.tsx`:
```typescript
import React from 'react'
import { useState, useEffect, createContext } from 'react'
import Pokemon from './pokemonInterface'


/* THIS CONTEXT FILE HANDLES ALL FUNCTIONS CONCERNING STATE */

// set context type
type PokemonContextType = {
  pokemons: Pokemon[] | null,
  setPokemons: (pokemons: Pokemon[] | null) => void,
  filter: string,
  setFilter: (filter: string) => void,
  selectedPokemon: Pokemon | null,
  setSelectedPokemon: (pokemon: Pokemon | null) => void
}


// create context with providing initial values
// export the context, for components to import it as needed
export const PokemonContext = createContext<PokemonContextType>({
  pokemons: [],
  setPokemons: () => {},
  filter: '',
  setFilter: () => {},
  selectedPokemon: null,
  setSelectedPokemon: () => {},
})

// create context provider function
// it takes children as prop and will return them wrapped in the provider
const PokemonProvider = ({children}: {children: React.ReactNode}) => {
  // define state
  // pokemons array
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null)
  // search string to filter the pokemon list
  const [filter, setFilter] = useState('')
  // selected pokemon
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null)

    // use useEffect() to get pokemons when the component mounts
    useEffect(() => {
      fetch('./pokemons.json')
        // fetch returns a promise, that resolves with the response object
        // the response is the representation of the entire HTTP response
        // the json() method returns a second promise 
        // that parses the HTTP body text as JSON 
        .then(response => response.json())
        // use the data recived to set Pokemom
        .then(data => setPokemons(data))
    }, [])

    // return children wrapped in the provider
    // by setting up the Provider and its value prop here
    // all aspects of context are handled here
    // which keeps the App component simple
    return (
      < PokemonContext.Provider value={{
          pokemons,
          setPokemons,
          filter,
          setFilter,
          selectedPokemon,
          setSelectedPokemon
        }}>
          {children}
      </PokemonContext.Provider>
    )
 
}

// export the provider created
export default PokemonProvider
```

