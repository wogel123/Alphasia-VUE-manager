<script setup>
import Header from "@/components/Header/Header.vue";
import Aside from "@/components/Aside/Aside.vue";
</script>
<script>
import $ from "jquery";

export default {
	name: "App",
	watch: {
		$route (to, from) {

			$('.sidebar-item.sidebar-menu').find('a').each(function () {
				if ($(this).attr('href') === to.path) {
					if (!location.pathname.startsWith('#')) {
						$(this).parent().addClass('open')
						if ($(this).parents('.sidebar-dropdown').length === 0)
							$(this).css({'color': '#fff', 'background': '#1e282c', 'border-left': '3px solid #3c8dbc', 'padding-left': '12px'})
					}
				} else if ($(this).attr('href') === from.path) {
					$(this).parent().removeClass('open')
					if ($(this).parents('.sidebar-dropdown').length === 0) {
						$(this).css({'border-left': 'none', 'padding-left': '15px','color': '#b8c7ce', 'background': '#222d32'})
					} else {
						$(this).parents('.sidebar-dropdown').each(function () {
							$(this).children('a').css({'border-left': 'none', 'padding-left': '15px','color': '#b8c7ce', 'background': '#222d32'})
							$(this).children('.sidebar-submenu').slideUp(200);
							$(this).removeClass('active')
							$(this).children('a').children('.menu-dropdown').css('transform', 'rotate(0)')
						})
                    }

                }
			})


			let nb = $('.open').parents('ul').length - 1
			let counter = 1
			$('.open').parents('ul').each(function () {
				if (counter === nb) {
					$(this).parent().prev('a').css({'color': '#fff', 'background': '#1e282c', 'border-left': '3px solid #3c8dbc', 'padding-left': '12px'})
				}
				$(this).parent().slideDown(200);
				$(this).parent().parent().addClass('active')
				$(this).parent().prev('a').children('.menu-dropdown').css('transform', 'rotate(-90deg)')
				counter += 1
			})
            counter = 1

		}
	}
};
</script>
<template>
    <div class="page-wrapper">

        <Header/>

        <Aside/>

        <main class="page-content">
        <router-view/>
        </main>

        <footer class="main-footer">
            <div>
                <b>Version</b> 2.4.13 Bootstrap 5
            </div>
            <strong>Copyright © 2014-2024 <a href="https://adminlte.io" target="_blank">AdminLTE</a></strong>. Update to Bootstrap 5 by <strong><a href="https://wogel123.fr" target="_blank">wogel123</a></strong>. All rights
            reserved.
        </footer>

    </div>
</template>
