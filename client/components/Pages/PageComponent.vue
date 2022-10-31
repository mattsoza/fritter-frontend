<!-- Reusable component representing a page of freets and its actions -->

<template>
  <article class="page">
    <header>
      Freets Page
    </header>
    <section
      v-if="freets"
    >
      <FreetComponent
        v-for="freet in freets"
        :key="freet.id"
        :freet="freet"
      />
    </section>
    <article
      v-else
    >
      <h3>No freets found :(</h3>
    </article>
    <!-- https://stackoverflow.com/questions/72858778/vue-render-new-component-based-on-page-count -->
    <!-- Thanks to the above for help with the prev/next page help -->
    <button
      :disabled="pageNumber === 1"
      @click="prevPage"
    >
      Prev
    </button>
    <div :is="pageNumber" />
    <button @click="nextPage">
      Next
    </button>
  </article>
</template>

<script>
import FreetComponent from '@/components/Freet/FreetComponent.vue';

export default {
  name: 'FreetPageComponent',
  components: {FreetComponent},
  data() {
    return {
      pageNumber: 1,
      valid: false,
      freets: null
    }
  },
  mounted() {
    this.$refs.getFreetsForm.submit();
    this.getPage();
  },
  methods: {
    async getPage() {
      /**
       * Gets the n freets relevant to this page by 
       * making an api call to the backend
       */
      const url = `/api/home?page=${this.pageNumber}`;
      try {
        const r = await fetch(url);
        const res = await r.json();
        if (!r.ok) {
          throw new Error(res.error);
        }
        this.valid = true;
        this.freets = res;
      } catch(e) {
        // I plan to put an option for the user to 
        // refresh the call here using the value of 
        // valid
        this.valid = false
        console.log('Trouble retrieving page info')
      }
    },
    async prevPage() {
      this.pageNumber -= 1;
      this.getPage();
    },
    async nextPage() {
      this.pageNumber += 1;
      this.getPage();
    },
  }
}

</script>