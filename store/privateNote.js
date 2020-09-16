export const state = () => ({
  privateNotes: [],
})

export const mutations = {
  LOAD_PRIVATENOTES(state, privateNotes) {
    state.privateNotes = privateNotes
  },
  ADD_PRIVATENOTE(state, privateNote) {
    state.privateNotes.push(privateNote)
  },
  UPDATE_PRIVATENOTE(state, privateNote) {
    const index = state.privateNotes.findIndex((n) => n.id === privateNote.id)
    state.privateNotes.splice(index, 1, privateNote)
  },
  REMOVE_PRIVATENOTE(state, id) {
    state.privateNotes = state.privateNotes.filter((n) => n.id !== id)
  },
}

export const actions = {
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
    commit('LOAD_PRIVATENOTES', privateNotes)
  },
  addPrivateNote({ commit }) {
    const newPrivateNote = {
      id: Math.random().toString(32).substring(2), // ぜったいにあとでなおす
      title: '無題',
      content: '',
      updatedAt: new Date(),
    }
    commit('ADD_PRIVATENOTE', newPrivateNote)
  },
  updatePrivateNote({ commit }, privateNote) {
    privateNote.updatedAt = new Date()
    commit('UPDATE_PRIVATENOTE', privateNote)
  },
  removePrivateNote({ commit }, { id }) {
    commit('REMOVE_PRIVATENOTE', id)
  },
}

export const getters = {
  privateNotes: (state) => () => state.privateNotes,
  privateNoteById: (state) => (id) =>
    state.privateNotes.find((privateNote) => privateNote.id === id),
}
