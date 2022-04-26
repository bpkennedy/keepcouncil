<template>
  <validation-observer v-slot="{ invalid, reset }">
    <form
      class="fill-height"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset(reset)"
    >
      <c-stack class="fill-height stack-gap">
        <content-header display="Add New Hearing from Citizen" element="h2" font-size="2rem" />
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
import { AGENDA_ITEM_TYPES, HEARING_FROM_CITIZEN_TYPE } from '~/constants'
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
      from: null,
      content: null,
    }
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch(DATA_IS_LOADING_ACTION, 'Creating new Hearing from Citizen...')
      await this.$store.dispatch(NEW_GENERIC_RESOURCE_CREATION_ACTION, {
        payload: {
          from: this.from,
          content: this.content,
        },
        itemType: HEARING_FROM_CITIZEN_TYPE,
      })
      await this.$store.dispatch(ITEMS_REQUESTED_BY_TYPE_ACTION, AGENDA_ITEM_TYPES.find(t => t.value === HEARING_FROM_CITIZEN_TYPE))
      await this.$store.dispatch(DATA_DONE_LOADING_ACTION)
      this.$toast({
        title: 'Success.',
        description: `We've created a new Hearing for Citizen for you.`,
        status: 'success',
        duration: 8000,
      })
    },
    onReset (veeValidateResetMethod) {
      this.from = null
      this.content = null
      veeValidateResetMethod()
    },
    async onCancel () {
      await this.$store.dispatch(ITEMS_REQUESTED_BY_TYPE_ACTION, AGENDA_ITEM_TYPES.find(t => t.value === HEARING_FROM_CITIZEN_TYPE))
    },
  },
}
</script>
