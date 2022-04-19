<template>
  <c-flex
    direction="column"
    w="20rem"
    min-w="20rem"
  >
    <c-accordion>
      <c-accordion-item
        class="border-none"
        is-disabled
      >
        <c-accordion-header
          pt="0"
          pl="0"
          pr="0"
          pb="0"
          m="0"
          class="border-none fill-width"
        >
          <meeting-summary-card
            v-if="currentMeeting"
            :meeting="currentMeeting"
            class="flex-1"
          />
        </c-accordion-header>
      </c-accordion-item>
      <c-accordion-item
        v-for="itemType in AGENDA_ITEM_TYPES"
        v-slot="{ isExpanded }"
        :key="itemType.value"
        @click.native="clickItemType(itemType)"
      >
        <c-accordion-header :class="{ 'dark-background-active': isExpanded }">
          <c-box flex="1" text-align="left">
            {{ itemType.display }}
          </c-box>
        </c-accordion-header>
      </c-accordion-item>
    </c-accordion>
  </c-flex>
</template>

<script>
import { mapState } from 'vuex'
import { AGENDA_ITEM_TYPES } from '~/constants'
import MeetingSummaryCard from '~/components/MeetingSummaryCard'

export default {
  components: {
    MeetingSummaryCard,
  },
  data () {
    return {
      AGENDA_ITEM_TYPES,
    }
  },
  computed: {
    ...mapState(['currentMeeting']),
  },
  methods: {
    clickItemType (itemType) {
      this.$emit('item-type-clicked', itemType)
    },
  },
}
</script>
