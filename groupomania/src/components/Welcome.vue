<template>
  <div class="min-h-screen flex flex-col items-center mt-24 bg-gray-900">
    <div class="container mx-auto">
    <div class="flex justify-center px-6 my-12">
      <div class="w-full xl:w-3/4 lg:w-11/12 flex">
        <div
          class="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
          style="background-image: url('https://cdn.pixabay.com/photo/2016/01/19/17/42/buildings-1149851_960_720.jpg')"
        ></div>
        <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
          <div
            class="font-medium text-center text-xl sm:text-2xl uppercase text-gray-800 mt-3 mb-14"
          >
            Bienvenue sur Groupo'Link
          </div>
          <div class="relative mb-8 mt-10 h-px bg-gray-300">
            <div class="absolute left-0 top-0 flex justify-center w-full -mt-2">
              <span class="bg-white px-4 text-xs text-gray-500 uppercase"
                >Informations</span
              >
            </div>
          </div>
          <form class="px-8 py-8 mb-4 bg-white rounded">
            <div class="text-center">
              <p class="mb-10">
                L'admin veille au respect des individus et de l'entreprise.
              </p>
              <p class="mb-10">
                Merci de rester bienveillant à l'égard de vos collègues et de
                Groupomania.
              </p>
              <p class="mb-20">
                Commencez dès maintenant à partager des messages, avec ou sans
                image.
              </p>
              <router-link to="/feed">
                <button
                  type="submit"
                  class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-500 hover:bg-green-700 rounded py-2 w-full transition duration-150 ease-in"
                >
                  <span class="mr-2 uppercase">Poster un message</span>
                  <span>
                    <svg
                      class="h-6 w-6"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </span>
                </button>
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data() {
    return {
      pseudo: 'Welcome'
    }
  },
  components: {}
}
</script>

<style scoped></style>
