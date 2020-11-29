import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Landing from './components/Landing.vue'
import App from './components/App.vue'
import Playlists from './components/Playlists.vue'
import Tags from './components/Tags.vue'
import vuetify from './plugins/vuetify';
import {version} from '../package.json';

Vue.config.productionTip = false
Vue.use(Vuex)

const API_BASE = process.env.NODE_ENV == 'development' ? "localhost:8000" : ""

const routes = {
  '/': Landing,
  '/app': App,
  '/tags': Tags,
  '/playlists': Playlists
}

const store = new Vuex.Store({
  state: {
    taggables: [],
    tagCollections: [],
    playlists: {},
    totalPlaylistCount: 0,
    playlistsLoaded: false
  },
  getters: {
    sortByTagCount: state => {
      var sortedSections = {}

      var keys = Object.keys(state.taggables)
      keys = keys.sort(function(a, b) {
        return state.taggables[b].length - state.taggables[a].length
      });

      for (var i = 0; i < keys.length; i++) {
        sortedSections[keys[i]] = state.taggables[keys[i]]
      }

      return sortedSections
    },
  },
  mutations: {
    setTaggables (state, taggables) {
      state.taggables = taggables
    },
    setTagCollections (state, tagCollections) {
      state.tagCollections = tagCollections
    },
    addTagCollection (state, collectionObj) {
      state.tagCollections.push(collectionObj)
    },
    setPlaylists (state, playlists) {
      state.playlists = playlists.items
      state.totalPlaylistCount = playlists.total
      state.playlistsLoaded = true
    },
    setPlaylistsLoaded (state, flag) {
      state.playlistsLoaded = flag
    }
  },
  actions: {
    getTaggables (context) {
      axios
        .get(API_BASE + '/api/v1/taggables', {withCredentials: true})
          .then(response => (
            context.commit('setTaggables', response.data)
          ))
    },
    updateTaggable (context, payload) {
      axios({
        method: 'PATCH',
        url: API_BASE + '/api/v1/taggables' + '/' + payload.id,
        data: {tags: payload.tags},
        withCredentials: true
      });
    },
    createTaggable (context, payload) {
      axios({
        method: 'POST',
        url: API_BASE + '/api/v1/taggables',
        data: payload,
        withCredentials: true
      });
    },
    getTagCollections (context) {
      axios
        .get(API_BASE + '/api/v1/tag_collections', {withCredentials: true})
          .then(response => (
            context.commit('setTagCollections', response.data)
          ))
    },
    saveTagCollections (context, tags) {
      axios.put(API_BASE + '/api/v1/tag_collections', {tags: tags}, {withCredentials: true})
    },
    getPlaylists (context, pageParam) {
      axios
        .get(API_BASE + '/api/v1/playlists' + pageParam, {withCredentials: true})
          .then(response => (
            context.commit('setPlaylists', response.data)
        ));
    }
  }
})

const app = new Vue({
  el: '#app',
  store: store,

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
