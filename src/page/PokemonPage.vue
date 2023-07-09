<template>
    <h1>Who's that Pokémon?</h1>

    <div v-if="pokemon">
        <PokemonPicture  
            v-bind:pokemonId="pokemon.id" 
            :showPokemon="showPokemon"/>
        
        <PokemonOptions :pokemons="pokemonArr"
            @selection="checkAnswer"/>
            
    </div>
    <h2 v-else>Espere por favor...</h2>

    <div v-if="showAnswer">
        <h3>Correct! Is {{ pokemon.name }}!</h3>
    </div>
    <button @:click="newGame">New Game</button>
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
                showPokemon: false,
                showAnswer: false,
                correct: false
            }
        },

        methods: {
            async mixPokemonArr () {
                this.pokemonArr = await getPokemonOptions()

                const rndInt = Math.floor(Math.random() * 4)
                this.pokemon = this.pokemonArr[rndInt]
            },

            checkAnswer(id) {
                if(!this.showPokemon && id === this.pokemon.id) {
                    this.showAnswer = true
                    this.showPokemon = true
                    confetti()
                }
            },

            newGame() {
                this.showPokemon = false
                this.pokemon = null
                this.showAnswer = false
                this.mixPokemonArr()
            }


        },

        mounted() {
            this.mixPokemonArr()
        }
    }
</script>
