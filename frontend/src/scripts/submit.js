// frontend/src/scripts/submit.js

export const handleSubmit = (e, showEmail, showPhone) => {
    e.preventDefault();

    const formData = {
        itemName: e.target['item-name'].value,
        itemExtraInfo: e.target['item-extra-info'].value,
        itemLocation: e.target['item-location'].value,
        itemLocationExtraInfo: e.target['item-location-extra-info'].value,
        itemImage: e.target['item-image'].files[0],
        userName: e.target['user-name'].value,
        contactMethods: {
            email: showEmail,
            phone: showPhone
        },
        userEmail: showEmail ? e.target['user-email'].value : null,
        userPhone: showPhone ? e.target['user-phone'].value : null
    };

    const validationErrors = {
        itemNameValidation: e.target['item-name-validation-error'],
        itemLocationValidation: e.target['item-location-validation-error'],
        itemImageValidation: e.target['item-image-validation-error'],
        contactMethodsValidation: e.target['user-email-validation-error'],
        userEmailValidation: e.target['user-email-validation-error'],
        userPhoneValidation: e.target['user-phone-validation-error']
    }

    const validation = handleValidation(formData, validationErrors);

    if (!validation.isValid) return null;

    console.log('Form Data:', formData);

    return formData;
}

function handleValidation(formData, validationErrors) {
  const userEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const userPhoneRegex = /^[\d\s\-\(\)]+$/;

  let isValid = true;

  return {
    isValid: isValid,
  };
}