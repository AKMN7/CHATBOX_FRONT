<template>
	<div
		@click="logOut"
		class="flex items-center justify-center space-x-2 tracking-wider py-3 rounded-lg cursor-pointer text-lightestGrey bg-grey hover:bg-lightGrey hover:text-white">
		<span class="material-icons">logout</span>
		<span>Logout</span>
	</div>
</template>

<script>
	import { useAuthStore } from "../../stores/auth";
	import { useRouter } from "vue-router";
	import socket from "../../utils/socket";
	import { inject } from "vue";
	import toaster from "../../utils/toast";
	export default {
		setup() {
			const store = useAuthStore();
			const router = useRouter();
			const swal = inject("$swal");

			function logOut() {
				swal.fire(toaster.logOutPopUpOptions()).then((result) => {
					if (result.isConfirmed) {
						store.logout();
						socket.disconnect();
						router.replace("/signin");
					}
				});
			}

			return { logOut };
		},
	};
</script>
