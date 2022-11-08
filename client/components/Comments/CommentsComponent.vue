<!-- Reusable component representing the comments of a freet -->

<template>
  <article>
    <button @click="getComments">
      Open Comments
    </button>
    <VEasyDialog v-model="scrollVisible">
      <div class="overflow-y-auto">
        <FreetComponent 
          v-if="scrollVisible === true" 
          :freet="currentFreet"
        />

        <ToggleSwitch 
          :options="toggleOptions"
          :value="toggleValue"
          @selected="switchDisplayedComments"
        />

        <FreetPageComponent
          v-if="selectedMapOption===freet"
          :parent-freet="freet"
          :mode="freet"
        />
        <FreetPageComponent 
          v-else
          :parent-freet="freet"
          :mode="forum"
        />
        <button @click="scrollVisible = false">
          Close dialog
        </button>
      </div>
    </VEasyDialog>
  </article>
</template>


<script>
import VEasyDialog from 'v-easy-dialog';

export default {
  name: 'CommentsComponent',
  // components: {VEasyDialog, FreetComponent, FreetPageComponent, TestComponent},
  components: {VEasyDialog},
  props: {
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      currentFreet: null,
      forumMode: false,
      scrollVisible: false,
      freetType: 'forum',
      toggleOptions: {
        config: {
          preSelected: 'forum',
          items: [
            {name: 'Forum', value: 'forum', color: 'white', backgroundColor: 'blue'},
            {name: 'Freet', value: 'freet', color: 'white', backgroundColor: 'red'}
    ]
  }
}
    }
  },
  methods: {
    closeComments() {
      this.scrollVisible = false;

    },
    getComments() {
      this.scrollVisible = true;
      this.currentFreet = this.freet;
      this.isMounted = true
    },
    switchDisplayedComments() {

    }
  }
}
</script>

<style>
.v-easy-dialog--backdrop-btn {
  background-color: transparent;
}

.v-easy-dialog--content-container {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}
</style>