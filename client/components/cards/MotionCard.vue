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
          Motion To
        </c-text>
        <content-header :display="`${motionActionDisplayNameFromValue(item.action)}`" element="div" font-size="2xl" font-family="EuropaLight" />
        <c-text
          color="gray.500"
          font-weight="semibold"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          Initiated by {{ personNameFromId(item.initiatorId) }}
        </c-text>
        <c-text
          v-if="item.seconderId"
          color="gray.500"
          font-weight="semibold"
          letter-spacing="wide"
          font-size="xs"
          text-transform="uppercase"
        >
          Seconded by {{ personNameFromId(item.seconderId) }}
        </c-text>
        <c-tag
          mt="1rem"
          :variant-color="item.carried ? 'green' : 'red'"
        >
          <template v-if="item.carried">
            <c-tag-icon icon="check" />
            <c-tag-label>
              Carried
            </c-tag-label>
          </template>
          <template v-else>
            <c-tag-icon icon="close" />
            <c-tag-label>
              Not Carried
            </c-tag-label>
          </template>
        </c-tag>
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
    ...mapGetters(['personNameFromId', 'motionActionDisplayNameFromValue']),
  },
}
</script>
