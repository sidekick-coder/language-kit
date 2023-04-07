import { createApp } from 'vue'
import App from './App.vue'

import ListItemVue from './components/ListItem.vue'
import IDrag from './components/IDrag.vue'
import VBtn from './components/VBtn.vue'

import './styles.css'

const app = createApp(App)

app.component('ListItem', ListItemVue)
app.component('IDrag', IDrag)
app.component('VBtn', VBtn)

app.mount('#app')
