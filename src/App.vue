<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
        <v-toolbar-title><span class="purple--text darken-2">Menu</span></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat><router-link to="/" tag="button"><span class="purple--text darken-2">HOME</span></router-link></v-btn>
        <v-btn flat><router-link to="/take" tag="button"><span class="purple--text darken-2">TAKE</span></router-link></v-btn>
        <v-btn flat><router-link to="/result" tag="button"><span class="purple--text darken-2">RESULT</span></router-link></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer
            height="auto"
            color="purple darken-2"
    >
      <v-layout
              justify-center
              row
              wrap
      >
        <v-btn
                v-for="link in links"
                :key="link"
                color="white"
                flat
                round
        >
          {{ link }}
        </v-btn>
        <v-flex
                primary
                darken-1
                py-3
                text-xs-center
                white--text
                xs12
        >
          &copy;2018 — <strong>Fangtable</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)',
      links: [
          'Home',
          'About Us',
          'Team',
          'Services',
          'Blog',
          'Contact Us'
      ]
  })
}
</script>

