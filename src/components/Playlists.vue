<template>
  <div id="app">
    <v-app>
      <NavBar></NavBar>
      <v-row v-if="playlistsLoaded && !playlists.length" align="start" justify="center">
        <v-col>
          <h2 class="text-center pb-8 empty-state-title">It's empty here. <br> Enjoy nature, create some Spotify playlists and try again.</h2>
          <v-img src="@/assets/undraw_nature_m5ll.svg" class="my-4 mx-auto empty-state-img"></v-img>
        </v-col>
      </v-row>
      <v-container>
        <v-row class="d-flex flex-row-reverse">
          <v-col lg="3" md="3">
            <v-pagination
              v-if="playlists.length"
              v-model="page"
              :length="pageCount"
              @input="changePage()"
              @next="changePage()"
              @prev="changePage()"
              color="#00AA95"
              next-icon="far fa-angle-right"
              prev-icon="far fa-angle-left"
              circle
            ></v-pagination>
          </v-col>
        </v-row>
        <v-card
          class="d-flex justify-space-left flex-wrap"
          color="#FBF9F4"
          v-if="playlistsLoaded"
          flat
          tile
        >
          <v-col
            v-for="(p, i) in playlists"
            :key="i"
            cols="4"
          >
            <v-card
              color="#1F7087"
              height="200"
              dark
            >
              <div class="d-flex flex-no-wrap justify-space-between">
                <div>
                  <v-card-title
                    class="subtitle-1"
                    v-text="p.name"
                  ></v-card-title>

                  <v-card-subtitle v-text="p.tags.join(', ')"></v-card-subtitle>
                </div>

                <v-avatar
                  class="ma-3"
                  size="125"
                  tile
                >
                  <v-img :src="p.images[0] ? p.images[0].url : undefined"></v-img>
                </v-avatar>
              </div>
              <v-card-actions>
                <TagMenu :playlist="p" :tags="autoselectTags"></TagMenu>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-card>
        <v-card
          class="d-flex justify-space-left flex-wrap"
          color="#FBF9F4"
          v-if="!playlistsLoaded"
          flat
          tile
        >
          <v-col
            v-for="n in 15"
            :key="n"
            cols="4"
          >
            <v-skeleton-loader
              type="card"
            ></v-skeleton-loader>
          </v-col>
        </v-card>
      </v-container>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
import TagMenu from './TagMenu.vue'
import NavBar from './NavBar.vue'
import Footer from './Footer.vue'

export default {
  data () {
    this.getPlaylists()
    this.getTags()
    return {
      page: 1,
    }
  },
  computed: {
    autoselectTags: function() {
      var tagList = []
      this.tags.forEach(function(collection) {
        tagList.push({header: collection.name})
        collection.tags.forEach(function(tag) {
          tagList.push({name: tag});
        });
      });
      return tagList
    },
    playlists () {
      return this.$store.state.playlists
    },
    tags () {
      return this.$store.state.tagCollections
    },
    pageCount () {
      return Math.ceil(this.$store.state.totalPlaylistCount / 50)
    },
    playlistsLoaded () {
      return this.$store.state.playlistsLoaded
    }
  },
  methods : {
    changePage: function() {
      this.getPlaylists(this.page)
    },
    getPlaylists: function(page) {
      var pageParam = page ? '?page=' + page : ''
      this.$store.commit('setPlaylistsLoaded', false)
      this.$store.dispatch('getPlaylists', pageParam)
    },
    getTags: function() {
      this.$store.dispatch('getTagCollections')
    },
  },
  components: {
    TagMenu,
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
  font-family: Inter;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #343534;
}
.playlist-card-title {
  width: 200px;
  font-size: 0.9rem !important;
  font-weight: 500 !important;
}
.empty-state-img {
  max-width: 400px;
}
.empty-state-title {
  color: #00AA95;
  letter-spacing: 0.4px;
  font-weight: 500;
}
</style>
<style>
.theme--light.v-pagination .v-pagination__item {
  background-color: #FBF9F4 !important;
  outline: 0;
}
.theme--light.v-pagination .v-pagination__navigation {
  background-color: #FBF9F4 !important;
}
.theme--light.v-pagination .v-pagination__item--active {
  background-color: rgb(0, 170, 149) !important
}
</style>
