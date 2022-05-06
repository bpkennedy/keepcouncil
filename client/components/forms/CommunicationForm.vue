<template>
  <validation-observer v-slot="{ invalid, reset }">
    <form
      class="fill-height"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset(reset)"
    >
      <c-stack class="fill-height stack-gap">
        <content-header display="Add New Communication" element="h2" font-size="2rem" />
        <validation-provider
          v-slot="{ errors }"
          rules="alpha_spaces"
        >
          <c-form-control :is-invalid="!!errors[0]">
            <c-form-label for="from">
              From
            </c-form-label>
            <c-input
              id="from"
              v-model="from"
              aria-describedby="from-helper-text"
            />
            <c-form-helper-text id="from-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>

        <validation-provider>
          <c-form-control>
            <c-form-label for="content">
              Content
            </c-form-label>
            <c-textarea
              id="content"
              v-model="content"
              name="content"
            />
          </c-form-control>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <c-form-control is-required :is-invalid="!!errors[0]">
            <c-form-label for="communicationType">
              Communication Type
            </c-form-label>
            <c-select
              v-model="communicationType"
              placeholder="Select a communication type"
              aria-describedby="communication-type-helper-text"
            >
              <option :value="MAIL_ENUM">
                Regular Mail
              </option>
              <option :value="EMAIL_ENUM">
                Email
              </option>
            </c-select>
            <c-form-helper-text id="communication-type-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>

        <validation-provider>
          <c-form-control>
            <c-form-label for="dateReceived">
              Date Received
            </c-form-label>
            <datepicker
              id="dateReceived"
              v-model="dateReceived"
              name="dateReceived"
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
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { MAIL_ENUM, EMAIL_ENUM, COMMUNICATION_TYPE } from '~/constants'
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
      from: null,
      content: null,
      communicationType: null,
      dateReceived: null,
      MAIL_ENUM,
      EMAIL_ENUM,
    }
  },
  methods: {
    onSubmit () {
      const genericResource = {
        payload: {
          from: this.from,
          content: this.content,
          communicationType: this.communicationType,
          dateReceived: this.dateReceived,
        },
        itemTypeValue: COMMUNICATION_TYPE,
      }
      this.$emit('submit', genericResource)
      this.$emit('close', COMMUNICATION_TYPE)
    },
    onReset (veeValidateResetMethod) {
      this.from = null
      this.content = null
      this.communicationType = null
      this.dateReceived = null
      veeValidateResetMethod()
    },
    onCancel () {
      this.$emit('close', COMMUNICATION_TYPE)
    },
  },
}
</script>
