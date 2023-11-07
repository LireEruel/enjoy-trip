import { createApp } from "vue";
import "./assets/App.scss";
import App from "./App.vue";
import router from "./router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "swiper/scss";

const app = createApp(App);

app.use(router);
app.component("QuillEditor", QuillEditor);
app.mount("#app");
