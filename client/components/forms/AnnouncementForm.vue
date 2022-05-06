<template>
  <validation-observer v-slot="{ invalid, reset }">
    <form
      class="fill-height"
      @submit.prevent="onSubmit"
      @reset.prevent="onReset(reset)"
    >
      <c-stack class="fill-height stack-gap">
        <content-header display="Add New Announcement" element="h2" font-size="2rem" />
        <validation-provider
          v-slot="{ errors }"
          rules="required"
        >
          <c-form-control is-required :is-invalid="!!errors[0]">
            <c-form-label for="announcerId">
              Announcer
            </c-form-label>
            <c-select
              v-model="announcerId"
              placeholder="Select a Person"
              aria-describedby="announcer-id-helper-text"
            >
              <option
                v-for="a in copiedPeople"
                :key="a.id"
                :value="a.id"
              >
                {{ a.fullName }}
              </option>
            </c-select>
            <c-form-helper-text id="announcer-id-helper-text">
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
import { mapState } from 'vuex'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import { ANNOUNCEMENT_TYPE } from '~/constants'
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
      announcerId: null,
      content: null,
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
          announcerId: this.announcerId,
          content: this.content,
        },
        itemTypeValue: ANNOUNCEMENT_TYPE,
      }
      this.$emit('submit', genericResource)
      this.$emit('close', ANNOUNCEMENT_TYPE)
    },
    onReset (veeValidateResetMethod) {
      this.announcerId = null
      this.content = null
      veeValidateResetMethod()
    },
    onCancel () {
      this.$emit('cancel', ANNOUNCEMENT_TYPE)
    },
  },
}
</script>
