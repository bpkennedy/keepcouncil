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
import { AGENDA_ITEM_TYPES, ACTIONS } from '~/constants'
import ButtonBar from '~/components/ButtonBar.vue'
import {
  DATA_DONE_LOADING_ACTION,
  DATA_IS_LOADING_ACTION,
  ITEMS_REQUESTED_BY_TYPE_ACTION,
  NEW_GENERIC_RESOURCE_CREATION_ACTION,
} from '~/store'
import ContentHeader from '~/components/ContentHeader'

export default {
  components: {
    ContentHeader,
    ButtonBar,
    ValidationObserver,
    ValidationProvider,
  },
  data () {
    return {
      carried: null,
      action: null,
      initiatorId: null,
      seconderId: null,
      copiedPeople: [],
      copiedPeopleSecondedBy: [],
      ACTIONS,
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
  },
  created () {
    this.copiedPeople = [...this.people]
    this.copiedPeopleSecondedBy = [...this.people]
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch(DATA_IS_LOADING_ACTION, 'Creating new Motion...')
      await this.$store.dispatch(NEW_GENERIC_RESOURCE_CREATION_ACTION, {
        payload: {
          carried: this.carried,
          action: this.action,
          initiatorId: this.initiatorId,
          seconderId: this.seconderId,
        },
        itemType: 'motion',
      })
      await this.$store.dispatch(ITEMS_REQUESTED_BY_TYPE_ACTION, AGENDA_ITEM_TYPES.find(t => t.value === 'motion'))
      await this.$store.dispatch(DATA_DONE_LOADING_ACTION)
      this.$toast({
        title: 'Success.',
        description: `We've created a new Motion for you.`,
        status: 'success',
        duration: 8000,
      })
    },
    onReset (veeValidateResetMethod) {
      this.carried = null
      this.action = null
      this.initiatorId = null
      this.seconderId = null
      veeValidateResetMethod()
    },
    async onCancel () {
      await this.$store.dispatch(ITEMS_REQUESTED_BY_TYPE_ACTION, AGENDA_ITEM_TYPES.find(t => t.value === 'motion'))
    },
  },
}
</script>
