<template>
  <c-dark-mode>
    <c-flex>
      <agenda-sidebar class="default-border overflow-auto" />
      <c-box
        :padding-top="0"
        :padding-left="4"
        :padding-right="4"
        :padding-bottom="0"
        overflow="auto"
        class="fill-width"
      >
        <template v-if="loadedFormType">
          <component :is="loadedFormType.formComponentName" />
        </template>
        <template v-else-if="loadedItemType">
          <content-header :display="pluralize(loadedItemType.display)" element="h2" font-size="2rem" />
          <c-flex
            wrap="wrap"
            class="stack-gap"
          >
            <template v-if="loadedItemsOfType">
              <component
                :is="`${loadedItemType.value}-card`"
                v-for="item of loadedItemsOfType"
                :key="item.id"
                :item="item"
              />
            </template>
          </c-flex>
        </template>
      </c-box>
    </c-flex>
  </c-dark-mode>
</template>

<script>
import { mapState } from 'vuex'
import AgendaSidebar from '~/components/AgendaSidebar.vue'
import PersonForm from '~/components/forms/PersonForm.vue'
import MeetingForm from '~/components/forms/MeetingForm.vue'
import { EDIT_VIEW_NAME } from '~/constants'
import { VIEW_LOADED_ACTION, pluralize } from '~/store'
import MeetingSummaryCard from '~/components/MeetingSummaryCard'
import GenericAgendaItemCard from '~/components/GenericAgendaItemCard'
import ContentHeader from '~/components/ContentHeader'
import PersonCard from '~/components/cards/PersonCard'
import BillCard from '~/components/cards/BillCard'
import BoardAppointmentCard from '~/components/cards/BoardAppointmentCard'
import HearingFromCitizenCard from '~/components/cards/HearingFromCitizenCard'
import ProclamationCard from '~/components/cards/ProclamationCard'
import ResolutionCard from '~/components/cards/ResolutionCard'
import CommunicationCard from '~/components/cards/CommunicationCard'
import PublicHearingCard from '~/components/cards/PublicHearingCard'
import RequestCard from '~/components/cards/RequestCard'
import AnnouncementCard from '~/components/cards/AnnouncementCard'
import BillForm from '~/components/forms/BillForm'
import HearingFromCitizenForm from '~/components/forms/HearingFromCitizenForm'
import ProclamationForm from '~/components/forms/ProclamationForm'
import CommunicationForm from '~/components/forms/CommunicationForm'
import PublicHearingForm from '~/components/forms/PublicHearingForm'
import BoardAppointmentForm from '~/components/forms/BoardAppointmentForm'
import AnnouncementForm from '~/components/forms/AnnouncementForm'
import RequestForm from '~/components/forms/RequestForm'
import ResolutionForm from '~/components/forms/ResolutionForm'
import MotionCard from '~/components/cards/MotionCard'
import MotionForm from '~/components/forms/MotionForm'

export default {
  components: {
    MotionForm,
    MotionCard,
    ResolutionForm,
    RequestForm,
    AnnouncementForm,
    BoardAppointmentForm,
    PublicHearingForm,
    CommunicationForm,
    ProclamationForm,
    HearingFromCitizenForm,
    BillForm,
    AnnouncementCard,
    RequestCard,
    PublicHearingCard,
    CommunicationCard,
    ResolutionCard,
    ProclamationCard,
    HearingFromCitizenCard,
    BoardAppointmentCard,
    BillCard,
    PersonCard,
    ContentHeader,
    GenericAgendaItemCard,
    MeetingSummaryCard,
    AgendaSidebar,
    PersonForm,
    MeetingForm,
  },
  data () {
    return {
      pluralize,
    }
  },
  computed: {
    ...mapState(['loadedItemsOfType', 'loadedFormType', 'loadedItemType']),
  },
  created () {
    this.$store.dispatch(VIEW_LOADED_ACTION, { viewName: EDIT_VIEW_NAME })
  },
}
</script>
