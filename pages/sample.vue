<template>
  <div class="font-sans antialiased h-screen flex">
    <!-- Sidebar -->
    <div
      class="bg-indigo-900 flex-none h-full w-56 pb-6 hidden md:block overflow-y-scroll"
    >
      <div class="text-white mb-2 mt-3 px-4 flex justify-between">
        <div class="flex-auto mb-6">
          <h1
            v-if="user"
            class="font-semibold text-xl leading-tight mb-1 truncate"
          >
            {{ user.username }}
          </h1>
        </div>
      </div>
      <div class="mb-8">
        <div class="px-4 mb-2 text-white flex justify-between items-center">
          <div class="opacity-75">フォルダ一覧</div>
          <div @click="createFolder">
            <svg
              class="fill-current h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
              />
            </svg>
          </div>
        </div>
        <div class="flex flex-col">
          <div v-for="folder in folders()" :key="folder.id">
            <div
              class="flex items-center mb-3 px-4"
              @click="selectFolder(folder)"
            >
              <span
                class="bg-green border border-white rounded-full block w-2 h-2 mr-2"
              ></span>
              <span class="text-white opacity-75">{{ folder.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Sidebar2 -->
    <div class="bg-indigo-700 flex-none w-64 pb-6 hidden md:block">
      <div class="m-4">
        <div class="px-4 mb-2 text-white flex justify-between items-center">
          <div class="opacity-75">ノート一覧</div>
          <div @click="createPrivateNote">
            <svg
              class="fill-current h-4 w-4 opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
              />
            </svg>
          </div>
        </div>
        <div v-for="privateNote in privateNotes()" :key="privateNote.id">
          <div
            class="flex items-center mb-3 px-4"
            @click="openPrivateNote(privateNote)"
          >
            <span
              class="bg-green border border-white rounded-full block w-2 h-2 mr-2"
            ></span>
            <span class="text-white opacity-75">{{ privateNote.title }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="flex-1 flex flex-col bg-white overflow-hidden">
      <!-- Title -->
      <div class="border-b flex px-6 py-2 items-center flex-none">
        <input
          v-model="privateNoteTitle"
          v-debounce:300ms="updatePrivateNote"
          type="text"
          placeholder="タイトルを入力してください"
          class="appearance-none border border-grey rounded-lg w-full px-4 py-2"
        />
      </div>
      <!-- Content -->
      <div class="py-4 px-6 h-full">
        <textarea
          v-model="privateNoteContent"
          v-debounce:300ms="updatePrivateNote"
          class="rounded-lg border-2 border-grey resize-none w-full h-full py-2 px-4"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  asyncData({ store }) {
    store.dispatch('privateNote/loadFolder')
  },
  data() {
    return {
      selectedFolder: {},
      privateNoteId: '',
      privateNoteTitle: '',
      privateNoteContent: '',
    }
  },
  computed: {
    ...mapGetters({
      user: 'user',
      privateNotes: 'privateNote/privateNotes',
      folders: 'privateNote/folders',
    }),
  },
  watch: {
    selectedFolder(newVal, oldVal) {
      this.$store.dispatch('privateNote/loadPrivateNote', { id: newVal.id })
    },
  },
  methods: {
    username() {
      return this.user.username
    },
    logout() {
      this.$auth.signOut()
    },
    selectFolder(folder) {
      this.selectedFolder = folder
    },
    createFolder() {
      this.$store.dispatch('privateNote/addFolder')
    },
    updateFolder({ id, name }) {
      if (!this.folderId) return
      this.$store.dispatch('privateNote/updateFolder', {
        id,
        name,
      })
    },
    removeFolder({ id }) {
      this.$store.dispatch('privateNote/removeFolder', {
        id,
      })
    },
    openPrivateNote({ id, title, content }) {
      if (this.openingId === id) return

      this.privateNoteId = id
      this.privateNoteTitle = title
      this.privateNoteContent = content
    },
    createPrivateNote() {
      this.$store.dispatch('privateNote/addPrivateNote')
    },
    updatePrivateNote() {
      if (!this.privateNoteId || !this.privateNoteTitle) return
      this.$store.dispatch('privateNote/updatePrivateNote', {
        id: this.privateNoteId,
        title: this.privateNoteTitle,
        content: this.privateNoteContent,
      })
    },
    removePrivateNote() {
      this.$store.dispatch('privateNote/removePrivateNote', {
        id: this.privateNoteId,
      })
      this.privateNoteId = ''
      this.privateNoteTitle = ''
      this.privateNoteContent = ''
    },
  },
}
</script>

<style></style>
