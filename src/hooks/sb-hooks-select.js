import { ref } from "vue";
import useClient from "./sb-hooks";

/**
 * 
 * @param {*} table - table to execute query against
 * @param {*} columns - columns to return
 * @param {*} auto - if true, run query at startup
 * @returns 
 */
export default function (table, columns = "*", auto = true) {
  const error = ref(null);
  const data = ref([]);
  const loading = ref(false);

  // get supabase client
  const client = useClient();

  /**
   * this is the function that does the actual query
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

  // if auto flag is set, run a startup
  if (auto) {
    doQuery();
  }

  return {
    // reactive variables...
    error,
    data,
    loading,
    // function to call to execute query
    doQuery,
  };
}
