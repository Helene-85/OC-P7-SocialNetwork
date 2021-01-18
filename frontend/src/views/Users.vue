<template>
  <div
    :is-admin="isAdmin"
    class="min-h-screen bg-gray-900 m-6 flex flex-col">
    <h1 class="mt-12 text-2xl text-center text-white">
    Découvrez les membres de <span class="uppercase text-green-500">Groupo'link</span>
    </h1>
    <div 
      v-for="user of users"
      :user="user"
      class="-my-2 mt-12 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="flex justify-center py-5 align-middle inline-block min-w-3/4 sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Pseudo
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Role
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img
                        class="h-10 w-10 rounded-full"
                        src="../assets/profile_pic.png"
                        alt="profil-pic"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm text-gray-500">
                        {{ user.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    {{ user.pseudo }} 
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                  {{ user.admin }}
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <a
                    v-if="isTheAdmin"
                    href="#" class="text-green-500 hover:text-green-700"
                    >Supprimer</a
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'users',
   props: {
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    user: "",
    users: [],
    }
  },
  computed: {
    isTheAdmin() {
      if(sessionStorage.getItem('isAdmin') == 1) {
        return true;
      }
      return false
      }
  },
  created() {
    axios
      .get('http://localhost:3000/api/auth/users')
      .then((res) => {
        (this.users = res.data.users)
      })
      .catch(() => {
        console.log('Impossible d\'afficher les users')
      })
  }
}
</script>

<style scoped></style>