import { createApp } from 'vue';
import { createPinia } from 'pinia';
// Google OAuth
const googleClientID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
import vue3GoogleLogin from 'vue3-google-login';
// Sweet Alert
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
// Auto Animate
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
// Main Sytle
import './style.css';
// App
import App from './App.vue';
import router from './router';
const pinia = createPinia();

const app = createApp(App);

app.use(VueSweetalert2);
app.use(autoAnimatePlugin);
app.use(vue3GoogleLogin, { clientId: googleClientID });
app.use(router);
app.use(pinia);

app.mount('#app');
