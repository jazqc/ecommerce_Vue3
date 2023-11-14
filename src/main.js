import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { aliases, md } from 'vuetify/iconsets/md'
import colors from 'vuetify/lib/util/colors'


const myLightTheme = {
  dark: false,
  colors: {
    primary: '#805C95',
    primarySh: '#805C95',
    secondary: '#E1BEE7',
    complementary: '#85CE78',
    whiteSoft: '#f8f8f8',
    text: '#555456'
  },
}


const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'myLightTheme',
    themes: {
      myLightTheme,
    },
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
}
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')