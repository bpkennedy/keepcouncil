<template>
  <c-pseudo-box
    w="24rem"
    max-w="24rem"
    h="8rem"
    max-h="8rem"
    border-width="1px"
    rounded="xs"
    overflow="hidden"
    p="6"
  >
    <c-box d="flex" align-items="center" justify-content="space-between">
      <c-box
        font-weight="semibold"
        as="h4"
        line-height="tight"
        is-truncated
      >
        {{ item.name }}
      </c-box>
      <c-box
        color="gray.500"
        font-weight="semibold"
        letter-spacing="wide"
        font-size="xs"
        text-transform="uppercase"
      >
        {{ Intl.DateTimeFormat("us-EN").format(new Date(item.date)) }}
      </c-box>
    </c-box>
    <c-button
      mt="1rem"
      size="sm"
      width="100%"
      variant-color="blue"
      color="black"
      @click.prevent="toggleContent"
    >
      {{ showingContent ? 'Show Less' : 'Show More' }}
    </c-button>
    <c-collapse :is-open="showingContent">
      {{ item.content }}
    </c-collapse>
  </c-pseudo-box>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data () {
    return {
      showingContent: false,
    }
  },
  methods: {
    toggleContent () {
      if (this.item.content && this.item.content.length) {
        this.showingContent = !this.showingContent
      }
    },
  },
}
</script>
