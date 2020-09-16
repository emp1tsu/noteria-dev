<template>
  <button @click="login">Login</button>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    login() {
      const provider = new this.$firebase.auth.GoogleAuthProvider()
      this.$auth.signInWithPopup(provider).then(async (userCredential) => {
        const user = userCredential.user
        if (userCredential.additionalUserInfo.isNewUser) {
          await this.$firestore
            .collection('/users')
            .doc(user.uid)
            .set({ username: user.displayName, email: user.email })
        }
        this.$router.push('/')
      })
    },
  },
}
</script>

<style></style>
