<script>
import {getCookie} from "@/helpers/getcookie.helper.js";

export default {
	name: "AsideHeader",
	computed: {
		user() {
			return this.$store.state.auth.user
		}
	}
};
</script>
<template>
    <div class="sidebar-item sidebar-header d-flex flex-nowrap">
        <div class="user-pic">
            <img src="/src/public/assets/img/user.jpg" class="img-circle">
        </div>
        <div class="user-info">
            <span class="user-name">
                {{ user?.username }}
            </span>
            <span class="user-status">
                <i class="fa fa-circle"></i>
                <span>En ligne</span>
            </span>
        </div>
    </div>
</template>