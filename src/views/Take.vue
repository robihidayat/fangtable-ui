<template>
  <v-container fluid>
    <link href="https://transloadit.edgly.net/releases/uppy/v0.26.0/dist/uppy.min.css" rel="stylesheet">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-media
            height="auto"
          >
            <div class="WebcamContainer"></div>
          </v-card-media>
  
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">Now please stand 1 metre from the camera.. <br> and smile...</h3>
            </div>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
    const Uppy = require("@uppy/core");
    const defaultStore = require('@uppy/store-default');
    const Webcam = require('@uppy/webcam');
    const Tus = require('@uppy/tus');
    const Informer = require('@uppy/informer');

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
            uppy.use(Informer, {
                // options
            })
            uppy.use(Webcam, {
              id: Webcam,
              onBeforeSnapshot: () => Promise.resolve(),
              target: '.WebcamContainer',
              countdown: 5,
              modes: [
                'picture'
              ],
              mirror: false,
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
        }
    }
</script>