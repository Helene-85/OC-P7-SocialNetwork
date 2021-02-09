<template>
  <img
  :src="avatar"
  alt="avatar"
  />
</template>

<script>
export default {
  name: 'Avatar',
  props: {
    user: {
      type: Object
    }
  },
  computed: {
    avatar() {
    if (this.user.profilPic == '') {
      return '/profile_pic.png'
      }
      return 'http://localhost:3000/images/' + this.user.profilPic
    }
  },
}
</script>