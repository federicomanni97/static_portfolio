<template>
  <!--
    App.vue agisce da wrapper globale dell'applicazione:
    - AppHeader è sempre visibile
    - router-view rende la pagina corrispondente alla route attiva
    - FooterComponent chiude il layout comune
  -->
  <div class="">
    <div class="">
      <AppHeader/>
    </div>

    <!-- router view caricherà le pagine richieste -->
    <router-view></router-view>
    <FooterComponent/>
  </div>
</template>

<script>

import axios from 'axios';
import { store } from './store'
import { RouterView } from 'vue-router';
import AppHeader from './components/AppHeader.vue';
import FooterComponent from './components/FooterComponent.vue';
export default {
  name: 'App', 
  components: { 
    RouterView,
    AppHeader,
    FooterComponent
  },
  data () {
    return {
      store, 
      projects: [],
    }
  },
  methods: {
    
  }, 
  mounted(){
  
  }
}
</script>

<style lang="scss" scoped>
@use "./assets/styles/partials/variables.scss" as *;

h1{
  color: $font-color;
}

</style>./store