<template>
  <div class="wrapper">
    <img :src="imageUrl" />
  </div>
</template>

<script>
import { ref } from "@vue/runtime-core";
// import missingImage from "@/assets/no_image_available.jpeg";
import useClient from "../hooks/sb-hooks";
export default {
  name: "ImageComponent",
  components: {},
  props: {
    image: String,
    bucket: String,
  },
  setup(props) {
    const client = useClient();
    const imageUrl = ref(null);
    /**
     *
     */
    const downloadImage = async (path, bucket) => {
      if (!path) {
        imageUrl.value = missingImage;
        return;
      }
      const { data, error } = await client.storage
        .from(bucket)
        .createSignedUrl(path, 600);
      if (error) throw error;

      imageUrl.value = data?.signedURL;
    };

    downloadImage(props?.image, props?.bucket);
    return {
      imageUrl,
    };
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  display: table-cell;
  width: 260px;
  height: 260px;
  text-align: center;
  vertical-align: middle;
  border: grey 1px solid;
}
.wrapper img {
  object-fit: contain;
  width: 250px;
  height: 250px;
}
</style>
