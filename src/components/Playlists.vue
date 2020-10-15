<template>
  <div id="app">
    <v-app>
      <NavBar></NavBar>
      <v-row v-if="!playlists.length" align="start" justify="center">
        <v-col>
          <h2 class="text-center pb-8 empty-state-title">Getting the playlists! <br> Enjoy nature in the meantime.</h2>
          <v-img src="@/assets/undraw_nature_m5ll.svg" max-width="500" class="empty-state-img"></v-img>
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
              circle
            ></v-pagination>
          </v-col>
        </v-row>
        <v-card
          class="d-flex justify-space-left flex-wrap"
          color="#FBF9F4"
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
                <TagMenu :playlist="p" :tags="tags"></TagMenu>
              </v-card-actions>
            </v-card>
          </v-col>
          <!-- <v&#45;card -->
          <!--   v&#45;for="p in playlists" -->
          <!--   :key="p.id" -->
          <!--   class="ma&#45;3" -->
          <!--   width="200" -->
          <!-- > -->
          <!--   <v&#45;img -->
          <!--     :src="p.images[0] ? p.images[0].url : undefined" -->
          <!--     height="200" -->
          <!--     width="200" -->
          <!--   ></v&#45;img> -->
          <!--  -->
            <!-- <v&#45;card&#45;title class="d&#45;inline&#45;block text&#45;subtitle&#45;1 text&#45;truncate pa&#45;2 pr&#45;0 playlist&#45;card&#45;title"> -->
          <!--     {{ p.name }} -->
          <!--   </v&#45;card&#45;title> -->
          <!-- </v&#45;card> -->
        </v-card>
      </v-container>
      <Footer></Footer>
    </v-app>
  </div>
</template>

<script>
const axios = require('axios');

import TagMenu from './TagMenu.vue'
import NavBar from './NavBar.vue'
import Footer from './Footer.vue'

export default {
  data () {
    this.getPlaylists()
    this.getTags()
    return {
      playlists: [],
      tags: [],
      page: 1,
      pageCount: 1,
    }
  },
  computed: {
  },
  methods : {
    changePage: function() {this.getPlaylists(this.page)},
    getPlaylists: function(page) {
      var pageParam = page ? '?page=' + page : ''
      axios
        .get('http://localhost:3000/api/v1/playlists' + pageParam, {withCredentials: true})
          .then(response => (
            this.playlists = response.data.items,
            this.pageCount = Math.ceil(response.data.total / 50)
        ));
    },
    getTags: function() {
      axios
        .get('http://localhost:3000/api/v1/user/tags', {withCredentials: true})
          .then(response => ( this.tags = response.data));
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
    margin: 50px auto;
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
