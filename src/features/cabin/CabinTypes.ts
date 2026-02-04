import type { Database } from "../../services/database.types";

export type Cabin = Database["public"]["Tables"]["cabins"]["Row"];

export type NewCabin = Omit<Cabin, "id" | "created_at"> & {
  imageFile?: File;
};

export type CabinFormValues = Omit<NewCabin, "imageFile"> & {
  image?: FileList;
};
