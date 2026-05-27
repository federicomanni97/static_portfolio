<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg pt-3 border-bottom">
      <div class="container-fluid align-items-center d-flex justify-content-between px-0">
        <div class="header-meta d-flex align-items-center gap-4">
          <img class="logo-header" src="../assets/images/fm-logo-no-bg.png" alt="">
          <div class="d-flex flex-column align-items-center">
            <span class="text-secondary">Ora Locale</span>
            <small class="text-black">{{ currentTime }}</small>
          </div>
          <div class="d-flex flex-column align-items-center">
            <span class="text-secondary">Città</span>
            <small class="text-black">Roma, Italia</small>
          </div>
        </div>

        <div class="header-actions d-flex align-items-center">
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

  .header-meta {
    min-width: 0;
  }

  .logo-header {
    max-height: 40px;
    width: auto;
  }

  .header-actions {
    flex-shrink: 0;
  }

  i {
    transition: color 0.2s ease-in-out;

    &:hover {
      color: #0a66c2;
    }
  }
}

@media (max-width: 767px) {
  nav {
    .header-meta {
      gap: 0.75rem;
      flex-wrap: wrap;
    }

    .header-actions ul {
      gap: 0.75rem;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
  }
}
</style>