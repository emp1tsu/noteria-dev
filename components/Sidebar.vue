<template>
  <div class="w-56 border-r fixed min-h-screen pt-8">
    <input type="button" value="Create" />
    <div v-for="privateNote in privateNotes()" :key="privateNote.id">
      {{ privateNote.title }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Sidebar',
  data() {
    return {
      title: '',
    }
  },
  computed: {
    ...mapGetters({
      privateNotes: 'privateNote/privateNotes',
    }),
  },
  methods: {},
}
</script>

<style></style>
