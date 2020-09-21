export const state = () => ({
  folders: [],
  privateNotes: [],
})

export const mutations = {
  loadFolder(state, folders) {
    state.folders = folders
  },
  addFolder(state, folder) {
    state.folders.push(folder)
  },
  updateFolder(state, folder) {
    const index = state.folders.findIndex((f) => f.id === folder.id)
    state.folders.splice(index, 1, folder)
  },
  removeFolder(state, id) {
    state.folders = state.folders.filter((f) => f.id !== id)
  },
  loadPrivateNotes(state, privateNotes) {
    state.privateNotes = privateNotes
  },
  addPrivateNote(state, privateNote) {
    state.privateNotes.push(privateNote)
  },
  updatePrivateNote(state, privateNote) {
    const index = state.privateNotes.findIndex((n) => n.id === privateNote.id)
    state.privateNotes.splice(index, 1, privateNote)
  },
  removePrivateNote(state, id) {
    state.privateNotes = state.privateNotes.filter((n) => n.id !== id)
  },
}

export const actions = {
  async loadFolder({ commit, rootGetters }) {
    await this.$firestore
      .collection('users')
      .doc(rootGetters.user.uid)
      .collection('folders')
      .onSnapshot((serverupdate) => {
        const folders = serverupdate.docs.map((_doc) => {
          const data = _doc.data()
          data.id = _doc.id
          return data
        })
        commit('loadFolder', folders)
      })
  },
  async addFolder({ commit, rootGetters }) {
    await this.$firestore
      .collection('users')
      .doc(rootGetters.user.uid)
      .collection('folders')
      .add({
        name: '無題のフォルダ',
        updatedAt: this.$firebase.firestore.FieldValue.serverTimestamp(),
      })
  },
  async updateFolder({ commit, rootGetters }, { id, name }) {
    await this.$firestore
      .collection('users')
      .doc(rootGetters.user.uid)
      .collection('folders')
      .doc(id)
      .set({
        name,
        updatedAt: this.$firebase.firestore.FieldValue.serverTimestamp(),
      })
  },
  async removeFolder({ commit, rootGetters }, { id }) {
    await this.$firestore
      .collection('users')
      .doc(rootGetters.user.uid)
      .collection('folders')
      .doc(id)
      .delete()
  },
  loadPrivateNote({ commit }) {
    const privateNotes = [
      {
        id: 1,
        title: 'title1',
        content: 'test1',
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: 'title2',
        content: 'test2',
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: 'title3',
        content: 'test3',
        updatedAt: new Date(),
      },
    ]
    commit('loadPrivateNotes', privateNotes)
  },
  addPrivateNote({ commit }) {
    const newPrivateNote = {
      id: Math.random().toString(32).substring(2), // ぜったいにあとでなおす
      title: '無題',
      content: '',
      updatedAt: new Date(),
    }
    commit('addPrivateNote', newPrivateNote)
  },
  updatePrivateNote({ commit }, privateNote) {
    privateNote.updatedAt = new Date()
    commit('updatePrivateNote', privateNote)
  },
  removePrivateNote({ commit }, { id }) {
    commit('removePrivateNote', id)
  },
}

export const getters = {
  folders: (state) => () => state.folders,
  privateNotes: (state) => () => state.privateNotes,
  privateNoteById: (state) => (id) =>
    state.privateNotes.find((privateNote) => privateNote.id === id),
}
