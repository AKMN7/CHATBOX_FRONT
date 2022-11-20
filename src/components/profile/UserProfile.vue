<template>
	<div class="user-profile">
		<div class="bg-darkGrey shadow rounded-lg p-8 w-fit flex flex-col items-center justify-between md:flex-row">
			<profile-image />
			<edit-info />
		</div>
		<user-invites />
	</div>
</template>

<script>
	import ProfileImage from "./ProfileImage.vue";
	import EditInfo from "./EditInfo.vue";
	import UserInvites from "./UserInvites.vue";
	export default {
		components: {
			ProfileImage,
			EditInfo,
			UserInvites,
		},
	};
</script>

<style scoped>
	.user-profile {
		height: max-content;
		width: 100%;
		display: grid;
		gap: 30px;
		align-content: center;
		justify-content: center;
	}
</style>
