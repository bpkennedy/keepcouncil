<template>
  <validation-observer v-slot="{ invalid, reset }">
    <form
      class="fill-height"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset(reset)"
    >
      <c-stack class="fill-height stack-gap">
        <content-header display="Add New Motion" element="h2" font-size="2rem" />
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <c-form-control is-required :is-invalid="!!errors[0]">
            <c-form-label for="carried">
              Carried
            </c-form-label>
            <c-select
              v-model="carried"
              placeholder="Select One"
              aria-describedby="carried-helper-text"
            >
              <option :value="true">
                Carried
              </option>
              <option :value="false">
                Not Carried
              </option>
            </c-select>
            <c-form-helper-text id="carried-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <c-form-control is-required :is-invalid="!!errors[0]">
            <c-form-label for="action">
              Action
            </c-form-label>
            <c-select
              v-model="action"
              placeholder="Select an action"
              aria-describedby="action-helper-text"
            >
              <option
                v-for="a in ACTIONS"
                :key="a.value"
                :value="a.value"
              >
                {{ a.display }}
              </option>
            </c-select>
            <c-form-helper-text id="action-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <c-form-control is-required :is-invalid="!!errors[0]">
            <c-form-label for="initiatorId">
              Initiated by
            </c-form-label>
            <c-select
              v-model="initiatorId"
              placeholder="Select a Person"
              aria-describedby="initiated-by-helper-text"
            >
              <option
                v-for="a in copiedPeople"
                :key="a.id"
                :value="a.id"
              >
                {{ a.fullName }}
              </option>
            </c-select>
            <c-form-helper-text id="initiated-by-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>

        <validation-provider>
          <c-form-control>
            <c-form-label for="seconderId">
              Seconded by
            </c-form-label>
            <c-select
              v-model="seconderId"
              placeholder="Select a Person"
            >
              <option
                v-for="a in seconders"
                :key="a.id"
                :value="a.id"
              >
                {{ a.fullName }}
              </option>
            </c-select>
          </c-form-control>
        </validation-provider>

        <validation-provider>
          <c-form-control>
            <c-form-label for="agendaItemTypeValue">
              Agenda Item Type
            </c-form-label>
            <c-select
              v-model="agendaItemTypeValue"
              placeholder="Select an Agenda Item Type"
            >
              <option
                v-for="itemType in AGENDA_ITEM_TYPES.filter(ai => ![PERSON_TYPE, MEETING_TYPE, MOTION_TYPE].includes(ai.value))"
                :key="itemType.value"
                :value="itemType.value"
              >
                {{ itemType.display }}
              </option>
            </c-select>
          </c-form-control>
        </validation-provider>

        <c-box
          v-if="agendaItemType"
          class="inset-input"
        >
          <c-box
            v-if="!pickExisting && !pickNew && !newAgendaResource"
            class="multi-element"
          >
            <c-button
              variant-color="green"
              variant="ghost"
              @click="pickExisting = true"
            >
              Pick Existing {{ agendaItemType.display }}
            </c-button>
            <c-text
              color="gray.500"
              font-weight="semibold"
              font-size="sm"
              letter-spacing="wide"
            >
              OR
            </c-text>
            <c-button
              variant-color="green"
              variant="ghost"
              @click="pickNew = true"
            >
              Create New {{ agendaItemType.display }}
            </c-button>
          </c-box>

          <validation-provider v-if="pickExisting">
            <c-form-control>
              <c-form-label
                for="existingAgendaItem"
              >
                Select a {{ agendaItemType.display }}
              </c-form-label>
              <multiselect
                id="existingAgendaItem"
                v-model="existingAgendaItem"
                track-by="id"
                label="name"
                :searchable="false"
                :allow-empty="false"
                :placeholder="`Pick one`"
                :options="agendaItems"
                :option-height="40"
                :limit="6"
                :limit-text="() => 'Scroll for more results'"
                :show-no-results="true"
                :show-labels="false"
                class="third-party-select"
              >
                <template #singleLabel="{ option }">
                  {{ agendaItemType.primaryPropDisplay }} {{ option[agendaItemType.primaryProp] }}, {{ agendaItemType.secondaryPropDisplay }} {{ option[agendaItemType.secondaryProp] }}
                </template>
                <template #option="{ option }">
                  {{ agendaItemType.primaryPropDisplay }} {{ option[agendaItemType.primaryProp] }}, {{ agendaItemType.secondaryPropDisplay }} {{ option[agendaItemType.secondaryProp] }}
                </template>
                <template #noResult>
                  <span>No {{ agendaItemType.display }} of this type found.</span>
                </template>
              </multiselect>
            </c-form-control>
          </validation-provider>

          <c-stack v-if="newAgendaResource">
            <content-header
              :display="`New ${agendaItemType.display}`"
              element="h5"
              font-size="1.75rem"
            />
            <component
              :is="`${agendaItemType.value}-card`"
              :item="newAgendaResource.payload"
            />
          </c-stack>

          <new-agenda-item-modal
            :is-open="pickNew"
            :item="itemTypeFromValue(agendaItemTypeValue)"
            @close="pickNew = false"
            @submit="newAgendaItemToCreate"
          />
        </c-box>

        <spacer />
        <button-bar
          :invalid-form="invalid"
          class="position-sticky bottom"
          @cancel="onCancel"
        />
      </c-stack>
    </form>
  </validation-observer>
</template>

<script>
import { mapState } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import {
  AGENDA_ITEM_TYPES,
  ACTIONS,
  MOTION_TYPE,
  MEETING_TYPE,
  PERSON_TYPE,
  itemTypeFromValue,
  API_PATH,
} from '~/constants'
import ButtonBar from '~/components/ButtonBar.vue'
import {
  apiGet,
  NEW_GENERIC_RESOURCE_CREATION_ACTION,
} from '~/store'
import ContentHeader from '~/components/ContentHeader'
import NewAgendaItemModal from '~/components/NewAgendaItemModal'
import MeetingSummaryCard from '~/components/MeetingSummaryCard'
import PersonCard from '~/components/cards/PersonCard'
import BillCard from '~/components/cards/BillCard'
import BoardAppointmentCard from '~/components/cards/BoardAppointmentCard'
import HearingFromCitizenCard from '~/components/cards/HearingFromCitizenCard'
import ProclamationCard from '~/components/cards/ProclamationCard'
import ResolutionCard from '~/components/cards/ResolutionCard'
import CommunicationCard from '~/components/cards/CommunicationCard'
import PublicHearingCard from '~/components/cards/PublicHearingCard'
import RequestCard from '~/components/cards/RequestCard'
import AnnouncementCard from '~/components/cards/AnnouncementCard'
import MotionCard from '~/components/cards/MotionCard'

export default {
  components: {
    NewAgendaItemModal,
    ContentHeader,
    ButtonBar,
    ValidationObserver,
    ValidationProvider,
    MeetingSummaryCard,
    PersonCard,
    BillCard,
    BoardAppointmentCard,
    HearingFromCitizenCard,
    ProclamationCard,
    ResolutionCard,
    CommunicationCard,
    PublicHearingCard,
    RequestCard,
    AnnouncementCard,
    MotionCard,
  },
  data () {
    return {
      carried: null,
      action: null,
      initiatorId: null,
      seconderId: null,
      agendaItemTypeValue: null,
      agendaItems: [],
      existingAgendaItem: null,
      newAgendaResource: null,
      pickNew: false,
      pickExisting: false,
      copiedPeople: [],
      copiedPeopleSecondedBy: [],
      ACTIONS,
      AGENDA_ITEM_TYPES,
      MOTION_TYPE,
      MEETING_TYPE,
      PERSON_TYPE,
      itemTypeFromValue,
    }
  },
  computed: {
    ...mapState(['people']),
    seconders () {
      if (this.initiatorId) {
        return this.copiedPeopleSecondedBy.filter(p => p.id !== parseInt(this.initiatorId, 10))
      }
      return this.copiedPeopleSecondedBy
    },
    agendaItemType () {
      return itemTypeFromValue(this.agendaItemTypeValue)
    },
  },
  watch: {
    async pickExisting (_) {
      this.agendaItems = (await apiGet(this.$axios, `${API_PATH}/${this.agendaItemType.value}`))
    },
  },
  created () {
    this.copiedPeople = [...this.people]
    this.copiedPeopleSecondedBy = [...this.people]
  },
  methods: {
    async newAgendaItemToCreate (genericResource) {
      await this.$store.dispatch(NEW_GENERIC_RESOURCE_CREATION_ACTION, genericResource)
      this.newAgendaResource = genericResource
    },
    onSubmit () {
      const genericResource = {
        payload: {
          carried: this.carried,
          action: this.action,
          initiatorId: this.initiatorId,
          seconderId: this.seconderId,
        },
        itemTypeValue: MOTION_TYPE,
      }
      console.log(this.existingAgendaItem)
      if (this.existingAgendaItem) {
        genericResource.payload = {
          ...genericResource.payload,
          [`${this.agendaItemType.value}Id`]: this.existingAgendaItem.id,
        }
      } else if (this.newAgendaResource) {
        genericResource.payload = {
          ...genericResource.payload,
          [`${this.agendaItemType.value}Id`]: this.newAgendaResource.id,
        }
      }
      this.$emit('submit', genericResource)
      this.$emit('close', MOTION_TYPE)
    },
    onReset (veeValidateResetMethod) {
      this.carried = null
      this.action = null
      this.initiatorId = null
      this.seconderId = null
      this.agendaItemTypeValue = null
      this.agendaItems = []
      this.existingAgendaItem = null
      this.newAgendaResource = null
      this.pickNew = false
      this.pickExisting = false
      veeValidateResetMethod()
    },
    onCancel () {
      this.$emit('cancel', MOTION_TYPE)
    },
  },
}
</script>

<style lang="scss">
@import '../../assets/css/main.scss';

.inset-input {
  padding: 2rem;
  background-color: $light-background-color;
  border-radius: $input-border-radius;
}

.multi-element {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
}

.third-party-select {
  .multiselect__content-wrapper {
    background: $input-background-color;
    border-color: $input-border-default;
  }

  .multiselect__tags {
    background: $input-background-color;
    border-color: $input-border-default;
  }

  .multiselect__placeholder {
    color: $input-font-color;
    font-family: inherit;
    font-size: 1rem;
  }

  .multiselect__option {
    background: $input-background-color;
    color: white;
    font-family: inherit;
    font-size: 1rem;
  }

  .multiselect__single {
    background: $input-background-color;
    color: $input-font-color;
  }
}
</style>
