<script setup>

import AvatarInput from "@/components/Avatar/AvatarInput.vue";
</script>

<script>
export default {
	name: "HomeView",
    computed: {
		logged () {
			return this.$store.state.auth.status.logged
        }
    }
}
</script>

<template>
    <section class="content-header">
        <h1>
            Dashboard
            <small>Control panel</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Dashboard</li>
        </ol>

        {{ logged }}

    </section>
</template>