<template>
  <v-app-bar class="d-flex justify-center" color="#FBF9F4" max-height="64" flat>
    <v-btn @click="goHome" color="#FBF9F4" depressed>Home</v-btn>
    <v-btn @click="goTags" color="#FBF9F4" depressed>Tags </v-btn>
    <v-btn @click="goPlaylists" color="#FBF9F4" depressed>Playlists </v-btn>
  </v-app-bar>
</template>


<script>

export default {
  data: () => {
    return {}
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
    goTags: function() {
      this.$root.currentRoute = '/tags'
      window.history.pushState(
        null,
        '/tags',
        '/tags'
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
</style>

