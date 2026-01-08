// frontend/src/pages/Submit.jsx

import React from "react";
function Submit() {
    return (
        <form>
            <h2>Submit a Lost Item</h2>
            <h3>Item Information</h3>
            <div id="form-item-info">
                <div className="form-question">
                    <label for="item-name">What did you lose?</label>
                    <input
                        type="text"
                        id="item-name"
                        name="item-name"
                        placeholder="Ex: Water Bottle"
                    ></input>
                </div>

                <div className="form-question">
                    <label for="item-extra-info">Describe the item.</label>
                    <textarea
                        id="item-extra-info"
                        name="item-extra-info"
                    ></textarea>
                </div>

                <div className="form-question">
                    <label for="item-location">Where did you find it?</label>
                    <input
                        type="text"
                        id="item-location"
                        name="item-location"
                        placeholder="Ex: Coding Room"
                    ></input>
                </div>

                <div className="form-question">
                    <label for="item-location-extra-info">
                        Describe it's location.
                    </label>
                    <textarea
                        id="item-location-extra-info"
                        name="item-location-extra-info"
                    ></textarea>
                </div>
            </div>
        </form>
    );
}

export default Submit;
