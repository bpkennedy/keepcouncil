<template>
  <c-flex
    direction="column"
    w="20rem"
    min-w="20rem"
    p="1rem"
  >
    <c-accordion>
      <c-accordion-item
        class="border-none"
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
            :header-mode="true"
            class="flex-1"
          />
        </c-accordion-header>
      </c-accordion-item>
      <c-accordion-item
        v-for="itemType in AGENDA_ITEM_TYPES"
        v-slot="{ isExpanded }"
        :key="itemType.value"
        @click.native="loadItemTypes(itemType)"
      >
        <c-accordion-header :class="{ 'dark-background-active': isExpanded }">
          <c-box
            flex="1"
            class="test"
            display="flex"
            align-items="center"
            justify-content="space-between"
          >
            <c-box>
              {{ itemType.display }}
            </c-box>
            <c-button
              size="xs"
              right-icon="add"
              variant-color="blue"
              variant="outline"
              class="center-icon-in-button"
              @click.stop="addItemType(itemType)"
            />
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
    loadItemTypes (itemType) {
      this.$emit('load-item-types-clicked', itemType)
    },
    addItemType (itemType) {
      this.$emit('item-type-clicked', itemType)
    },
  },
}
</script>

<style lang="scss">
.center-icon-in-button {
  border: none;

  svg {
    transition: all 200ms ease;
    margin: 0;
  }

  &:hover {
    border: none;

    svg {
      width: 1.25em;
      height: 1.25em;

      path {
        fill: white;
      }
    }

    &::before {
      content: 'Add ';
      color: white;
      font-size: 1.25em;
      margin-right: 0.5rem;
    }
  }
}
</style>
