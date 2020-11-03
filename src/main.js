import Vue from 'vue'
import Landing from './components/Landing.vue'
import App from './components/App.vue'
import Playlists from './components/Playlists.vue'
import Tags from './components/Tags.vue'
import vuetify from './plugins/vuetify';
import {version} from '../package.json';

Vue.config.productionTip = false

const routes = {
  '/': Landing,
  '/app': App,
  '/tags': Tags,
  '/playlists': Playlists
}

const app = new Vue({
  el: '#app',

  data: {
    currentRoute: window.location.pathname,
    version: version
  },

  computed: {
    ViewComponent () {
      return routes[this.currentRoute]// || NotFound
    }
  },

  vuetify,
  render (h) { return h(this.ViewComponent) }
}).$mount('#app')

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})
