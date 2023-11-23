import { useEffect } from "react";
import { apiGetAuthStudent } from "./api-requests";
import useStore from "@/store";

export default function useSession() {
  const store = useStore();

  async function fetchStudent() {
    try {
      const student = await apiGetAuthStudent();
      store.setAuthUser(student);
    } catch (error: any) {
      store.reset();
    }
  }

  useEffect(() => {
    if (!store.authUser) {
      fetchStudent();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return store.authUser;
}
