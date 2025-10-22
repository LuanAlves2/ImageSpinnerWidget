(function () {
    let template = document.createElement("template");
    template.innerHTML = `
      <style>
        :host {}
        
        .spinner-image {
            border-radius: 50%;
            object-fit: cover;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
      </style>
      <div>
        <img class="spinner-image" id="image" alt="">
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
        this.updateImage();
      }
  
      async updateImage() {
        const src = this._props.src || "https://raw.githubusercontent.com/LuanAlves2/ImageSpinnerWidget/main/Alex.jpeg";
        const width = this._props.width || 80;
        const height = this._props.height || 80;
        const rotationSpeed = this._props.rotationSpeed || 2;
        
        const imageElement = this.shadowRoot.getElementById("image");
        imageElement.src = src;
        imageElement.width = width;
        imageElement.height = height;
        imageElement.style.animation = `spin ${rotationSpeed}s linear infinite`;
      }
  
      onCustomWidgetBeforeUpdate(changedProperties) {
        this._props = {
          ...this._props,
          ...changedProperties
        };
      }
  
      onCustomWidgetAfterUpdate(changedProperties) {
        this.updateImage();
      }
    }
  
    customElements.define("com-rohitchouhan-sap-imagespinnerwidget", ImageSpinnerWidget);
  })();
