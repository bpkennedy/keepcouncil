<template>
  <c-pseudo-box
    max-w="md"
    :border-width="headerMode ? '0' : '1px'"
    rounded="sm"
    overflow="hidden"
    p="6"
    pt="1rem"
    :_hover="{
      borderColor: headerMode ? 'none' : 'gray.800',
      bg: headerMode ? 'inherit' : 'gray.700',
      color: 'white',
      cursor: headerMode ? 'initial' : 'pointer',
    }"
    as="nuxt-link"
    :to="`/meeting/${meeting.id}`"
  >
    <c-box d="flex" align-items="center" justify-content="space-between">
      <c-box
        mr="1rem"
        font-weight="semibold"
        as="h4"
        line-height="tight"
        is-truncated
      >
        {{ meeting.name }}
      </c-box>
      <c-box
        color="gray.500"
        font-weight="semibold"
        letter-spacing="wide"
        font-size="xs"
        text-transform="uppercase"
      >
        {{ Intl.DateTimeFormat("us-EN").format(new Date(meeting.date)) }}
      </c-box>
    </c-box>
    <c-box
      v-if="meeting.previewUrl.length"
      color="gray.600"
      font-size="sm"
    >
      <c-button
        mt="1rem"
        size="sm"
        width="100%"
        variant-color="blue"
        color="black"
        @click.prevent="togglePreview"
      >
        {{ showPreviewPane ? 'Close PDF' : 'Preview PDF' }}
      </c-button>
    </c-box>
  </c-pseudo-box>
</template>

<script>
import { mapState } from 'vuex'
import {
  DATA_DONE_LOADING_ACTION,
  DATA_IS_LOADING_ACTION,
  SUBMIT_PREVIEW_FILE_URL_ACTION,
  TOGGLE_PREVIEW_PANE_ACTION,
} from '~/store'

export default {
  props: {
    meeting: {
      type: Object,
      required: true,
    },
    headerMode: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['showPreviewPane']),
  },
  methods: {
    async togglePreview () {
      if (this.meeting.previewUrl.length) {
        if (this.showPreviewPane) {
          await this.$store.dispatch(TOGGLE_PREVIEW_PANE_ACTION)
        } else {
          await this.$store.dispatch(DATA_IS_LOADING_ACTION)
          await this.$store.dispatch(TOGGLE_PREVIEW_PANE_ACTION)
          await this.$store.dispatch(SUBMIT_PREVIEW_FILE_URL_ACTION, this.meeting.previewUrl)
          await this.$store.dispatch(DATA_DONE_LOADING_ACTION)
        }
      }
    },
  },
}
</script>
