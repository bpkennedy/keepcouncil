<template>
  <validation-observer v-slot="{ invalid, reset }">
    <form
      class="fill-height"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset(reset)"
    >
      <c-stack class="fill-height stack-gap">
        <content-header display="Add New Proclamation" element="h2" font-size="2rem" />
        <validation-provider
          v-slot="{ errors }"
          rules="alpha_spaces"
        >
          <c-form-control :is-invalid="!!errors[0]">
            <c-form-label for="presentedTo">
              Presented To
            </c-form-label>
            <c-input
              id="presentedTo"
              v-model="presentedTo"
              aria-describedby="presented-to-helper-text"
            />
            <c-form-helper-text id="presented-to-helper-text">
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
import { PROCLAMATION_TYPE } from '~/constants'
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
      presentedTo: null,
      content: null,
    }
  },
  methods: {
    onSubmit () {
      const genericResource = {
        payload: {
          presentedTo: this.presentedTo,
          content: this.content,
        },
        itemTypeValue: PROCLAMATION_TYPE,
      }
      this.$emit('submit', genericResource)
      this.$emit('close', PROCLAMATION_TYPE)
    },
    onReset (veeValidateResetMethod) {
      this.presentedTo = null
      this.content = null
      veeValidateResetMethod()
    },
    onCancel () {
      this.$emit('close', PROCLAMATION_TYPE)
    },
  },
}
</script>
