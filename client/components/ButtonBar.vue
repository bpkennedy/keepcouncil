<template>
  <c-flex
    align="center"
    justify="space-between"
    class="fill-width scroll-over-zindex"
    :class="{ 'justify-right': !showResetButton }"
    :padding-top="['4']"
    :padding-bottom="['4']"
  >
    <c-button
      v-if="showResetButton"
      variant="outline"
      variant-color="gray"
      :margin-right="['2']"
      type="reset"
    >
      Reset
    </c-button>
    <c-flex>
      <c-button
        v-if="showCancelButton"
        left-icon="close"
        variant-color="gray"
        :margin-right="['2']"
        @click="$emit('cancel')"
      >
        Cancel
      </c-button>
      <c-button
        left-icon="check"
        variant-color="green"
        variant="solid"
        type="submit"
        :disabled="invalidForm"
      >
        Save
      </c-button>
    </c-flex>
  </c-flex>
</template>

<script>
export default {
  props: {
    invalidForm: {
      type: Boolean,
      default: false,
    },
    showCancelButton: {
      type: Boolean,
      default: true,
    },
    showResetButton: {
      type: Boolean,
      default: true,
    },
  },
}
</script>
