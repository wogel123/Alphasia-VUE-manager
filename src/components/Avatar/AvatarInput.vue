<script setup>

</script>
<script>
import { computed, ref } from "vue";
import axios from "axios";

export default {
	name: "AvatarInput",
	data () {
		return {
			previewImage: null,
			file: ref(null),
			fileName: computed(() => this.file?.name),
			fileExtension: computed(() => this.fileName?.substr(this.fileName?.lastIndexOf(".") + 1)),
			fileMimeType: computed(() => this.file?.type)
		}
	},
	methods: {
		resetFile () {
			this.$refs.fileInput.value = ""
		},
		selectImage () {
			this.$refs.fileInput.click()
		},
		pickFile () {
			let input = this.$refs.fileInput
			let file = input.files
			if (file && file[0]) {
				let reader = new FileReader
				reader.onload = e => {
					this.previewImage = e.target.result
				}
				reader.readAsDataURL(file[0])
				this.$emit('input', file[0])
			}
		},
		uploadFile (event) {
			this.file = event.target.files[0];
		},
		async submitFile () {
			const reader = new FileReader();
			reader.readAsDataURL(this.file);
			reader.onload = async () => {
				const encodedFile = reader.result;
				const data = {
					file: encodedFile,
					fileName: this.fileName,
					fileExtension: this.fileExtension,
					fileMimeType: this.fileMimeType,
				};
				try {
					const endpoint = import.meta.env.VITE_API_URL + "/api/upload";
					const response = await axios.post(endpoint, data);
				} catch (error) {
					console.error(error);
				}
			};
		}
	},
}
</script>
<template>
    <div class="box box-primary">
        <div class="box-header">
            <h3 class="box-title">Avatar</h3>
        </div>


        <form>
            <div class="box-body">
                <div class="imagePreviewWrapper" :style="{ 'background-image': `url(${previewImage})` }" @click="selectImage"></div>
                <div class="mb-3">
                    <label for="exampleInputFile" class="form-label">Upload avatar</label>
                    <input class="form-control" ref="fileInput" type="file" @change="uploadFile" @input="pickFile">
                </div>
            </div>

            <div class="box-footer">
                <button @click.prevent="resetFile" class="btn btn-secondary">Cancel</button>
                <button @click.prevent="submitFile"  class="btn btn-primary ms-auto">Submit</button>
            </div>
        </form>
    </div>
</template>

<style scoped>
.imagePreviewWrapper {
    background-repeat: no-repeat;
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: contain;
    background-position: center center;
}
</style>