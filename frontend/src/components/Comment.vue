<template>
    <div>
        <p class="text-green-700">{{ commentaire.comment_pseudo }}</p>
        <p class="w-full md:w-full flex items-start md:w-full px-3 rounded py-2 bg-gray-100">{{ commentaire.comment_content }}</p>
        <a 
            v-if="isTheAdmin" 
            class="text-red-600 absolute top-10 right-2" 
            href="#"
            @click.prevent="deleteComment(commentaire.comment_id)"
            ><i class="fas fa-times"></i>
        </a>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import http from '../http';
import Avatar from './Avatar.vue';

export default {
    components: { Avatar },
    name: 'comment',
    props: { 
        commentaire : {
            type: Object
        }
    },
      computed: {
    ...mapState(['user']),
    isTheAdmin() {
      if(this.user.isAdmin) {
        return true;
      }
      return false
      }
  },
}
</script>