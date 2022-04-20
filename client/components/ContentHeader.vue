<template>
  <c-text
    :as="element"
    :font-size="fontSize"
    :font-family="fontFamily"
  >
    {{ display }}
  </c-text>
</template>

<script>
export default {
  props: {
    display: {
      type: String,
      default: '',
    },
    element: {
      type: String,
      default: 'div',
    },
    fontSize: {
      type: String,
      default: '1.5rem',
    },
    fontFamily: {
      type: String,
      default: 'EuropaLight',
    },
  },
}
</script>
