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
          :v-model="selection"
          @change="toggle"
        />

        <FreetPageComponent
          v-if="selection === 'freet'"
          :parent-freet="freet"
          mode="freet"
        />
        <FreetPageComponent 
          v-else
          :parent-freet="freet"
          mode="forum"
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
  name: 'ShowCommentsComponent',
  // components: {VEasyDialog, FreetComponent, FreetPageComponent, TestComponent},
  components: {VEasyDialog},
  props: {
    freet: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      currentFreet: null,
      scrollVisible: false,
      selection: 'freet',
      toggleOptions: {
        layout: {
          color: '#69DEF0',
          backgroundColor: 'white',
          selectedColor: 'white',
          selectedBackgroundColor: '#69DEF0'
        },
        size: {
          width: 36.2
        },
        config: {
          preSelected: 'freet',
          items: [
            {name: 'Freet', value: 'freet'},
            {name: 'Forum', value: 'forum'}
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
    toggle(e) {
      this.selection = e.value;
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