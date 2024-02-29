import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { configure } from 'vee-validate';

const app = createApp(App)

configure({
	validateOnBlur: false,
	validateOnChange: false,
	validateOnInput: false,
});

app.use(router)
app.use(store)

app.mount('#app')
