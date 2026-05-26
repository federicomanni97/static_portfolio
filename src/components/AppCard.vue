<template>
    <div class="">
        <div class="container">
            <img :src="`${store.imgPath}${project.image}`" alt="">
            <router-link :to="{ name: 'single-project', params: { slug: project.slug } }" class="btn btn-primary"></router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'AppCard',
        props: ['project']
    }
</script>

<style lang="scss" scoped>

.red{
    color: red !important;
}

</style>