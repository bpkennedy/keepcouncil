<template>
  <validation-observer v-slot="{ invalid, reset }">
    <form
      class="fill-height"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset(reset)"
    >
      <c-stack class="fill-height stack-gap">
        <content-header display="Add New Bill" element="h2" font-size="2rem" />
        <validation-provider
          v-slot="{ errors }"
          rules="numeric"
        >
          <c-form-control :is-invalid="!!errors[0]">
            <c-form-label for="billNumber">
              Bill number
            </c-form-label>
            <c-input
              id="billNumber"
              v-model="billNumber"
              type="number"
              aria-describedby="bill-number-helper-text"
            />
            <c-form-helper-text id="bill-number-helper-text">
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
            <c-form-label for="position">
              Introduced by
            </c-form-label>
            <c-select
              v-model="introducedById"
              placeholder="Select a Person"
              aria-describedby="introduced-by-helper-text"
            >
              <option
                v-for="a in copiedPeople"
                :key="a.id"
                :value="a.id"
              >
                {{ a.fullName }}
              </option>
            </c-select>
            <c-form-helper-text id="introduced-by-helper-text">
              <c-text v-if="!!errors[0]" color="red.300">
                {{ errors[0] }}
              </c-text>
            </c-form-helper-text>
          </c-form-control>
        </validation-provider>

        <validation-provider>
          <c-form-control>
            <c-form-label for="introducedDate">
              Introduced Date
            </c-form-label>
            <datepicker
              id="introducedDate"
              v-model="introducedDate"
              name="introducedDate"
              :open-date="new Date()"
            />
          </c-form-control>
        </validation-provider>

        <validation-provider>
          <c-form-control>
            <c-form-label for="passDate">
              Pass Date
            </c-form-label>
            <datepicker
              id="passDate"
              v-model="passDate"
              name="passDate"
              :open-date="new Date()"
            />
          </c-form-control>
        </validation-provider>

        <validation-provider v-slot="{ errors }">
          <c-form-control>
            <c-form-label for="ordinance">
              Ordinance
            </c-form-label>
            <c-input
              id="ordinance"
              v-model="ordinance"
              aria-describedby="ordinance-helper-text"
            />
            <c-form-helper-text id="ordinance-helper-text">
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
      billNumber: null,
      content: null,
      introducedById: null,
      introducedDate: null,
      passDate: null,
      ordinance: null,
      copiedPeople: [],
    }
  },
  computed: {
    ...mapState(['people']),
  },
  watch: {
    attendees (newVal) {
      this.copiedPeople = [...newVal]
    },
  },
  created () {
    this.copiedPeople = [...this.people]
  },
  methods: {
    async onSubmit () {
      await this.$store.dispatch(DATA_IS_LOADING_ACTION, 'Creating new bill...')
      await this.$store.dispatch(NEW_GENERIC_RESOURCE_CREATION_ACTION, {
        payload: {
          billNumber: this.billNumber,
          content: this.content,
          introducedById: this.introducedById,
          introducedDate: this.introducedDate,
          passDate: this.passDate,
          ordinance: this.ordinance,
        },
        itemType: 'bill',
      })
      await this.$store.dispatch(ITEMS_REQUESTED_BY_TYPE_ACTION, AGENDA_ITEM_TYPES.find(t => t.value === 'bill'))
      await this.$store.dispatch(DATA_DONE_LOADING_ACTION)
      this.$toast({
        title: 'Success.',
        description: `We've created a new bill for you.`,
        status: 'success',
        duration: 8000,
      })
    },
    onReset (veeValidateResetMethod) {
      this.billNumber = null
      this.content = null
      this.introducedById = null
      this.introducedDate = null
      this.passDate = null
      this.ordinance = null
      veeValidateResetMethod()
    },
    async onCancel () {
      await this.$store.dispatch(ITEMS_REQUESTED_BY_TYPE_ACTION, AGENDA_ITEM_TYPES.find(t => t.value === 'bill'))
    },
  },
}
</script>
