<script setup>
import NavbarDropdownUser from "@/components/Header/Navbar/NavbarDropdownUser.vue";
</script>
<template>
    <nav class="navbar">
        <a id="pin-sidebar">
            <i class="fa fa-bars"></i>
        </a>
        <div class="navbar-menu">
            <ul class="navbar-nav flex-row">
                <NavbarDropdownUser/>
            </ul>
        </div>
    </nav>
</template>