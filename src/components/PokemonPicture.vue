<template>
    <div class="pokemon-container">
        <img class="hidden-pokemon"
            v-bind:src="imgSrc"  
            alt='Pokémon'>
        <img v-if="showPokemon" class="fade-in" 
            v-bind:src="imgSrc" 
            alt='Pokémon'> 
    </div>
</template>

<script>

    import '../styles/pokemonPicture.css'
    export default {
        props:{
            pokemonId: {
                type: Number,
                required: true
            },
            showPokemon:{
                type: Boolean,
                required: true,
                default: false
            }
        },
        computed: {
            imgSrc() {
                return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`
            }
        }
    }
</script>

<style scoped>



</style>