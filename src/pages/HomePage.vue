<template>
  <div v-if="authResp?.user">
    <div>{{ authResp?.user?.email }}</div>
    <button @click="doLogout">LOGOUT</button>
    <button @click="getData">QUERY</button>
    <button @click="$router.push('/add-item')">ADD ITEM</button>
        <button @click="$router.push('/add-image')">ADD IMAGE</button>
    <div v-if="loading">LOADING...</div>
    <div v-else-if="error" class="error-panel">{{ error }}</div>
    <div v-else-if="data">
      <template v-for="item in data" :key="item.id">
        <router-link :to="`/detail/${item.id}`">
          <item-component :item="item" />
        </router-link>
      </template>
    </div>
  </div>
  <div v-else>
    <div class="login-container">
      <div class="login-content">
        <input placeholder="email" autocomplete="new-password" ref="emailRef" />
        <input
          placeholder="password"
          type="password"
          autocomplete="new-password"
          ref="passwordRef"
        />
        <button @click="doLogin">LOGIN</button>
      </div>
      <div v-if="authError" class="error-panel">
        {{ authError }}
      </div>
    </div>

    <div v-if="loading">LOADING...</div>
    <div v-else-if="error">{{ error }}</div>
  </div>
</template>

<script>
import useAuth from "../hooks/sb-hooks-auth";
import useQuery from "../hooks/sb-hooks-select";
import { defineComponent } from "vue";
import ItemComponent from "../components/ItemComponent.vue";
import { ref } from "vue";

export default defineComponent({
  components: { ItemComponent },
  name: "HomePage",
  props: {
    msg: String,
  },
  setup() {
    const emailRef = ref("");
    const passwordRef = ref("");
    const authError = ref("");

    const { authResp, login, logout } = useAuth();

    const { loading, error, data, doQuery } = useQuery(
      "products",
      undefined,
      true
    );

    console.log("authResp", authResp);

    /**
     *
     */
    const doLogin = async () => {
      authError.value = "";
      const { data, error } = await login({
        email: emailRef.value.value,
        password: passwordRef.value.value,
      });
      authError.value = error?.message;
    };

    /**
     *
     */
    const doLogout = async () => {
      const { data, error } = await logout();
      console.log(error);
      console.log(data);
    };

    const getData = async () => {
      await doQuery();
    };

    return {
      authResp,
      doLogin,
      doLogout,
      getData,
      loading,
      error,
      data,
      emailRef,
      passwordRef,
      authError,
    };
  },
});
</script>

<style scoped>
a {
  color: black;
  text-decoration: none;
}
button {
    font-size : large;
}
input {
  width: 300px;
  flex: 1;
  margin: 8px;
  padding : 4px;
  font-size : large;
  border: rgb(208, 206, 206) 1px solid;
}

.login-container {
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-content {
  display: flex;
  flex-direction: column;
  border: 1px rgb(208, 206, 206) solid;
  border-radius: 4px;
  width: 350px;
  align-items: center;
  padding: 16px;
  box-shadow: 2px 2px 2px rgb(208, 206, 206);
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
