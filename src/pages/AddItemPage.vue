<template>
  <div>
    <router-link to="/">BACK</router-link>
    <div v-if="loading">LOADING...</div>
    <div v-else-if="error" class="error-panel">{{ error.message }}</div>
    <div>
      <input placeholder="Product Name" ref="nameRef" />
      <textarea
        placeholder="Product Description"
        ref="descriptionRef"
        rows="6"
      />
      <input placeholder="Product Price" ref="priceRef" />
      <input placeholder="Product Category" ref="categoryRef" />
    </div>
    <button @click="saveData">SAVE ITEM</button>
  </div>
</template>

<script>
import useUpsert from "../hooks/sb-hooks-upsert";
import ItemComponent from "../components/ItemComponent.vue";

import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "DetailPage",
  components: { ItemComponent },
  props: {
    id: String,
  },
  setup(props) {
    const nameRef = ref("");
    const descriptionRef = ref("");
    const categoryRef = ref("");
    const priceRef = ref("");

    const router = useRouter();

    const { loading, error, data, doUpsert } = useUpsert();

    /**
     *
     */
    const saveData = async () => {
      const resp = await doUpsert("products", [
        {
          name: nameRef.value.value,
          description: descriptionRef.value.value,
          price: priceRef.value.value,
          category: categoryRef.value.value,
        },
      ]);

      if (resp && !error.value) {
        router.replace("/");
      }
    };
    return {
      loading,
      error,
      data,
      saveData,
      // form fields
      nameRef,
      priceRef,
      categoryRef,
      descriptionRef,
    };
  },
});
</script>

<style scoped>
a {
  color: black;
}

button {
  font-size: large;
}
input {
  width: 300px;
  flex: 1;
  margin: 8px;
  padding: 4px;
  font-size: large;
  border: rgb(208, 206, 206) 1px solid;
}

textarea {
  width: 300px;
  flex: 1;
  margin: 8px;
  padding: 4px;
  font-size: large;
  border: rgb(208, 206, 206) 1px solid;
  font: inherit;
}

.error-panel {
  padding: 12px;
  background: rgb(250, 56, 56);
  margin: 16px;
  color: white;
  font-weight: bold;
  border-radius: 8px;
  text-align: center;
}
</style>
