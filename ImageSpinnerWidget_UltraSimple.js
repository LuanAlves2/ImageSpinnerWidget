(function () {
    let template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {
            display: block;
            width: 100%;
            height: 100%;
        }
        
        .spinner-container {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }
        
        .spinner-image {
            border-radius: 50%;
            object-fit: cover;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
      </style>
      <div class="spinner-container">
        <img class="spinner-image" id="spinnerImage" alt="Loading spinner">
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
      }
  
      async connectedCallback() {
        this.updateWidget();
      }
  
      async updateWidget() {
        const imageUrl = this._props.imageUrl || "https://raw.githubusercontent.com/LuanAlves2/ImageSpinnerWidget/main/Alex.jpeg";
        const spinnerSize = this._props.spinnerSize || 80;
        const rotationSpeed = this._props.rotationSpeed || 2;
        
        const spinnerImage = this.shadowRoot.getElementById("spinnerImage");
        
        if (spinnerImage) {
          spinnerImage.src = imageUrl;
          spinnerImage.style.width = spinnerSize + 'px';
          spinnerImage.style.height = spinnerSize + 'px';
          spinnerImage.style.animation = `spin ${rotationSpeed}s linear infinite`;
        }
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
