<script setup lang="ts">
import DeezyHeader from "./components/DeezyHeader.vue";
import DeezyAside from "./components/DeezyAside.vue";
</script>

<template>
  <div class="grid-container">
    <DeezyHeader class="header" msg=""></DeezyHeader>

    <DeezyAside class="aside"></DeezyAside>

    <main class="main">
      <RouterView />
    </main>

    <footer class="footer"></footer>
  </div>
</template>

<style>
.grid-container {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 80px 1fr 50px;
  grid-template-areas:
    "header header"
    "aside main"
    "footer footer";
  height: 100vh;
}

.header {
  grid-area: header;
}

.aside {
  grid-area: aside;
}

.main {
  grid-area: main;
  border: 1px dashed green;

  /* background-color: #353641; */
}

.footer {
  grid-area: footer;
  border: 1px dashed red;
}

@media (min-width: 1024px) {
  .main {
    padding: 2rem;
  }
}
</style>
