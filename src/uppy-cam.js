import Uppy from "@uppy/core";
import Dashboard from "@uppy/dashboard";
import Tus from "@uppy/tus";

const uppy = Uppy({ autoProceed: false })
  .use(Dashboard, {
    trigger: "#select-files"
  })
  .use(Tus, {
    endpoint: "https://master.tus.io/files/"
});

uppy.on("complete", (result) => {
  console.log(`Upload complete! We’ve uploaded these files: ${result.successful}`)
});