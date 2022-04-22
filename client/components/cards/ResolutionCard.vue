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
        <content-header :display="`No ${item.resolutionNumber}`" element="div" font-size="2xl" font-family="EuropaLight" />
        <c-text
          color="gray.500"
          font-weight="semibold"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          Introduced on {{ Intl.DateTimeFormat("us-EN").format(new Date(item.introducedDate)) }}, by {{ personNameFromId(item.introducedById) }}
        </c-text>
        <c-text
          mt="1rem"
          color="gray.500"
          font-weight="semibold"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          {{ item.resolutionTitle }}
        </c-text>
        <c-text
          mt="1rem"
          size="sm"
          width="100%"
          variant-color="gray"
          color="white"
        >
          Content: {{ item.content }}
        </c-text>
      </c-flex>
    </c-box>
  </c-pseudo-box>
</template>

<script>
import { mapGetters } from 'vuex'
import ContentHeader from '~/components/ContentHeader'
export default {
  components: { ContentHeader },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['personNameFromId']),
  },
}
</script>
