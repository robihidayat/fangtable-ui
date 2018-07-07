<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Menu</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat><router-link to="/" tag="button">HOME</router-link></v-btn>
        <v-btn flat><router-link to="/take" tag="button">TAKE</router-link></v-btn>
        <v-btn flat><router-link to="/result" tag="button">RESULT</router-link></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)'
  })
}
</script>

