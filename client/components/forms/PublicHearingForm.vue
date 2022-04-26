<template>
  <validation-observer v-slot="{ invalid, reset }">
    <form
      class="fill-height"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset(reset)"
    >
      <c-stack class="fill-height stack-gap">
        <content-header display="Add New Public Hearing" element="h2" font-size="2rem" />
        <validation-provider
          v-slot="{ errors }"
          rules="required|alpha_spaces"
        >
          <c-form-control is-required :is-invalid="!!errors[0]">
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

        <validation-provider
          v-slot="{ errors }"
          rules="required|alpha_spaces"
        >
          <c-form-control is-required :is-invalid="!!errors[0]">
            <c-form-label for="title">
              Title
            </c-form-label>
            <c-input
              id="title"
              v-model="title"
              aria-describedby="title-helper-text"
            />
            <c-form-helper-text id="title-helper-text">
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
          <c-form-control :is-invalid="!!errors[0]">
            <c-form-label for="topic">
              Topic
            </c-form-label>
            <c-input
              id="topic"
              v-model="topic"
              aria-describedby="topic-helper-text"
            />
            <c-form-helper-text id="topic-helper-text">
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
import { AGENDA_ITEM_TYPES, PUBLIC_HEARING_TYPE } from '~/constants'
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
      title: null,
      topic: null,
    }
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch(DATA_IS_LOADING_ACTION, 'Creating new Public Hearing...')
      await this.$store.dispatch(NEW_GENERIC_RESOURCE_CREATION_ACTION, {
        payload: {
          from: this.from,
          content: this.content,
          title: this.title,
          topic: this.topic,
        },
        itemType: PUBLIC_HEARING_TYPE,
      })
      await this.$store.dispatch(ITEMS_REQUESTED_BY_TYPE_ACTION, AGENDA_ITEM_TYPES.find(t => t.value === PUBLIC_HEARING_TYPE))
      await this.$store.dispatch(DATA_DONE_LOADING_ACTION)
      this.$toast({
        title: 'Success.',
        description: `We've created a new Public Hearing for you.`,
        status: 'success',
        duration: 8000,
      })
    },
    onReset (veeValidateResetMethod) {
      this.from = null
      this.content = null
      this.title = null
      this.topic = null
      veeValidateResetMethod()
    },
    async onCancel () {
      await this.$store.dispatch(ITEMS_REQUESTED_BY_TYPE_ACTION, AGENDA_ITEM_TYPES.find(t => t.value === PUBLIC_HEARING_TYPE))
    },
  },
}
</script>
