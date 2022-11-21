<template>
	<div class="bg-darkGrey w-full shadow rounded-lg p-8 flex flex-col items-center justify-between">
		<div class="text-lightestGrey p-3 mb-2 border-b border-b-grey w-full">Recent invitations</div>
		<div
			v-for="invite in invites"
			:key="invite.id"
			class="w-full flex items-center py-2 px-3 mb-2 rounded-lg text-lightestGrey hover:bg-black hover:text-white">
			<img :src="invite.data.userImage" alt="user" class="h-9 w-9 rounded-lg mr-4" />
			<p class="tracking-wide mr-auto">{{ invite.data.username }}</p>
			<p class="tracking-widest underline mr-4" v-if="invite.data.selfSend">Pending...</p>
			<button
				v-if="!invite.data.selfSend"
				class="p-2 text-center flex items-center justify-center rounded-lg hover:bg-grey mr-4">
				<span class="material-icons">done</span>
			</button>
			<button class="p-2 text-center flex items-center justify-center rounded-lg hover:bg-grey">
				<span class="material-icons">close</span>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["invites"],
	};
</script>
