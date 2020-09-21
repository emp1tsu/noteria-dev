import firebase from 'firebase/app'
import 'firebase/auth'

const getCurrentUser = () => {
  return new Promise((resolve) => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      resolve(user)
      unsubscribe()
    })
  })
}

export default getCurrentUser
