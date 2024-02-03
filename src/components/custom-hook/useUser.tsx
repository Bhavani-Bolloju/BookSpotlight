import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebaseSetup";

interface UserDataProps {
  uid: string;
  email: string;
  name: string;

  docId: string;
}
function useUser(id: string | undefined) {
  const [user, setUser] = useState<UserDataProps | null>(null);

  const getUser = async function (userId: string) {
    const q = query(collection(db, "users"), where("uid", "==", userId));

    const data = await getDocs(q);
    const docId = data?.docs[0]?.id;
    const userData = data?.docs[0]?.data();
    const userDoc = { ...userData, docId } as UserDataProps;

    setUser(userDoc);
  };

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  return user;
}

export default useUser;
