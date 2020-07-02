<template>
  <div id="app">
      <v-app id="inspire">
				<v-app-bar class="d-flex justify-center" color="white" flat>
					<v-btn @click="goHome" color="white" depressed>Home</v-btn>
					<v-btn @click="goPlaylists" color="white" depressed>Untagged </v-btn>
				</v-app-bar>
				<v-container>
					<v-row
						v-for="(playlists, tag) in sections" :key="tag"
					>
						<v-toolbar flat color="white">
							<v-toolbar-title>{{ tag }}</v-toolbar-title>
						</v-toolbar>

						<v-col class="d-flex flex-row ma-3" cols="12">
							<v-card
								class="ma-2"
								v-for="p in playlists" :key="p.id"
								:href="p.uri"
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
							</v-card>
						</v-col>
					</v-row>
				</v-container>
    </v-app>
  </div>
</template>


<script>


const axios = require('axios');
// module.exports = {
//   data: {
//     hey: "what?"
//   }
// }

export default {
  data () {
    axios
      .get('http://localhost:3000/api/v1/taggables', {withCredentials: true})
        .then(response => (this.sections = response.data))
    return {
      sections: this.sections
    }
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
    }
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
