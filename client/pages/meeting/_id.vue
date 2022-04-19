<template>
  <c-dark-mode>
    <c-flex>
      <agenda-sidebar
        :item-type="selectedAgendaItemType"
        class="default-border overflow-auto"
        @item-type-clicked="selectAgendaItemType"
        @load-item-types-clicked="loadItemsByType"
      />
      <c-box
        :padding-top="4"
        :padding-left="4"
        :padding-right="4"
        :padding-bottom="0"
        overflow="auto"
        class="fill-width"
      >
        <component
          :is="selectedAgendaItemType.formComponentName"
          v-if="selectedAgendaItemType"
        />
      </c-box>
    </c-flex>
  </c-dark-mode>
</template>

<script>
import AgendaSidebar from '~/components/AgendaSidebar.vue'
import PersonForm from '~/components/forms/PersonForm.vue'
import MeetingForm from '~/components/forms/MeetingForm.vue'
import { AGENDA_ITEM_TYPES, API_PATH, EDIT_VIEW_NAME } from '~/constants'
import { VIEW_LOADED_ACTION } from '~/store'

export default {
  components: {
    AgendaSidebar,
    PersonForm,
    MeetingForm,
  },
  data () {
    return {
      AGENDA_ITEM_TYPES,
      selectedAgendaItemType: null,
      loadedItemsOfType: [],
    }
  },
  created () {
    this.$store.dispatch(VIEW_LOADED_ACTION, { viewName: EDIT_VIEW_NAME })
  },
  methods: {
    async loadItemsByType (itemType) {
      this.loadedItemsOfType = (await this.$axios.get(`${API_PATH}/${itemType.value}`))
    },
    selectAgendaItemType (itemType) {
      this.selectedAgendaItemType = itemType
    },
  },
}
</script>
