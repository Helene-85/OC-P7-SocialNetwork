<template>
        <div class="user-logo">
            <img
            :src="avatar"
            alt="avatar"
            class="w-12 h-12 object-cover rounded-full mx-4 object-cover shadow"
            />
        </div>
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