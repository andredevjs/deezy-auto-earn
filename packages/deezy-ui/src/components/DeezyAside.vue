<script setup lang="ts">
import { useRoute } from "vue-router";
const routeName = useRoute().name;
</script>

<template>
  <aside class="aside">
    <ul class="nav flex-column">
      <li class="nav-item">
        <RouterLink
          class="nav-link"
          :class="{ active: routeName === 'home' }"
          to="/"
          >Home {{ routeName }}</RouterLink
        >
      </li>

      <li class="nav-item">
        <a class="nav-link" href="#">Accounts</a>
      </li>

      <li class="nav-item">
        <RouterLink
          class="nav-link"
          :class="{ active: routeName === 'settings' }"
          to="/settings"
          >Settings</RouterLink
        >
      </li>
    </ul>
  </aside>
</template>

<style scoped>
aside {
  /* background-color: var(--vt-c-black-soft); */
  padding-top: 30px;
  /* padding: 30px 20px; */
}
</style>
