<!-- Default page that also displays freets -->

<template>
  <main>
    <section v-if="$store.state.username">
      <header>
        <h2>Welcome, @{{ $store.state.username }}</h2>
      </header>
      <CreateFreetForm class="createFreet" />
      <FreetPageComponent class="frontPageFreets" />
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
    <!-- <FreetPageComponent class="frontPageFreets" /> -->
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
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

section {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.createFreet {
  border-color: #999999;
}

.createFreet>button:hover {
  background-color: #6A73DA;
  color: yellow;
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
