<template>
  <div id="app">
      <v-app id="inspire">
				<v-app-bar class="d-flex justify-center" color="white" flat>
					<v-btn @click="goHome" color="white" depressed>Home</v-btn>
					<v-btn @click="goPlaylists" color="white" depressed>Playlists </v-btn>
				</v-app-bar>
				<v-container>
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
.section-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: 1px;
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
</style>
