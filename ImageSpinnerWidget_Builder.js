(function() {
    let template = document.createElement("template");
    template.innerHTML = `
<br>
<style>
    #form {
        font-family: Arial, sans-serif;
        width: 400px;
        margin: 0 auto;
    }

    a {
        text-decoration: none;
    }

    table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 10px;
    }

    td {
        padding: 1px;
        text-align: left;
        font-size: 13px;
    }

    input[type="text"], input[type="number"] {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 13px;
        box-sizing: border-box;
        margin-bottom: 10px;
    }

    select {
        width: 100%;
        padding: 10px;
        border: 2px solid #ccc;
        border-radius: 5px;
        font-size: 13px;
        box-sizing: border-box;
        margin-bottom: 10px;
    }

    input[type="checkbox"] {
        margin-right: 10px;
    }

    input[type="submit"] {
        background-color: #487cac;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 5px;
        font-size: 14px;
        cursor: pointer;
        width: 100%;
    }

    #label {
        width: 140px;
    }

    .checkbox-row {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }
</style>
<form id="form">
    <table>
        <tr>
        <td>Image URL</td>
        <td><input id="builder_imageUrl" type="text" placeholder="Enter Image URL"></td>
        </tr>
        <tr>
        <td>Spinner Size (px)</td>
        <td><input id="builder_spinnerSize" type="number" placeholder="Enter Spinner Size"></td>
        </tr>
        <tr>
        <td>Rotation Speed (s)</td>
        <td><input id="builder_rotationSpeed" type="number" step="0.1" placeholder="Enter Rotation Speed"></td>
        </tr>
        <tr>
        <td>Loading Text</td>
        <td><input id="builder_loadingText" type="text" placeholder="Enter Loading Text"></td>
        </tr>
        <tr>
        <td>Background Color</td>
        <td><input id="builder_backgroundColor" type="text" placeholder="Enter Background Color"></td>
        </tr>
        <tr>
        <td>Loading Duration (ms)</td>
        <td><input id="builder_loadingDuration" type="number" placeholder="Enter Loading Duration"></td>
        </tr>
        <tr>
        <td colspan="2">
            <div class="checkbox-row">
                <input id="builder_showText" type="checkbox" checked>
                <label for="builder_showText">Show Loading Text</label>
            </div>
        </td>
        </tr>
    </table>
    <input value="Update Spinner" type="submit">
    <br>
    <p>Developed by <a target="_blank" href="https://github.com/LuanAlves2">Luan Arantes</a></p>
</form>
`;
    class ImageSpinnerWidgetBuilderPanel extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({
                mode: "open"
            });
            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot
                .getElementById("form")
                .addEventListener("submit", this._submit.bind(this));
        }
        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(
                new CustomEvent("propertiesChanged", {
                    detail: {
                        properties: {
                            imageUrl: this.imageUrl,
                            spinnerSize: this.spinnerSize,
                            rotationSpeed: this.rotationSpeed,
                            showText: this.showText,
                            loadingText: this.loadingText,
                            backgroundColor: this.backgroundColor,
                            loadingDuration: this.loadingDuration
                        },
                    },
                })
            );
        }

        set imageUrl(_imageUrl) {
            this._shadowRoot.getElementById("builder_imageUrl").value = _imageUrl;
        }
        get imageUrl() {
            return this._shadowRoot.getElementById("builder_imageUrl").value;
        }

        set spinnerSize(_spinnerSize) {
            this._shadowRoot.getElementById("builder_spinnerSize").value = _spinnerSize;
        }
        get spinnerSize() {
            return this._shadowRoot.getElementById("builder_spinnerSize").value;
        }

        set rotationSpeed(_rotationSpeed) {
            this._shadowRoot.getElementById("builder_rotationSpeed").value = _rotationSpeed;
        }
        get rotationSpeed() {
            return this._shadowRoot.getElementById("builder_rotationSpeed").value;
        }

        set showText(_showText) {
            this._shadowRoot.getElementById("builder_showText").checked = _showText;
        }
        get showText() {
            return this._shadowRoot.getElementById("builder_showText").checked;
        }

        set loadingText(_loadingText) {
            this._shadowRoot.getElementById("builder_loadingText").value = _loadingText;
        }
        get loadingText() {
            return this._shadowRoot.getElementById("builder_loadingText").value;
        }

        set backgroundColor(_backgroundColor) {
            this._shadowRoot.getElementById("builder_backgroundColor").value = _backgroundColor;
        }
        get backgroundColor() {
            return this._shadowRoot.getElementById("builder_backgroundColor").value;
        }

        set loadingDuration(_loadingDuration) {
            this._shadowRoot.getElementById("builder_loadingDuration").value = _loadingDuration;
        }
        get loadingDuration() {
            return this._shadowRoot.getElementById("builder_loadingDuration").value;
        }
    }
    customElements.define(
        "com-luanarantes-sap-imagespinnerwidget-builder",
        ImageSpinnerWidgetBuilderPanel
    );
})();