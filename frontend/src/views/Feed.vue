<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-900"
  >
    <newMessage></newMessage>
    <message></message>
  </div>
</template>

<script>
import NewMessage from '@/components/NewMessage.vue'
import Message from '@/components/Message.vue'
export default {
  name: 'feed',
  components: {
    newMessage: NewMessage,
    message: Message
  },
  data() {
    return {
      pseudo: 'Pseudo',
      messages: []
    }
  }
}
</script>

<style scoped></style>
