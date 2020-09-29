<template>
  <div id="app">
    <v-app id="inspire">
      <NavBar></NavBar>
			<v-container>
				<v-row>
          <v-col
            v-for="tag in tags"
            :key="tag.id"
            class="d-flex justify-center"
            cols="12"
          >
            <TagCard :tag="tag"></TagCard>
          </v-col>
				</v-row>
			</v-container>
      <Footer></Footer>
    </v-app>
  </div>
</template>


<script>

import NavBar from './NavBar.vue'
import Footer from './Footer.vue'
import TagCard from './TagCard.vue'

const axios = require('axios');

export default {
  data () {
    axios
      .get('http://localhost:3000/api/v1/user/tags', {withCredentials: true})
        .then(response => (this.tags = response.data))
    return {
      tags: this.tags,
    }
  },
  components: {
    TagCard,
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
</style>
