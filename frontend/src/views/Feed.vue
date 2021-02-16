<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-900"
  >
    <h1 class="mt-12 text-2xl text-center text-white">
    Bienvenue <span class="text-green-500 uppercase">{{ pseudo }}</span> !
    </h1>
    <newMessage @added="add"></newMessage>
    <div v-for="message in messages" :key="message.id">
      <message :item="message"></message>>
    </div>
  </div>
</template>

<script>
import http from '../http';
import NewMessage from '@/components/NewMessage.vue'
import Message from '@/components/Message.vue'

export default {
  name: 'feed',
  created() {
  this.token = sessionStorage.getItem('token');
  this.pseudo = sessionStorage.getItem('pseudo');
  },
  components: {
    newMessage: NewMessage,
    message: Message
  },
  data() {
    return {
      pseudo: 'Pseudo',
      messages: []
    }
  },
  mounted() {
    http
      .get('/messages/')
      .then(res => {
        this.messages = res.data
      })
    },
  methods: {
    add(message) {
      this.messages.push(message)
    }
  }
}
</script>

<style scoped></style>
