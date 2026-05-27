<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg pt-3 border-bottom">
      <div class="container-fluid align-items-center d-flex justify-content-between px-0">
        <!-- Sinistra -->
        <div class="d-flex align-items-center gap-4 ">
          <div class="d-flex flex-column">
            <span class="text-secondary small-font text-uppercase">Ora Locale</span>
            <small class="text-black">{{ currentTime }}</small>
          </div>
          <!-- <div class="d-flex flex-column">
            <span class="text-secondary small-font text-uppercase">Version:</span>
            <small class="text-black">2025 Edition</small>
          </div> -->
          <div class="d-flex flex-column">
            <span class="text-secondary small-font text-uppercase">City</span>
            <small class="text-black">Roma, Italia</small>
          </div>
        </div>

        <!-- Centro
        <div class="d-flex justify-content-center flex-grow-1">
          <ul class="navbar-nav d-flex flex-row gap-4">
            <li
              class="nav-item text-center fs-6"
              v-for="(item, index) in menu"
              :key="index"
            >
              <router-link
                :to="{ name: item.name }"
                class="text-muted nav-link"
                active-class="active"
              >
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </div> -->

        <!-- Destra -->
        <div class="d-flex align-items-center">
          <ul class="d-flex list-unstyled gap-3 mb-0">
            <li>
              <a href="https://www.linkedin.com/in/tuo-profilo" target="_blank" class="text-dark">
                <i class="fa-brands fa-linkedin fs-5 text-secondary"></i>
              </a>
            </li>
            <li>
              <router-link :to="{ name: 'contacts' }" class="text-dark">
                <i class="fa-regular fa-envelope fs-5 text-secondary"></i>
              </router-link>
            </li>
            <li>
              <a href="tel:+390612345678" class="text-dark">
                <i class="fa-solid fa-phone fs-6 text-secondary"></i>
              </a>
            </li>
            <li>
              <a href="#" class="text-dark">
                <i class="fa-brands fa-instagram fs-5 text-secondary"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      currentTime: '',
      menu: [
        {
          label: 'Home',
          name: 'home',
        },
        {
          label: 'Projects',
          name: 'projects',
        },
        {
          label: 'Contacts',
          name: 'contacts',
        },
      ],
    };
  },
  methods: {
    updateTime() {
      const romeTime = new Date().toLocaleTimeString('it-IT', {
        timeZone: 'Europe/Rome',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      this.currentTime = romeTime;
    },
  },
  mounted() {
    this.updateTime();
    setInterval(this.updateTime, 1000);
  },
};
</script>

<style scoped lang="scss">
nav {
  .nav-link.active {
    font-weight: bold;
    color: #000 !important;
  }
  i {
    transition: color 0.2s ease-in-out;
    &:hover {
      color: #0a66c2; // colore LinkedIn
    }
  }
}
</style>