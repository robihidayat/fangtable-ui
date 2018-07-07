<template>
    <v-container fluid>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-media
            height="350px"
          >
            <img :src="require('../../files/gambar.jpg')" />
          </v-card-media>
  
          <v-card-title primary-title>
            <div v-if="showres">
              <div class="headline">Here is your result: </div>
              <span class="grey--text">The perfect size for you is {{ size }} ({{ gender }})</span>
            </div>
          </v-card-title>
  
          <v-card-actions>
            <v-btn flat color="purple" v-on:click="postPost">Submit</v-btn>
            <v-btn flat color="purple">Share</v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="show = !show">
              <v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
  
          <v-slide-y-transition>
            <v-card-text v-show="show">
              I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
            </v-card-text>
          </v-slide-y-transition>
        </v-card>
      </v-flex>
    </v-layout>
    </v-container>
  </template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      postBody: {
          'path':'/Users/robihidayat/ngoding/hackaton/fangtable/fangtable-ui/files/gambar.jpg'
      },
      size: 'M',
      gender: 'Male',
        show: false,
        showres: false,
      errors: []
    }
  },
  methods: {
    postPost: function () {
       axios.post(`http://localhost:8083/process`, {
           path: '/Users/robihidayat/ngoding/hackaton/fangtable/fangtable-ui/files/gambar.jpg',
        })
        .then(response => {
            console.log(response.data.data)
            var obj = JSON.parse(response.data.data)
            this.size = obj.size
            this.gender = obj.gender
            this.showres = true
        })
        .catch(e => {
            console.log(e)
            this.errors.push(e)
        })
    }
  }
}
</script>