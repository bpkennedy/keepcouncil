<template>
  <c-modal
    :is-open="isOpen"
    :on-close="close"
  >
    <c-modal-content ref="content">
      <c-modal-close-button />
      <c-modal-body>
        <meeting-form
          @cancel="close"
          @close="close"
          @submit="newMeeting"
        />
      </c-modal-body>
    </c-modal-content>
    <c-modal-overlay />
  </c-modal>
</template>

<script>
import MeetingForm from '~/components/forms/MeetingForm'
import { DATA_DONE_LOADING_ACTION, DATA_IS_LOADING_ACTION, NEW_MEETING_CREATION_ACTION } from '~/store'

export default {
  components: {
    MeetingForm,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close () {
      this.$emit('close')
    },
    async newMeeting (payload) {
      this.$store.dispatch(DATA_IS_LOADING_ACTION, 'Creating new meeting...')
      await this.$store.dispatch(NEW_MEETING_CREATION_ACTION, payload)
      this.$store.dispatch(DATA_DONE_LOADING_ACTION)
      this.$toast({
        title: 'Success.',
        description: `We've created a new meeting for you.`,
        status: 'success',
        duration: 4000,
      })
    },
  },
}
</script>
