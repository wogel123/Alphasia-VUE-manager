<script setup>
import {Form, Field } from "vee-validate";

</script>
<script>
import * as yup from "yup";
import $ from 'jquery'
import axios from "axios";

export default {
	name: "UserAddView",
    data () {
		let userSchema = yup.object().shape({
			username: yup.string().required("Veuillez définir un nom d'utilisateur").min(3),
			password: yup.string().required("Veuillez définir un mot de passe").min(8),
			email: yup.string().required("Veuillez définir une adresse mail").email()
		});
		return {
			message: {
				text: "",
                type: 0
            },
			userSchema,
            ranks: []
        }
    },
    methods: {
		createUser (values) {

			let val = []
			$('.form-check-input').each(function () {
				val.push(
					{
						id: parseInt($(this).attr('value')),
						state: $(this).is(':checked')
					}
				)
			})

            axios.post(import.meta.env.VITE_API_URL + '/api/admin/user/add', { data: values, ranks: val })
                .then(response => {
					console.log(response)
                })

        }
    },
    mounted () {
        axios.get(import.meta.env.VITE_API_URL + '/api/admin/user/ranks')
            .then(response => {
				this.ranks = response.data
            })

	}
}

</script>

<template>
    <section class="content-header">
        <h1>
            Utilisateurs
            <small>Créer un compte utilisateur sur le site web</small>
        </h1>
        <ol class="breadcrumb">
            <li><router-link to="/"><i class="fa fa-dashboard"></i> Accueil</router-link></li>
            <li class="active">Utilisateurs</li>
        </ol>
    </section>
    <section class="content">
        <div class="box box-default">
            <div class="box-header">
                <h3 class="box-title">Création d'un utilisateur</h3>
            </div>
            <div class="box-body">
                <Form @submit="createUser" :validation-schema="userSchema" v-slot="{ errors }" class="d-flex flex-column" autocomplete="off" >
                    <div class="row">
                        <div class="col-md-6 mx-auto">
                            <div class="mt-3">
                                <div v-if="Object.keys(errors).length !== 0" class="alert alert-danger" role="alert">
                                    {{ Object.values(errors)[0] }}
                                </div>

                                <div v-if="message.type !== 0 " :class="cravings" role="alert">
                                    {{ message.text }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label for="username" class="form-label">Nom d'utilisateur</label>
                                <Field class="form-control" id="username" type="text" name="username" autocomplete="off"/>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Adresse mail</label>
                                <Field class="form-control" id="email" type="text" name="email" autocomplete="off"/>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Mot de passe</label>
                                <Field class="form-control" id="password" type="password" name="password" autocomplete="new-password"/>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-2">
                                <label class="form-label">Rang</label>
                            </div>

                            <div class="form-check" v-for="rank in ranks">
                                <input class="form-check-input" type="checkbox" :value="rank.id" :id="'rank-' + rank.id" :name="rank.name"/>
                                <label :for="'rank-' + rank.id" class="form-check-label">{{ rank.name }}</label>
                            </div>


                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary btn-flat mx-auto w-25 mt-3 mb-3">Valider</button>

                </Form>
            </div>
        </div>
    </section>
</template>