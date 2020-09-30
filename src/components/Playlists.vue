<template>
	<div id="app">
		<v-app id="inspire">
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
            ></v-pagination>
          </v-col>
        </v-row>
				<v-card
					class="d-flex justify-space-between flex-wrap"
					color="lighten-2"
					flat
					tile
				>
					<v-card
						v-for="p in playlists"
						:key="p.id"
						class="ma-3"
						width="200"
					>
						<v-img
							:src="p.images[0] ? p.images[0].url : undefined"
							height="200"
							width="200"
						></v-img>

            <v-card-title class="d-inline-block text-subtitle-1 text-truncate pa-2 pr-0 playlist-card-title">
							{{ p.name }}
						</v-card-title>
            <TagMenu :playlist="p" :tags="tags"></TagMenu>
					</v-card>
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
		font-family: Roboto;
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
