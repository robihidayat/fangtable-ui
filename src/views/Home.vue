<template>
    <v-jumbotron
      :gradient="gradient"
      dark
      src="https://cdn.vuetifyjs.com/images/parallax/material2.jpg"
    >
      <v-container fill-height>
        <v-layout align-center>
          <v-flex text-xs-center>
            <h4 class="display-4">Fitz<span class="red">Me</span> App</h4>
            <h5 class="display-2">online shopping made sustainable</h5>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    gradient: 'to top right, rgba(63,81,181, .7), rgba(25,32,72, .7)'
  })  
}
</script>