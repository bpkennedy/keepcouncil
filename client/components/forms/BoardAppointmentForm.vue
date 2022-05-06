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
import { BOARD_APPOINTMENT_TYPE } from '~/constants'
import ButtonBar from '~/components/ButtonBar.vue'
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
    onSubmit () {
      const genericResource = {
        payload: {
          appointee: this.appointee,
          appointedTo: this.appointedTo,
          referredById: this.referredById,
          expiration: this.expiration,
        },
        itemTypeValue: BOARD_APPOINTMENT_TYPE,
      }
      this.$emit('submit', genericResource)
      this.$emit('close', BOARD_APPOINTMENT_TYPE)
    },
    onReset (veeValidateResetMethod) {
      this.appointee = null
      this.appointedTo = null
      this.referredById = null
      this.expiration = null
      veeValidateResetMethod()
    },
    onCancel () {
      this.$emit('cancel', BOARD_APPOINTMENT_TYPE)
    },
  },
}
</script>
