<template>
  <c-pseudo-box
    w="24rem"
    max-w="24rem"
    border-width="1px"
    rounded="xs"
    overflow="hidden"
    text-align="center"
    p="6"
    align-self="flex-start"
  >
    <c-box d="flex" flex-direction="column" align-items="center" justify-content="space-between">
      <c-flex direction="column">
        <content-header :display="item.fullName" element="div" font-size="2xl" font-family="EuropaLight" />
        <c-text
          color="gray.500"
          font-weight="semibold"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          <c-icon name="email" />
          {{ item.email }}
        </c-text>
        <c-text
          color="gray.500"
          font-weight="semibold"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          <c-icon name="phone" />
          {{ item.phoneNumber }}
        </c-text>
        <c-text
          color="gray.500"
          font-weight="semibold"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          {{ item.personType }}, Ward {{ item.ward }}
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
