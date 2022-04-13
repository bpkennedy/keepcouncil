<template>
  <c-flex class="flex-1">
    <c-flex
      v-if="url"
      direction="column"
      justify="center"
      align="center"
      class="fill-height fill-width"
    >
      <vue-pdf-app
        class="fill-height fill-width"
        :config="config"
        :pdf="`${API_PATH}/preview?pdfUrl=${url}`"
      />
    </c-flex>
    <c-box
      v-else
      direction="column"
      justify="center"
      align="center"
    >
      Please specify a remote file url to load ...
    </c-box>
  </c-flex>
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
      config: {
        toolbar: false,
      },
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
