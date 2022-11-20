<template>
	<div class="min-h-screen bg-grey text-lightestGrey flex justify-center">
		<div class="max-w-screen-xl m-0 sm:m-10 xl:m-20 bg-darkGrey shadow sm:rounded-lg flex justify-center flex-1">
			<div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 sm:w-full">
				<div class="mt-2">
					<img src="../../assets/logo_white.png" class="w-32 mx-auto" alt="logo" />
				</div>
				<div class="mt-12 flex flex-col items-center">
					<h1 class="text-2xl xl:text-3xl font-extrabold">Sign in and start chatting.</h1>
					<div class="w-full flex-1 mt-8">
						<div class="flex flex-col items-center">
							<GoogleLogin :callback="callBack" popup-type="TOKEN">
								<button class="input-btn-OAuth">
									<div class="bg-white p-2 rounded-full">
										<GoogleSVG />
									</div>
									<span class="ml-4"> Sign In with Google </span>
								</button>
							</GoogleLogin>
						</div>

						<div class="my-12 border-b border-b-lightGrey text-center">
							<div
								class="leading-none px-2 inline-block text-sm text-lightGrey tracking-wide font-medium bg-darkGrey transform translate-y-3">
								Or sign in with E-mail
							</div>
						</div>

						<div class="mx-auto max-w-xs">
							<form @submit.prevent="signIn">
								<input class="input-auth" type="email" placeholder="E-mail" v-model="email" required minlength="8" />
								<input class="input-auth" type="password" placeholder="Password" v-model="password" required minlength="8" />
								<button class="input-btn">
									<span class="ml-3" v-if="isLoading"> Loading... </span>
									<span class="ml-3" v-else> Sign In </span>
								</button>
							</form>
							<p class="mt-6 text-xs text-lightGrey text-center">
								Don;t have an account?
								<router-link to="/signup" class="border-b border-gray-500 border-dotted"> Sign Up </router-link>
							</p>
						</div>
					</div>
				</div>
			</div>
			<div class="flex-1 bg-darkGrey text-center hidden lg:flex">
				<div
					class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
					style="background-image: url(./src/assets/signin.svg)"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import { useAuthStore } from "../../stores/auth";
	import { useRouter } from "vue-router";
	import { ref, inject } from "vue";
	import toaster from "../../utils/toast";
	import GoogleSVG from "../../assets/googleSVG.vue";

	export default {
		components: {
			GoogleSVG,
		},
		setup() {
			const store = useAuthStore();
			const router = useRouter();
			const swal = inject("$swal");

			let isLoading = ref(false);
			let email = ref("");
			let password = ref("");

			async function signIn() {
				const data = {
					email: email.value,
					password: password.value,
				};

				isLoading.value = true;

				try {
					await store.signIn(data);
					toaster.fireToast(swal, true, "Sign In Sucess");
					setTimeout(() => {
						//TODO: Navigate to the latest chat
						router.replace("/app/aljdsfa23490");
					}, 2000);
				} catch (err) {
					toaster.fireToast(swal, false, err.message);
				}

				isLoading.value = false;
			}

			async function callBack(response) {
				const data = { token: response.access_token, type: "SignIn" };
				try {
					const returnedMSG = await store.googleAuth(data);
					toaster.fireToast(swal, true, returnedMSG);
					setTimeout(() => {
						//TODO: Navigate to the latest chat
						router.replace("/app/aljdsfa23490");
					}, 2000);
				} catch (err) {
					toaster.fireToast(swal, false, err.message);
				}
			}

			return { signIn, callBack, email, password, isLoading };
		},
	};
</script>
