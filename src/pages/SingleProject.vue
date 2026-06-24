<template>
    <!-- Single project: recupera progetto via API `store.apiUrl` usando `this.$route.params.slug`; immagini risolte con `store.imgPath` -->
    <div class="text-center bg-dark h-100 d-flex flex-column align-items-center">
        <h1 class="text-uppercase text-danger py-4 fw-bold"> {{project.title}} </h1>
        <img 
            v-if="project.cover"
            :src="project.cover" 
            :alt="project.title" 
            class="imgwidth cursor-pointer"
            @click="openLightboxFromCover"
        >
        <h1 class="text-uppercase text-danger py-4 fw-bold mt-3"> Gallery </h1>
        <div class="gallery-grid">
            <img 
                v-for="(image, index) in project.gallery"
                :key="index"
                :src="image" 
                :alt="`${project.title} - ${index + 1}`"
                class="gallery-thumb cursor-pointer"
                @click="openLightbox(index)"
            >
        </div>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="lightboxOpen" class="lightbox-overlay" @click="closeLightbox">
        <div class="lightbox-container" @click.stop>
            <!-- Close button -->
            <button class="close-btn" @click="closeLightbox" aria-label="Chiudi">
                ✕
            </button>

            <!-- Main image -->
            <div 
                class="lightbox-image-wrapper"
                @touchstart="handleTouchStart"
                @touchend="handleTouchEnd"
            >
                <img 
                    :src="currentGallery[currentImageIndex]" 
                    :alt="`${project.title} - ${currentImageIndex + 1}`"
                    class="lightbox-image"
                >
            </div>

            <!-- Navigation arrows -->
            <button 
                v-if="currentGallery.length > 1"
                class="nav-btn prev-btn" 
                @click="prevImage"
                aria-label="Immagine precedente"
            >
                <i class="fas fa-chevron-left"></i>
            </button>
            <button 
                v-if="currentGallery.length > 1"
                class="nav-btn next-btn" 
                @click="nextImage"
                aria-label="Immagine successiva"
            >
                <i class="fas fa-chevron-right"></i>
            </button>

            <!-- Image counter -->
            <div v-if="currentGallery.length > 1" class="image-counter">
                {{ currentImageIndex + 1 }} / {{ currentGallery.length }}
            </div>
        </div>
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
                lightboxOpen: false,
                currentImageIndex: 0,
                touchStartX: 0,
                touchEndX: 0,
            }
        },
        computed: {
            currentGallery() {
                return this.project.gallery || [];
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
                },
                openLightbox(index) {
                    this.currentImageIndex = index;
                    this.lightboxOpen = true;
                    document.body.style.overflow = 'hidden';
                    document.addEventListener('keydown', this.handleKeyboard);
                },
                openLightboxFromCover() {
                    this.currentImageIndex = 0;
                    this.lightboxOpen = true;
                    document.body.style.overflow = 'hidden';
                    document.addEventListener('keydown', this.handleKeyboard);
                },
                closeLightbox() {
                    this.lightboxOpen = false;
                    document.body.style.overflow = 'auto';
                    document.removeEventListener('keydown', this.handleKeyboard);
                },
                nextImage() {
                    if (this.currentImageIndex < this.currentGallery.length - 1) {
                        this.currentImageIndex++;
                    } else {
                        this.currentImageIndex = 0;
                    }
                },
                prevImage() {
                    if (this.currentImageIndex > 0) {
                        this.currentImageIndex--;
                    } else {
                        this.currentImageIndex = this.currentGallery.length - 1;
                    }
                },
                handleTouchStart(e) {
                    this.touchStartX = e.changedTouches[0].screenX;
                },
                handleTouchEnd(e) {
                    this.touchEndX = e.changedTouches[0].screenX;
                    this.handleSwipe();
                },
                handleSwipe() {
                    const diff = this.touchStartX - this.touchEndX;
                    const threshold = 50;

                    if (Math.abs(diff) > threshold) {
                        if (diff > 0) {
                            this.nextImage();
                        } else {
                            this.prevImage();
                        }
                    }
                },
                handleKeyboard(e) {
                    if (!this.lightboxOpen) return;
                    
                    if (e.key === 'ArrowRight') this.nextImage();
                    if (e.key === 'ArrowLeft') this.prevImage();
                    if (e.key === 'Escape') this.closeLightbox();
                }
        },
        created(){
            this.getProjectData();
        },
        beforeUnmount() {
            document.removeEventListener('keydown', this.handleKeyboard);
        }
    }
</script>

<style lang="scss" scoped>

.imgwidth {
    width: 1200px;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
        opacity: 0.8;
    }
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    padding: 20px;
    max-width: 1400px;
}

.gallery-thumb {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border: 2px solid #dc3545;
    border-radius: 8px;
    transition: all 0.2s ease;

    &:hover {
        transform: scale(1.05);
        opacity: 0.8;
    }
}

.vh100 {
    height: 100vh;
}

.cursor-pointer {
    cursor: pointer;
}

/* Lightbox Styles */
.lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000000 !important;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.lightbox-container {
    position: relative;
    width: 90%;
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 15, 20, 0.85);
    border: 2px solid #f97316;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 0 30px rgba(249, 115, 22, 0.25),
                inset 0 0 20px rgba(249, 115, 22, 0.05);
}

.lightbox-image-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    touch-action: pan-y;
}

.lightbox-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    animation: zoomIn 0.3s ease;
}

@keyframes zoomIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.close-btn {
    position: absolute;
    top: 15px;
    right: 15px;
    background: rgba(249, 115, 22, 0.85);
    border: 2px solid #f97316;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    z-index: 1001;
    transition: all 0.3s ease;
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    font-weight: bold;

    &:hover {
        background: #fb923c;
        border-color: #fb923c;
        transform: scale(1.1) rotate(90deg);
        box-shadow: 0 0 15px rgba(249, 115, 22, 0.8);
    }
}

.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(249, 115, 22, 0.75);
    border: 2px solid #f97316;
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    padding: 12px 16px;
    z-index: 1001;
    transition: all 0.3s ease;
    border-radius: 6px;
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #fb923c;
        border-color: #fb923c;
        box-shadow: 0 0 20px rgba(249, 115, 22, 0.8);
        transform: translateY(-50%) scale(1.12);
    }

    &:active {
        background-color: #dc3545;
        border-color: #dc3545;
        box-shadow: 0 0 20px rgba(220, 53, 69, 0.7);
    }

    &.prev-btn {
        left: 20px;
    }

    &.next-btn {
        right: 20px;
    }
}

.image-counter {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    background: rgba(249, 115, 22, 0.8);
    padding: 8px 18px;
    border-radius: 6px;
    border: 1px solid rgba(249, 115, 22, 0.9);
    z-index: 1001;
    box-shadow: 0 4px 12px rgba(249, 115, 22, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
    .lightbox-container {
        width: 95%;
        height: 95vh;
    }

    .nav-btn {
        padding: 10px 15px;
        font-size: 20px;

        &.prev-btn {
            left: 10px;
        }

        &.next-btn {
            right: 10px;
        }
    }

    .close-btn {
        top: 10px;
        right: 10px;
        font-size: 28px;
    }

    .image-counter {
        font-size: 12px;
        padding: 6px 12px;
    }
}
</style>