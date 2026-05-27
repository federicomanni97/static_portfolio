<template>
  <!-- Home: sezioni principali — Hero, Hard Skills, Projects, Contact -->
  <div class="container d-flex flex-column justify-content-center align-items-center ">
    <!-- Hero: 'About Me' — parallax foto (requestAnimationFrame), hover-trigger, badge -->
    <div class="position-relative about-section my-5 hover-trigger reveal">
      <div class="d-flex flex-column align-items-center">
        <span class="hero-badge">Frontend Developer • Vue • React • UI</span>
        <span class="text-black about-me opacity-75">About Me</span>
        <span class="title-home text-center fw-bold py-3 text-responsive">Junior Front End Developer driven by curiosity and
          <span class="text-secondary">code</span><span class="orange-text">.</span></span>
        <div class="about-photo absolute-img img_parallax img-responsive"></div>
        <p class="text-secondary text-center opacity-75 paragraph-width fs-6 absolute-paragraph">
          Ciao, sono Federico Manni e sono un Junior Full Stack Web Developer.
          Mi considero una persona socievole e comunicativa, con una naturale
          propensione al lavoro di squadra. Sono appassionato di tecnologia e mi
          entusiasma l'idea di contribuire a progetti innovativi, mentre
          continuo a cercare nuove opportunità per crescere sia
          professionalmente che personalmente.
        </p>
      </div>
    </div>

    <!-- Hard Skills: render da array `logos` (img, title, year, description); layout con Bootstrap + SCSS -->
    <div class="d-flex justify-content-center w-100">
      <div class="row hard-skills-section w-100 reveal" style="max-width: 1200px">
        <div class="col-12 col-md-6 text-md-end text-start mb-4 mb-md-0 pt-5 border_skills">
          <div class="sticky-title">
            <span class="fw-bold text-uppercase fs-2 pe-md-5 pe-0">Hard Skills<span class="orange-text">.</span></span>
            <p class="text-secondary pb-5 pe-md-5 pe-0 medium-font opacity-75">
              Competenze certificate acquisite fino ad oggi.
            </p>
          </div>
        </div>

        <div class="col-12 col-md-6 border_skills_top pt-5">
          <div v-for="(skill, index) in logos" :key="index" class="mb-4">
            <div class="d-flex align-items-center gap-3 ps-0 ps-md-5">
              <div class="skill-icon-wrapper">
                <img :src="skill.img" :alt="skill.title" class="skill-icon" />
              </div>
              <div class="d-flex flex-column">
                <h5 class="mb-1 text-black fw-bold">{{ skill.title }}</h5>
                <h6 class="text-black fw-bold">{{ skill.year }}</h6>
              </div>
            </div>
            <p class="text-secondary mb-5 ps-0 ps-md-5 medium-font opacity-75">{{ skill.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Progetti: dati importati da `@/data/projects.json`, normalizzati in `normalizeProjects()`; gallery duplicata per marquee CSS -->
    <section class="w-100 mt-5">
      <div class="text-center mt-5 reveal">
        <h1 class="projects-section-title fw-bold mb-5">My <span class="text-secondary">projects</span><span class="orange-text">.</span></h1>
      </div>

      <div v-if="projects.length" class="projects-list">
        <article
          v-for="project in projects"
          :key="project.id || project.slug"
          class="project-stack-item reveal"
        >
          <div class="project-stack-content">
            <div class="project-left-column">
              <div class="project-cover-wrapper">
                <img
                  :src="project.cover"
                  :alt="project.title"
                  class="project-cover"
                />
              </div>

              <div class="gallery-marquee">
                <div class="gallery-track">
                  <img
                    v-for="(img, i) in [...project.gallery, ...project.gallery]"
                    :key="`${img}-${i}`"
                    :src="img"
                    :alt="`${project.title} screenshot ${i + 1}`"
                    class="gallery-image"
                  />
                </div>
              </div>
            </div>

            <div class="project-details">
              <div class="project-copy-block">
                <div class="project-eyebrow">Featured project</div>
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="text-secondary mb-3 fs-6 opacity-75 medium-font">
                  {{ project.body || 'Scopri il progetto attraverso la gallery e il link ufficiale.' }}
                </p>
              </div>

              <div v-if="project.technologies?.length" class="mb-3">
                <span class="fw-bold text-secondary me-2">Technologies:</span>

                <span
                  v-for="tech in project.technologies"
                  :key="tech.id || tech.name"
                  class="badge bg-dark me-2"
                >
                  {{ tech.name }}
                </span>
              </div>

              <div v-if="project.meta?.length" class="project-meta-grid mt-2">
                <div
                  v-for="item in project.meta"
                  :key="item.label"
                  class="project-meta-pill"
                >
                  <span class="project-meta-label">{{ item.label }}</span>
                  <span class="project-meta-value">{{ item.value }}</span>
                </div>
              </div>

              <a
                v-if="project.link"
                :href="project.link"
                class="btn btn-outline-dark mt-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            </div>
          </div>
        </article>
      </div>

      <div v-else>
        <p class="text-center text-muted">Loading projects...</p>
      </div>
    </section>

    <!-- Contatti: card con link `mailto:` e `tel:` per azioni rapide -->
    <section class="w-100 mt-5 contact-section">
      <div class="contact-shell">
        <div class="contact-copy">
          <p class="contact-eyebrow">Contatti</p>
          <h2 class="contact-title">Pronto a collaborare e a portare valore nei tuoi progetti</h2>
          <p class="contact-description">
            Se stai cercando un junior frontend curioso, reattivo e orientato al risultato, puoi contattarmi direttamente per una call o per una proposta di collaborazione.
          </p>
        </div>

        <div class="contact-grid">
          <a href="mailto:manni_federico@libero.it" class="contact-card">
            <span class="contact-card-label">Email</span>
            <span class="contact-card-value">manni_federico@libero.it</span>
          </a>

          <a href="tel:3459232030" class="contact-card">
            <span class="contact-card-label">Cellulare</span>
            <span class="contact-card-value">345 9232030</span>
          </a>

          <div class="contact-card">
            <span class="contact-card-label">Patente</span>
            <span class="contact-card-value">B</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from "vue";

// Import del dataset dei progetti. Il JSON è la fonte unica dei contenuti
// mostrati nella sezione principale della home.
import projectsData from '@/data/projects.json'

export default {
  setup() {
    // Lista affidata al template: ogni elemento contiene titolo, immagine,
    // anno e descrizione della skill.
    const projects = ref([]);

    // Array delle hard skills. È statico perché rappresenta una lista di
    // competenze strutturate, non dipendente da dati esterni.
    const logos = [
      {
        title: "HTML",
        img: "/images/html-logo.png",
        year: "Anno - 2024",
        description:
          "Acquisita padronanza nella strutturazione semantica di pagine web, con particolare attenzione all’accessibilità e alla compatibilità cross-browser. Capacità di creare markup pulito, scalabile e ottimizzato per layout responsive.",
      },
      {
        title: "CSS / SCSS",
        img: "/images/css-logo.png",
        year: "2024",
        description:
          "Competenze avanzate nella progettazione di interfacce responsive con CSS e preprocessori SCSS. Implementazione di design modulari, animazioni moderne e gestione dello stile secondo principi DRY (Don't Repeat Yourself).",
      },
      {
        title: "Bootstrap",
        img: "/images/bootstrap-logo.png",
        year: "2024",
        description:
          "Esperienza nell’utilizzo del framework Bootstrap per la creazione rapida di UI responsive. Personalizzazione di componenti, layout mobile-first e utilizzo di classi utility per una prototipazione efficiente.",
      },
      {
        title: "JavaScript",
        img: "/images/javascript-logo.png",
        year: "2024",
        description:
          "Competenze solide nello sviluppo interattivo lato client. Gestione eventi, manipolazione DOM, utilizzo di fetch API per chiamate asincrone e introduzione alla programmazione funzionale e orientata agli oggetti.",
      },
      {
        title: "Vue.js",
        img: "/images/vue-logo.png",
        year: "2024",
        description:
          "Esperienza nello sviluppo front-end con Vue.js: componenti riutilizzabili, binding reattivo, gestione dello stato e integrazione con API REST. Utilizzo di Vue Router e Vuex per progetti scalabili.",
      },
      {
        title: "Laravel",
        img: "/images/laravel-logo.png",
        year: "2024",
        description:
          "Utilizzo del framework Laravel per lo sviluppo backend in PHP. Implementazione di routing, middleware, gestione delle autenticazioni e manipolazione dei dati tramite Eloquent ORM.",
      },
      {
        title: "PHP",
        img: "/images/php-logo.png",
        year: "2024",
        description:
          "Sviluppo di applicazioni dinamiche lato server. Conoscenza delle buone pratiche OOP, gestione delle sessioni, validazione dati e integrazione con database MySQL.",
      },
      {
        title: "MySQL",
        img: "/images/mysql-logo-pure.svg",
        year: "2024",
        description:
          "Formazione pratica su MySQL applicata allo sviluppo web e alla gestione dei dati backend Esperienza nella progettazione di database, operazioni CRUD e utilizzo di query per applicazioni dinamiche.",
      },
      {
        title: "Github",
        img: "/images/github-logo.png",
        year: "2024",
        description:
          "Gestione del versionamento del codice con Git e GitHub. Collaborazione in team tramite pull request, gestione dei rami (branching), risoluzione conflitti e documentazione dei progetti.",
      },
      {
        title: "Python",
        img: "/images/python-logo.svg",
        year: "2025",
        description:
          "Introduzione alla programmazione con Python. Fondamenti OOP, strutture dati, gestione file, librerie base e creazione di script per l'automazione.",
      },
      {
        title: "OpenAi",
        img: "/images/openai.svg",
        year: "2025",
        description:
          "Utilizzo delle API di OpenAI per integrare modelli di intelligenza artificiale all’interno di applicazioni. Generazione di contenuti, automazione di flussi e utilizzo di linguaggi naturali per l'interazione utente-AI.",
      },
      {
        title: "React",
        img: "/images/react-logo.svg",
        year: "In Corso",
        description:
          "Studio della libreria React per lo sviluppo di interfacce utente interattive. Gestione dello stato con hook, JSX, componenti riutilizzabili e ciclo di vita dei componenti.",
      },
    ];

    // Mappa dei metadati specifici per progetto. Serve a arricchire la card
    // con informazioni aggiuntive senza duplicare markup nel JSON.
    const projectMetaMap = {
      "RPG Project": [
        { label: "Tipo", value: "Gameplay" },
        { label: "Focus", value: "UI interattiva" },
        { label: "Risultato", value: "Esperienza di gioco coinvolgente" },
      ],
      "BoolBnb": [
        { label: "Tipo", value: "Marketplace" },
        { label: "Focus", value: "Catalogo & gestione" },
        { label: "Risultato", value: "Flusso completo per venditori e ospiti" },
      ],
      "Fakeflix Vue + API IMDB": [
        { label: "Tipo", value: "Data-driven" },
        { label: "Focus", value: "API esterne" },
        { label: "Risultato", value: "Catalogo filmico dinamico" },
      ],
      "Netflix Tailwind": [
        { label: "Tipo", value: "Clone UI" },
        { label: "Focus", value: "Tailwind CSS" },
        { label: "Risultato", value: "Layout moderno e veloce da scalare" },
      ],
    };

    // Normalizza progetti: body coerente, cover/gallery encoded, technologies e meta (projectMetaMap)
    const normalizeProjects = (data) => {
      const projectList = Array.isArray(data) ? data : [data];

      return projectList.map((project) => ({
        ...project,
        body: project.body || project.description || 'Scopri il progetto attraverso la gallery e il link ufficiale.',
        cover: encodeURI(project.cover || ''),
        gallery: Array.isArray(project.gallery) && project.gallery.length
          ? project.gallery.map((img) => encodeURI(img))
          : [project.cover].filter(Boolean).map((img) => encodeURI(img)),
        technologies: Array.isArray(project.technologies) ? project.technologies : [],
        meta: projectMetaMap[project.title] || [],
      }));
    };

    projects.value = normalizeProjects(projectsData);

    // Stato delle logiche DOM: observer per le reveal e cleanup per l'hover.
    let observer = null;
    let hoverCleanup = null;

    onMounted(() => {
      // Hero interactions: parallax via requestAnimationFrame, mousemove handlers, IntersectionObserver reveal
      const image = document.querySelector(".about-photo");
      const title = document.querySelector(".title-home");
      const trigger = document.querySelector(".hover-trigger");

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

      if (trigger && image && title) {
        let animationFrame = null;
        let currentX = 0;
        let currentY = 0;
        let targetX = 0;
        let targetY = 0;

        const applyTransform = () => {
          currentX += (targetX - currentX) * 0.14;
          currentY += (targetY - currentY) * 0.14;

          image.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
          title.style.transform = `translate3d(${currentX * 0.65}px, ${currentY * 0.65}px, 0)`;

          animationFrame = requestAnimationFrame(applyTransform);
        };

        const handleMove = (e) => {
          const rect = trigger.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          const centerX = rect.width / 2;
          const centerY = rect.height / 2;

          targetX = ((x - centerX) / centerX) * 16;
          targetY = ((y - centerY) / centerY) * 14;
        };

        const handleLeave = () => {
          targetX = 0;
          targetY = 0;
        };

        animationFrame = requestAnimationFrame(applyTransform);
        trigger.addEventListener("mousemove", handleMove);
        trigger.addEventListener("mouseleave", handleLeave);

        hoverCleanup = () => {
          trigger.removeEventListener("mousemove", handleMove);
          trigger.removeEventListener("mouseleave", handleLeave);

          if (animationFrame) {
            cancelAnimationFrame(animationFrame);
          }
        };
      }
    });

    onBeforeUnmount(() => {
      // Pulizia delle listener e degli effetti animati per evitare memory leak
      // quando il componente viene smontato.
      if (observer) {
        observer.disconnect();
      }

      if (hoverCleanup) {
        hoverCleanup();
      }
    });

    return {
      logos,
      projects,
    };
  },
};
</script>

<style scoped>
.project-img {
  height: 400px;
  object-fit: cover;
  object-position: top;
  border-radius: 10px;
}

.projects-section-title {
  font-size: clamp(1.8rem, 1.6vw + 1.1rem, 2.4rem);
  line-height: 1.05;
  letter-spacing: -0.04em;
}

.projects-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 0 0 2rem;
}

.project-stack-item {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
}

.project-stack-content {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
  align-items: start;
  padding: 1rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98));
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.06);
}

.project-left-column {
  display: flex;
  flex-direction: column;
  gap: 0;
  width: 100%;
}

.project-cover-wrapper {
  margin-bottom: 0;
}

.project-cover {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 18px;
  box-shadow: 0 18px 32px rgba(15, 23, 42, 0.14);
  display: block;
}

.project-details {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 0.35rem;
}

.project-copy-block {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 0.55rem;
  min-height: 100%;
  padding: 0.35rem 0.2rem 0.2rem;
}

.project-eyebrow {
  display: inline-flex;
  align-self: flex-start;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.project-title {
  margin: 0;
  color: #111827;
  font-size: clamp(1.35rem, 1.1vw + 1rem, 1.75rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.03em;
}

.project-copy-block p {
  margin-bottom: 0;
  font-size: 0.97rem;
  line-height: 1.75;
  color: #334155;
  max-width: 34rem;
}

.gallery-marquee {
  width: 100%;
  overflow: hidden;
  padding-top: 0;
  margin-top: 0;
}

.gallery-track {
  display: flex;
  width: max-content;
  gap: 0;
  animation: gallery-marquee 34s linear infinite;
  will-change: transform;
}

.gallery-image {
  flex: 0 0 auto;
  width: min(26vw, 320px);
  height: 180px;
  object-fit: cover;
  border-radius: 0 0 12px 12px;
  display: block;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
}

@media (min-width: 768px) {
  .project-stack-content {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  }
}

@media (max-width: 767px) {
  .projects-list {
    padding: 0 0.75rem 2rem;
  }

  .project-cover {
    max-height: 220px;
  }

  .gallery-image {
    width: min(42vw, 220px);
    height: 120px;
  }

  .about-photo,
  .title-home {
    transform: none !important;
    transition: none !important;
  }
}

@keyframes gallery-marquee {
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(calc(-50%));
  }
}

.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.about-section {
  padding: 2rem 1rem 1.5rem;
  border-radius: 32px;
  background:
    radial-gradient(circle at top left, rgba(249, 115, 22, 0.12), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98));
  border: 1px solid rgba(15, 23, 42, 0.06);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  margin-bottom: 1rem;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.05);
  color: #334155;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
}

.hero-badge::before {
  content: "";
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #f97316;
  box-shadow: 0 0 0 6px rgba(249, 115, 22, 0.12);
}

.about-photo,
.title-home,
.project-stack-item,
.project-cover,
.gallery-image,
.btn {
  transition: transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease;
}

.about-photo,
.title-home {
  will-change: transform;
  transform-style: preserve-3d;
}

.project-stack-item:hover {
  transform: translateY(-2px);
}

.project-stack-item:hover .project-stack-content {
  box-shadow: 0 26px 48px rgba(15, 23, 42, 0.08);
}

.project-cover-wrapper:hover .project-cover {
  transform: scale(1.01);
}

.btn:hover {
  transform: translateY(-1px);
}

@media (prefers-reduced-motion: reduce) {
  .reveal,
  .about-photo,
  .title-home,
  .project-stack-item,
  .project-cover,
  .gallery-image,
  .btn,
  .gallery-track {
    transition: none !important;
    animation: none !important;
  }
}

.project-meta-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
  gap: 0.75rem;
}

.project-meta-pill {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.75rem 0.85rem;
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.04);
  border: 1px solid rgba(15, 23, 42, 0.06);
}

.project-meta-label {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
}

.project-meta-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: #111827;
}

.contact-section {
  opacity: 1;
  transform: none;
}

.contact-shell {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 1.5rem;
  align-items: stretch;
  padding: 1.5rem;
  border-radius: 28px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(248, 250, 252, 0.98));
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.06);
}

.contact-copy {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
}

.contact-eyebrow {
  display: inline-flex;
  align-self: flex-start;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: rgba(249, 115, 22, 0.1);
  color: #f97316;
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.contact-title {
  margin: 0;
  font-size: clamp(1.35rem, 1.15vw + 1rem, 1.8rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: #111827;
}

.contact-description {
  margin: 0;
  font-size: 0.98rem;
  line-height: 1.8;
  color: #334155;
}

.contact-grid {
  display: grid;
  gap: 0.9rem;
}

.contact-card {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1rem 1.1rem;
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.03);
  border: 1px solid rgba(15, 23, 42, 0.06);
  color: #0f172a;
  text-decoration: none;
}

.contact-card:hover {
  background: rgba(15, 23, 42, 0.05);
}

.contact-card-label {
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}

.contact-card-value {
  font-size: 1rem;
  font-weight: 700;
}

@media (max-width: 767px) {
  .contact-shell {
    grid-template-columns: 1fr;
    padding: 1.25rem;
  }
}

</style>