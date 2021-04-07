<template>
  <div class="min-h-screen flex flex-col items-center mt-24 bg-gray-900">
    <div class="container mx-auto">
      <div class="flex justify-center px-6 my-12">
        <div class="w-full xl:w-3/4 lg:w-11/12 flex">
          <div
            class="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-lg"
            style="background-image: url('https://images.unsplash.com/photo-1604882355165-4450cb6155b2?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80')">
          </div>
          <div class="w-full lg:w-7/12 bg-white p-5 rounded-lg lg:rounded-l-none">
            <h1 class="font-medium text-center text-xl sm:text-2xl uppercase text-green-700 mt-3 mb-14">
              Bienvenue sur Groupo'Link
            </h1>
            <div class="relative mb-8 mt-10 h-px bg-gray-300">
              <h2 class="absolute left-0 top-0 flex justify-center w-full -mt-2">
                <span class="bg-white px-4 text-xs text-gray-500 uppercase">
                  Informations
                </span>
              </h2>
            </div>
            <form class="px-8 py-8 mb-4 bg-white rounded">
              <div class="text-center text-gray-800">
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
                  <button
                    @click="$router.push('/feed')"
                    type="submit"
                    class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-700 hover:bg-green-900 rounded py-2 w-full transition duration-150 ease-in"
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
                        stroke="currentColor">
                        <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </span>
                  </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>