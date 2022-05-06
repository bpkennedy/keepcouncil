<template>
  <c-modal
    :is-open="isOpen"
    :on-close="close"
  >
    <c-modal-content ref="content">
      <c-modal-close-button />
      <c-modal-body>
        <component
          :is="item.formComponentName"
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
import BillForm from '~/components/forms/BillForm'
import HearingFromCitizenForm from '~/components/forms/HearingFromCitizenForm'
import ProclamationForm from '~/components/forms/ProclamationForm'
import CommunicationForm from '~/components/forms/CommunicationForm'
import PublicHearingForm from '~/components/forms/PublicHearingForm'
import BoardAppointmentForm from '~/components/forms/BoardAppointmentForm'
import AnnouncementForm from '~/components/forms/AnnouncementForm'
import RequestForm from '~/components/forms/RequestForm'
import ResolutionForm from '~/components/forms/ResolutionForm'

export default {
  components: {
    BillForm,
    HearingFromCitizenForm,
    ProclamationForm,
    CommunicationForm,
    PublicHearingForm,
    BoardAppointmentForm,
    AnnouncementForm,
    RequestForm,
    ResolutionForm,
  },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    close () {
      this.$emit('close', this.item.value)
    },
    submit (genericResource) {
      this.$emit('submit', genericResource)
    },
  },
}
</script>
