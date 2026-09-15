import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { Icon } from "@iconify/vue";
import Countup from "vue-countup-v3";
import AOS from "aos";
import "aos/dist/aos.css";

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

AOS.init({
  duration: 700,
  easing: "ease-out-cubic",
  once: true,
  offset: 40,
  disable: reduceMotion,
});

const app = createApp(App);
app.component("Icon", Icon);
app.component("Countup", Countup);
app.mount("#app");
