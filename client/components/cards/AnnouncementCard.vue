<template>
  <c-pseudo-box
    w="24rem"
    max-w="24rem"
    border-width="1px"
    rounded="xs"
    text-align="center"
    p="6"
    align-self="flex-start"
  >
    <c-box d="flex" flex-direction="column" align-items="center" justify-content="space-between">
      <c-flex direction="column">
        <c-text
          color="gray.500"
          font-weight="semibold"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          announced by
        </c-text>
        <content-header :display="`${item.announcerId}`" element="div" font-size="2xl" font-family="EuropaLight" />
        <c-text
          mt="1rem"
          size="sm"
          width="100%"
          variant-color="gray"
          color="white"
        >
          {{ item.content }}
        </c-text>
      </c-flex>
    </c-box>
  </c-pseudo-box>
</template>

<script>
import ContentHeader from '~/components/ContentHeader'
export default {
  components: { ContentHeader },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
}
</script>
