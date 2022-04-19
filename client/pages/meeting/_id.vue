<template>
  <c-dark-mode>
    <c-flex>
      <agenda-sidebar class="default-border overflow-auto" />
      <c-box
        :padding-top="loadedFormType ? 0 : 4"
        :padding-left="4"
        :padding-right="4"
        :padding-bottom="0"
        overflow="auto"
        class="fill-width"
      >
        <template v-if="loadedFormType">
          <component :is="loadedFormType.formComponentName" />
        </template>
        <template v-else>
          <c-simple-grid min-child-width="24rem" :spacing="4">
            <generic-agenda-item-card
              v-for="item of loadedItemsOfType"
              :key="item.id"
              :item="item"
              class="flex-1"
            />
          </c-simple-grid>
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
import { VIEW_LOADED_ACTION } from '~/store'
import MeetingSummaryCard from '~/components/MeetingSummaryCard'
import GenericAgendaItemCard from '~/components/GenericAgendaItemCard'

export default {
  components: {
    GenericAgendaItemCard,
    MeetingSummaryCard,
    AgendaSidebar,
    PersonForm,
    MeetingForm,
  },
  computed: {
    ...mapState(['loadedItemsOfType', 'loadedFormType']),
  },
  created () {
    this.$store.dispatch(VIEW_LOADED_ACTION, { viewName: EDIT_VIEW_NAME })
  },
}
</script>
