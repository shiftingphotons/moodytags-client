<template>
  <div>
    <v-dialog
      v-model="menu"
      width="420"
      :close-on-content-click="false"
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
          <v-icon small>fal fa-tags</v-icon>
        </v-btn>
      </template>
        <v-card>
          <v-autocomplete
            class="pa-4"
            v-model="playlist.tags"
            :items="tags"
            append-icon="fal fa-caret-down"
            item-text="name"
            item-value="name"
            color="blue-grey lighten-2"
            chips
            multiple
            :search-input.sync="searchInput"
            @change="searchInput = null;"
            :menu-props="{closeOnContentClick:true}"
          >
            <template v-slot:selection="data">
              <v-chip
                v-bind="data.attrs"
                :input-value="data.selected"
                close
                close-icon="fal fa-times-circle"
                @click="data.select"
                @click:close="removeTag(data.item.name)"
              >
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template>
                <v-list-item-icon>
                  <v-icon size="medium">fal fa-hashtag</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-html="data.item.name"></v-list-item-title>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="tagPlaylist(playlist.id)" text>Save</v-btn>
            <v-btn color="primary" @click="closeDialog" text>Close</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: "TagMenu",
  data: function() {
    return {
      menu: false,
      originalTags: [...this.playlist.tags],
      searchInput: null
    }
  },
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
    closeDialog: function() {
      this.playlist.tags = [...this.originalTags]
      this.menu = false;
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
<style>
.v-select-list > .v-subheader {
  font-weight: 800;
}
</style>
