// frontend/src/scripts/submit.js

export const handleSubmit = async (e, showEmail, showPhone, navigate) => {
  e.preventDefault();
  const form = e.target;

  const formData = {
    itemName: form.querySelector("#item-name")?.value,
    itemExtraInfo: form.querySelector("#item-extra-info")?.value,
    itemLocation: form.querySelector("#item-location")?.value,
    itemLocationExtraInfo: form.querySelector("#item-location-extra-info")
      ?.value,
    itemImage: form.querySelector("#item-image")?.files[0],
    userName: form.querySelector("#user-name")?.value,
    contactMethods: {
      email: showEmail,
      phone: showPhone,
    },
    userEmail: showEmail ? form.querySelector("#user-email")?.value : null,
    userPhone: showPhone ? form.querySelector("#user-phone")?.value : null,
  };

  const validationErrors = {
    itemNameValidation: form.querySelector("#item-name-validation-error"),
    itemLocationValidation: form.querySelector(
      "#item-location-validation-error"
    ),
    itemImageValidation: form.querySelector("#item-image-validation-error"),
    contactMethodsValidation: form.querySelector(
      "#user-contact-choice-validation-error"
    ),
    userEmailValidation: form.querySelector("#user-email-validation-error"),
    userPhoneValidation: form.querySelector("#user-phone-validation-error"),
  };

  const validation = handleValidation(formData, validationErrors);

  if (!validation.isValid) {
    alert("Please complete all required fields");
    return null;
  }

  // Send to backend
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('itemName', formData.itemName);
    formDataToSend.append('itemExtraInfo', formData.itemExtraInfo);
    formDataToSend.append('itemLocation', formData.itemLocation);
    formDataToSend.append('itemLocationExtraInfo', formData.itemLocationExtraInfo);
    formDataToSend.append('itemImage', formData.itemImage);
    formDataToSend.append('userName', formData.userName || '');
    formDataToSend.append('userEmail', formData.userEmail || '');
    formDataToSend.append('userPhone', formData.userPhone || '');

    const response = await fetch('http://localhost:3000/api/submit', {
      method: 'POST',
      body: formDataToSend,
    });

    if (!response.ok) {
      throw new Error('Failed to submit');
    }

    const result = await response.json();
    alert('Success! Your submission is awaiting review by an admin');
    navigate('/');

    return result;
  } catch (error) {
    console.error('Error submitting form:', error);
    alert('Error submitting form. Please try again');
    return null;
  }
};

function handleValidation(formData, validationErrors) {
  const userEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // text + @ + text + . + text (no spaces)
  const userPhoneRegex = /^[\d\s\-()]+$/; // "123-456-7890", "(123) 456-7890", "1234567890"

  let isValid = true;

  // Hide all validation errors
  Object.values(validationErrors).forEach((element) => {
    if (element) {
      element.textContent = "";
      element.classList.remove("visible");
      element.classList.add("invisible");
    }
  });

  // Validate item name
  if (!formData.itemName || formData.itemName.trim() === "") {
    const element = validationErrors.itemNameValidation;
    element.textContent = "Item name is required";
    element.classList.remove("invisible");
    element.classList.add("visible");
    isValid = false;
  }

  // Validate item location
  if (!formData.itemLocation || formData.itemLocation.trim() === "") {
    const element = validationErrors.itemLocationValidation;
    element.textContent = "Item location is required";
    element.classList.remove("invisible");
    element.classList.add("visible");
    isValid = false;
  }

  // Validate item image
  if (!formData.itemImage) {
    const element = validationErrors.itemImageValidation;
    element.textContent = "Item image is required";
    element.classList.remove("invisible");
    element.classList.add("visible");
    isValid = false;
  } else {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(formData.itemImage.type)) {
      const element = validationErrors.itemImageValidation;
      element.textContent = "Image must be JPEG, JPG, PNG, or WebP";
      element.classList.remove("invisible");
      element.classList.add("visible");
      isValid = false;
    }
  }

  // Validate contact methods
  if (!formData.contactMethods.email && !formData.contactMethods.phone) {
    const element = validationErrors.contactMethodsValidation;
    element.textContent = "At least one option must be chosen";
    element.classList.remove("invisible");
    element.classList.add("visible");
    isValid = false;
  }

  // Validate user email
  if (formData.contactMethods.email) {
    if (!formData.userEmail || formData.userEmail.trim() === "") {
      const element = validationErrors.userEmailValidation;
      element.textContent = "Email is required";
      element.classList.remove("invisible");
      element.classList.add("visible");
      isValid = false;
    } else if (!userEmailRegex.test(formData.userEmail.trim())) {
      const element = validationErrors.userEmailValidation;
      element.textContent = "Enter a valid email";
      element.classList.remove("invisible");
      element.classList.add("visible");
      isValid = false;
    }
  }

  // Validate user phone
  if (formData.contactMethods.phone) {
    if (!formData.userPhone || formData.userPhone.trim() === "") {
      const element = validationErrors.userPhoneValidation;
      element.textContent = "Phone number is required";
      element.classList.remove("invisible");
      element.classList.add("visible");
      isValid = false;
    } else if (!userPhoneRegex.test(formData.userPhone.trim())) {
      const element = validationErrors.userPhoneValidation;
      element.textContent = "Enter a valid phone number";
      element.classList.remove("invisible");
      element.classList.add("visible");
      isValid = false;
    }
  }

  return {
    isValid: isValid,
  };
}
