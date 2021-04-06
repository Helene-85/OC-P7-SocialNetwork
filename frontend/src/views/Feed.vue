<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gray-900">
    <h1 class="mt-12 text-2xl text-center text-white">
      Bienvenue
      <span class="text-green-500 uppercase">{{ user.pseudo }}</span> !
    </h1>
    <newMessage @added="add"></newMessage>
    <div v-for="message in messages" :key="message.id">
      <message :item="message" @added="newComment" @refresh="refresh"></message>
    </div>
  </div>
</template>

<script>
import http from '../http';
import NewMessage from '@/components/NewMessage.vue';
import Message from '@/components/Message.vue';
import {mapState} from 'vuex';

export default {
  name: 'feed',
  created() {
  this.token = localStorage.getItem('token');
  this.pseudo = localStorage.getItem('pseudo');
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
    computed: {
    ...mapState(['user']),
  },
  mounted() {
    this.refresh()
  },
  methods: {
    add(message) {
      this.refresh()
    },
    updateReactionsInMessages(tabReaction){
      for(let i in this.messages){

        this.$set(this.messages[i], 'nbReaction_1', 0);
        this.$set(this.messages[i], 'nbReaction_2', 0);
        // Si d'autres réactions

    // Pour chaque message on regarde si il y a des réactions
      for(let j in tabReaction){
        if(tabReaction[j].message_id == this.messages[i].id){
          switch(tabReaction[j].reaction_id){
            case 1 : this.messages[i].nbReaction_1 = tabReaction[j].sumReaction; break;
            case 2 : this.messages[i].nbReaction_2 = tabReaction[j].sumReaction; break;
            // Si d'autres réactions
            }
          }
        }
      }
    },
    refresh() {
      http
      .get('/messages/')
      .then(res => {
        let context = this;
        this.messages = res.data;
        http
        .get('/messages/reactions')
        .then(res => {
          context.updateReactionsInMessages(res.data);
        })
      })
    },
    newComment(comment) {
      let message = this.messages.filter((message) => message.id === comment.message_id)[0];
      message.tabComments.push(comment)
    }
  }
}
</script>