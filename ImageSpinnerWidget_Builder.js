(function() {
    let template = document.createElement('template');
    template.innerHTML = `
        <style>
            :host {
                display: block;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                padding: 20px;
                background: #f8f9fa;
                border-radius: 8px;
            }
            
            .form-container {
                background: white;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 600;
                color: #333;
            }
            
            .form-group input,
            .form-group select {
                width: 100%;
                padding: 8px 12px;
                border: 1px solid #ddd;
                border-radius: 4px;
                font-size: 14px;
                box-sizing: border-box;
            }
            
            .form-group input:focus,
            .form-group select:focus {
                outline: none;
                border-color: #007bff;
                box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
            }
            
            .form-group input[type="number"] {
                width: 100px;
            }
            
            .form-group input[type="checkbox"] {
                width: auto;
                margin-right: 8px;
            }
            
            .checkbox-group {
                display: flex;
                align-items: center;
            }
            
            .button-group {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }
            
            .btn {
                padding: 10px 20px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.2s;
            }
            
            .btn-primary {
                background: #007bff;
                color: white;
            }
            
            .btn-primary:hover {
                background: #0056b3;
            }
            
            .btn-secondary {
                background: #6c757d;
                color: white;
            }
            
            .btn-secondary:hover {
                background: #545b62;
            }
            
            .preview-section {
                margin-top: 20px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 4px;
                border: 1px solid #dee2e6;
            }
            
            .preview-title {
                font-weight: 600;
                margin-bottom: 10px;
                color: #495057;
            }
            
            .help-text {
                font-size: 12px;
                color: #6c757d;
                margin-top: 5px;
            }
            
            .error {
                color: #dc3545;
                font-size: 12px;
                margin-top: 5px;
            }
        </style>
        
        <div class="form-container">
            <h3 style="margin-top: 0; color: #333;">Image Spinner Widget Configuration</h3>
            
            <form id="configForm">
                <div class="form-group">
                    <label for="imageUrl">Image URL:</label>
                    <input type="text" id="imageUrl" name="imageUrl" placeholder="https://example.com/image.jpg">
                    <div class="help-text">URL of the image to display as spinner</div>
                </div>
                
                <div class="form-group">
                    <label for="spinnerSize">Spinner Size (px):</label>
                    <input type="number" id="spinnerSize" name="spinnerSize" min="20" max="300" value="80">
                    <div class="help-text">Size of the spinner in pixels (20-300)</div>
                </div>
                
                <div class="form-group">
                    <label for="rotationSpeed">Rotation Speed (seconds):</label>
                    <input type="number" id="rotationSpeed" name="rotationSpeed" min="0.5" max="10" step="0.1" value="2">
                    <div class="help-text">Speed of rotation in seconds (0.5-10)</div>
                </div>
                
                <div class="form-group">
                    <div class="checkbox-group">
                        <input type="checkbox" id="showText" name="showText" checked>
                        <label for="showText">Show Loading Text</label>
                    </div>
                    <div class="help-text">Whether to display loading text below the spinner</div>
                </div>
                
                <div class="form-group">
                    <label for="loadingText">Loading Text:</label>
                    <input type="text" id="loadingText" name="loadingText" value="Carregando...">
                    <div class="help-text">Text to display during loading</div>
                </div>
                
                <div class="form-group">
                    <label for="backgroundColor">Background Color:</label>
                    <input type="text" id="backgroundColor" name="backgroundColor" value="rgba(255, 255, 255, 0.9)">
                    <div class="help-text">Background color of the overlay (CSS color value)</div>
                </div>
                
                <div class="form-group">
                    <label for="loadingDuration">Loading Duration (ms):</label>
                    <input type="number" id="loadingDuration" name="loadingDuration" min="500" max="30000" step="100" value="3000">
                    <div class="help-text">How long to show the loading spinner (500-30000ms)</div>
                </div>
                
                <div class="button-group">
                    <button type="submit" class="btn btn-primary">Apply Configuration</button>
                    <button type="button" class="btn btn-secondary" id="resetBtn">Reset to Defaults</button>
                </div>
            </form>
            
            <div class="preview-section">
                <div class="preview-title">Preview</div>
                <div id="previewContainer" style="height: 200px; border: 2px dashed #ccc; display: flex; align-items: center; justify-content: center; background: #f8f9fa;">
                    <div style="text-align: center; color: #6c757d;">
                        <div>🔄</div>
                        <div>Preview will appear here</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    class ImageSpinnerWidgetBuilder extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            
            this.form = this.shadowRoot.getElementById('configForm');
            this.resetBtn = this.shadowRoot.getElementById('resetBtn');
            this.previewContainer = this.shadowRoot.getElementById('previewContainer');
            
            this.setupEventListeners();
            this.loadDefaultValues();
        }

        setupEventListeners() {
            this.form.addEventListener('submit', this.onSubmit.bind(this));
            this.resetBtn.addEventListener('click', this.onReset.bind(this));
            
            // Add real-time preview updates
            const inputs = this.shadowRoot.querySelectorAll('input, select');
            inputs.forEach(input => {
                input.addEventListener('input', this.updatePreview.bind(this));
                input.addEventListener('change', this.updatePreview.bind(this));
            });
        }

        loadDefaultValues() {
            const defaults = {
                imageUrl: './Alex.jpeg',
                spinnerSize: 80,
                rotationSpeed: 2,
                showText: true,
                loadingText: 'Carregando...',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                loadingDuration: 3000
            };

            Object.keys(defaults).forEach(key => {
                const element = this.shadowRoot.getElementById(key);
                if (element) {
                    if (element.type === 'checkbox') {
                        element.checked = defaults[key];
                    } else {
                        element.value = defaults[key];
                    }
                }
            });
        }

        onSubmit(event) {
            event.preventDefault();
            
            const formData = new FormData(this.form);
            const properties = {};
            
            // Collect all form values
            for (let [key, value] of formData.entries()) {
                properties[key] = value;
            }
            
            // Handle checkbox
            properties.showText = this.shadowRoot.getElementById('showText').checked;
            
            // Validate required fields
            if (!properties.imageUrl.trim()) {
                this.showError('Image URL is required');
                return;
            }
            
            // Dispatch properties changed event
            this.dispatchEvent(new CustomEvent('propertiesChanged', {
                detail: {
                    properties: properties
                }
            }));
            
            this.showSuccess('Configuration applied successfully!');
        }

        onReset() {
            this.loadDefaultValues();
            this.updatePreview();
            this.showSuccess('Reset to default values');
        }

        updatePreview() {
            const imageUrl = this.shadowRoot.getElementById('imageUrl').value;
            const spinnerSize = this.shadowRoot.getElementById('spinnerSize').value;
            const rotationSpeed = this.shadowRoot.getElementById('rotationSpeed').value;
            const showText = this.shadowRoot.getElementById('showText').checked;
            const loadingText = this.shadowRoot.getElementById('loadingText').value;
            const backgroundColor = this.shadowRoot.getElementById('backgroundColor').value;
            
            // Create preview HTML
            const previewHTML = `
                <div style="
                    width: 100%;
                    height: 100%;
                    background: ${backgroundColor};
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                ">
                    <div style="
                        width: ${spinnerSize}px;
                        height: ${spinnerSize}px;
                        border-radius: 50%;
                        background-image: url('${imageUrl}');
                        background-size: cover;
                        background-position: center;
                        animation: spin ${rotationSpeed}s linear infinite;
                        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                    "></div>
                    ${showText ? `<div style="margin-top: 10px; font-size: 14px; color: #333;">${loadingText}</div>` : ''}
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            `;
            
            this.previewContainer.innerHTML = previewHTML;
        }

        showError(message) {
            this.showMessage(message, 'error');
        }

        showSuccess(message) {
            this.showMessage(message, 'success');
        }

        showMessage(message, type) {
            // Remove existing messages
            const existingMessage = this.shadowRoot.querySelector('.message');
            if (existingMessage) {
                existingMessage.remove();
            }
            
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${type}`;
            messageDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 10px 15px;
                border-radius: 4px;
                color: white;
                font-size: 14px;
                z-index: 10000;
                background: ${type === 'error' ? '#dc3545' : '#28a745'};
            `;
            messageDiv.textContent = message;
            
            document.body.appendChild(messageDiv);
            
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 3000);
        }
    }

    customElements.define('com-sap-custom-image-spinner-widget-builder', ImageSpinnerWidgetBuilder);
})();
