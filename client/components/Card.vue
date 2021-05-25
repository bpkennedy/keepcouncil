<template>
  <c-box
    :w="['100%']"
    :mt="['1rem', '1rem', '0', '0', '0']"
    mb="2rem"
    shadow="md"
    rounded="lg"
    bg="white"
    tabindex="0"
  >
    <c-box p="5">
      <slot v-if="$slots.passed" name="passed" />
      <c-list v-else spacing="3">
        <c-list-item>
          <c-list-icon icon="check-circle" color="green.500" />
          Lorem ipsum dolor sit amet, consectetur adipisicing elit
        </c-list-item>
        <c-list-item>
          <c-list-icon icon="check-circle" color="green.500" />
          Assumenda, quia temporibus eveniet a libero incidunt suscipit
        </c-list-item>
        <c-list-item>
          <c-list-icon icon="check-circle" color="green.500" />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </c-list-item>
        <c-list-item>
          <c-list-icon icon="settings" color="green.500" />
          Quidem, ipsam illum quis sed voluptatum quae eum fugit earum
        </c-list-item>
      </c-list>
    </c-box>
  </c-box>
</template>
