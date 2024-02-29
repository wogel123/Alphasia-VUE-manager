<script>
export default {
	name: "Brand",
	computed: {
		mainUrl() {
			return import.meta.env.VITE_MAIN_URL
		}
	}
};
</script>
<template>
    <div class="brand">
        <a :href="mainUrl">
            <span class="brand-big"><b>Alphasia</b> Manager</span>
            <span class="brand-small"><b>A</b>M</span>
        </a>
    </div>
</template>