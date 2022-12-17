<template>
	<div class="user-profile">
		<div class="bg-darkGrey shadow rounded-lg p-8 w-fit flex flex-col items-center justify-between md:flex-row">
			<profile-image :user-image="authStore.profilePic" />
			<edit-info :name="authStore.name" :email="authStore.email" />
		</div>
		<user-invites :invites="mainStore.getInvites" />
	</div>
</template>

<script>
	import ProfileImage from "./ProfileImage.vue";
	import EditInfo from "./EditInfo.vue";
	import UserInvites from "./UserInvites.vue";
	import { useAuthStore } from "../../stores/auth";
	import { useMainStore } from "../../stores/main";
	export default {
		components: {
			ProfileImage,
			EditInfo,
			UserInvites,
		},
		setup() {
			const authStore = useAuthStore();
			const mainStore = useMainStore();
			mainStore.updateCurrentChat({
				name: "Profile",
				profilePic:
					"https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png",
			});
			return { authStore, mainStore };
		},
	};
</script>

<style scoped>
	.user-profile {
		height: max-content;
		width: 100%;
		display: grid;
		margin-top: 12px;
		gap: 30px;
		align-content: center;
		justify-content: center;
	}
</style>
