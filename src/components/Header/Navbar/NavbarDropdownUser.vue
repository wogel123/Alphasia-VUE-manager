<script>
import { getCookie } from "@/helpers/getcookie.helper.js";
export default {
	name: "NavbarDropdownUser",
	computed: {
		logged() {
			return this.$store.state.auth.status.logged
		},
		user() {
			return this.$store.state.auth.user
		},
		mainUrl() {
			return import.meta.env.VITE_MAIN_URL
		}
	},
	methods: {
		logout() {
			this.$store.dispatch("auth/logout", getCookie("SessionCookie"))
		}
	}
};
</script>
<template>
    <li class="dropdown user-menu">
        <a href="#" class="dropdown-toggle user" data-bs-toggle="dropdown" >
            <img src="/src/public/assets/img/user.jpg" class="img-circle">
            <p>{{ user?.username }}</p>
        </a>
        <ul class="dropdown-menu">
            <li class="user-header d-flex flex-column">
                <img src="/src/public/assets/img/user.jpg" class="img-circle mx-auto">
                <p>
                    {{ user?.username }}
                    <small>
                        <span v-for="rank in user?.members_ranks">
                            {{ rank.site_rank.name }}
                        </span>
                    </small>
                </p>
            </li>
            <li class="user-footer d-flex">
                <div>
                    <a :href="mainUrl" class="btn btn-default btn-flat">Retour au site</a>
                </div>
                <div class="ms-auto">
                    <a @click="logout" class="btn btn-danger btn-flat">Déconnexion</a>
                </div>
            </li>
        </ul>
    </li>
</template>