<template>
  <div  class="min-h-screen flex flex-col items-center justify-center bg-gray-900">
    <virginMessage></virginMessage>
    <message></message>
  </div>
</template>

<script>
import VirginMessage from '@/components/VirginMessage.vue'
import Message from '@/components/Message.vue'
import MessageService from '@/services/MessageService.js'
export default {
  name: 'feed',
  components: {
    virginMessage: VirginMessage,
    message: Message
  },
  data() {
    return {
      pseudo: 'Pseudo',
      messages: []
    }
  },
  created() {
    MessageService.getMessages()
    .then(response => {
      this.events = response.date
    })
    .catch(error => {
      console.log('Il y a un problème', error.response)
    })
  }
}
</script>

<style scoped>
</style>
