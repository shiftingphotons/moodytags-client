<template>
	<div id="app">
		<v-app id="inspire">
      <v-app-bar class="d-flex justify-center" color="white" flat>
        <v-btn @click="goHome" color="white" depressed>Home</v-btn>
        <v-btn @click="goPlaylists" color="white" depressed>Untagged </v-btn>
      </v-app-bar>
			<v-container>
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
						tile
					>
						<v-img
							:src="p.images[0] ? p.images[0].url : undefined"
							height="200"
							width="200"
						></v-img>

						<v-card-title class="text-subtitle-2">
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
    axios
      .get('http://localhost:3000/api/v1/playlists', {withCredentials: true})
        .then(response => (this.playlists = response.data.items))
    return {
      playlists: this.playlists,
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }
  },
  // computed () {
  //   // page count and shit
  // },
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
  h3 {
    font-weight: 500;
  }
</style>
