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
        <content-header :display="`${item.title}`" element="div" font-size="2xl" font-family="EuropaLight" />
        <c-text
          color="gray.500"
          font-weight="semibold"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          {{ item.petitioner }}
        </c-text>
        <c-tag
          v-if="item.accepted"
          mt="1rem"
          :variant-color="item.accepted ? 'green' : 'red'"
          :icon="item.accepted ? 'check' : 'close'"
        >
          {{ item.accepted ? `Accepted by ${item.acceptorId}` : 'Not Accepted' }}
        </c-tag>
        <c-text
          v-if="item.accepted"
          mt="0.5rem"
          color="gray.500"
          font-weight="semibold"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          Seconded by {{ item.secondedById }}
        </c-text>
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
