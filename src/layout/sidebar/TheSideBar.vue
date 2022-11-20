<template>
	<nav class="sidebar-menu bg-darkGrey shadow">
		<div class="w-full flex items-end justify-between py-2">
			<img src="../../assets/logo_white.png" alt="CHATBOX" class="h-5 w-22" />
			<button type="button" class="sidebar-close" @click="toggleMenuOpen">
				<span class="material-icons">close</span>
			</button>
		</div>

		<the-links />

		<div class="w-full flex flex-col pt-4 space-y-3 border-t border-t-black dark:border-t-white">
			<dark-theme-toggle />
			<log-out-btn />
		</div>
	</nav>
</template>

<script>
	import TheLinks from "./TheLinks.vue";
	import LogOutBtn from "./LogOutBtn.vue";
	import DarkThemeToggle from "./DarkThemeToggle.vue";
	export default {
		components: {
			TheLinks,
			LogOutBtn,
			DarkThemeToggle,
		},
		setup() {
			const toggleMenuOpen = () => document.body.classList.toggle("open");
			return { toggleMenuOpen };
		},
	};
</script>
