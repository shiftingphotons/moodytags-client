<template>
  <v-app-bar class="d-flex justify-center" color="white" max-height="64" flat>
    <v-btn @click="goHome" color="white" depressed>Home</v-btn>
    <v-btn @click="goTags" color="white" depressed>Tags </v-btn>
    <v-btn @click="goPlaylists" color="white" depressed>Playlists </v-btn>
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

