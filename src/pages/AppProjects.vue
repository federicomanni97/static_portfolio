<template>
  <!-- Projects page: lista progetti dal `store.projects`, mostra cover e link a `single-project` (router param: slug) -->
  <div>
    <main class="container">

      <h1 class="text-danger text-center mb-4">
        Projects List:
      </h1>

      <!-- PROJECTS -->
      <div
        v-for="project in store.projects"
        :key="project.id"
        class="card w-100 d-flex align-items-center border-0 mb-5"
      >
        <!-- COVER -->
        <img
          :src="project.cover"
          :alt="project.title"
          class="project-img"
        />

        <div class="card-body text-center">

          <h2 class="mb-3">
            {{ project.title }}
          </h2>

          <!-- LINK DETTAGLIO -->
          <router-link
            :to="{ name: 'single-project', params: { slug: project.slug } }"
            class="btn btn-primary fs-5"
          >
            View Project
          </router-link>

        </div>
      </div>

    </main>
  </div>
</template>

<script>
import { store } from '../store'

export default {
  name: 'AppProjects',

  data() {
    return {
      store
    }
  },

  created() {
    // Nota: i progetti vengono presi dallo `store` (potrebbe essere precaricato da JSON o API)
    // Se fosse necessario caricarli qui, farlo una volta (es. store.projects = projectsData)
  }
}
</script>

<style scoped>
.project-img {
  width: 100%;
  max-width: 720px;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}

@media (min-width: 768px) {
  .project-img {
    width: 50%;
  }
}

.swiper {
  width: 100%;
  height: 300px;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>