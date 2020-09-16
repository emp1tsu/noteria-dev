import firebase from 'firebase/app'
import 'firebase/auth'

export default function ({ route, store, redirect }) {
  firebase.auth().onAuthStateChanged((user) => {
    console.log('onAuthStateChanged', user)
    if (user) {
      store.dispatch('setUser', { user })
    } else if (route.name !== 'login') {
      redirect('/login')
    }
  })
}
