<template>
  <v-app-bar class="d-flex justify-center" color="#FBF9F4" max-height="50" height="54" flat>
    <h2 @click="goHome" class="h-nav-item brown-text px-3">home</h2>
    <h2 @click="goTags" class="h-nav-item brown-text px-3">tags</h2>
    <h2 @click="goPlaylists" class="h-nav-item brown-text px-3">playlists</h2>
  </v-app-bar>
</template>


<script>

export default {
  data: () => {
    return {}
  },
  methods : {
    goHome: function() {
      this.$root.currentRoute = '/app'
      window.history.pushState(
        null,
        '/app',
        '/app'
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
.h-nav-item {
  cursor: pointer;
}
.h-nav-item:hover {
  color: #00bea6;
}
.brown-text {
  color: #997b6f;
}

</style>

