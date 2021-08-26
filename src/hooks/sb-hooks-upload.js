import { ref } from "vue";
import useClient from "./sb-hooks";

/**
 *
 * @param {*} bucket
 * @param {*} options
 * @returns
 */
export default function (bucket = "", options = {}) {
  const error = ref(null);
  const data = ref([]);
  const loading = ref(true);

  const client = useClient();

  /**
   *
   * @param {*} blob
   * @param {*} filename
   */
  const doUpload = (blob, filename) => {
    let uploadBlob = null;
    if (blob instanceof  String) {
      // if string, we assume it is a path and try to convert
      // to blob...
      (async () => {
        const response = await fetch(blob);
        uploadBlob = await response.blob();
      })();
    } else {
      // its just a Blob|File so upload it
      uploadBlob = blob;
    }
    console.log("in upload hook...");
    (async () => {
      const { data: qData, error: qError } = await client.storage
        .from(bucket)
        .upload(`${filename}`, uploadBlob, {
          cacheControl: "3600",
          upsert: false,
          ...options,
        });
      loading.value = false;
      data.value = qData;
      error.value = qError;

      console.log(qData);
    })();
  };

  return {
    error,
    data,
    loading,
    doUpload,
  };
}
