<template>
  <div id="app">
    <v-app id="inspire">
      <NavBar></NavBar>
      <v-container>
        <v-row v-if="!sections || Object.keys(sections).length == 0" align="start" justify="center">
          <v-col>
            <h2 class="text-center pb-8 empty-state-title" v-if="!sections">Fetching your tags...</h2>
            <h2 class="text-center pb-8 empty-state-title" v-if="sections && Object.keys(sections).length == 0">It's a bit empty here :( <br> Try tagging some playlists.</h2>
            <v-img src="@/assets/undraw_compose_music_ovo2.svg" max-width="600" class="empty-state-img"></v-img>
          </v-col>
        </v-row>
        <v-row
          v-for="(playlists, tag) in sections" :key="tag"
        >
          <v-toolbar flat color="white">
            <v-toolbar-title class="section-title">{{ tag }}</v-toolbar-title>
          </v-toolbar>

          <v-col class="d-flex flex-row" cols="12">
            <v-card
              class="mr-8"
              v-for="p in playlists" :key="p.id"
              width="200"
              flat
            >
              <a :href="p.uri">
                <v-img
                  :src="p.images[0] ? p.images[0].url : undefined"
                  height="200"
                  width="200"
                ></v-img>
              </a>

              <v-card-title class="d-inline-block text-subtitle-1 text-truncate pa-2 pr-0 playlist-card-title">
                {{ p.name }}
              </v-card-title>
            </v-card>
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
        .then(response => (this.sections = response.data))
    return {
      sections: this.sections
    }
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
    max-width: 1280px;
    margin: 0 auto;
    font-family: Roboto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #343534;
}
.section-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
}
.playlist-card-title {
    width: 200px;
    font-size: 0.9rem !important;
    font-weight: 500 !important;
}
.empty-state-img {
    margin: 50px auto;
}
.empty-state-title {
    color: #00AA95;
    letter-spacing: 0.4px;
    font-weight: 500;
}
</style>
