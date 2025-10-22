(function () {
    let template = document.createElement("template");
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
        let shadowRoot = this.attachShadow({
          mode: "open"
        });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this._props = {};
        this.isLoading = false;
        this.loadingTimeout = null;
      }
  
      async connectedCallback() {
        this.updateWidget();
        this.startLoading();
      }

      disconnectedCallback() {
        if (this.loadingTimeout) {
          clearTimeout(this.loadingTimeout);
        }
      }
  
      async updateWidget() {
        const imageUrl = this._props.imageUrl || "https://raw.githubusercontent.com/LuanAlves2/ImageSpinnerWidget/main/Alex.jpeg";
        const spinnerSize = this._props.spinnerSize || 80;
        const rotationSpeed = this._props.rotationSpeed || 2;
        const showText = this._props.showText !== false;
        const loadingText = this._props.loadingText || "Carregando...";
        const backgroundColor = this._props.backgroundColor || "rgba(255, 255, 255, 0.9)";
        
        const loadingContainer = this.shadowRoot.getElementById("loadingContainer");
        const spinnerImage = this.shadowRoot.getElementById("spinnerImage");
        const spinnerContainer = this.shadowRoot.getElementById("spinnerContainer");
        const loadingTextElement = this.shadowRoot.getElementById("loadingText");
        const errorMessage = this.shadowRoot.getElementById("errorMessage");
        
        if (spinnerImage) {
          spinnerImage.src = imageUrl;
          spinnerImage.style.width = spinnerSize + 'px';
          spinnerImage.style.height = spinnerSize + 'px';
          spinnerImage.style.animation = `spin ${rotationSpeed}s linear infinite`;
        }
        
        if (loadingContainer) {
          loadingContainer.style.backgroundColor = backgroundColor;
        }
        
        if (showText && loadingTextElement) {
          loadingTextElement.textContent = loadingText;
          loadingTextElement.style.display = 'block';
          if (spinnerContainer) {
            spinnerContainer.style.marginBottom = '20px';
          }
        } else if (loadingTextElement) {
          loadingTextElement.style.display = 'none';
          if (spinnerContainer) {
            spinnerContainer.style.marginBottom = '0';
          }
        }

        // Handle image load error
        if (spinnerImage) {
          spinnerImage.onerror = () => {
            if (errorMessage) {
              errorMessage.style.display = 'block';
            }
          };

          spinnerImage.onload = () => {
            if (errorMessage) {
              errorMessage.style.display = 'none';
            }
          };
        }
      }

      startLoading() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const loadingContainer = this.shadowRoot.getElementById("loadingContainer");
        if (loadingContainer) {
          loadingContainer.classList.remove('hidden');
        }
        
        // Dispatch loading start event
        this.dispatchEvent(new CustomEvent('loadingStart', {
          detail: { 
            timestamp: new Date().toISOString(),
            duration: this._props.loadingDuration || 3000
          }
        }));

        // Set timeout to stop loading
        const duration = this._props.loadingDuration || 3000;
        this.loadingTimeout = setTimeout(() => {
          this.stopLoading();
        }, duration);
      }

      stopLoading() {
        if (!this.isLoading) return;
        
        this.isLoading = false;
        const loadingContainer = this.shadowRoot.getElementById("loadingContainer");
        if (loadingContainer) {
          loadingContainer.classList.add('hidden');
        }
        
        // Clear timeout
        if (this.loadingTimeout) {
          clearTimeout(this.loadingTimeout);
          this.loadingTimeout = null;
        }
        
        // Remove element after animation
        setTimeout(() => {
          if (loadingContainer && loadingContainer.parentNode) {
            loadingContainer.parentNode.removeChild(loadingContainer);
          }
          
          // Dispatch loading complete event
          this.dispatchEvent(new CustomEvent('loadingComplete', {
            detail: { 
              timestamp: new Date().toISOString(),
              duration: this._props.loadingDuration || 3000
            }
          }));
        }, 300);
      }
  
      onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = {
          ...this._props,
          ...changedProperties
        };
      }
  
      onCustomWidgetAfterUpdate(changedProperties) {
        this.updateWidget();
      }
    }
  
    customElements.define("com-luanarantes-sap-imagespinnerwidget", ImageSpinnerWidget);
  })();