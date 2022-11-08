<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome @{{ $store.state.username }}</h2>
      </header>
      <CreateFreetForm />
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
          to create, edit, and delete freets.
        </h3>
      </article>
    </section>
    <FreetPageComponent />
  </main>
</template>

<script>
// import FreetComponent from '@/components/Freet/FreetComponent.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
// import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';
import FreetPageComponent from '@/components/Pages/FreetPageComponent.vue';

export default {
  name: 'FreetPage',
  // components: {FreetComponent, GetFreetsForm, CreateFreetForm, FreetPageComponent},
  components: {CreateFreetForm, FreetPageComponent},
  mounted() {
    // this.$refs.getFreetsForm.submit();
    // console.log(this.$store.state.freets);
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
}

header, header > * {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    margin-right: 10px;
}

section .scrollbox {
  flex: 1 0 50vh;
  padding: 3%;
  overflow-y: scroll;
}
</style>
