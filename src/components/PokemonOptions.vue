<template>
    <div class="options-container">
        <ul>
            <li v-for="pokemon in pokemons" 
            :key="pokemon.id"
            @click="$emit( 'selection', pokemon.id)">
            {{ pokemon.name }}
        </li>
        </ul>
    </div>
</template>

<script>
import '../styles/pokemonOptions.css'

    export default {
      props: {
        pokemons: {
            type: Array,
            required: true
        }
      }  
      
    }
</script>

<style scoped>

</style>