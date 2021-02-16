<template>
  <div class="mx-auto px-4 py-8 max-w-xl my-2">
    <div class="bg-white rounded-lg mb-6 relative tracking-wide">
       <a v-if="isTheAdmin" class="text-red-600 absolute top-5 right-5"href="#"
            ><i class="fas fa-trash-alt"></i></a
          >
      <div class="md:flex-shrink-0">
        <img
          src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg"
          alt="mountains"
          class="w-full h-64 rounded-lg rounded-b-none object-cover"
        />
      </div>
      <div class="px-4 py-2 mt-2">
        <div class="author flex items-center -ml-3 my-3">
          <div class="user-logo">
            <img
              class="w-12 h-12 object-cover rounded-full mx-4  shadow"
              src="profile_pic.png"
              alt="avatar"
            />
          </div>
          <p class="text-sm tracking-tighter text-gray-900">
            <a class="text-green-700" href="/profile/:id"><span class="text-gray-900">By</span> {{ pseudo }}</a>
            <span class="text-gray-600">{{ date }}</span>
          </p>
        </div>
        <p class="mt-4 text-m text-gray-700 px-2 mr-1">
          {{ item.content }}
        </p>
        <div class="flex ml-3 mt-4 mb-4 space-x-3">
          <a href="#"
            ><span><i class="far fa-thumbs-up  text-green-700"></i> 0</span></a
          >
          <a href="#"
            ><span><i class="far fa-thumbs-down text-red-600"></i></i> 0</span></a
          >
        </div>
        <form class="w-full max-w-xl bg-white rounded-lg px-4">
          <div class="w-full md:w-full px-3 mb-2 mt-2">
            <textarea
              class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white"
              name="body"
              placeholder="Écrivez un commentaire"
              v-model="comment"
              required
            ></textarea>
          </div>
          <div class="w-full md:w-full flex items-start md:w-full px-3 mb-2">
            <button
              type="button"
              class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-700 hover:bg-green-900 rounded py-2 w-full transition duration-150 ease-in"
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
</template>

<script>
export default {
  name: 'message',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => {}
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
}
</script>

<style scoped></style>
