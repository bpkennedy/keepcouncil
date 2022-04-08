<template>
  <c-flex
    align="center"
    justify="space-between"
    class="fill-width"
    :padding="['4']"
  >
    <c-flex>
      <c-button
        left-icon="close"
        variant-color="gray"
        variant="solid"
        @click="$emit('cancel')"
        :margin-right="['2']"
      >
        Cancel
      </c-button>
      <c-button
        variant-color="gray"
        variant="solid"
        :margin-right="['2']"
        type="reset"
      >
        Reset
      </c-button>
    </c-flex>
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
</template>

<script>
export default {
  props: {
    invalidForm: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
