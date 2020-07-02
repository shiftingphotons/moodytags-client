<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="indigo"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Tags
        </v-btn>
      </template>
      <v-card>
          <v-btn v-on:click="createTaggable(playlist.id)" color="primary" text>Tag test</v-btn>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>Done</v-btn>
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
    props: ['playlist'],
    methods: {
      createTaggable: function(ext_id) {

				axios({
					method: 'post',
					url: 'http://localhost:3000/api/v1/taggables',
					data: {
						ext_id: ext_id,
						tags: ["night"],
					},
					withCredentials: true
				});
      }
    }
  }
</script>


<style scoped>
</style>
