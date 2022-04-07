<template>
  <c-stack>
    <c-form-control>
      <c-form-label for="fullName">
        Full name*
      </c-form-label>
      <c-input id="fullName" type="text" aria-describedby="full-name-helper-text" />
      <c-form-helper-text id="full-name-helper-text">
        First and Last name.
      </c-form-helper-text>
    </c-form-control>
    <c-form-control>
      <c-form-label for="position">
        Position*
      </c-form-label>
      <c-select v-model="selectedPosition" placeholder="Select Position">
        <option
          v-for="position in POSITIONS"
          :key="position.value"
          :value="position.value"
        >
          {{ position.display }}
        </option>
      </c-select>
    </c-form-control>
    <c-form-control>
      <c-form-label for="email">
        Email address*
      </c-form-label>
      <c-input id="email" type="email" aria-describedby="email-helper-text" />
      <c-form-helper-text id="email-helper-text">
        We'll never share your email.
      </c-form-helper-text>
    </c-form-control>
    <c-form-control>
      <c-form-label for="phone">
        Phone number
      </c-form-label>
      <c-input id="phone" type="phone" />
    </c-form-control>
    <c-form-control>
      <c-form-label for="ward">
        Ward*
      </c-form-label>
      <c-select v-model="selectedWard" placeholder="Select Ward">
        <option
          v-for="ward in wards"
          :key="ward"
          :value="ward"
        >
          {{ ward }}
        </option>
      </c-select>
    </c-form-control>
    <spacer />
    <button-bar width="100%" />
  </c-stack>
</template>

<script>
import { POSITIONS } from '~/constants'
import ButtonBar from '~/components/ButtonBar.vue'

export default {
  data () {
    return {
      selectedWard: null,
      selectedPosition: null,
      POSITIONS,
      ButtonBar,
      wards: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
    }
  },
}
</script>
