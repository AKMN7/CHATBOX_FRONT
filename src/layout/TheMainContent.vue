<template>
    <div>
        <the-header/>
        <the-side-bar/>
        <section class="main_content">
            <router-view v-slot="slotProps" :key="this.$route.path">
                <transition name="route" mode="out-in">
                    <component :is="slotProps.Component"></component>
                </transition>
            </router-view>
        </section>
    </div>
</template>

<script>
import TheHeader from "./TheHeader.vue";
import TheSideBar from "./sidebar/TheSideBar.vue";
export default {
    components: {
        TheHeader,
        TheSideBar
    }
}
</script>