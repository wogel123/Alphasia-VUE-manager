import { createRouter, createWebHistory } from "vue-router"
import { getCookie } from "@/helpers/getcookie.helper.js";
import store from "@/store/index.js";

import HomeView from "@/views/HomeView.vue";
import UserListView from "@/views/User/UserListView.vue";
import UserAddView from "@/views/User/UserAddView.vue";
import UserEditView from "@/views/User/UserEditView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "Home",
			component: HomeView,
			meta: {
				title: "Accueil"
			}
		},
		{
			path: "/users",
			name: "UserList",
			component: UserListView,
			meta: {
				title: "Liste des utilisateurs"
			}
		},
		{
			path: "/user/add",
			name: "UserAdd",
			component: UserAddView,
			meta: {
				title: "Créer un utilisateur"
			}
		},
		{
			path: "/user/edit/:id",
			name: "UserEdit",
			component: UserEditView,
			meta: {
				title: "Editer un utilisateur"
			}
		},
	]
})
router.beforeEach((to, from, next) => {
	const title = to.meta.title
	const titleFromParams = to.params.pageTitle;
	if (title) {
		document.title = title + ' • Alphasia Manager';
	}
	if (titleFromParams) {
		document.title = titleFromParams + ' • Alphasia Manager';
	}

	if (getCookie("SessionCookie") === "") {
		window.location.href = import.meta.env.VITE_MAIN_URL + "/error"
	} else {
		store.dispatch("auth/checkLogin", getCookie("SessionCookie"))
			.then(response => {
				if (!response.logged) {
					window.location.href = import.meta.env.VITE_MAIN_URL + "/error"
				}
			})
	}

	next()
})

export default router
