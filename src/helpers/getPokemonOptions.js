import pokemonApi from "../api/pokemonApi"

const getPokemons = () => {

    const pokemons = Array.from(Array(650))
    
    return pokemons.map( (_, i) => i + 1 )
}


const getPokemonOptions = async () => {

    const mixedPokemons = getPokemons()
                            .sort( () => Math.random() - 0.5 )
    
    return await getPokemonNames(mixedPokemons.splice(0,4))
    
}

const getPokemonNames = async ([a, b, c, d] = []) => {
    /* 
    const response = await pokemonApi.get(`/${a}`)
    console.log(response.data.name) */

    const promiseArr = [
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`)
    ]

    const [p1, p2, p3, p4] =  await Promise.all( promiseArr )

    return [
        { id: a, name: capitalizeFirstLetter(p1.data.name)},
        { id: b, name: capitalizeFirstLetter(p2.data.name)},
        { id: c, name: capitalizeFirstLetter(p3.data.name)},
        { id: d, name: capitalizeFirstLetter(p4.data.name)}
    ]
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default getPokemonOptions