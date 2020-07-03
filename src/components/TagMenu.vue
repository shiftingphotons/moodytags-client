<template>
  <div>
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      max-width="360"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          :color="playlist.tags && playlist.tags.length ? 'blue' : 'gray'"
          @click="cleanupTags"
          class="ma-2 pa-4"
          x-small
          icon
          >
          <v-icon>fa-tags</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Tags</v-card-title>
        <div>
          <v-chip
						v-for="(tag, index) in playlist.tags"
						:key="tag"
            class="ma-2"
            @click:close="removeTag(tag, index)"
            close
          >
            {{ tag }}
          </v-chip>
        </div>
        <v-divider></v-divider>
        <v-card-title>Time of day</v-card-title>
        <div>
          <v-chip
						v-for="(time, index) in times"
						:key="time"
            class="ma-2"
            @click="addTag(time, index)"
          >
            {{ time }}
          </v-chip>
        </div>
        <v-card-title>Mood</v-card-title>
        <div>
          <v-chip
						v-for="(mood, index) in moods"
						:key="mood"
            class="ma-2"
            @click="addTag(mood, index)"
          >
            {{ mood }}
          </v-chip>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="tagPlaylist(playlist.id)" text>Save</v-btn>
          <v-btn color="primary" @click="menu = false" text>Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  const axios = require('axios');

  export default {
    name: "TagMenu",
    data: () => ({
      fav: true,
      menu: false,
      message: false,
      hints: true,
      times: ['morning', 'afternoon', 'night'],
      moods: ['nostalgic', 'lazy', 'inspired'],
    }),
    props: ['playlist'],
    methods: {
      cleanupTags: function() {
        var playlist = this.playlist
        if (this.playlist.tags) {
          this.moods = this.moods.filter(function(mood) {
            return playlist.tags.indexOf(mood) == -1
          })
          this.times = this.times.filter(function(time) {
            return playlist.tags.indexOf(time) == -1
          })
        }
      },
      addTag: function(tag, index) {
        if (this.playlist.tags) {
          this.playlist.tags.push(tag)
        } else {
          this.playlist.tags = [tag]
        }
        this[this.findTagHome(tag)].splice(index, 1)
      },
      removeTag: function(tag, index) {
        this.playlist.tags.splice(index, 1)
        this[this.findTagHome(tag)].push(tag)
      },
      tagPlaylist: function(ext_id) {
        var url, method, data;
        var tags = this.playlist.tags

        if (this.playlist.taggable_id) {
          method = 'patch'
          url = 'http://localhost:3000/api/v1/taggables' + '/' + this.playlist.taggable_id;
          data = {tags: tags};
        } else {
          method = 'post'
          url = 'http://localhost:3000/api/v1/taggables';
          data = {ext_id: ext_id, tags: tags};
        }
        axios({
          method: method,
          url: url,
          data: data,
          withCredentials: true
        });
        this.menu = false;
      },
      findTagHome: function(tag) {
        // I need this to be super basic for now

        if (['morning', 'afternoon', 'night'].indexOf(tag) == -1) {
          return "moods"
        } else {
          return "times"
        }
      }
    }
  }
</script>


<style scoped>
</style>
