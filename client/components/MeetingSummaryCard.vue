<template>
  <c-pseudo-box
    max-w="sm"
    border-width="1px"
    rounded="lg"
    overflow="hidden"
    p="6"
    :_hover="{
      borderColor: 'gray.200',
      bg: 'gray.200',
      color: 'gray.800',
      cursor: 'pointer',
    }"
    @click.prevent="$emit('meeting-selected', meeting.id)"
  >
    <c-box d="flex" align-items="baseline">
      <c-box
        color="gray.500"
        font-weight="semibold"
        letter-spacing="wide"
        font-size="xs"
        text-transform="uppercase"
      >
        Council Meeting Date: {{ Intl.DateTimeFormat("us-EN").format(new Date(meeting.date)) }}
      </c-box>
    </c-box>
    <c-box
      mt="1"
      font-weight="semibold"
      as="h4"
      line-height="tight"
      is-truncated
    >
      {{ meeting.name }}
    </c-box>
    <c-box
      v-if="meeting.previewUrl.length"
      color="gray.600"
      font-size="sm"
    >
      <c-link
        :href="meeting.previewUrl"
        is-external
      >
        View PDF
      </c-link>
    </c-box>
  </c-pseudo-box>
</template>

<script>
export default {
  props: {
    meeting: {
      type: Object,
      required: true,
    },
  },
}
</script>
