<template>
  <div id="app">
    <v-app>
      <NavBar></NavBar>
      <v-container class="mt-2">
        <div>
          <h1 class="headline text-center">Tag collections</h1>
          <p class="text-subtitle-1 text-center mb-8">
            Create collections of tags for easier and quicker tagging.
          </p>
        </div>
        <div class="d-flex justify-space-between">
          <v-col cols="4"></v-col>
          <v-col cols="4" class="text-center">
            <v-btn icon
                class="mb-4"
                color="#385F73"
                @click="addTag">
              <v-icon x-large>fal fa-plus-circle</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="4" class="text-right">
            <v-btn icon
                color="#385F73"
                class="mr-1"
                large
                @click="gridView = true">
              <v-icon>far fa-th</v-icon>
            </v-btn>
            <v-btn icon
                color="#385F73"
                large
                @click="gridView = false">
              <v-icon>far fa-bars</v-icon>
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


export default {
  data () {
    this.$store.dispatch('getTagCollections')
    return {
      gridView: true
    }
  },
  computed: {
    tags () {
      return this.$store.state.tagCollections
    }
  },
  methods: {
    changeLayout: function() {
      return
    },
    addTag: function() {
      var tagName = window.prompt("Name of your new tag collection?")
      if (tagName && tagName.length > 0) {
        this.$store.commit('addTagCollection', {name: tagName, tags: [], order: this.tags.length})
      }
    },
    save: function() {
      this.$store.dispatch('saveTagCollections', this.tags)
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
  font-family: Inter;
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
<style>

v-card__subtitle, .v-card__text {
  font-weight: 700;
}
</style>
