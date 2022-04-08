<template>
  <c-flex
    direction="column"
    w="16rem"
    min-w="16rem"
  >
    <c-accordion>
      <c-accordion-item
        class="border-none"
        is-disabled
      >
        <c-accordion-header>
          <c-text
            as="h1"
            font-size="2xl"
            font-family="EuropaBold"
            size="md"
            text-align="center"
            color="gray.400"
          >
            Agenda Item Types
          </c-text>
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
import { AGENDA_ITEM_TYPES } from '~/constants'

export default {
  data () {
    return {
      AGENDA_ITEM_TYPES,
    }
  },
  methods: {
    clickItemType (itemType) {
      this.$emit('item-type-clicked', itemType)
    },
  },
}
</script>
