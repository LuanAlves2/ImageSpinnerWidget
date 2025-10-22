(function() {
    let template = document.createElement('template');
    template.innerHTML = `
        <style>
            :host {
                display: block;
                width: 100%;
                height: 100%;
                position: relative;
            }
            
            .loading-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                flex-direction: column;
                transition: opacity 0.3s ease-out;
            }
            
            .loading-container.hidden {
                opacity: 0;
                pointer-events: none;
            }
            
            .spinner-container {
                position: relative;
                margin-bottom: 20px;
            }
            
            .spinner-image {
                border-radius: 50%;
                object-fit: cover;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            
            .loading-text {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 16px;
                color: #333;
                font-weight: 500;
                text-align: center;
                margin: 0;
            }
            
            .error-message {
                color: #d32f2f;
                font-size: 14px;
                text-align: center;
                margin-top: 10px;
                display: none;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        </style>
        
        <div class="loading-container" id="loadingContainer">
            <div class="spinner-container" id="spinnerContainer">
                <img class="spinner-image" id="spinnerImage" alt="Loading spinner">
            </div>
            <p class="loading-text" id="loadingText"></p>
            <div class="error-message" id="errorMessage">
                Erro ao carregar imagem. Verifique o caminho.
            </div>
        </div>
    `;

    class ImageSpinnerWidget extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot.appendChild(template.content.cloneNode(true));
            
            this.loadingContainer = this.shadowRoot.getElementById('loadingContainer');
            this.spinnerImage = this.shadowRoot.getElementById('spinnerImage');
            this.spinnerContainer = this.shadowRoot.getElementById('spinnerContainer');
            this.loadingText = this.shadowRoot.getElementById('loadingText');
            this.errorMessage = this.shadowRoot.getElementById('errorMessage');
            
            this.isLoading = false;
            this.loadingTimeout = null;
        }

        connectedCallback() {
            this.updateWidget();
            this.startLoading();
        }

        disconnectedCallback() {
            if (this.loadingTimeout) {
                clearTimeout(this.loadingTimeout);
            }
        }

        static get observedAttributes() {
            return [
                'imageurl', 
                'spinnersize', 
                'rotationspeed', 
                'showtext', 
                'loadingtext', 
                'backgroundcolor',
                'loadingduration'
            ];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this.updateWidget();
            }
        }

        // Getters for properties
        get imageUrl() {
            return this.getAttribute('imageurl') || './Alex.jpeg';
        }

        get spinnerSize() {
            return parseInt(this.getAttribute('spinnersize')) || 80;
        }

        get rotationSpeed() {
            return parseFloat(this.getAttribute('rotationspeed')) || 2;
        }

        get showText() {
            return this.getAttribute('showtext') !== 'false';
        }

        get loadingTextValue() {
            return this.getAttribute('loadingtext') || 'Carregando...';
        }

        get backgroundColor() {
            return this.getAttribute('backgroundcolor') || 'rgba(255, 255, 255, 0.9)';
        }

        get loadingDuration() {
            return parseInt(this.getAttribute('loadingduration')) || 3000;
        }

        updateWidget() {
            if (!this.spinnerImage) return;

            // Update image source
            this.spinnerImage.src = this.imageUrl;
            
            // Update spinner size
            const size = this.spinnerSize;
            this.spinnerImage.style.width = size + 'px';
            this.spinnerImage.style.height = size + 'px';
            
            // Update rotation speed
            this.spinnerImage.style.animation = `spin ${this.rotationSpeed}s linear infinite`;
            
            // Update background color
            this.loadingContainer.style.backgroundColor = this.backgroundColor;
            
            // Update text visibility and content
            if (this.showText) {
                this.loadingText.textContent = this.loadingTextValue;
                this.loadingText.style.display = 'block';
                this.spinnerContainer.style.marginBottom = '20px';
            } else {
                this.loadingText.style.display = 'none';
                this.spinnerContainer.style.marginBottom = '0';
            }

            // Handle image load error
            this.spinnerImage.onerror = () => {
                this.errorMessage.style.display = 'block';
            };

            this.spinnerImage.onload = () => {
                this.errorMessage.style.display = 'none';
            };
        }

        startLoading() {
            if (this.isLoading) return;
            
            this.isLoading = true;
            this.loadingContainer.classList.remove('hidden');
            
            // Dispatch loading start event
            this.dispatchEvent(new CustomEvent('loadingStart', {
                detail: { 
                    timestamp: new Date().toISOString(),
                    duration: this.loadingDuration
                }
            }));

            // Set timeout to stop loading
            this.loadingTimeout = setTimeout(() => {
                this.stopLoading();
            }, this.loadingDuration);
        }

        stopLoading() {
            if (!this.isLoading) return;
            
            this.isLoading = false;
            this.loadingContainer.classList.add('hidden');
            
            // Clear timeout
            if (this.loadingTimeout) {
                clearTimeout(this.loadingTimeout);
                this.loadingTimeout = null;
            }
            
            // Remove element after animation
            setTimeout(() => {
                if (this.loadingContainer && this.loadingContainer.parentNode) {
                    this.loadingContainer.parentNode.removeChild(this.loadingContainer);
                }
                
                // Dispatch loading complete event
                this.dispatchEvent(new CustomEvent('loadingComplete', {
                    detail: { 
                        timestamp: new Date().toISOString(),
                        duration: this.loadingDuration
                    }
                }));
            }, 300);
        }

        // Public methods
        setLoadingDuration(duration) {
            this.setAttribute('loadingduration', duration.toString());
            if (this.loadingTimeout) {
                clearTimeout(this.loadingTimeout);
                this.loadingTimeout = setTimeout(() => {
                    this.stopLoading();
                }, duration);
            }
        }

        // Method to restart loading
        restart() {
            this.stopLoading();
            setTimeout(() => {
                this.startLoading();
            }, 100);
        }
    }

    customElements.define('com-sap-custom-image-spinner-widget', ImageSpinnerWidget);
})();
