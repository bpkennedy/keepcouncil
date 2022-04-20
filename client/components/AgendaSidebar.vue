<template>
  <c-flex
    direction="column"
    w="20rem"
    min-w="20rem"
    p="1rem"
  >
    <c-accordion>
      <c-accordion-item
        class="border-none"
      >
        <c-accordion-header
          pt="0"
          pl="0"
          pr="0"
          pb="0"
          m="0"
          class="border-none fill-width"
        >
          <meeting-summary-card
            v-if="currentMeeting"
            :meeting="currentMeeting"
            :header-mode="true"
            class="flex-1"
          />
        </c-accordion-header>
      </c-accordion-item>
      <c-accordion-item
        v-for="itemType in AGENDA_ITEM_TYPES"
        v-slot="{ isExpanded }"
        :key="itemType.value"
        @click.native="loadItemsByType(itemType)"
      >
        <c-accordion-header
          :class="{ 'dark-background-active': isExpanded }"
          class="accordion-header"
        >
          <c-box
            flex="1"
            display="flex"
            align-items="center"
            justify-content="space-between"
          >
            <c-box>
              {{ itemType.display }}
            </c-box>
            <c-button
              size="sm"
              right-icon="add"
              variant-color="blue"
              variant="outline"
              class="center-icon-in-button"
              @click.stop="loadForm(itemType)"
            />
          </c-box>
        </c-accordion-header>
      </c-accordion-item>
    </c-accordion>
  </c-flex>
</template>

<script>
import { mapState } from 'vuex'
import { AGENDA_ITEM_TYPES } from '~/constants'
import MeetingSummaryCard from '~/components/MeetingSummaryCard'
import { NEW_ITEM_FORM_LOAD_ACTION, ITEMS_REQUESTED_BY_TYPE_ACTION } from '~/store'

export default {
  components: {
    MeetingSummaryCard,
  },
  data () {
    return {
      AGENDA_ITEM_TYPES,
    }
  },
  computed: {
    ...mapState(['currentMeeting']),
  },
  methods: {
    loadItemsByType (itemType) {
      this.$store.dispatch(ITEMS_REQUESTED_BY_TYPE_ACTION, itemType)
    },
    loadForm (itemType) {
      this.$store.dispatch(NEW_ITEM_FORM_LOAD_ACTION, itemType)
    },
  },
}
</script>

<style lang="scss">
@import '../assets/css/main.scss';

.center-icon-in-button {
  border: none;

  svg {
    margin: 0;
  }

  &:hover {
    border: none;

    svg {
      path {
        fill: white;
      }
    }

    &::before {
      content: 'Add ';
      color: white;
      margin-right: 0.5rem;
    }
  }
}

.accordion-header {
  &:hover {
    background-color: $gray400;
    color: black;

    .center-icon-in-button {
      color: black;

      &:hover {
        color: white;
        background-color: $dark-background-color;

        svg {
          path {
            fill: white;
          }
        }
      }
    }
  }

  &:focus {
    color: white;

    .center-icon-in-button {
      color: white;

      &:hover {
        color: black;
        background-color: white;

        svg {
          path {
            fill: black;
          }
        }

        &::before {
          color: black;
        }
      }
    }
  }
}
</style>
