<template>
  <c-dark-mode>
    <c-flex>
      <c-flex
        direction="column"
        align="center"
        justify="center"
      >
        <preview-panel
          url="https://www.florissantmo.com/egov/documents/1646328757_74811.pdf"
          class="half-full-width"
        />
      </c-flex>
      <agenda-sidebar
        :item-type="selectedAgendaItemType"
        @item-type-clicked="selectAgendaItemType"
      />
      <component
        :is="selectedAgendaItemType.formComponentName"
        v-if="selectedAgendaItemType"
        class="half-full-width"
      />
    </c-flex>
  </c-dark-mode>
</template>

<script>
import AgendaSidebar from '~/components/AgendaSidebar.vue'
import PersonForm from '~/components/PersonForm.vue'
// import PreviewPanel from '~/components/PreviewPanel.vue'
import { AGENDA_ITEM_TYPES } from '~/constants'

export default {
  components: {
    AgendaSidebar,
    PersonForm,
    // PreviewPanel,
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

<style lang="scss">
.pdf-app {
  #thumbnailView {
    overflow-x: hidden;
  }
}
</style>
