<template>
  <div>
    <router-link to="/">BACK</router-link>
    <div v-if="loading">LOADING...</div>
    <div v-else-if="error" class="error-panel">{{ error.message }}</div>
    <div>
      <input
        type="file"
        @change="(e) => doUpload(e.target.files[0], new Date().getTime())"
      />
    </div>
    <template v-for="item in data" :key="item.id">
      <router-link :to="`/detail/${item.id}`">
        <div style="padding-left: 12px; margin: 12px">
          <image-component :image="item.name" bucket="image-bucket" />
        </div>
      </router-link>
    </template>
  </div>
</template>

<script>
import useSelectBucket from "../hooks/sb-hooks-select-bucket";
import useUploadToBucket from "../hooks/sb-hooks-upload";

import { defineComponent } from "vue";
import ImageComponent from "../components/ImageComponent.vue";
export default defineComponent({
  components: { ImageComponent },
  name: "AddImagePage",
  props: {
    id: String,
  },
  setup(props) {
    // upload image...
    const {
      loading: uLoading,
      error: uError,
      data: uData,
      doUpload,
    } = useUploadToBucket("image-bucket", {});

    // get all images...
    const { loading, error, data } = useSelectBucket(
      "image-bucket",
      "",
      true,
      {}
    );
    console.log(data.value);
    return {
      loading,
      error,
      data,
      doUpload,
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
