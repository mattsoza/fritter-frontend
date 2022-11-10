<!-- Page that displays game -->

<template>
  <main>
    <section
      v-if="$store.state.username"
    >
      <hangman-game class="game" />
    </section>
    <section v-else>
      <header>
        <h2>Welcome to Fritter!</h2>
      </header>
      <article>
        <h3>
          <router-link to="/login">
            Sign in
          </router-link>
          to see, create, edit, and delete freets.
        </h3>
      </article>
    </section>
  </main>
</template>

<style>
.game {
  padding-top: 3em;
}
</style>