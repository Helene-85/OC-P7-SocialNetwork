<template>
    <div class="min-h-screen flex flex-col items-center bg-gray-900">
        <div class="mx-auto px-4 py-8 max-w-xl my-20">
        <div class="bg-white rounded-lg mb-6 tracking-wide" >
            <div class="md:flex-shrink-0">
                <img src="https://ik.imagekit.io/q5edmtudmz/post1_fOFO9VDzENE.jpg" alt="mountains" class="w-full h-64 rounded-lg rounded-b-none">
            </div>
            <div class="px-4 py-2 mt-2">
                <div class="author flex items-center -ml-3 my-3">
                    <div class="user-logo">
                        <img class="w-12 h-12 object-cover rounded-full mx-4  shadow" src="../assets/profile_pic.png"  alt="avatar">
                    </div>
                    <p class="text-sm tracking-tighter text-gray-900">
                        <a href="#">By {{ pseudo }}</a> <span class="text-gray-600">{{ date }}</span>
                    </p>
                </div>
                <p class="mt-4 text-m text-gray-700 px-2 mr-1">
                    {{ message }}
                </p>
                <div class="flex ml-3 mt-4 mb-4 space-x-3 text-green-700">
                    <a href="#"><span><i class="far fa-thumbs-up"></i> 0</span></a>
                    <a href="#"><span><i class="far fa-heart"></i> 0</span></a>
                    <a href="#"><span><i class="far fa-grin-squint-tears"></i> 0</span></a>
                    <a href="#"><span><i class="far fa-surprise"></i> 0</span></a>
                    <a href="#"><span><i class="far fa-grin-stars"></i> 0</span></a>
                </div>
                <form class="w-full max-w-xl bg-white rounded-lg px-4">
                    <div class="w-full md:w-full px-3 mb-2 mt-2">
                        <textarea class="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-400 focus:outline-none focus:bg-white" name="body" placeholder='Écrivez un commentaire' required></textarea>
                    </div>
                    <div class="w-full md:w-full flex items-start md:w-full px-3 mb-2">
                        <button type="submit" class="flex items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-green-500 hover:bg-green-700 rounded py-2 w-full transition duration-150 ease-in">
                        <span class="mr-2 uppercase">Envoyer</span>
                        <span>
                        <svg class="h-6 w-6" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
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
    name: 'message',
    data() {
        return {
            message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora reiciendis ad architecto at aut placeat quia, minus dolor praesentium officia maxime deserunt porro amet ab debitis deleniti modi soluta similique...',
            pseudo: 'Jane Doe',
            date: '00/00/0000'
        }
    },
}
</script>

<style scoped>

</style>