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
        <content-header :display="`${item.appointee}`" element="h4" font-size="lg" />
        <c-text
          color="gray.500"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          appointed to
        </c-text>
        <content-header :display="`${item.appointedTo}`" element="h1" font-size="2xl" />
        <c-text
          mt="1rem"
          color="gray.500"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          expires on {{ Intl.DateTimeFormat("us-EN").format(new Date(item.expiration)) }}
        </c-text>
        <c-text
          color="gray.500"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          referred by {{ item.referredById }}
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
