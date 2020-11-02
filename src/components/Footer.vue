<template>
  <div class="d-flex row">
    <v-col
      class="align-self-end text-right max-1280 mx-auto"
      cols="12"
    >
      <span class="version-text">Moody tags v{{ $root.version }}</span>
    </v-col>
  </div>
</template>

<script>

export default {
  name: 'Footer',
  data () {
    return {}
  }
}
</script>
<style scoped>
.max-1280 {
  max-width: 1280px;
}
.version-text {
  font-size: 0.85em;
}
</style>
