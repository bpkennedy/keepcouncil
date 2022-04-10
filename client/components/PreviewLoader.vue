<template>
  <validation-observer v-slot="{ invalid }">
    <form
      class="fill-height"
      @submit.prevent="onSubmit"
    >
      <c-stack class="fill-height stack-gap" :padding="['4']">
        <c-text
          as="h1"
          font-size="2xl"
          font-family="EuropaBold"
          size="md"
          text-align="center"
          color="white"
        >
          Preview PDF File
        </c-text>
        <validation-provider
          v-slot="{ errors }"
          rules="required|url"
        >
          <c-form-control is-required :is-invalid="!!errors[0]">
            <c-form-label for="previeweUrl">
              URL
            </c-form-label>
            <c-input
              id="previewUrl"
              v-model="previewUrl"
              name="previewUrl"
              type="text"
              aria-describedby="preview-url-helper-text"
            />
            <c-form-helper-text id="preview-url-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
              <c-text
                v-else
                color="gray"
              >
                The full url address to a pdf file
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>
        <button-bar
          :invalid-form="invalid"
          :show-cancel-button="false"
          :show-reset-button="false"
          class="position-sticky bottom"
        />
      </c-stack>
    </form>
  </validation-observer>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { DATA_IS_LOADING_ACTION, DATA_DONE_LOADING_ACTION, SUBMIT_PREVIEW_FILE_URL_ACTION } from '~/store'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data () {
    return {
      previewUrl: '',
    }
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch(DATA_IS_LOADING_ACTION)
      await this.$store.dispatch(SUBMIT_PREVIEW_FILE_URL_ACTION, this.previewUrl)
      await this.$store.dispatch(DATA_DONE_LOADING_ACTION)
    },
  },
}
</script>
