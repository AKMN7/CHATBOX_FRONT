<template>
	<div class="mt-5 mb-auto w-full">
		<div class="wrapper">
			<div class="search-input">
				<input type="text" placeholder="Search Contact..." />
				<span class="material-icons icon">search</span>
			</div>
		</div>

		<div class="my-4 w-full">
			<p class="font-bold tracking-wider my-2">Contacts ({{ Object.keys(chats).length }})</p>
			<div class="link-list">
				<router-link
					v-for="chatID in Object.keys(chats)"
					:key="chatID"
					:to="`/app/${chatID}`"
					class="sideBarLink flex items-center py-2 px-3 mb-2 mr-2 cursor-pointer rounded-lg text-lightestGrey hover:bg-black hover:text-white">
					<div class="relative h-10 w-10 mr-4">
						<img :src="chats[chatID].profilePic" alt="user" class="h-9 w-9 rounded-lg" />
						<span class="online" v-if="chats[chatID].isOnline"></span>
					</div>
					<p class="tracking-wide mr-auto">{{ chats[chatID].name }}</p>
					<span class="material-icons hidden" title="Delete" @click="deleteChat(chatID)">delete</span>
					<span class="newMessages" v-if="store.unReadMessages[chatID]"></span>
				</router-link>
			</div>
		</div>

		<div
			@click="createNewInvite"
			class="flex items-center justify-center space-x-2 tracking-wider py-3 rounded-lg cursor-pointer text-lightestGrey bg-grey hover:bg-lightGrey hover:text-white">
			<span class="material-icons">add</span>
			<span>Add Contact</span>
		</div>
	</div>
</template>

<script>
	import { useMainStore } from "../../stores/main";
	import toaster from "../../utils/toast";
	import { useRouter } from "vue-router";
	import { inject } from "vue";
	import socket from "../../utils/socket";

	export default {
		props: ["chats"],
		setup() {
			const store = useMainStore();
			const router = useRouter();
			const swal = inject("$swal");

			async function createNewInvite() {
				let input = await toaster.textInputPopUp(swal, "Send Invitation", "Enter recipent email...");
				if (input) {
					try {
						await store.createInvitation(input);
						toaster.fireToast(swal, true, "Invitation Sent, you can view your previous invitations at your profile page!", 5000);
					} catch (error) {
						toaster.fireToast(swal, false, error.message);
					}
				}
			}

			async function deleteChat(id) {
				console.log(id);
				swal
					.fire(toaster.confirmPopUpOptions("Remove Contact", `Are you sure you want to remove ${store.chats[id].name}?`))
					.then(async (result) => {
						if (result.isConfirmed) {
							try {
								await store.deleteChat(id);
								toaster.fireToast(swal, true, "Contact Deleted Succssfully");
								socket.emit("chat-deleted", id);
								let toChat = store.getFirstChat ? store.getFirstChat : "nochats";
								router.replace(`/app/${toChat}`);
							} catch (error) {
								toaster.fireToast(swal, false, error.message);
							}
						}
					});
			}

			return { createNewInvite, deleteChat, store };
		},
	};
</script>

<style scoped>
	.wrapper {
		width: 100%;
	}

	.wrapper .search-input {
		width: 100%;
		border-radius: 5px;
		position: relative;
		color: black;
	}

	.search-input input {
		background: rgb(243, 244, 246);
		width: 100%;
		border: 1px solid rgb(229, 231, 235);
		border-radius: 8px;
		padding: 12px 16px;
		font-size: 14px;
		line-height: 20px;
		font-weight: 700;
		outline: none;
	}

	.search-input input:focus {
		border: 1px solid rgb(156, 163, 175);
		background: white;
	}

	.search-input input::placeholder {
		color: #999999;
	}

	.search-input .icon {
		position: absolute;
		right: 10px;
		top: 0px;
		text-align: center;
		line-height: 46px;
		font-size: 22px;
		color: #999999;
	}

	.link-list {
		margin-top: 12px;
		width: 100%;
		max-height: 30vh;
		overflow-y: scroll;
		scroll-snap-type: y mandatory;
	}

	.link-list::-webkit-scrollbar {
		width: 2px;
	}

	.link-list::-webkit-scrollbar-track {
		background: transparent;
	}

	.link-list::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.5);
		border-radius: 8px;
	}

	.sideBarLink:hover span {
		display: inline-block;
	}

	.sideBarLink:hover .newMessages {
		display: none;
	}

	.newMessages {
		border: 1px solid rgb(243, 27, 27);
		background-color: rgb(243, 27, 27);
		padding: 5px;
		border-radius: 50%;
	}

	.online {
		border: 1px solid white;
		background-color: rgb(123, 201, 7);
		padding: 5px;
		border-radius: 50%;
		position: absolute;
		top: -4px;
		right: 0px;
	}
</style>
