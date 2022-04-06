<template>
  <div>
    <CThemeProvider>
      <CColorModeProvider>
        <c-dark-mode>
          <c-box
            as="main"
            font-family="body"
            color="gray.50"
          >
            <c-reset />
            <loader />
            <c-flex
              w="100vw"
              direction="column"
              justify="flex-start"
              align="center"
            >
              <c-flex
                flex="1"
                w="100vw"
                max-w="74rem"
                direction="column"
              >
                <nav-bar />
                <Nuxt />
              </c-flex>
            </c-flex>
          </c-box>
        </c-dark-mode>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>

<script lang="js">
import Loader from '../components/Loader.vue'
import NavBar from '../components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    Loader,
  },
}
</script>
