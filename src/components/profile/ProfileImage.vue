<template>
	<div class="profile-img w-48 h-48 overflow-hidden rounded-full relative md:mr-4">
		<input type="file" accept="image/*" ref="file" @change="onFileSelected" class="hidden" />
		<img :src="selectedFile" alt="Cryptcize" class="h-full w-full object-cover object-top" />
		<div class="edit__button" @click="browse">
			<button class="browse">
				<span class="material-icons md-48">photo_camera</span>
			</button>
		</div>
	</div>
</template>

<script>
	export default {
		props: ["userImage"],
		data() {
			return {
				selectedFile: null,
			};
		},
		created() {
			if (this.$props.userImage) {
				this.selectedFile = this.$props.userImage;
			} else {
				this.selectedFile =
					"https://cahsi.utep.edu/wp-content/uploads/kisspng-computer-icons-user-clip-art-user-5abf13db5624e4.1771742215224718993529.png";
			}
		},
		methods: {
			onFileSelected(event) {
				this.selectedFile = event.target.files[0];
				const fd = new FormData();
				fd.append("userImage", this.selectedFile);

				//console.log("Image ->", fd.get("userImage"));

				//! fd should be passed as the data to a post route to the backend

				let reader = new FileReader();
				reader.readAsDataURL(this.selectedFile);
				reader.onload = (e) => {
					this.selectedFile = e.target.result;
				};
			},
			browse() {
				this.$refs.file.click();
			},
		},
	};
</script>

<style scoped>
	.edit__button {
		transform: scale(0.975);
		visibility: hidden;
		position: absolute;
		background-color: rgba(139, 139, 139, 0.308);
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.profile-img:hover .edit__button {
		visibility: visible;
		transform: scale(1);
	}

	.browse {
		background-color: transparent;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
