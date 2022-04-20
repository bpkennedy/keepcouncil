<template>
  <c-dark-mode>
    <c-flex
      direction="column"
      align="center"
    >
      <content-header display="Meetings" element="h1" font-size="2xl" />
      <c-simple-grid
        min-child-width="24rem"
        :spacing="10"
      >
        <meeting-summary-card
          v-for="meeting in meetings"
          :key="meeting.id"
          :meeting="meeting"
        />
      </c-simple-grid>
    </c-flex>
  </c-dark-mode>
</template>

<script>
import { mapState } from 'vuex'
import { VIEW_LOADED_ACTION } from '~/store'
import { HOME_VIEW_NAME } from '~/constants'
import MeetingSummaryCard from '~/components/MeetingSummaryCard'
import ContentHeader from '~/components/ContentHeader'

export default {
  components: {
    ContentHeader,
    MeetingSummaryCard,
  },
  computed: {
    ...mapState(['meetings']),
  },
  created () {
    this.$store.dispatch(VIEW_LOADED_ACTION, { viewName: HOME_VIEW_NAME })
  },
}
</script>
