<template>
  <header class="container mx-auto border-b-2 border-green-400 bg-gray-900">
    <nav class="flex items-center justify-between flex-wrap p-6">
      <div class="flex items-center flex-no-shrink text-white mr-6">
        <a href="http://localhost:8080/welcome">
          <img width="158" height="78" src="../assets/icon-white.png" alt="groupomania-logo"/>
        </a>
      </div>
      <div class="block lg:hidden">
        <button 
        class="flex items-center px-3 py-2 border rounded text-teal-lighter bg-green-400 border-teal-light hover:text-white hover:border-white"
        aria-label="Cliquer sur menu">
          <svg
            class="h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <router-link 
            to="/feed"
            v-if="isConnected"
            href="http://localhost:8080/feed"
            class="block mt-4 lg:inline-block lg:mt-0 text-lg text-teal-lighter text-green-400 hover:text-white mr-4"
            aria-label="Accéder aux articles">
            Groupo'Link
          </router-link>
          <router-link 
            to="/profile/:id"
            v-if="isConnected"
            href="http://localhost:8080/profile/:id"
            class="block mt-4 lg:inline-block lg:mt-0 text-lg text-teal-lighter text-white hover:text-green-400"
            aria-label="Accéder à mon compte">
            Mon compte
          </router-link>
          <router-link 
            to="/Users"
            v-if="isConnected"
            href="http://localhost:8080/Users"
            class="block ml-4 mt-4 lg:inline-block lg:mt-0 text-lg text-teal-lighter text-white hover:text-green-400"
            aria-label="Accéder à la page membres">
            Membres
          </router-link>
        </div>
        <div>
          <a
            v-if="isConnected"
            @click="logout()"
            href="#"
            class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:text-green-400 mt-4 lg:mt-0"
            aria-label="Se déconnecter">
            Se déconnecter
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    isConnected: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    logout() {
      localStorage.clear();
      window.location.href='/'
    }
  }
}
</script>