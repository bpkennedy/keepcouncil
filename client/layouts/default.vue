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
              align="center"
              justify="center"
              class="fill-height full-width"
            >
              <ClientOnly>
                <splitpanes class="default-theme">
                  <pane v-if="showPreviewPane">
                    <c-flex
                      direction="column"
                      align="center"
                      justify="center"
                      class="fill-width minimum-content-width full-height default-border border-top-none border-bottom-none"
                    >
                      <preview-panel
                        v-if="previewFileUrl"
                        :url="previewFileUrl"
                        class="fill-width fill-height"
                      />
                    </c-flex>
                  </pane>
                  <pane>
                    <c-flex
                      direction="column"
                      justify="flex-start"
                      align="center"
                      class="fill-width"
                      :padding-left="['4']"
                      :padding-right="['4']"
                    >
                      <c-flex
                        flex="1"
                        direction="column"
                        class="fill-width maximum-content-width"
                      >
                        <nav-bar class="navbar-height" />
                        <Nuxt class="content-height" />
                      </c-flex>
                    </c-flex>
                  </pane>
                </splitpanes>
              </ClientOnly>
            </c-flex>
          </c-box>
        </c-dark-mode>
      </CColorModeProvider>
    </CThemeProvider>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Loader from '../components/Loader.vue'
import NavBar from '../components/NavBar.vue'
import PreviewPanel from '~/components/PreviewPanel.vue'

// const previewLink = 'https://www.florissantmo.com/egov/documents/1646328757_74811.pdf',

export default {
  name: 'App',
  components: {
    NavBar,
    Loader,
    PreviewPanel,
  },
  computed: {
    ...mapState(['showPreviewPane', 'previewFileUrl']),
  },
}
</script>
