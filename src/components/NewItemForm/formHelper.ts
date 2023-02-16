export const validate = (formData: itemType) => {
  let currentErrors = {
    title: "",
    price: "",
    imgsrc: "",
  };

  let formErrorFree = true;

  if (!formData.title) {
    currentErrors.title = "Title is required";
    formErrorFree = false;
  } else if (formData.title.length < 3) {
    currentErrors.title = "Title must be longer than 3 chars";
    formErrorFree = false;
  }

  if (!formData.price) {
    currentErrors.price = "Price is required";
    formErrorFree = false;
  } else if (Number(formData.price) <= 0) {
    currentErrors.price = "Price must be greater than 0";
    formErrorFree = false;
  }

  if (!formData.image) {
    currentErrors.imgsrc = "Image Url is required";
    formErrorFree = false;
  }

  return { formErrorFree, currentErrors };
};
