<template>
  <validation-observer v-slot="{ invalid, reset }">
    <form
      class="fill-height"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset(reset)"
    >
      <c-stack class="fill-height stack-gap">
        <content-header display="Add New Board Appointment" element="h2" font-size="2rem" />
        <validation-provider
          v-slot="{ errors }"
          rules="required|alpha_spaces"
        >
          <c-form-control is-required :is-invalid="!!errors[0]">
            <c-form-label for="appointee">
              Appointee
            </c-form-label>
            <c-input
              id="appointee"
              v-model="appointee"
              aria-describedby="appointee-helper-text"
            />
            <c-form-helper-text id="appointee-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          rules="alpha_spaces"
        >
          <c-form-control>
            <c-form-label for="appointedTo">
              Appointed To
            </c-form-label>
            <c-input
              id="appointedTo"
              v-model="appointedTo"
              aria-describedby="appointed-to-helper-text"
            />
            <c-form-helper-text id="appointed-to-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>

        <validation-provider v-slot="{ errors }">
          <c-form-control :is-invalid="!!errors[0]">
            <c-form-label for="referredById">
              Referred By
            </c-form-label>
            <c-select
              v-model="referredById"
              placeholder="Select a Person"
              aria-describedby="referred-by-helper-text"
            >
              <option
                v-for="a in copiedPeople"
                :key="a.id"
                :value="a.id"
              >
                {{ a.fullName }}
              </option>
            </c-select>
            <c-form-helper-text id="referred-by-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>

        <validation-provider>
          <c-form-control>
            <c-form-label for="expiration">
              Expiration Date
            </c-form-label>
            <datepicker
              id="expiration"
              v-model="expiration"
              name="expiration"
              :open-date="new Date()"
            />
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
import { AGENDA_ITEM_TYPES } from '~/constants'
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
      appointee: null,
      appointedTo: null,
      referredById: null,
      expiration: null,
      copiedPeople: [],
    }
  },
  computed: {
    ...mapState(['people']),
  },
  created () {
    this.copiedPeople = [...this.people]
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch(DATA_IS_LOADING_ACTION, 'Creating new board appointment...')
      await this.$store.dispatch(NEW_GENERIC_RESOURCE_CREATION_ACTION, {
        payload: {
          appointee: this.appointee,
          appointedTo: this.appointedTo,
          referredById: this.referredById,
          expiration: this.expiration,
        },
        itemType: 'boardAppointment',
      })
      await this.$store.dispatch(ITEMS_REQUESTED_BY_TYPE_ACTION, AGENDA_ITEM_TYPES.find(t => t.value === 'boardAppointment'))
      await this.$store.dispatch(DATA_DONE_LOADING_ACTION)
      this.$toast({
        title: 'Success.',
        description: `We've created a new Board Appointment for you.`,
        status: 'success',
        duration: 8000,
      })
    },
    onReset (veeValidateResetMethod) {
      this.appointee = null
      this.appointedTo = null
      this.referredById = null
      this.expiration = null
      veeValidateResetMethod()
    },
    async onCancel () {
      await this.$store.dispatch(ITEMS_REQUESTED_BY_TYPE_ACTION, AGENDA_ITEM_TYPES.find(t => t.value === 'boardAppointment'))
    },
  },
}
</script>
