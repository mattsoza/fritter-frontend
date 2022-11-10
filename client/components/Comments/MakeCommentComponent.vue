<!-- Component that allows you to leave a comment on a freet -->

<template>
  <article>
    <button @click="openCommentDialog">
      Comment
    </button>
    <VEasyDialog v-model="visible">
      <div class="dialogContainer">
        <StrippedFreetComponent :freet="freet" />
        <div class="breakline" />        
        <form @submit.prevent="submitComment">
          <textarea
            id="comment"
            class="input"
            name="comment"
            rows="6"
            placeholder="Your comment..."
          />
          <button type="submit">
            Post comment
          </button>
        </form>
      </div>
    </VEasyDialog>
  </article>
</template>

<script>
import VEasyDialog from 'v-easy-dialog';
import StrippedFreetComponent from '@/components/Comments/StrippedFreetComponent.vue';

export default {
  name: 'MakeCommentComponent',
  components: {VEasyDialog, StrippedFreetComponent},
  props: {
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      visible: false,
      content: ''
    }
  },
  methods: {
    openCommentDialog() {
      this.visible = true;
    },
    // Thanks to stackoverflow:
    // https://stackoverflow.com/questions/42694457/getting-form-data-on-submit#46733931
    submitComment(evt) {
      this.content = evt.target.elements.comment.value;
      fetch(`/api/freets/${this.freet._id}`,{
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },

        // Serealizing our data
        body: JSON.stringify({
          content: this.content
        })
      }
      ).then((response) => {
        if (response.status === 201) {
          this.$notify({
            position: "top center",
            text: "Comment created successfully"
          })
        } else if (response.status === 403) {
          this.$notify({
            position: "top center",
            text: "You must be logged in to post comments.",
          })
        } else if (response.status === 404) {
          this.$notify({
            position: "top center",
            text: "The freet you are trying to reply to doesn't exist!"
          })
        } else if (response.status === 413) {
          this.$notify({
            position: "top center",
            text: "The freet content is not valid! If you are responding to a freet comment, your comment must be 140 characters or less."
          })
        }
      })
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

.dialogContainer {
  display: flex;
  
  flex-direction: column;
}

.breakline {
  border: 2px solid #777777;
  margin-bottom: 1rem;
}

.input {
  display: block;
  width: fit-content;
}
</style>