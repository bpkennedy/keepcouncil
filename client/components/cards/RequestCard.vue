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
          mt="1rem"
          :variant-color="item.accepted ? 'green' : 'red'"
        >
          <template v-if="item.accepted">
            <c-tag-icon icon="check" />
            <c-tag-label>
              {{ `Accepted by ${personNameFromId(item.acceptorId)}` }}
            </c-tag-label>
          </template>
          <template v-else>
            <c-tag-icon icon="close" />
            <c-tag-label>
              Not Accepted
            </c-tag-label>
          </template>
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
          Seconded by {{ personNameFromId(item.secondedById) }}
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
