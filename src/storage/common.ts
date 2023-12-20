import { StorageKeys } from "@constants/global";
import { storage } from ".";

const deleteDataUser = async () => {
  await storage.multiRemove([StorageKeys.Token, StorageKeys.userInfo]);
};

export { deleteDataUser };
