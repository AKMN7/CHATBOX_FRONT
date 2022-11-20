<template>
    <header class="header bg-darkGrey text-white shadow lg:border-l lg:border-l-grey">
        <div class="sidebar-overlay" @click="toggleMenuOpen"></div>

        <button type="button" class="sidebar-burger" @click="toggleMenuOpen">
            <span class="material-icons">menu</span>
        </button>

        <h1 class="header-title">
            <img src="../assets/person2.jpg" alt="user" class="h-9 w-9 rounded-lg mr-4">
            <p class="tracking-wide">Nicolas Horn ({{store.counter}})</p>
        </h1>

        <router-link to="/app/me" class="profile-btn" title="Profile">
            <span class="material-icons">account_circle</span>
        </router-link>
    </header>
</template>

<script>
import {useAuthStore} from '../stores/auth';
export default {
    setup(){
        const store = useAuthStore();
        const toggleMenuOpen =() => document.body.classList.toggle("open");
        return {toggleMenuOpen, store}
    }
}
</script>