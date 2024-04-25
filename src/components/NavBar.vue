<template>
    <nav>
        <ul>
            <li><router-link to="/" active-class="active">Home</router-link></li>
            <li><router-link to="/other-page" active-class="active">Other Page</router-link></li>
        </ul>
    </nav>
</template>

<script>
</script>

<style scoped>
nav {
    @apply p-10;
}

ul {
    @apply m-0 p-0 list-none flex flex-row gap-5;
}

.active {
    @apply text-amber-900 font-semibold;
}

</style>
