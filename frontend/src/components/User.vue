<template>
 <div class="min-h-screen bg-gray-900 m-6 flex flex-col">
    <div class="-my-2 mt-12 overflow-x-auto sm:-mx-6 lg:-mx-8">
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
                  Adresse email
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
                        Email@email.com
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">
                    Pseudo</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-purple-600">
                  Admin
                </td>
                 <td
                  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
                >
                  <a href="#" class="text-green-500 hover:text-green-700"
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

export default {
  name: 'user',
  data() {
    return {
      profilPic: '',
      email: '',
      pseudo: '',
      isAdmin: ''
    }
  }
}
</script>

<style scoped></style>
