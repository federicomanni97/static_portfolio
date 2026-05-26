import { reactive } from 'vue'

export const store = reactive({
//   count: 0
    apiUrl: 'http://localhost:8000/api',
    imgPath: "http://localhost:8000/storage/",
    pages: '?page=' , 
    projects: [],
})