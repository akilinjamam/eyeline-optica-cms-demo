/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useCreateFrameMutation } from "../../../../app/redux/api/frameApi";
import useCategory from "../../../../reusableComponent/useCategory";

const useAddFrame = () => {
  const { category: categoryFrameFeatures, isLoading: isLoadingCategory } =
    useCategory("Frame Feature");
  const { category: badges, isLoading: isLoadingBadge } = useCategory("Frame Badge");

  const availableFeatures = isLoadingCategory
    ? ["Loading..."]
    : categoryFrameFeatures?.map((feature) => feature?.category);
  const brands = ["raybon", "Alex Perry", "Oakley"];

  type TOtherImages = {
    colorName: string;
    fromColor: string;
    toColor: string;
    images: File[];
    previews: string[];
  };

  type FrameFormData = {
    name: string;
    images: File[];
    type: string;
    materialsCategory: string;
    frameCategory: string;
    sizeCategory: string;
    shapeCategory: string;
    biologyCategory: string;
    color: string;
    purchase: number | null;
    salesPrice: number | null;
    discount: number | null;
    quantity: number;
    features: string[];
    brand: string;
    badge?: string;
    description?: string;
    weeklyDeals: boolean;
    frameMeasurements?: string;
    frameDetails?: string;
    prescriptionDetails?: string;
    otherImages: TOtherImages[];
    frameWidth: string;
	  bridge: string;
	  lensWidth: string;
	  lensHeight: string;
	  templeLength: string;
	  size: string;
	  weight: string;
	  pdRange: string;
	  prescriptionRange: string;
	  availableAsProBi: boolean;
	  availableAsReader: boolean;
    rating:number;
    sizeCode:string;
  };

  const { register, handleSubmit, control, setValue, watch, reset } = useForm<FrameFormData>({
    defaultValues: {
      name: "",
      images: [],
      otherImages: [],
      type: "sunglasses",
      materialsCategory: "metal",
      frameCategory: "full-rim",
      sizeCategory: "medium",
      shapeCategory: "round",
      biologyCategory: "men",
      color: "",
      purchase: null,
      salesPrice: null,
      discount: 0,
      quantity: 1,
      features: [],
      brand: "raybon",
      badge: "",
      description: "",
      weeklyDeals: false,
      frameWidth: "",
      bridge: "",
      lensWidth: "",
      lensHeight: "",
      templeLength: "",
      size: "",
      weight: "",
      pdRange: "",
      prescriptionRange: "",
      availableAsProBi: false,
      availableAsReader: false,
      rating:0,
      sizeCode:""
    },
  });

  // const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [createFrame, { isLoading, error }] = useCreateFrameMutation();

  /** ⬇️ Main Image Upload */
  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (!e.target.files) return;
  //   const files = Array.from(e.target.files);
  //   const current = watch("images") || [];
  //   setValue("images", [...current, ...files]);
  //   setPreviewImages((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))]);
  // };

  // const removeImage = (index: number) => {
  //   const currentFiles = watch("images") || [];
  //   setValue("images", currentFiles.filter((_, i) => i !== index));
  //   setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  // };

  /** ⬇️ Feature Toggle */
  const toggleFeature = (feature: string) => {
    const current = watch("features") || [];
    if (current.includes(feature))
      setValue(
        "features",
        current.filter((f) => f !== feature)
      );
    else setValue("features", [...current, feature]);
  };

  /** ⬇️ Color Variants */
  const addVariant = () => {
    const current = watch("otherImages");
    setValue("otherImages", [
      ...current,
      { colorName: "", fromColor: "", toColor: "", images: [], previews: [] },
    ]);
  };

  const removeVariant = (index: number) => {
    const current = watch("otherImages");
    setValue(
      "otherImages",
      current.filter((_, i) => i !== index)
    );
  };

  const handleVariantImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const current = watch("otherImages");

    const updated = current.map((item, i) =>
      i === index
        ? {
            ...item,
            images: [...(item.images ?? []), ...files],
            previews: [...(item.previews ?? []), ...files.map((f) => URL.createObjectURL(f))],
          }
        : item
    );
    setValue("otherImages", updated);
  };

  const removeVariantImage = (variantIndex: number, imageIndex: number) => {
    const current = watch("otherImages");
    const updated = current.map((item, i) =>
      i === variantIndex
        ? {
            ...item,
            images: item.images.filter((_, j) => j !== imageIndex),
            previews: item.previews.filter((_, j) => j !== imageIndex),
          }
        : item
    );
    setValue("otherImages", updated);
  };

  /** ⬇️ Submit Handler */
  const onSubmit = async (data: FrameFormData) => {
    const barcode = `${Date.now()}`;

    // Remove preview URLs before sending
    const cleanOtherImages = data.otherImages.map(({ previews, ...rest }) => rest);

    const formData = {
      data: { ...data, otherImages: cleanOtherImages, barcode }
    };
    
    try {
      const response = await createFrame(formData as any).unwrap();
      if (response.success) {
        toast.success(response.message);
        reset();
        // setPreviewImages([]);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Error creating frame");
    }
  };

  console.log(error)

  return {
    availableFeatures,
    brands,
    badges,
    register,
    handleSubmit,
    control,
    watch,
    toggleFeature,
    onSubmit,
    isLoading,
    error,
    isLoadingBadge,
    addVariant,
    removeVariant,
    handleVariantImageUpload,
    removeVariantImage,
  };
};

export default useAddFrame;
