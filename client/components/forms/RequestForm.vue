<template>
  <validation-observer v-slot="{ invalid, reset }">
    <form
      class="fill-height"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset(reset)"
    >
      <c-stack class="fill-height stack-gap">
        <content-header display="Add New Request" element="h2" font-size="2rem" />
        <validation-provider
          v-slot="{ errors }"
          rules="required|alpha_spaces"
        >
          <c-form-control is-required :is-invalid="!!errors[0]">
            <c-form-label for="petitioner">
              Petitioner
            </c-form-label>
            <c-input
              id="petitioner"
              v-model="petitioner"
              aria-describedby="petitioner-helper-text"
            />
            <c-form-helper-text id="petitioner-helper-text">
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
            <c-form-label for="accepted">
              Accepted
            </c-form-label>
            <c-select
              v-model="accepted"
              placeholder="Select One"
              aria-describedby="accepted-helper-text"
            >
              <option :value="true">
                Accepted
              </option>
              <option :value="false">
                Not accepted
              </option>
            </c-select>
            <c-form-helper-text id="accepted-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>

        <validation-provider>
          <c-form-control>
            <c-form-label for="acceptorId">
              Accepted by
            </c-form-label>
            <c-select
              v-model="acceptorId"
              placeholder="Select a Person"
              aria-describedby="accepted-by-helper-text"
            >
              <option
                v-for="a in copiedPeopleAcceptor"
                :key="a.id"
                :value="a.id"
              >
                {{ a.fullName }}
              </option>
            </c-select>
          </c-form-control>
        </validation-provider>

        <validation-provider>
          <c-form-control>
            <c-form-label for="secondedById">
              Seconded by
            </c-form-label>
            <c-select
              v-model="secondedById"
              placeholder="Select a Person"
              aria-describedby="seconded-by-id-helper-text"
            >
              <option
                v-for="a in copiedPeopleSecondedBy"
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
import { AGENDA_ITEM_TYPES, REQUEST_TYPE } from '~/constants'
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
      petitioner: null,
      title: null,
      content: null,
      accepted: null,
      acceptorId: null,
      secondedById: null,
      copiedPeopleAcceptor: [],
      copiedPeopleSecondedBy: [],
    }
  },
  computed: {
    ...mapState(['people']),
  },
  created () {
    this.copiedPeopleAcceptor = [...this.people]
    this.copiedPeopleSecondedBy = [...this.people]
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch(DATA_IS_LOADING_ACTION, 'Creating new Request...')
      await this.$store.dispatch(NEW_GENERIC_RESOURCE_CREATION_ACTION, {
        payload: {
          petitioner: this.petitioner,
          title: this.title,
          content: this.content,
          accepted: this.accepted,
          acceptorId: this.acceptorId,
          secondedById: this.secondedById,
        },
        itemType: REQUEST_TYPE,
      })
      await this.$store.dispatch(ITEMS_REQUESTED_BY_TYPE_ACTION, AGENDA_ITEM_TYPES.find(t => t.value === REQUEST_TYPE))
      await this.$store.dispatch(DATA_DONE_LOADING_ACTION)
      this.$toast({
        title: 'Success.',
        description: `We've created a new Request for you.`,
        status: 'success',
        duration: 8000,
      })
    },
    onReset (veeValidateResetMethod) {
      this.petitioner = null
      this.title = null
      this.content = null
      this.accepted = null
      this.acceptorId = null
      this.secondedById = null
      veeValidateResetMethod()
    },
    async onCancel () {
      await this.$store.dispatch(ITEMS_REQUESTED_BY_TYPE_ACTION, AGENDA_ITEM_TYPES.find(t => t.value === REQUEST_TYPE))
    },
  },
}
</script>
