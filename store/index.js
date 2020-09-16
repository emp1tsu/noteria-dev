export const state = () => ({
  user: null,
})

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
}

export const actions = {
  setUser({ commit }, { user }) {
    commit('setUser', {
      uid: user.uid,
      username: user.displayName,
      email: user.email,
    })
  },
  logout({ commit }) {},
}

export const getters = {
  user: (state) => state.user,
  isAuthenticated(state) {
    return !!state.user
  },
}
