<template>
  <c-dark-mode>
    <c-flex>
      <c-flex
        v-if="showPreviewPane"
        direction="column"
        align="center"
        justify="center"
      >
        <preview-panel
          v-if="previewFileUrl"
          :url="previewFileUrl"
          class="default-border border-right-none half-full-width"
        />
        <c-box
          v-else
          class="default-border border-right-none half-full-width fill-height"
        >
          <preview-loader />
        </c-box>
      </c-flex>
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
        class="default-border full-width"
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
import { mapState } from 'vuex'
import AgendaSidebar from '~/components/AgendaSidebar.vue'
import PersonForm from '~/components/PersonForm.vue'
import PreviewPanel from '~/components/PreviewPanel.vue'
import PreviewLoader from '~/components/PreviewLoader.vue'
import { AGENDA_ITEM_TYPES } from '~/constants'

export default {
  components: {
    AgendaSidebar,
    PersonForm,
    PreviewPanel,
    PreviewLoader,
  },
  data () {
    return {
      AGENDA_ITEM_TYPES,
      selectedAgendaItemType: null,
      // previewLink: 'https://www.florissantmo.com/egov/documents/1646328757_74811.pdf',
    }
  },
  computed: {
    ...mapState(['showPreviewPane', 'previewFileUrl']),
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
