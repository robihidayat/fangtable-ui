<template>
  <v-container fluid>
    <link href="https://transloadit.edgly.net/releases/uppy/v0.26.0/dist/uppy.min.css" rel="stylesheet">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-media
            height="auto"
          >
          <!-- <div> -->
            <!-- <div class="ThumbnailContainer" v-if="collection === 'thumbnail'">
                <button id="open-thumbnail-modal" class="button">Select file</button>
            </div> -->
            <div class="WebcamContainer"></div>
            <!-- </div> -->
          </v-card-media>
  
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
              <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
            </div>
          </v-card-title>
          
          <v-card-actions>
            <v-btn flat color="orange">Share</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    const Uppy = require("@uppy/core");
    const defaultStore = require('@uppy/store-default')
    const Dashboard = require("@uppy/dashboard");
    const XHRUpload = require("@uppy/xhr-upload");
    const Webcam = require('@uppy/webcam');
    const Tus = require('@uppy/tus')

    export default {
        props: {
            endpoint: {
                type: String,
                required: false,
                default() {
                    return 'http://localhost:8081/uploads/'
                }
            }
        },

        // data() {
        //     return {}
        // },

        // computed: {
        //     uppyId() {
        //         return this.modelClass + '-' + this.modelId + '-' + this.collection;
        //     }
        // },

        mounted() {
            const uppy = Uppy({
              id: 'uppy',
              autoProceed: true,
              debug: false,
              restrictions: {
                maxFileSize: null,
                maxNumberOfFiles: null,
                minNumberOfFiles: null,
                allowedFileTypes: null
              },
              meta: {},
              onBeforeFileAdded: (currentFile, files) => currentFile,
              onBeforeUpload: (files) => {},
              // locale: defaultLocale,
              store: defaultStore()
            })
            uppy.use(Webcam, {
              id: Webcam,
              onBeforeSnapshot: () => Promise.resolve(),
              target: '.WebcamContainer',
              countdown: 5,
              modes: [
                'picture'
              ],
              mirror: true,
              facingMode: 'user',
              locale: {
                strings: {
                  // Shown before a picture is taken when the `countdown` option is set.
                  smile: 'Smile!',
                  // Used as the label for the button that takes a picture.
                  // This is not visibly rendered but is picked up by screen readers.
                  takePicture: 'Take a picture'
                }
              }
            })
            uppy.use(Tus, {
              endpoint: this.endpoint, // use your tus endpoint here
              resume: true,
              // autoRetry: true,
              // retryDelays: [0, 1000, 3000, 5000]
            })
            uppy.run();
        },

        methods: {}
    }
</script>