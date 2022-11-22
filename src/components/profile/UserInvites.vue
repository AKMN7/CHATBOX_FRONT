<template>
	<div class="bg-darkGrey w-full shadow rounded-lg p-8 flex flex-col items-center justify-between">
		<div class="text-lightestGrey p-3 mb-2 border-b border-b-grey w-full flex items-center justify-between">
			<p>Recent Invitations</p>
			<button @click="refreshInvites" class="p-2 text-center flex items-center justify-center rounded-lg hover:bg-grey">
				<span class="material-icons">refresh</span>
			</button>
		</div>
		<div
			v-for="invite in invites"
			:key="invite.id"
			class="w-full flex items-center py-2 px-3 mb-2 rounded-lg text-lightestGrey hover:bg-black hover:text-white">
			<img :src="invite.data.userImage" alt="user" class="h-9 w-9 rounded-lg mr-4" />
			<p class="tracking-wide mr-auto">{{ invite.data.username }}</p>
			<p class="tracking-widest mr-4 capitalize" :class="invite.data.status">{{ invite.data.status }}</p>
			<button
				v-if="!invite.data.selfSend && invite.data.status == 'pending'"
				@click="updateInvite(invite.id, 'approved')"
				class="p-2 text-center flex items-center justify-center rounded-lg hover:bg-grey mr-4">
				<span class="material-icons">done</span>
			</button>
			<button
				v-if="!invite.data.selfSend && invite.data.status == 'pending'"
				@click="updateInvite(invite.id, 'declined')"
				class="p-2 text-center flex items-center justify-center rounded-lg hover:bg-grey">
				<span class="material-icons">close</span>
			</button>
			<button
				v-if="invite.data.selfSend && invite.data.status == 'pending'"
				@click="deleteInvite(invite.id)"
				class="p-2 text-center flex items-center justify-center rounded-lg hover:bg-grey">
				<span class="material-icons">close</span>
			</button>
		</div>
	</div>
</template>

<script>
	import toaster from "../../utils/toast";
	import { useMainStore } from "../../stores/main";
	import { inject } from "@vue/runtime-core";

	export default {
		props: ["invites"],
		setup() {
			const store = useMainStore();
			const swal = inject("$swal");

			async function updateInvite(id, status) {
				try {
					const data = {
						id,
						status,
					};
					console.log("This is the data", data);
					await store.updateInvite(data);
					toaster.fireToast(swal, true, "Invites Updated!");
				} catch (error) {
					toaster.fireToast(swal, false, error.message);
				}
			}

			async function deleteInvite(id) {
				try {
					await store.deleteInvite(id);
					toaster.fireToast(swal, true, "Invites Updated!");
				} catch (error) {
					toaster.fireToast(swal, false, error.message);
				}
			}

			async function refreshInvites() {
				try {
					await store.fetchUserData();
					toaster.fireToast(swal, true, "Invites Updated!");
				} catch (error) {
					toaster.fireToast(swal, false, error.message);
				}
			}

			return { updateInvite, deleteInvite, refreshInvites };
		},
	};
</script>

<style scoped>
	.declined {
		color: rgb(199, 0, 0);
	}

	.approved {
		color: rgb(0, 105, 0);
	}
</style>
