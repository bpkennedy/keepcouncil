<template>
  <c-dark-mode>
    <c-flex>
      <agenda-sidebar
        :item-type="selectedAgendaItemType"
        class="default-border border-right-none overflow-auto"
        @item-type-clicked="selectAgendaItemType"
      />
      <c-box
        :padding-top="4"
        :padding-left="4"
        :padding-right="4"
        :padding-bottom="0"
        overflow="auto"
        class="default-border fill-width"
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
import PersonForm from '~/components/PersonForm.vue'
import { AGENDA_ITEM_TYPES } from '~/constants'

export default {
  components: {
    AgendaSidebar,
    PersonForm,
  },
  data () {
    return {
      AGENDA_ITEM_TYPES,
      selectedAgendaItemType: null,
    }
  },
  methods: {
    selectAgendaItemType (itemType) {
      this.selectedAgendaItemType = itemType
    },
  },
}
</script>
