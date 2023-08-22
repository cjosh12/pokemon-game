<script lang="ts">

    import PokemonOptions from '@/components/PokemonOptions.vue';
    import PokemonPicture from '@/components/PokemonPicture.vue';    
    import getPokemonOptions from '@/helpers/getPokemonOptions';
    import type { ListPokemonOptions } from '@/interfaces/ListPokemonOptions.interface';
    
    export default {
        components:{PokemonOptions, PokemonPicture },
        data() {
        return{
            PokemonArr: [] as ListPokemonOptions[],
            pokemon:null as ListPokemonOptions | null,
            showPokemon : false,
            showAnswer: false,
            message: ''
        }
    },
    methods:{
        async mixPokemonArray(){
            this.PokemonArr = await getPokemonOptions()

            const rndInt = Math.floor(Math.random()*4)

            this.pokemon = this.PokemonArr[rndInt]
        },
        checkAnswer (selectedId: number) {
            this.showPokemon = true
            this.showAnswer = true
            this.PokemonArr = []
            if(!this.pokemon) return;
            if(selectedId===this.pokemon?.id){
                this.message = `correcto, ${this.pokemon.name}`
            }else{
                this.message = `Ooops, era ${this.pokemon.name}`
            }
    },
        newGame(){
            this.showPokemon=false
            this.showAnswer=false
            this.PokemonArr = []
            this.mixPokemonArray()
        }
    },
    mounted(){
        this.mixPokemonArray()
    }
    }
</script>

<template>
    <h1 v-if="!pokemon">espere por favor...</h1>
    <div v-else="pokemon">
        <h1>¿Quién es este pokémon?</h1>
    
        <PokemonPicture :pokemonId="pokemon.id" :showPokemon="showPokemon"/>
        <PokemonOptions :pokemons="PokemonArr" @selection="checkAnswer"/>

    <template v-if="showAnswer">        
        <h2 class="fade-in">{{ message }}</h2>
        <button @click="newGame">
            Nuevo Juego
        </button>
    </template>
    </div>


</template>

<style>

</style>