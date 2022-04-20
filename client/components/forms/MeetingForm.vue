<template>
  <validation-observer v-slot="{ invalid }">
    <form
      class="fill-height"
      @submit.prevent="onSubmit"
    >
      <c-stack class="fill-height stack-gap">
        <content-header display="Add New Meeting" element="h2" font-size="2rem" />
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <c-form-control is-required :is-invalid="!!errors[0]">
            <c-form-label for="meetingName">
              Meeting Name
            </c-form-label>
            <c-input
              id="meetingName"
              v-model="meetingName"
              name="meetingName"
              type="text"
              aria-describedby="meeting-name-helper-text"
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
            <c-form-label for="meetingDate">
              Meeting Date
            </c-form-label>
            <datepicker
              id="meetingDate"
              v-model="meetingDate"
              name="meetingDate"
              :open-date="new Date()"
              aria-describedby="meeting-date-helper-text"
            />
            <c-form-helper-text id="meeting-date-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          rules="url"
        >
          <c-form-control :is-invalid="!!errors[0]">
            <c-form-label for="meetingPreviewUrl">
              Preview File URL
            </c-form-label>
            <c-input
              id="meetingPreviewUrl"
              v-model="meetingPreviewUrl"
              name="meetingPreviewUrl"
              type="text"
              aria-describedby="meeting-preview-url-helper-text"
            />
            <c-form-helper-text id="meeting-preview-url-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>
        <spacer />
        <button-bar
          :invalid-form="invalid"
          :show-reset-button="false"
          class="position-sticky bottom"
          @cancel="onCancel"
        />
      </c-stack>
    </form>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import ButtonBar from '~/components/ButtonBar.vue'
import ContentHeader from '~/components/ContentHeader'

export default {
  components: {
    ContentHeader,
    ValidationObserver,
    ValidationProvider,
    ButtonBar,
  },
  data () {
    return {
      meetingName: null,
      meetingDate: null,
      meetingPreviewUrl: null,
    }
  },
  methods: {
    onSubmit () {
      this.$emit('submit', {
        meetingName: this.meetingName,
        meetingDate: this.meetingDate,
        meetingPreviewUrl: this.meetingPreviewUrl,
      })
      this.$emit('close')
    },
    close () {
      this.$emit('close')
    },
    onCancel () {
      this.meetingName = null
      this.meetingDate = null
      this.meetingPreviewUrl = null
      this.$emit('cancel')
    },
  },
}
</script>

<style lang="scss">
@import '../../assets/css/main';

.vdp-datepicker__calendar {
  background: rgb(45, 55, 72) !important;

  .prev,
  .next {
    color: white !important;
  }
}

.vdp-datepicker {
  input {
    width: 100%;
    font-size: 1rem !important;
    padding-left: 1rem !important;
    padding-right: 1rem !important;
    height: 2.5rem !important;
    line-height: 2.5rem !important;
    border-radius: 0.25rem !important;
    border-width: 1px !important;
    border-color: rgba(255, 255, 255, 0.04) !important;
    background-color: rgba(255, 255, 255, 0.06) !important;
  }
}
</style>
