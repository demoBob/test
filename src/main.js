import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import  './mock/mock.js'
import router from './router/index'
import axios from 'axios'
import ElementPlus from 'element-plus'
import { ArrowLeftBold, ArrowRightBold } from '@element-plus/icons'
import '../node_modules/element-plus/dist/index.css'

const app = createApp(App)
app.config.globalProperties.$http = axios
app.config.globalProperties.$test = 'test'
// const request = axios.create()

app.use(ElementPlus)
app.component('arrow-right-bold',ArrowRightBold)
app.component('arrow-left-bold',ArrowLeftBold)
app.use(router)


app.mount('#app');
