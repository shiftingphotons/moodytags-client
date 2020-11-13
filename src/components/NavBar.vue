<template>
  <v-app-bar class="d-flex justify-center pt-2" max-height="70" color="#FBF9F4" flat>
    <h2 @click="goHome" class="d-flex flex-column h-nav-item brown-text px-6 text-center" :class="{ active: $root.currentRoute == '/app' }">
      <v-icon style="color: inherit" medium>fal fa-home-lg</v-icon>
      <span class="my-1" >home</span>
    </h2>
    <h2 @click="goTags" class="d-flex flex-column h-nav-item brown-text px-6" :class="{ active: $root.currentRoute == '/tags' }">
      <v-icon style="color: inherit" medium>fal fa-hashtag</v-icon>
      <span class="my-1" >tags</span>
    </h2>
    <h2 @click="goPlaylists" class="d-flex flex-column h-nav-item brown-text px-6" :class="{ active: $root.currentRoute == '/playlists' }">
      <v-icon style="color: inherit" medium>fal fa-album-collection</v-icon>
      <span class="my-1" >playlists</span>
    </h2>
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
  font-size: 0.9em;
  cursor: pointer;
}
.brown-text {
  color: #997b6f;
}
.active, .green-text, .h-nav-item:hover {
  color: #00bea6;
}

</style>

