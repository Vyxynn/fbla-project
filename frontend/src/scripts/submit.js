// frontend/src/scripts/submit.js

export const handleSubmit = (e, showEmail, showPhone) => {
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

    if (!validation.isValid) return null;

    console.log("Form Data:", formData);

    return formData;
};

function handleValidation(formData, validationErrors) {
    const userEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const userPhoneRegex = /^[\d\s\-\(\)]+$/;

    let isValid = true;

    Object.values(validationErrors).forEach((element) => {
        if (element) {
            element.textContent = "test";
            element.classList.remove("visible");
            element.classList.add("invisible");
        }
    });

    // Validate item name
    if (!formData.itemName || formData.itemName.trim() === "") {
        const element = validationErrors.itemNameValidation;
        element.textContent = "Item location is required";
        element.classList.remove("invisible");
        element.classList.add("visible");
    }

    // Validate item location
    if (!formData.itemLocation || formData.itemLocation.trim() === "") {
        const element = validationErrors.itemLocationValidation;
        element.textContent = "Item location is required";
        element.classList.remove("invisibile");
        element.classList.add("visible");
    }

    // Validate item image
    if (!formData.itemImage) {
        const element = validationErrors.itemImageValidation;
        element.textContent = "Item image is required";
        element.classList.remove("invisible");
        element.classList.add("visible");
    } else {
        const element = validationErrors.itemImageValidation;
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
        ];
        if (!allowedTypes.includes(formData.itemImage.type)) {
            element.textContent = "Image must be JPEG, JPG, PNG. or WebP";
            element.classList.remove("invisible");
            element.classList.add("visible");
        }
    }

    // Validate contact methods
  if (!formData.contactMethods.email && !formData.contactMethods.phone) {
        const element = validationErrors.contactMethodsValidation;
        element.textContent = "At least one option must be chosen";
        element.classList.remove("invisible");
        element.classList.add("visible");
    }

    // Validate user email

    // Validate user phone

    return {
        isValid: isValid,
    };
}
