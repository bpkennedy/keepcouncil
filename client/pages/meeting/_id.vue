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
            <template v-if="isOfType('person')">
              <person-card v-for="item of loadedItemsOfType" :key="item.id" :item="item" />
            </template>
            <template v-else-if="isOfType('meeting')">
              <generic-agenda-item-card v-for="item of loadedItemsOfType" :key="item.id" :item="item" />
            </template>
            <template v-else-if="isOfType('motion')">
              <generic-agenda-item-card v-for="item of loadedItemsOfType" :key="item.id" :item="item" />
            </template>
            <template v-else-if="isOfType('bill')">
              <bill-card v-for="item of loadedItemsOfType" :key="item.id" :item="item" />
            </template>
            <template v-else-if="isOfType('hearingFromCitizen')">
              <hearing-from-citizen-card v-for="item of loadedItemsOfType" :key="item.id" :item="item" />
            </template>
            <template v-else-if="isOfType('proclamation')">
              <proclamation-card v-for="item of loadedItemsOfType" :key="item.id" :item="item" />
            </template>
            <template v-else-if="isOfType('resolution')">
              <resolution-card v-for="item of loadedItemsOfType" :key="item.id" :item="item" />
            </template>
            <template v-else-if="isOfType('communication')">
              <communication-card v-for="item of loadedItemsOfType" :key="item.id" :item="item" />
            </template>
            <template v-else-if="isOfType('publicHearing')">
              <public-hearing-card v-for="item of loadedItemsOfType" :key="item.id" :item="item" />
            </template>
            <template v-else-if="isOfType('boardAppointment')">
              <board-appointment-card v-for="item of loadedItemsOfType" :key="item.id" :item="item" />
            </template>
            <template v-else-if="isOfType('request')">
              <request-card v-for="item of loadedItemsOfType" :key="item.id" :item="item" />
            </template>
            <template v-else-if="isOfType('announcement')">
              <announcement-card v-for="item of loadedItemsOfType" :key="item.id" :item="item" />
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
import { AGENDA_ITEM_TYPES, EDIT_VIEW_NAME } from '~/constants'
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

export default {
  components: {
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
      AGENDA_ITEM_TYPES,
    }
  },
  computed: {
    ...mapState(['loadedItemsOfType', 'loadedFormType', 'loadedItemType']),
  },
  created () {
    this.$store.dispatch(VIEW_LOADED_ACTION, { viewName: EDIT_VIEW_NAME })
  },
  methods: {
    isOfType (itemType) {
      return this.loadedItemType.value === AGENDA_ITEM_TYPES.find(t => t.value === itemType).value
    },
  },
}
</script>
