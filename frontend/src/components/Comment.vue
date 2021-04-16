<template>
    <div>
      <p class="text-green-700">{{ commentaire.comment_pseudo }}</p>
      <p class="w-full md:w-full flex items-start md:w-full px-3 rounded py-2 bg-gray-100">{{ commentaire.comment_content }}</p>
      <a 
        v-if="this.user.isAdmin" 
        class="text-red-600 absolute top-10 right-1 cursor-pointer"
        @click.prevent="deleteComment(commentaire.comment_id)"
        aria-label="Supprimer le commentaire">
        <i class="fas fa-trash-alt"></i>
      </a>
    </div>
</template>

<script>
import http from '../http';
import { mapState } from 'vuex';
import Avatar from './Avatar.vue';

export default {
    components: { Avatar },
    name: 'comment',
    // On récupère l'objet commentaire en tant que props
    props: { 
      commentaire : {
          type: Object
      }
    },
    computed: {
    ...mapState(['user']),
  },
  methods: {
    deleteComment(id) {
      http
        .delete(`/comments/${id}`)
        .then(res => {
          alert('Le commentaire a correctement été supprimé')
          this.$emit('refresh')
      })
    }
  }
}
</script>