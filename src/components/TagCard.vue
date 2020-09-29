<template>
  <v-card
    class="ma-3"
    color="#385F73"
    cols="6"
    max-height="300"
    width="480"
    dark
  >
    <v-card-title class="headline">
      {{ tag.name }}
    </v-card-title>

    <v-card-text>
      <v-btn icon
          height="40px"
          width="40px"
          v-if="editable"
          @click="addChip">
        <v-icon small>fa-plus-circle</v-icon>
      </v-btn>
      <v-chip
        v-for="(name, index) in tag.tags"
        :key="index"
        class="ma-2"
        @click:close="removeTag(index)"
        color="white"
        :close="editable ? true : false"
        outlined
      >
        {{ name }}
      </v-chip>
    </v-card-text>

    <v-card-actions v-bind:class="{ 'd-flex justify-center': editable }">
      <v-btn icon
          v-if="!editable"
          @click="edit"
          class="ml-1 mt-3">
        <v-icon>far fa-edit</v-icon>
      </v-btn>
      <v-btn class="mb-1 mt-5 mr-12"
          v-if="editable"
          @click="save"
          outlined
          bottom
          color="green"
          small>
        <v-icon class="ma-2" small>fa-check</v-icon>
        Save
      </v-btn>
      <v-btn class="mb-1 mt-5 ml-12"
          v-if="editable"
          @click="cancel"
          outlined
          bottom
          color="red"
          small>
        <v-icon class="ma-2" small>fa-minus</v-icon>
        Cancel
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  const axios = require('axios');

  export default {
    name: "TagCard",
    data: () => ({
      editable: false,
    }),
    props: ['tag'],
    methods: {
      edit: function() {
        this.editable = true
        this.prev = this.tag
        console.log(this.prev)
      },
      addChip: function() {
        var tag = window.prompt('How should the tag be named?')
        if (tag && tag.length > 0) {
          if (this.tag.tags) {
            this.tag.tags.push(tag)
          } else {
            this.tag.tags = [tag]
          }
        }
      },
      removeTag: function(index) {
        this.tag.tags.splice(index, 1)
      },
      save: function() {
        console.log(this.tag)
      },
      cancel: function() {
        console.log(this.prev)
        this.editable = false
        this.tag = this.prev
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
