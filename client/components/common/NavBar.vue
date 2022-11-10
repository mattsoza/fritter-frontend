<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <div class="left">
      <img src="../../public/logo.svg">
      <h1 class="title">
        Fritter
      </h1>
    </div>
    <div class="right">
      <router-link class="routelink" to="/">
        Home
      </router-link>
      <router-link
        v-if="$store.state.username"
        class="routelink"
        to="/account"
      >
        Account
      </router-link>
      <router-link
        v-else
        class="routelink"
        to="/login"
      >
        Login
      </router-link>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<style scoped>
nav {
    padding: 1vw 2vw;
    background-color: #6A73DA;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.routelink {
  border: 1px solid white;
  padding: 1em;
  border-radius: .4em;
  font-size: 1.2em;
  text-decoration: none;
  color: white;
}

.router-link-exact-active {
  background-color: white;
  color: #6A73DA;
}

.routelink:hover {
  background-color: white;
  color: #6A73DA;
}

.routelink:visited {
  /* color: white; */
}

.title {
    font-size: 32px;
    margin: 0 5px;
}

img {
    height: 32px;
}

.left {
	display: flex;
	align-items: center;
}

.right {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.right a {
    margin-left: 5px;
}

.alerts {
    width: 25%;
}
</style>
