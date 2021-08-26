import { ref } from "vue";
import useClient from "./sb-hooks";

/**
 * 
 * @param {*} bucket 
 * @param {*} path 
 * @param {*} auto 
 * @param {*} options 
 * @returns 
 */
export default function (bucket, path = "", auto="true", options) {
  const error = ref(undefined);
  const data = ref([]);
  const loading = ref(false);

  const client = useClient();

  /**
   * 
   */
  const doQuery = async () => {
    console.log("in select bucket hook...");
    loading.value = true;
    const { data:qData, error: qError } = await client.storage.from(bucket).list(path, {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
      ...options,
    });

    loading.value = false;
    data.value = qData;
    error.value = qError;
  };

  if (auto) {
    doQuery();
  }

  return {
    error,
    data,
    loading,
    doQuery,
  };
}
