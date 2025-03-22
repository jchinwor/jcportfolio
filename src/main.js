import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { Icon } from '@iconify/vue/dist/iconify.js';
import Countup from 'vue-countup-v3'
import AOS from 'aos'
import 'aos/dist/aos.css'


AOS.init({duration:1000})

const app = createApp(App);
app.component('Icon',Icon)
app.component('Countup',Countup)
app.mount('#app')

