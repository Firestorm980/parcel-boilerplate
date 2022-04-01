export class CUIIcon extends HTMLElement {
  // These are attributes that can be on the element and can change dynamically throughout its lifecycle.
  // Think of them as reactive attributes.
  static get observedAttributes () {
    return ['href']
  }

  // This handles all the callbacks for our reactive attributes.
  // This is abstracted a little so we can use the values later.
  attributeChangedCallback (name, oldValue, newValue) {
    if (!this.__initialized) { return }
    if (oldValue !== newValue) {
      this[name] = newValue
    }
  }

  // Get the dynamic attributes
  get href () { return this.getAttribute('href') }

  // Set the dynamic attributes
  set href (value) {
    this.setAttribute('href', value)
    this.setHref()
  }

  constructor () {
    super()

    // Lots of template stuff to start us off.
    this.attachShadow({ mode: 'open' })
    this.__template = document.createElement('template')
    this.__template.innerHTML = CUIIcon.template()
    this.shadowRoot.appendChild(this.__template.content.cloneNode(true))

    this.__useElement = this.shadowRoot.querySelector('use')

    // Initialize after connecting.
    // Stop everything in the meantime.
    this.__initialized = false
  }

  async connectedCallback () {
    this.setHref()

    this.__initialized = true
  }

  setHref () {
    const exists = this.hasAttribute('href')
    const value = this.getAttribute('href')

    if (exists) {
      this.__useElement.setAttribute('xlink:href', value)
    }
  }

  // Use this to define styles for the component.
  static styles () {
    return /* css */`
      :host {
        display: inline;
      }
      svg {
        fill: var(--fill, currentColor);
        stroke: var(--stroke);
        height: var(--height, 1em);
        width: var(--width, 1em);
      }
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
        border: 0;
      }
      .sr-only-focusable:not(:active):not(:focus) {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(1px, 1px, 1px, 1px);
        white-space: nowrap;
        border: 0;
      }
    `
  }

  // Make the template here.
  static html () {
    return /* html */`
      <svg
        aria-hidden="true"
        role="presentation">
        <use xlink:href=""></use>
      </svg>
      <span class="sr-only"><slot></slot></span>
    `
  }

  // Final template gets combined here.
  // You shouldn't have to edit this.
  static template () {
    return `<style>${this.styles()}</style>${this.html()}`
  }
}

customElements.define('cui-icon', CUIIcon)
