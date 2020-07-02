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
      addTag: function(tag) {
        this.playlist.tags.push(tag)
        // this[tag.parent].splice(index, 1)
      },
      removeTag: function(tag, index) {
        this.playlist.tags.splice(index, 1)
        // this[tag.parent].push(tag)
      },
      tagPlaylist: function(ext_id) {
        var tags = this.playlist.tags.map(t => t.tag)
				axios({
					method: 'post',
					url: 'http://localhost:3000/api/v1/taggables',
					data: {
						ext_id: ext_id,
						tags: tags,
					},
					withCredentials: true
				});
        this.menu = false;
      }
    }
  }
</script>


<style scoped>
</style>
