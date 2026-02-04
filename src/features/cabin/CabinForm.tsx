import { useForm } from "react-hook-form";
import type { Cabin, CabinFormValues, NewCabin } from "./CabinTypes";
import FormRow from "./components/FormRow";
import { useCreateCabin } from "./hooks/useCreateCabin";
import { useUpdateCabin } from "./hooks/useUpdateCabin";
import { toast } from "react-toastify";

type Props = {
  cabin?: Cabin | null;
  onClose: () => void;
};

function CabinForm({ cabin, onClose }: Props) {
  const isEdit = Boolean(cabin?.id);

  const defaultValues: Partial<CabinFormValues> =
    isEdit && cabin
      ? {
          name: cabin.name ?? "",
          description: cabin.description ?? "",
          regular_price: cabin.regular_price ?? 0,
          discount: cabin.discount ?? 0,
          max_capacity: cabin.max_capacity ?? 1,
          image: undefined,
        }
      : {};

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm<CabinFormValues>({
    defaultValues,
  });

  const image = watch("image");

  const { mutate: createCabin, isPending: isCreating } = useCreateCabin();
  const { mutate: updateCabin, isPending: isUpdating } = useUpdateCabin();

  function onSubmit(values: CabinFormValues) {
    const imageFile = values.image?.[0];

    const payload: NewCabin = {
      ...values,
      imageFile,
    };

    if (isEdit && cabin) {
      updateCabin(
        { id: cabin.id, data: payload },
        {
          onSuccess: () => {
            toast.success("Cabin updated successfully ✅");
            onClose?.();
          },
          onError: (err) => {
            toast.error("Failed to update cabin ❌");
            console.error(err);
          },
        },
      );
    } else {
      createCabin(payload, {
        onSuccess: () => {
          toast.success("Cabin created successfully ✅");
          onClose?.();
        },
        onError: (err) => {
          toast.error("Failed to create cabin ❌");
          console.error(err);
        },
      });
    }
  }

  return (
    <form
      className="w-full max-w-3xl rounded-xl bg-white p-8 shadow-lg"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        {isEdit ? "Edit Cabin" : "Create Cabin"}
      </h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* LEFT */}
        <div className="flex flex-col gap-5">
          <FormRow label="Cabin name" error={errors.name?.message}>
            <input
              {...register("name", { required: "Cabin name is required" })}
              className="border-2 p-2 rounded"
            />
          </FormRow>

          <FormRow label="Discount" error={errors.discount?.message}>
            <input
              type="number"
              {...register("discount", {
                valueAsNumber: true,
                validate: (value) => {
                  const price = getValues("regular_price");

                  // Treat empty or invalid number as valid
                  if (value == null || isNaN(value) || price == null)
                    return true;

                  return value <= price || "Discount should be less than price";
                },
              })}
              className="border-2 p-2 rounded"
            />
          </FormRow>

          <FormRow label="Description" error={errors.description?.message}>
            <input
              {...register("description", {
                required: "Description is required",
              })}
              className="border-2 p-2 rounded"
            />
          </FormRow>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col gap-5">
          <FormRow label="Price" error={errors.regular_price?.message}>
            <input
              type="number"
              {...register("regular_price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              className="border-2 p-2 rounded"
            />
          </FormRow>

          <FormRow label="Max Capacity" error={errors.max_capacity?.message}>
            <input
              type="number"
              {...register("max_capacity", {
                required: "Max Capacity is required",
                min: { value: 1, message: "Capacity must be at least 1" },
                valueAsNumber: true,
              })}
              className="border-2 p-2 rounded"
            />
          </FormRow>

          {/* Image upload */}
          <div className="flex flex-col gap-2">
            <label
              htmlFor="image"
              className="cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm text-white"
            >
              {isEdit ? "Update Image" : "Upload Image"}
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              {...register("image", {
                required: isEdit ? false : "Image is required",
              })}
            />

            <span className="text-sm text-gray-500">
              {image?.[0]?.name ?? "No file chosen"}
            </span>

            <span className="text-sm text-red-600">
              {errors.image?.message}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border px-5 py-2.5 text-sm"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="rounded-md bg-indigo-600 px-6 py-2.5 text-sm text-white"
        >
          {isEdit
            ? isUpdating
              ? "Updating..."
              : "Update Cabin"
            : isCreating
              ? "Creating..."
              : "Create Cabin"}
        </button>
      </div>
    </form>
  );
}

export default CabinForm;
