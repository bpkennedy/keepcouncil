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

    <c-button ml="1rem">
      <nav-link
        display="Meetings"
        route="/"
        route-name="index"
      />
    </c-button>

    <spacer />

    <c-button
      left-icon="add"
      variant-color="green"
      @click="openNewModal = true"
    >
      New Meeting
    </c-button>
    <new-minutes-modal
      :is-open="openNewModal"
      @close="openNewModal = false"
    />
  </c-stack>
</template>

<script>
import NavLink from './NavLink.vue'
import Spacer from './Spacer.vue'
import NewMinutesModal from '~/components/NewMinutesModal'

export default {
  components: {
    NewMinutesModal,
    NavLink,
    Spacer,
  },
  data () {
    return {
      openNewModal: false,
    }
  },
}
</script>
