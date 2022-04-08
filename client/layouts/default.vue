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
              direction="column"
              justify="flex-start"
              align="center"
              class="full-width"
              :padding-left="['4']"
              :padding-right="['4']"
            >
              <c-flex
                flex="1"
                direction="column"
                class="full-width maximum-content-width"
              >
                <nav-bar class="navbar-height" />
                <Nuxt class="content-height" />
              </c-flex>
            </c-flex>
          </c-box>
        </c-dark-mode>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>

<script>
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
