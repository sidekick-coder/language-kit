import { createApp } from 'vue'
import App from './App.vue'

import ListItemVue from './components/ListItem.vue'
import IDrag from './components/IDrag.vue'
import VBtn from './components/VBtn.vue'

import './styles.css'

const app = createApp(App)

app.component('list-item', ListItemVue)
app.component('i-drag', IDrag)
app.component('v-btn', VBtn)

app.mount('#app')
