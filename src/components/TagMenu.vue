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
          color="white"
          class="ma-1"
          right
          icon
          >
          <v-icon small>fas fa-tags</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>Selected</v-card-title>
        <v-chip-group>
          <v-chip
            v-for="(tag, index) in playlist.tags"
            :key="index"
            class="ma-2"
            @click:close="removeTag(tag, index)"
            close
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
        <v-divider></v-divider>

        <v-chip-group
          v-for="(collection, inde) in tags"
          :key="inde"
          multiple
          column
          >
          <v-card-title>{{ collection.name }}</v-card-title>
          <v-chip
            v-for="(tag, ind) in collection.tags"
            :key="tag"
            :class="playlist.tags.indexOf(tag) != -1 ? 'ma-2 selected' : 'ma-2'"
            @click="addTag(tag, ind)"
          >
            {{ tag }}
          </v-chip>
        </v-chip-group>
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
    }),
    props: ['playlist', 'tags'],
    methods: {
      addTag: function(tag) {
        if (this.playlist.tags.indexOf(tag) != -1) {
          this.removeTag(tag)
          return
        }
        if (this.playlist.tags) {
          this.playlist.tags.push(tag)
        } else {
          this.playlist.tags = [tag]
        }
      },
      removeTag: function(tag, index=undefined) {
        if (index === undefined) {
          index = this.playlist.tags.indexOf(tag)
        }
        this.playlist.tags.splice(index, 1)
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
      }
    }
  }
</script>


<style scoped>
  .selected { background: #00AA95 !important; color: white !important; }
</style>
