<template>
    <h1>Who's that Pokémon?</h1>
    <PokemonPicture v-if="pokemon" 
        v-bind:pokemonId="pokemon.id" 
        :showPokemon="showPokemon"/>

    <PokemonOptions v-if="pokemon" 
        :pokemons="pokemonArr"
        @selection="checkAnswer($event)"/>
        
    <h2 v-else>Espere por favor...</h2>
</template>

<script>
    import PokemonOptions from '../components/PokemonOptions.vue'
    import PokemonPicture from '../components/PokemonPicture.vue'
    import getPokemonOptions from '../helpers/getPokemonOptions'
    import confetti from 'canvas-confetti'

    export default {

        components: { PokemonPicture, PokemonOptions },

        data() {
            return {
                pokemonArr: [],
                pokemon: null,
                showPokemon: false

            }
        },

        methods: {
            async mixPokemonArr () {
                this.pokemonArr = await getPokemonOptions()

                const rndInt = Math.floor(Math.random() * 4)
                this.pokemon = this.pokemonArr[rndInt]
            },

            checkAnswer(id) {
                if(id === this.pokemon.id){
                    this.showPokemon = true
                    confetti()
                }
            },

        },

        mounted() {
            this.mixPokemonArr()
        }
    }
</script>
