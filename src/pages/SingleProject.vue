<template>
    <!-- Single project: recupera progetto via API `store.apiUrl` usando `this.$route.params.slug`; immagini risolte con `store.imgPath` -->
    <div class="text-center bg-dark h-100 d-flex flex-column align-items-center">
        <h1 class="text-uppercase text-danger py-4 fw-bold"> {{project.title}} </h1>
        <img :src="`${store.imgPath}${project.image}`" :alt="project.title" class="imgwidth">
        <h1 class="text-uppercase text-danger py-4 fw-bold mt-3"> Show </h1>
        <img :src="`${store.imgPath}${project.image_alternative}`" alt="" class="imgwidth">
    </div>
    <router-link class="nav-link" :to="{name: 'single-project', params: {slug: project.slug}}"></router-link>
</template>

<script>
    import axios from 'axios';
    import { store } from '../store';

    export default {
        name: 'SingleProject',
        data(){
            return {
                store,
                project: {},
            }
        },
        methods:{
                // Fetch: chiama API per ottenere i dati del progetto corrente (slug route param).
                // Se la risposta non contiene `results` reindirizza a `not-found`.
                getProjectData(){
                    axios.get(`${this.store.apiUrl}/projects/${this.$route.params.slug}`).then((res)=>{
                        if(res.data.results){
                           this.project = res.data.results 
                        } else {
                            this.$router.push({name: 'not-found'})
                        }
                    })
                }
        },
        created(){
            this.getProjectData();
        }
    }
</script>

<style lang="scss" scoped>

.imgwidth{
    width: 1200px;
}
.vh100{
    height: 100vh;
}
</style>