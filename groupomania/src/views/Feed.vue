<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center bg-gray-900"
  >
    <virginMessage></virginMessage>
    <message></message>
  </div>
</template>

<script>
import VirginMessage from '@/components/VirginMessage.vue'
import Message from '@/components/Message.vue'
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
  }
}
</script>

<style scoped></style>
