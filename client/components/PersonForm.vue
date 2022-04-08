<template>
  <validation-observer v-slot="{ invalid, reset }">
    <form
      class="fill-height"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset(reset)"
    >
      <c-stack class="fill-height stack-gap">
        <validation-provider
          v-slot="{ errors }"
          rules="required|alpha_spaces"
        >
          <c-form-control is-required :is-invalid="!!errors[0]">
            <c-form-label for="fullName">
              Full name
            </c-form-label>
            <c-input
              id="fullName"
              v-model="fullName"
              name="fullName"
              type="text"
              aria-describedby="full-name-helper-text"
            />
            <c-form-helper-text id="full-name-helper-text">
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
            <c-form-label for="position">
              Position
            </c-form-label>
            <c-select
              v-model="selectedPosition"
              placeholder="Select Position"
              aria-describedby="selected-position-helper-text"
            >
              <option
                v-for="position in POSITIONS"
                :key="position.value"
                :value="position.value"
              >
                {{ position.display }}
              </option>
            </c-select>
            <c-form-helper-text id="selected-position-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          rules="required|email"
        >
          <c-form-control is-required :is-invalid="!!errors[0]">
            <c-form-label for="email">
              Email address
            </c-form-label>
            <c-input
              id="email"
              v-model="email"
              type="email"
              aria-describedby="email-helper-text"
            />
            <c-form-helper-text id="email-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          rules="digits:10"
        >
          <c-form-control :is-invalid="!!errors[0]">
            <c-form-label for="phone">
              Phone number
            </c-form-label>
            <c-input
              id="phone"
              v-model="phone"
              type="phone"
              aria-describedby="phone-helper-text"
            />
            <c-form-helper-text id="phone-helper-text">
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
            <c-form-label for="ward">
              Ward
            </c-form-label>
            <c-select
              v-model="selectedWard"
              placeholder="Select Ward"
              aria-describedby="ward-helper-text"
            >
              <option
                v-for="ward in wards"
                :key="ward"
                :value="ward"
              >
                {{ ward }}
              </option>
            </c-select>
            <c-form-helper-text id="ward-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { POSITIONS } from '~/constants'
import ButtonBar from '~/components/ButtonBar.vue'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data () {
    return {
      selectedWard: null,
      selectedPosition: null,
      POSITIONS,
      ButtonBar,
      wards: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      fullName: '',
      email: '',
      phone: null,
    }
  },
  methods: {
    onSubmit () {
      // console.log('submitted')
    },
    onReset (veeValidateResetMethod) {
      this.selectedWard = null
      this.selectedPosition = null
      this.fullName = ''
      this.email = ''
      this.phone = null
      veeValidateResetMethod()
    },
    onCancel () {
      // console.log('cancelled')
    },
  },
}
</script>
