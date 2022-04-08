<template>
  <c-box>
    <c-box v-if="url">
      <vue-pdf-app
        class="content-height"
        :pdf="`${API_PATH}/preview?pdfUrl=${url}`"
      />
    </c-box>
    <c-box v-else>
      Please specify a remote file url to load ...
    </c-box>
  </c-box>
</template>

<script>
import { API_PATH } from '~/constants'

export default {
  props: {
    url: {
      type: String,
      default: undefined,
    },
  },
  data () {
    return {
      API_PATH,
    }
  },
}
</script>

<style lang="scss">
  #sidebarToggle {
    &::after {
      display: none;
    }
  }
</style>
