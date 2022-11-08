<!-- Reusable component representing a page of freets and its actions -->

<template>
  <article class="page">
    <header>
      Freets Page
    </header>
    <section
      v-if="freets && freets.length > 0"
    >
      <!-- v-for loops use indexing beginning at 1 -->
      <FreetComponent
        v-for="i in Math.min(20, freets.length)" 
        :key="freets[i-1].id"
        :freet="freets[i-1]"
      />
    </section>
    <article v-else-if="valid === false">
      <h3>Problem getting freets. Try refreshing the page</h3>
    </article>
    <article v-else-if="freets === null">
      <h3>Loading...</h3>
    </article>
    <article
      v-else
    >
      <h3>No more freets!</h3>
    </article>
    <!-- https://stackoverflow.com/questions/72858778/vue-render-new-component-based-on-page-count -->
    <!-- Thanks to the above for help with the prev/next page part -->
    <button
      :disabled="pageNumber === 1"
      @click="prevPage"
    >
      Prev
    </button>
    <div>{{ pageNumber }}</div>
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
  props: {
    parentFreet: {
      type: Object,
      default: null,
      required: false
    }
  },
  data() {
    return {
      pageNumber: 1,
      valid: true,
      freets: null
    }
  },
  mounted() {
    // this.$refs.getFreetsForm.submit();
    this.getPage();
  },
  updated() {
    // The below function needs help to be smoother, but ideally it 
    // will transition you to the top of the page
    // scroll(0,0);
  },
  methods: {
    async getPage() {
      /**
       * Gets the n freets relevant to this page by 
       * making an api call to the backend
       */

      this.freets = null;
      let url;
      if (this.parentFreet) {
        url = `/api/freets/${this.parentFreet._id}/comments?page=${this.pageNumber}`
      } else {
        url = `/api/home?page=${this.pageNumber}`;
      }

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