import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import "@/index.css";
import router from "@/services/router";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount("#app");
