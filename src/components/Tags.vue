<template>
  <div id="app">
    <v-app id="inspire">
      <NavBar></NavBar>
			<v-container>
        <div>
          <h1 class="headline text-center">Tag collections</h1>
          <p class="text-subtitle-1 text-center mb-8">
            Your things go here
          </p>
        </div>
        <div class="d-flex justify-space-between">
          <v-col cols="4"></v-col>
          <v-col cols="4" class="text-center">
            <v-btn icon
                class="mb-4"
                color="#385F73"
                @click="addTag">
              <v-icon x-large>fa-plus-circle</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" class="text-right">
            <v-btn icon
                color="#385F73"
                class="mr-1"
                large
                @click="gridView = true">
              <v-icon>fa-th</v-icon>
            </v-btn>
            <v-btn icon
                color="#385F73"
                large
                @click="gridView = false">
              <v-icon>fa-bars</v-icon>
            </v-btn>
          </v-col>
        </div>
				<v-row>
          <v-col
            v-for="tag in tags"
            :key="tag.id"
            :class="gridView ? 'd-flex justify-space-between' : 'd-flex justify-center'"
            :cols="gridView ? 4 : 12">
            <TagCard v-on:save="save" :tag="tag"></TagCard>
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
      gridView: true
    }
  },
  methods: {
    changeLayout: function() {
      return
    },
    addTag: function() {
      var tagName = window.prompt("Name of your new tag collection?")
      if (tagName && tagName.length > 0) {
        this.tags.push({name: tagName, tags: [], order: this.tags.length})
      }
    },
    save: function() {
      axios
        .put('http://localhost:3000/api/v1/user/tags', {tags: this.tags}, {withCredentials: true})
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
