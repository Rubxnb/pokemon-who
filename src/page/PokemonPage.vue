<template>
    <h1>Who's that Pokémon?</h1>
    
    <div>
        <h2>Pokémon in a row: {{ counter }}</h2>
    </div>
    <div v-if="pokemon">
        <PokemonPicture  
            v-bind:pokemonId="pokemon.id" 
            :showPokemon="showPokemon"/>
        
        <PokemonOptions :pokemons="pokemonArr"
            @selection="checkAnswer"/>
            
    </div>
    <h2 v-else>Espere por favor...</h2>

    <div v-if="showAnswer">
        <h3>{{ message }}</h3>
        <button @:click="newGame">Next Pokémon</button>
    </div>
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
                message: '',
                counter: 0
            }
        },

        methods: {
            async mixPokemonArr () {
                this.pokemonArr = await getPokemonOptions()

                const rndInt = Math.floor(Math.random() * 4)
                this.pokemon = this.pokemonArr[rndInt]
            },

            checkAnswer(id) {
                if(!this.showPokemon ) {
                    
                    if(id === this.pokemon.id){
                        this.message = `Correct! Is ${this.pokemon.name}!`
                        this.counter++
                        confetti()
                    } else {
                        this.message = `Oops! Is ${this.pokemon.name}!`
                        this.counter = 0
                    }
                    this.showAnswer = true
                    this.showPokemon = true
                   
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
