<template>
    <div class="min-h-screen flex flex-col items-center bg-gray-900 text-white text-2xl mt-20">
        <h1>Oops!</h1>
        <h2 class="mt-12 mb-12">La {{ resource }} que vous cherchez n'existe pas :/</h2>
        <router-link to="/welcome" class="text-green-500">
        Retournez à l'accueil
        </router-link>
    </div>
</template>

<script>
export default {
    props: {
        resource: {
            type: String,
            required: true,
            default: 'page'
        }
    }
}
</script>