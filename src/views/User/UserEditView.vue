<script setup>
import {dateFormat} from "@/helpers/dateformat.helper.js";
</script>
<script>
import axios from "axios";
import { useRoute } from "vue-router";
import $ from "jquery"


export default {
    name: "UserEditView",
	data () {
		return {
			response: {
				type: null,
                message: ''
            },
			ranks: [],
			user: [],
            update: {
				email: null,
                password: null,
                ranks: []
            }
		}
	},
    mounted () {
		const route = useRoute()

        let User, Ranks

        axios.all([
			axios.get(import.meta.env.VITE_API_URL + '/api/admin/user/get/' + route.params.id),
			axios.get(import.meta.env.VITE_API_URL + '/api/admin/user/ranks')
        ])
        .then(axios.spread((user, ranks) => {
			this.user = user.data
			User = user.data
			this.ranks = ranks.data
			Ranks = ranks.data

            ranks.data.forEach((rank) => {
				user.data.members_ranks.forEach((r) => {
					$('#ranks').append(
						'<div class="form-check">' +
						'<input ' + ((rank.id === r.rank_id) ? 'checked' : '') + ' type="checkbox" class="form-check-input" value="' + rank.id + '" id="rank-' + rank.id + '" name="' + rank.name + '" />' +
						'<label for="rank-' + rank.id + '">' + rank.name + '</label>' +
						'</div>'
                    )
				})
			})

        }))

        // ------------------

		$('#email-validate').hide()
        $('#email').on('keyup', function () {
            $('#email-validate').show()
            if ($('#email').val() === User.email) {
				$('#email-validate').hide()
            }
        })

	},
    methods: {
		updateUser () {

			let state = true

            let email = $("#email").val(),
                password = $("#password").val(),
                ranks = []

			$("#ranks input").each(function () {
				ranks.push(
					{
						id: parseInt($(this).attr("value")),
						state: $(this).is(":checked")
					}
				)
			})

            if (email === "") {
				this.response.type = 0
                this.response.message = "Le champ email ne peut pas être vide"
                state = false
            } else if (email !== this.user.email) {
				this.update.email = email
            }

			if (password !== "") {
				this.update.password = password
            }



        }
    }
}
</script>
<template>

    <section class="content-header">
        <h1>
            Utilisateurs
            <small>Editer un compte utilisateur sur le site web</small>
        </h1>
        <ol class="breadcrumb">
            <li><router-link to="/"><i class="fa fa-dashboard"></i> Accueil</router-link></li>
            <li class="active">Utilisateurs</li>
        </ol>
    </section>
    <section class="content">
        <div class="box box-default">
            <div class="box-header">
                <h3 class="box-title">Edition d'un utilisateur</h3>
            </div>
            <div class="box-body">
                <form @submit="updateUser" class="d-flex flex-column" autocomplete="off" ref="form">
                    <div class="row">
                        <div class="col-md-6 mx-auto">
                            <div class="mt-3">

                                <div id="response">
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="username" class="form-label">Nom d'utilisateur</label>
                                <input class="form-control" type="text" :value="user.username" disabled/>
                            </div>
                            <div class="mb-3">
                                <label for="username" class="form-label">Date d'inscription</label>
                                <input class="form-control" type="text" :value="dateFormat(user.createdAt, 'DD MMMM YYYY à HH[h]mm')" disabled/>
                            </div>
                            <div class="mb-3">
                                <label for="username" class="form-label">Dernière connection</label>
                                <input class="form-control" type="text" :value="user.last_login ? dateFormat(user.last_login, 'DD MMMM YYYY à HH[h]mm') : 'Jamais'" disabled/>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Adresse mail</label>
                                <div class="form-validate">
                                    <input class="form-control" id="email" type="text" name="email" :value="user.email" autocomplete="off"/>
                                    <span id="email-validate" @click="saveField"><i class="fa-regular fa-circle-check"></i></span>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Mot de passe</label>
                                <input class="form-control" id="password" type="password" name="password" autocomplete="new-password"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-2">
                                <label class="form-label">Rang</label>
                            </div>
                            <div id="ranks"></div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-flat mx-auto w-25 mt-3 mb-3">Valider</button>

                </form>

            </div>
        </div>
    </section>
</template>

<style>
.form-validate {
    position: relative;
}
.form-validate span {
    position: absolute;
    top: 9px;
    right: 9px;
    color: #00a65a;
    cursor: pointer;
}
.form-validate span:hover {
    color: #028447;
}
</style>