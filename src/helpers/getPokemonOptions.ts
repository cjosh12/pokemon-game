import pokemonApi from '@/api/PokemonApi'
import type { AxiosResponse } from 'axios';
import type {Pokemon} from '@/interfaces/Pokemon.interface';
import type { ListPokemonOptions } from '@/interfaces/ListPokemonOptions.interface';



const getPokemons = (): number[] => {
    const pokemonsArr: number[] = Array.from(Array(650))

    return pokemonsArr.map((_ , index) => index+1)
}

const getPokemonOptions = async(): Promise<ListPokemonOptions[]> => {
    const mixedPokemons : number[] = getPokemons().sort(() => Math.random()-0.5);

    const pokemons: ListPokemonOptions[] = await getPokemonNames(mixedPokemons.splice(0,4))
    return pokemons
}

const getPokemonNames = async([a, b, c, d]: number[]=[]): Promise<ListPokemonOptions[]> =>{

    const promiseArr = [  
        pokemonApi.get(`/${a}`),
        pokemonApi.get(`/${b}`),
        pokemonApi.get(`/${c}`),
        pokemonApi.get(`/${d}`),
    ]
    
    const [p1, p2, p3, p4]:AxiosResponse<Pokemon>[] = await Promise.all(promiseArr) 
    return [
        {id: p1.data.id, name: p1.data.name},
        {id: p2.data.id, name: p2.data.name},
        {id: p3.data.id, name: p3.data.name},
        {id: p4.data.id, name: p4.data.name}
    ]
}

export default getPokemonOptions