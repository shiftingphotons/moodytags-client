<template>
  <div id="app">
    <v-app>
      <NavBar></NavBar>
      <v-container>
        <v-row v-if="!sections || Object.keys(sections).length == 0" align="start" justify="center">
          <v-col>
            <h2 class="text-center pb-8 empty-state-title" v-if="!sections">Fetching your tags...</h2>
            <h2 class="text-center pb-8 empty-state-title" v-if="sections && Object.keys(sections).length == 0">It's a bit empty here :( <br> Try tagging some playlists.</h2>
            <v-img src="@/assets/undraw_compose_music_ovo2.svg" class="my-4 mx-auto empty-state-img"></v-img>
          </v-col>
        </v-row>
        <v-row
          v-for="(playlists, tag) in sections" :key="tag"
          class="section"
        >
          <h1 class="section-title pa-4" v-text="tag"></h1>

          <v-col class="d-flex flex-row pa-0" cols="12">
            <v-slide-group
              show-arrows
            >
              <v-card
                class="mr-8 rounded-lg"
                v-for="p in playlists" :key="p.id"
                width="200"
                color="#FBF9F4"
                flat
              >
                <a :href="p.uri">
                  <v-img
                    class="rounded-lg"
                    :src="p.images[0] ? p.images[0].url : undefined"
                    height="200"
                    width="200"
                  ></v-img>
                </a>

                <v-card-title class="d-inline-block text-subtitle-1 text-truncate pa-2 pr-0 playlist-card-title">
                  {{ p.name }}
                </v-card-title>
              </v-card>
            </v-slide-group>
          </v-col>
          <v-divider></v-divider>
        </v-row>
      </v-container>
      <Footer></Footer>
    </v-app>
  </div>
</template>


<script>
import NavBar from './NavBar.vue'
import Footer from './Footer.vue'

const axios = require('axios');

export default {
  data () {
    axios
      .get('http://localhost:3000/api/v1/taggables', {withCredentials: true})
        .then(response => (this.sort(response.data)))
    return {
      sections: this.sections
    }
  },
  methods: {
    sort: function(sections, by='ByTagCount') {
      return this["sort" + by].call(this, sections)
    },
    sortByTagCount(sections) {
      var sortedSections = {}

      var keys = Object.keys(sections)
      keys = keys.sort(function(a, b) {
        return sections[b].length - sections[a].length
      });

      for (var i = 0; i < keys.length; i++) {
        sortedSections[keys[i]] = sections[keys[i]]
      }

      this.sections = sortedSections
    },
  },
  components: {
    NavBar,
    Footer
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#app {
  max-width: 100%;
  margin: 0 auto;
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #343534;
}
.section {
  margin: 20px 0 20px 0;
  padding-bottom: 15px;
  border-radius: 10px;
}
.section-title {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin-left: 8px;
}
.playlist-card-title {
  width: 200px;
  font-size: 0.9rem !important;
  font-weight: 500 !important;
  cursor: default;
}
.empty-state-img {
  max-width: 600px;
}
.empty-state-title {
  color: #00AA95;
  letter-spacing: 0.4px;
  font-weight: 500;
}

@media (min-width: 1264px) {
.container {
    max-width: 100%;
    padding: 0;
}
}
</style>

<style>
.v-slide-group {
  margin-left: 52px;
}
.v-slide-group--is-overflowing {
  margin-left: 0;
}
.v-slide-group__prev--disabled > .theme--light.v-icon.v-icon.v-icon--disabled {
  color: rgba(0,0,0,0) !important
}
.v-slide-group__next--disabled > .theme--light.v-icon.v-icon.v-icon--disabled {
  color: rgba(0,0,0,0) !important
}
</style>
