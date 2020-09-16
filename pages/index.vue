<template>
  <div class="min-w-full min-h-full">
    <div
      class="w-56 border-r fixed flex flex-col items-center min-h-screen p-8"
    >
      <p v-if="user">{{ user.username }}</p>
      <button
        class="rounded-full h-button w-button m-2 shadow-light-button text-light-font font-extrabold text-sm focus:outline-none active:shadow-none transition-shadow ease-in-out duration-100"
        @click="logout"
      >
        Logout
      </button>
      <button
        class="rounded-full h-button w-button m-2 shadow-light-button text-light-font font-extrabold text-sm focus:outline-none active:shadow-none transition-shadow ease-in-out duration-100"
        @click="createPrivateNote"
      >
        Create
      </button>
      <div v-for="privateNote in privateNotes()" :key="privateNote.id">
        <button
          class="rounded-lg h-button w-button m-2 shadow-light-button text-light-font font-extrabold text-sm focus:outline-none active:shadow-none transition-shadow ease-in-out duration-100"
          @click="openPrivateNote(privateNote)"
        >
          {{ privateNote.title }}
        </button>
      </div>
    </div>
    <main class="w-auto h-auto ml-56 flex flex-col p-8">
      <button
        class="rounded-full h-button w-button m-2 shadow-light-button text-light-font font-extrabold text-sm focus:outline-none active:shadow-none transition-shadow ease-in-out duration-100"
        @click="removePrivateNote"
      >
        削除
      </button>
      <input
        v-model="title"
        v-debounce:300ms="updatePrivateNote"
        class="rounded-lg h-input m-2 shadow-light-input text-light-font font-extrabold text-sm"
        type="text"
        name="title"
      />
      <textarea
        v-model="content"
        v-debounce:300ms="updatePrivateNote"
        class="rounded-lg h-64 m-2 shadow-light-input text-light-font font-extrabold text-sm"
        name="content"
        cols="30"
        rows="10"
      ></textarea>
    </main>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  asyncData({ store }) {
    store.dispatch('privateNote/loadPrivateNote')
  },
  data() {
    return {
      id: '',
      title: '',
      content: '',
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      privateNotes: 'privateNote/privateNotes',
    }),
  },
  created() {},
  methods: {
    username() {
      console.log(this.user)
      return this.user.username
    },
    logout() {
      this.$auth.signOut()
    },
    openPrivateNote({ id, title, content }) {
      if (this.openingId === id) return

      this.id = id
      this.title = title
      this.content = content
    },
    createPrivateNote() {
      this.$store.dispatch('privateNote/addPrivateNote')
    },
    updatePrivateNote() {
      if (!this.id || !this.title) return
      this.$store.dispatch('privateNote/updatePrivateNote', {
        id: this.id,
        title: this.title,
        content: this.content,
      })
    },
    removePrivateNote() {
      this.$store.dispatch('privateNote/removePrivateNote', { id: this.id })
      this.id = ''
      this.title = ''
      this.content = ''
    },
  },
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
