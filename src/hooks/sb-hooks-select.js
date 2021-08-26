import { ref } from "vue";
import useClient from "./sb-hooks";

export default function (table, columns = "*", auto = true) {
  const error = ref(null);
  const data = ref([]);
  const loading = ref(false);

  const client = useClient();

  /**
   * 
   */
  const doQuery = async () => {
    loading.value = true;
    console.log(table, columns);
    let { data: qData, error: qError } = await client
      .from(table)
      .select(columns);
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
