<script setup>
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net';
let table = DataTable.use(DataTablesCore);
</script>

<script>

import { dateFormat } from "@/helpers/dateformat.helper.js";
import $ from 'jquery'


export default {
	name: "UserListView",
    methods: {
		resolveRouteFromClick(e){
			const itemId = e.target.dataset.itemId
			if (!itemId) {
				return
			}
			e.preventDefault()
			this.$router.push('/user/edit/' + itemId);
		}
	},
    data () {
        return {
			columns: [
				{
					data: 'username',
                    title: 'Utilisateur',
					width: '20%'
                },
				{
					data: 'email',
					title: 'Email',
					width: '25%'
				},
				{
					data: 'updatedAt',
					title: 'Date de modification',
					width: '35%',
					render: (data, type, row) => {
						return dateFormat(data, "DD MMMM YYYY, HH[h]mm")
					}
				},
				{
					data: 'members_ranks',
					title: 'Rang',
					width: '25%',
					render: (data, type, row) => {
						if(data.length > 0) {
							return data.map(rank => {
								return " " + rank.site_rank.name;
							})
						} else {
							return ""
						}
					}
				},
				{
					data: 'id',
					title: 'Action',
					width: '10%',
					orderable: false,
					render: (data, type, row) => {
						return '<a href="#" data-item-id="' + data + '">Modifier</a>';
					}
				},
			],
			options: {
				responsive: true,
				drawCallback: this.drawCallback,
                language: {
					url: '//cdn.datatables.net/plug-ins/1.10.20/i18n/French.json'
				}
			},
            apiUrl: import.meta.env.VITE_API_URL
        }
    }
}
</script>

<template>

    <section class="content-header">
        <h1>
            Utilisateurs
            <small>Liste des utilisateurs du site web</small>
        </h1>
        <ol class="breadcrumb">
            <li><router-link to="/"><i class="fa fa-dashboard"></i> Accueil</router-link></li>
            <li class="active">Utilisateurs</li>
        </ol>
    </section>
    <section class="content">
        <div class="box box-default">
            <div class="box-header">
                <h3 class="box-title">Liste des utilisateurs</h3>
            </div>
            <div class="box-body d-flex flex-column">
                <router-link to="/user/add" class="btn btn-flat btn-primary mx-auto">Ajouter un utilisateur</router-link>
                <hr>
                <DataTable @click="resolveRouteFromClick($event)" :columns="columns" :options="options" :ajax="apiUrl + '/api/admin/user/list'" class="display no-stripe"/>
            </div>
        </div>
    </section>

</template>

<style>
@import 'datatables.net-dt';
table.dataTable {
    border: 1px solid #f4f4f4;
}
table.dataTable.display > tbody > tr > * {
    border: 1px solid #f4f4f4;
}
table.dataTable thead th, table.dataTable tfoot th {
    border-bottom: 3px solid #f4f4f4 !important;
}
table.dataTable thead > tr > th.dt-orderable-asc:hover,
table.dataTable thead > tr > th.dt-orderable-desc:hover,
table.dataTable thead > tr > td.dt-orderable-asc:hover,
table.dataTable thead > tr > td.dt-orderable-desc:hover {
    outline: none !important;
    background: rgba(0, 0, 0, 0.02);
}
table.dataTable.no-stripe > tbody > tr:not(:hover):nth-child(2n+1) > * {
    box-shadow: none !important;
}
table.dataTable.no-stripe > tbody > tr:not(:hover):nth-child(2n+1) > .sorting_1,
table.dataTable.no-stripe > tbody > tr:not(:hover):nth-child(2n+1) > .sorting_2,
table.dataTable.no-stripe > tbody > tr:not(:hover):nth-child(2n+1) > .sorting_3,
table.dataTable.no-stripe > tbody > tr:not(:hover) > .sorting_2,
table.dataTable.no-stripe > tbody > tr:not(:hover) > .sorting_3,
table.dataTable.no-stripe > tbody > tr:not(:hover) > .sorting_2 {
    box-shadow: inset 0 0 0 9999px rgba(0, 0, 0, 0.019) !important;
}
div.dt-container.dt-empty-footer tbody > tr:last-child > * {
    border-bottom: 2px solid #f4f4f4;
}
</style>