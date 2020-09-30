<template>
  <v-card
    class="ma-3 d-flex flex-column"
    color="#385F73"
    cols="6"
    max-height="380"
    width="480"
    dark
  >

    <v-text-field class="headline tag-name mb-0" flat single-line v-model="tag.name" :readonly="!editable">
      {{ tag.name }}
    </v-text-field>

    <v-card-text class="d-flex justify-start flex-wrap">
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
        small
        color="white"
        :close="editable ? true : false"
        outlined
      >
        {{ name }}
      </v-chip>
    </v-card-text>
    <v-spacer></v-spacer>
    <v-card-actions v-bind:class="{ 'd-flex justify-space-between': editable }">
      <v-btn icon
          v-if="!editable"
          @click="edit"
          bottom
          class="ml-1 mt-3">
        <v-icon>far fa-edit</v-icon>
      </v-btn>
      <v-btn class="mb-3 mt-5 ml-4"
          v-if="editable"
          v-on:click="save"
          outlined
          left
          bottom
          color="green"
          small>
        <v-icon class="ma-2" small>fa-check</v-icon>
        Save
      </v-btn>
      <v-btn class="mb-3 mt-5 mr-4"
          v-if="editable"
          @click="cancel"
          outlined
          right
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
      handleInput: function(e) {
        this.editedTagName = e.target.innerText
      },
      edit: function() {
        this.editable = true
        this.prev = {
          tags: [...this.tag.tags],
          name: this.tag.name
        }
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
        // this.tag.name = this.editedTagName
        this.editable = false
        this.$emit('save')
      },
      cancel: function() {
        this.editable = false
        this.tag.tags = this.prev.tags
        this.tag.name = this.prev.name
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
  .tag-name {
    max-height: 52px;
    border-bottom: solid 1px white;
  }
  .tag-name.v-input--is-readonly {
    border-bottom: 0;
  }
</style>

<style>
  .v-text-field>.v-input__control>.v-input__slot:before { border-style: none !important; }
  .v-text-field>.v-input__control>.v-input__slot:after { border-style: none !important; }
  .tag-name>.v-input__control {
    max-height: 52px;
  }
  .tag-name.v-text-field {
    padding-left: 12px;
    margin-top: 0;
  }
</style>
