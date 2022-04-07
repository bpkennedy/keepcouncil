<template>
  <c-flex
    direction="column"
    w="20rem"
  >
    <c-text
      as="h1"
      font-size="xl"
      font-family="EuropaBold"
      size="md"
    >
      Agenda Item Types
    </c-text>
    <c-stack>
      <c-text
        v-for="itemType in AGENDA_ITEM_TYPES"
        :key="itemType.value"
        @click.native="clickItemType(itemType)"
      >
        {{ itemType.display }}
      </c-text>
    </c-stack>
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
