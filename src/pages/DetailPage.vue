<template>
  <div>
    <router-link to="/">BACK</router-link>
    <div v-if="loading">LOADING...</div>
    <div v-else-if="error">{{ error.message }}</div>
    <div v-else-if="data?.length !== 0">
      <item-component :item="data[0]" />
      <button @click="deleteItem">DELETE</button>
    </div>
  </div>
</template>

<script>
import useQueryById from "../hooks/sb-hooks-select-one";
import useDeleteById from "../hooks/sb-hooks-delete-one";
import ItemComponent from "../components/ItemComponent.vue";

import { defineComponent } from "vue";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "DetailPage",
  components: { ItemComponent },
  props: {
    id: String,
  },
  setup(props) {
    const router = useRouter();
    const {
      loading: deleteLoading,
      error: deleteError,
      doDelete,
    } = useDeleteById();

    const { loading, error, data } = useQueryById("products", "*", props.id);

    /**
     *
     */
    const deleteItem = async () => {
      const resp = await doDelete("products", props.id);
      if (!deleteError.value) {
        router.replace("/");
      }
    };
    return {
      loading: loading || deleteLoading,
      error: error || deleteError,
      data,
      deleteItem,
    };
  },
});
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
</style>
