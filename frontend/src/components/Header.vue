<template>
     <div class="header-top">
        <nav class="navbar navbar-dark bg-dark">
            <router-link to="/">
            <a class="navbar-brand ml-3" href="#">
                <img src="../assets/icon-left-font-monochrome-white.png" width="250" class="d-inline-block align-top" alt="" loading="lazy">
            </a>
            </router-link>
            <ul class="nav justify-content-end mr-3">
                <li class="nav-item">
                    <router-link to="/">
                        <a class="nav-link" href="#">Link</a>
                    </router-link>
                </li>
               <li class="nav-item">
                    <router-link to="/">
                        <a class="nav-link" href="#">Link</a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/">
                        <a class="nav-link" href="#">Link</a>
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/">
                        <a class="nav-link" href="#">Link</a>
                    </router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Header',
}
</script>

<style scoped>

</style>