<template>
  <c-stack
    align="center"
    direction="row"
  >
    <!--    <c-link-->
    <!--      as="nuxt-link"-->
    <!--      to="/"-->
    <!--    >-->
    <!--      <c-image-->
    <!--        :src="require('~/assets/keepCouncilLogoVector.svg')"-->
    <!--        h="3rem"-->
    <!--        w="3rem"-->
    <!--      />-->
    <!--    </c-link>-->

    <c-link
      as="nuxt-link"
      to="/"
      class="undecorative-link"
    >
      <c-text
        as="h1"
        font-size="2xl"
        font-family="EuropaBold"
        size="lg"
      >
        KeepCouncil
      </c-text>
    </c-link>

    <spacer />

    <c-button @click="openNewModal = true">
      New
    </c-button>
    <new-minutes-modal
      :is-open="openNewModal"
      @close="openNewModal = false"
    />

    <c-button>
      <nav-link
        display="Create"
        route="/create"
        route-name="create"
      />
    </c-button>

    <c-button
      @click="$store.dispatch(TOGGLE_PREVIEW_PANE_ACTION)"
    >
      {{ showPreviewPane ? 'Unload PDF' : 'Preview PDF' }}
    </c-button>
  </c-stack>
</template>

<script>
import { mapState } from 'vuex'
import NavLink from './NavLink.vue'
import Spacer from './Spacer.vue'
import { TOGGLE_PREVIEW_PANE_ACTION } from '~/store'
import NewMinutesModal from '~/components/NewMinutesModal'

export default {
  components: {
    NewMinutesModal,
    NavLink,
    Spacer,
  },
  data () {
    return {
      TOGGLE_PREVIEW_PANE_ACTION,
      openNewModal: false,
    }
  },
  computed: {
    ...mapState(['showPreviewPane']),
  },
}
</script>

<style lang="scss">
.offset-a-bit {
  margin-right: 2rem;
}
</style>
