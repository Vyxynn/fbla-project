// frontend/src/pages/Submit.jsx
import React, { useState } from "react";
import "../styles/submit.css";
import { handleSubmit } from "../scripts/submit.js";

function Submit() {
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);

  const onSubmit = (e) => {
    handleSubmit(e, showEmail, showPhone);
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>Submit a Lost Item</h2>
      <div id="form-item-info">
        <h3>Item Information</h3>
        <div className="form-question">
          <label htmlFor="item-name">
            What did you find? <span className="form-required">*</span>
          </label>
          <br />
          <input
            type="text"
            id="item-name"
            name="item-name"
            placeholder="Ex: Water Bottle"
          />
          <p
            className="invisible form-validation-error"
            id="item-name-validation-error"
          ></p>
        </div>

        <div className="form-question">
          <label htmlFor="item-extra-info">Describe the item.</label>
          <br />
          <textarea id="item-extra-info" name="item-extra-info"></textarea>
        </div>

        <div className="form-question">
          <label htmlFor="item-location">
            Where did you find it? <span className="form-required">*</span>
          </label>
          <br />
          <input
            type="text"
            id="item-location"
            name="item-location"
            placeholder="Ex: Coding Room"
          />
          <p
            className="invisible form-validation-error"
            id="item-location-validation-error"
          ></p>
        </div>

        <div className="form-question">
          <label htmlFor="item-location-extra-info">
            Describe it's location.
          </label>
          <br />
          <textarea
            id="item-location-extra-info"
            name="item-location-extra-info"
          ></textarea>
        </div>

        <div className="form-question">
          <label htmlFor="item-image">
            Provide a picture of the item.{" "}
            <span className="form-required">*</span>
          </label>
          <br />
          <input
            type="file"
            id="item-image"
            name="item-image"
            accept="image/jpeg, image/jpg, image/png, image/webp"
          />
          <p
            className="invisible form-validation-error"
            id="item-image-validation-error"
          ></p>
        </div>
      </div>

      <div id="form-user-info">
        <h3>User Information</h3>
        <div className="form-question">
          <label htmlFor="user-name">What is your name?</label>
          <br />
          <input type="text" id="user-name" name="user-name" />
        </div>

        <div className="form-question">
          <label htmlFor="user-contact-choice">
            How can someone contact you for more information?{" "}
            <span className="form-required">*</span>
          </label>
          <br></br>

          <input
            type="checkbox"
            id="user-contact-choice-1"
            name="user-contact-choice-1"
            value="email"
            checked={showEmail}
            onChange={(e) => setShowEmail(e.target.checked)}
          ></input>
          <label htmlFor="user-contact-choice-1">Email</label>
          <br></br>

          <input
            type="checkbox"
            id="user-contact-choice-2"
            name="user-contact-choice-2"
            value="phone"
            checked={showPhone}
            onChange={(e) => setShowPhone(e.target.checked)}
          ></input>
          <label htmlFor="user-contact-choice-2">Phone</label>
          <br></br>
          <p
            className="invisible form-validation-error"
            id="user-contact-choice-validation-error"
          ></p>
        </div>

        {showEmail && (
          <div className="form-question" id="user-email-div">
            <label htmlFor="user-email">
              What email can you be contacted at?{" "}
              <span className="form-required">*</span>
            </label>
            <br />
            <input
              type="email"
              id="user-email"
              name="user-email"
              placeholder="example@domain.com"
              required
            />
            <p className="invisible form-validation-error" id="user-email-validation-error"></p>
          </div>
        )}

        {showPhone && (
          <div className="form-question" id="user-phone-div">
            <label htmlFor="user-phone">
              What phone number can you be contacted at?{" "}
              <span className="form-required">*</span>
            </label>
            <br />
            <input
              type="tel"
              id="user-phone"
              name="user-phone"
              placeholder="xxx-xxx-xxxx"
              required
            />
            <p className="invisible form-validation-error" id="user-phone-validation-form"></p>
          </div>
        )}
      </div>

      <div id="form-submit-div">
        <div className="form-question">
          <button type="submit" id="form-submit-button">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default Submit;
