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
          @submit="submit"
        />
      </c-modal-body>
    </c-modal-content>
    <c-modal-overlay />
  </c-modal>
</template>

<script>
import MeetingForm from '~/components/forms/MeetingForm'
import { MEETING_TYPE } from '~/constants'

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
      this.$emit('close', MEETING_TYPE)
    },
    submit (meetingResource) {
      this.$emit('submit', meetingResource)
    },
  },
}
</script>
