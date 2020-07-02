<template>
	<div id="app">
		<v-app id="inspire">
      <v-app-bar class="d-flex justify-center" color="white" flat>
        <v-btn @click="goHome" color="white" depressed>Home</v-btn>
        <v-btn @click="goPlaylists" color="white" depressed>Playlists</v-btn>
      </v-app-bar>
			<v-container>
        <v-row class="d-flex flex-row-reverse">
          <v-col lg="3" md="3">
            <v-pagination
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
            <TagMenu :playlist="p"></TagMenu>
					</v-card>
				</v-card>
			</v-container>
		</v-app>
	</div>
</template>

<script>
import TagMenu from './TagMenu.vue'
// TODO Name it untagged?

const axios = require('axios');

export default {
  data () {
    this.getPlaylists()
    return {
      playlists: [],
      page: 1,
      pageCount: 1,
    }
  },
  computed: {
  },
  methods : {
    goHome: function() {
      this.$root.currentRoute = '/'
			window.history.pushState(
				null,
				'/',
				'/'
      )
    },
    goPlaylists: function() {
      this.$root.currentRoute = '/playlists'
			window.history.pushState(
				null,
				'/playlists',
				'/playlists'
      )
    },
    changePage: function() {this.getPlaylists(this.page)},
    getPlaylists: function(page) {
      var pageParam = page ? '?page=' + page : ''
      axios
        .get('http://localhost:3000/api/v1/playlists' + pageParam, {withCredentials: true})
          .then(response => (
            this.playlists = response.data.items,
            this.pageCount = Math.ceil(response.data.total / 50)
        ));
    }
  },
  components: {
    TagMenu
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
	.tag-section {
		margin-bottom: 80px;
	}
  .playlist {
    height: 200px;
		/* max-width: 160px; */
		margin-right: 60px;
    /* background: orange; */
  }
  .playlist-card-title {
      width: 200px;
      font-size: 0.9rem !important;
      font-weight: 500 !important;
  }
  h3 {
    font-weight: 500;
  }
</style>
