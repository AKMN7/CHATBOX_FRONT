<template>
    <div class="user-profile">
        <div class="bg-darkGrey shadow rounded-lg p-8 w-fit flex flex-col items-center justify-between md:flex-row">
            <profile-image/>
            <edit-info/>
        </div>
    </div>
</template>

<script>
import ProfileImage from './ProfileImage.vue';
import EditInfo from './EditInfo.vue';
export default {
    components: {
        ProfileImage,
        EditInfo
    }
}
</script>

<style scoped>
.user-profile{
    height: calc(100vh - 100px);
    width: 100%;
    display: grid;
    align-content: center;
    justify-content: center;
}
</style>