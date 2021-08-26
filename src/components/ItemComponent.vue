<template>
  <div class="item-wrapper">
    <div class="item-title">{{ item?.name }}</div>
    <div>{{ item?.description }}</div>
    <div>${{ item?.price }}</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: ["item"],
  setup() {
    return {};
  },
});
</script>

<style lang="css" scoped>
.item-wrapper {
  border: 1px rgb(208, 206, 206) solid;
  padding: 8px;
  margin: 12px;
  border-radius: 4px;
  box-shadow: 2px 2px 2px rgb(208, 206, 206);
}
.item-title {
  font-weight: bold;
  font-size: larger;
}
</style>