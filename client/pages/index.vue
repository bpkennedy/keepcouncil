<template>
  <c-dark-mode>
    <c-flex
      direction="column"
      align="center"
    >
      <c-text
        as="h1"
        font-size="2xl"
        font-family="EuropaBold"
        size="lg"
      >
        Meetings
      </c-text>
      <c-simple-grid
        min-child-width="24rem"
        :spacing="10"
      >
        <meeting-summary-card
          v-for="meeting in meetings"
          :key="meeting.id"
          :meeting="meeting"
          @meeting-selected="handleUserMeetingSelection"
        />
      </c-simple-grid>
    </c-flex>
  </c-dark-mode>
</template>

<script>
import { mapState } from 'vuex'
import { SELECTED_CURRENT_MEETING_ACTION, VIEW_LOADED_ACTION } from '~/store'
import { HOME_VIEW_NAME } from '~/constants'
import MeetingSummaryCard from '~/components/MeetingSummaryCard'

export default {
  components: { MeetingSummaryCard },
  computed: {
    ...mapState(['meetings']),
  },
  created () {
    this.$store.dispatch(VIEW_LOADED_ACTION, { viewName: HOME_VIEW_NAME })
  },
  methods: {
    handleUserMeetingSelection (meetingId) {
      this.$store.dispatch(SELECTED_CURRENT_MEETING_ACTION, meetingId)
    },
  },
}
</script>
