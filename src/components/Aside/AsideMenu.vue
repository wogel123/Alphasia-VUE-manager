<template>
    <div class="sidebar-item sidebar-menu">
        <ul>
            <li class="header-menu">
                Site web
            </li>
            <li>
                <router-link to="/">
                    <i class="fa fa-dashboard"></i>
                    <span class="menu-text">Accueil</span>
                </router-link>
            </li>
            <li class="sidebar-dropdown">
                <a>
                    <i class="fa fa-users"></i>
                    <span class="menu-text">Utilisateurs</span>
                    <i class="fa fa-angle-left menu-dropdown"></i>
                </a>
                <div class="sidebar-submenu">
                    <h3 class="pinned-title">Utilisateurs</h3>
                    <ul>
                        <li>
                            <router-link to="/users">
                                <i class="fa fa-angle-right"></i>
                                Liste des utilisateurs
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/user/add">
                                <i class="fa fa-angle-right"></i>
                                Créer un utilisateurs
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>
<script setup>
</script>