import { createApp } from "vue";
import "./assets/App.scss";
import App from "./App.vue";
import router from "./router";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "swiper/scss";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import VCalendar from "v-calendar";
import "v-calendar/style.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLocationDot, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
library.add(faLocationDot, faPaperPlane);

const app = createApp(App);

app.use(router);
app.use(pinia);
app.component("QuillEditor", QuillEditor);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(VCalendar, {});
app.mount("#app");
