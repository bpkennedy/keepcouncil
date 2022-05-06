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
      <content-header display="KeepCouncil" element="h1" font-size="2xl" font-family="EuropaBold" />
    </c-link>

    <c-button
      variant-color="gray"
      ml="1rem"
      as="nuxt-link"
      to="/"
    >
      Meetings
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
      @submit="newMeeting"
    />
  </c-stack>
</template>

<script>
import Spacer from './Spacer.vue'
import NewMinutesModal from '~/components/NewMinutesModal'
import ContentHeader from '~/components/ContentHeader'
import { NEW_MEETING_CREATION_ACTION } from '~/store'

export default {
  components: {
    ContentHeader,
    NewMinutesModal,
    Spacer,
  },
  data () {
    return {
      openNewModal: false,
    }
  },
  methods: {
    async newMeeting (meetingResource) {
      await this.$store.dispatch(NEW_MEETING_CREATION_ACTION, meetingResource)
    },
  },
}
</script>
