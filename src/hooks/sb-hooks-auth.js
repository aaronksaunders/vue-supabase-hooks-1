import { ref } from "vue";
import useClient from "./sb-hooks";

export default function () {
  console.log("init...");
  const authResp = ref(null);
  const client = useClient();
  console.log("session", client.auth.session());


  authResp.value = client.auth.session();
  client.auth.onAuthStateChange((event, session) => {
    authResp.value = session;
  });

  const login = ({email,password}) => {
    return client.auth.signIn({email,password});
  };

  const logout = () => {
    return client.auth.signOut();
  };

  return {
    authResp,
    login,
    logout,
  };
}
