<template>
  <v-container fluid>
    <link href="https://transloadit.edgly.net/releases/uppy/v0.26.0/dist/uppy.min.css" rel="stylesheet">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-media
            height="auto"
          >
          <div :id="uppyId">
            <!-- <div class="ThumbnailContainer" v-if="collection === 'thumbnail'">
                <button id="open-thumbnail-modal" class="button">Select file</button>
            </div> -->
            <div class="WebcamContainer"></div>
            </div>
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
            // modelClass: {
            //     type: String,
            //     required: true
            // },
            // modelId: {
            //     type: String,
            //     required: true
            // },
            // collection: {
            //     type: String,
            //     required: true
            // },
            endpoint: {
                type: String,
                required: false,
                default() {
                    return 'http://localhost:8081/uploads/'
                }
            }
        },

        data() {
            return {}
        },

        computed: {
            uppyId() {
                return this.modelClass + '-' + this.modelId + '-' + this.collection;
            }
        },

        mounted() {
            // const uppy = Uppy({
            //     id: this.uppyId,
            //     autoProceed: false,
            //     debug: true,
            //     restrictions: {
            //         maxFileSize: false,
            //         allowedFileTypes: ['image/*', 'application/pdf']
            //     },
            //     meta: {
            //         modelClass: this.modelClass,
            //         modelId: this.modelId,
            //         collection: this.collection
            //     },
            //     onBeforeFileAdded: (currentFile, files) => Promise.resolve(),
            //     onBeforeUpload: (files, done) => Promise.resolve(),
            // });
            // if (this.collection === 'thumbnail') {
            //     uppy.use(Dashboard, {
            //         trigger: '#open-thumbnail-modal',
            //         metaFields: [
            //             {id: 'owner', name: 'Owner', placeholder: 'name of the photographer/owner'},
            //             {id: 'caption', name: 'Caption', placeholder: 'describe what the image is about'},
            //             {id: 'order', name: 'Order', placeholder: 'order'},
            //         ]
            //     })
            // } else {
            //     uppy.use(Dashboard, {
            //         inline: true,
            //         target: '.DashboardContainer',
            //         replaceTargetContent: true,
            //         note: 'Images and PDF only.',
            //         maxHeight: 500,
            //         metaFields: [
            //             {id: 'owner', name: 'Owner', placeholder: 'name of the photographer/owner'},
            //             {id: 'caption', name: 'Caption', placeholder: 'describe what the image is about'},
            //             {id: 'order', name: 'Order', placeholder: 'order'},
            //         ]
            //     })
            // }
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
                // 'video-audio',
                // 'video-only',
                // 'audio-only',
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
              autoRetry: true,
              metadata: {
                filename: "1234",
                filetype: "image/jpeg"
              },
              retryDelays: [0, 1000, 3000, 5000]
            })
            uppy.run();
        },

        methods: {}
    }
</script>