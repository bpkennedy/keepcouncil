<template>
  <validation-observer v-slot="{ invalid, reset }">
    <form
      class="fill-height"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset(reset)"
    >
      <c-stack class="fill-height stack-gap">
        <content-header display="Add New Resolution" element="h2" font-size="2rem" />
        <validation-provider
          v-slot="{ errors }"
          rules="required|numeric"
        >
          <c-form-control :is-invalid="!!errors[0]">
            <c-form-label for="resolutionNumber">
              Resolution number
            </c-form-label>
            <c-input
              id="resolutionNumber"
              v-model="resolutionNumber"
              type="number"
              aria-describedby="resolution-number-helper-text"
            />
            <c-form-helper-text id="resolution-number-helper-text">
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
            <c-form-label for="resolutionTitle">
              Resolution title
            </c-form-label>
            <c-input
              id="resolutionTitle"
              v-model="resolutionTitle"
              aria-describedby="resolution-title-helper-text"
            />
            <c-form-helper-text id="resolution-title-helper-text">
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
            <c-form-label for="content">
              Content
            </c-form-label>
            <c-textarea
              id="content"
              v-model="content"
              name="content"
              aria-describedby="content-helper-text"
            />
            <c-form-helper-text id="content-helper-text">
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
            <c-form-label for="introducedById">
              Introduced by
            </c-form-label>
            <c-select
              v-model="introducedById"
              placeholder="Select a Person"
              aria-describedby="introduced-by-id-helper-text"
            >
              <option
                v-for="a in copiedPeople"
                :key="a.id"
                :value="a.id"
              >
                {{ a.fullName }}
              </option>
            </c-select>
            <c-form-helper-text id="introduced-by-id-helper-text">
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
import { RESOLUTION_TYPE } from '~/constants'
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
      resolutionNumber: null,
      resolutionTitle: null,
      content: null,
      introducedById: null,
      introducedDate: null,
      passDate: null,
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
          resolutionNumber: this.resolutionNumber,
          resolutionTitle: this.resolutionTitle,
          content: this.content,
          introducedById: this.introducedById,
          introducedDate: this.introducedDate,
          passDate: this.passDate,
        },
        itemTypeValue: RESOLUTION_TYPE,
      }
      this.$emit('submit', genericResource)
      this.$emit('close', RESOLUTION_TYPE)
    },
    onReset (veeValidateResetMethod) {
      this.resolutionNumber = null
      this.resolutionTitle = null
      this.content = null
      this.introducedById = null
      this.introducedDate = null
      this.passDate = null
      veeValidateResetMethod()
    },
    onCancel () {
      this.$emit('close', RESOLUTION_TYPE)
    },
  },
}
</script>
