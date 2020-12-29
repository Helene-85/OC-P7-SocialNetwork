<template>
  <div class="w-full">
    <h1 class="mt-12 text-2xl text-center text-white">
      Bienvenue <span class="text-green-500 uppercase">{{ pseudo }}</span> !
    </h1>
    <div class="mx-auto px-4 py-8 max-w-xl mt-5 w-full">
      <div class="bg-white rounded-lg tracking-wide">
        <div class="px-4 py-2 mt-2">
          <div class="author flex items-center -ml-3 my-3">
            <div class="user-logo">
              <img
                class="w-12 h-12 object-cover rounded-full mx-4  shadow"
                src="../assets/profile_pic.png"
                alt="avatar"
              />
            </div>
            <h2 class="text-sm tracking-tighter text-gray-900">
              <a href="#">{{ pseudo }}</a>
              <span class="text-gray-600">{{ date }}</span>
            </h2>
          </div>
          <form class="w-full max-w-xl bg-white rounded-lg px-4 py-1">
            <div class="w-full md:w-full px-3 mb-3 mt-3">
              <textarea
                class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
                name="body"
                placeholder="Écrivez votre message"
                required
              ></textarea>
            </div>
            <div class="flex items-center mb-6 -mt-4 mr-3">
              <div class="flex ml-auto">
                <a
                  href="#"
                  class="inline-flex text-xs sm:text-sm text-green-500 hover:text-green-700"
                  >Ajouter une image</a
                >
              </div>
            </div>
            <div class="w-full md:w-full flex items-start md:w-full px-3 mb-2">
              <button
                type="submit"
                class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-500 hover:bg-green-700 rounded py-2 w-full transition duration-150 ease-in"
              >
                <span class="mr-2 uppercase">Envoyer</span>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'virginMessage',
  data() {
    return {
      pseudo: 'Pseudo'
    }
  },
  components: {}
}
</script>

<style scoped></style>
