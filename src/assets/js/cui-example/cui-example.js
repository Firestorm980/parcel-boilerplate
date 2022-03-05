export class CUIExample extends HTMLElement {
	// These are attributes that can be on the element and can change dynamically throughout its lifecycle.
	// Think of them as reactive attributes.
	static get observedAttributes () {
		return ['color']
	}

	// This handles all the callbacks for our reactive attributes.
	// This is abstracted a little so we can use the values later.
	attributeChangedCallback (name, oldValue, newValue) {
		if (!this.__initialized) { return }
		if (oldValue !== newValue) {
			this[name] = newValue
		}
	}

	// Get the dynamic attribute.
	get color () { return this.getAttribute('color') }

	// Set the dynamic attribute.
	set color (value) {
		this.setAttribute('color', value)
		this.setColor()
	}

	constructor () {
		super()

		// Lots of template stuff to start us off.
		this.attachShadow({ mode: 'open' })
		this.__template = document.createElement('template')
		this.__template.innerHTML = CUIExample.template()
    	this.shadowRoot.appendChild(this.__template.content.cloneNode(true))

		// Custom template stuff
		this.__element = this.shadowRoot.querySelector('p')

		// Initialize after connecting.
		// Stop everything in the meantime.
		this.__initialized = false
	}

	async connectedCallback () {
		this.setColor()

		this.__initialized = true
	}

	setColor () {
		const hasColor = this.hasAttribute('color');
		const color = this.getAttribute('color');

		if ( hasColor ) {
			this.__element.style.setProperty('--element-color', color);
		}
	}

	// Use this to define styles for the component.
	static styles() {
		return /* css */`
			p {
				color: var(--element-color, red);
			}
		`
	}

	// Make the template here.
	static html() {
		return /* html */`
			<p><slot></slot></p>
		`
	}

	// Final template gets combined here.
	// You shouldn't have to edit this.
	static template() {
		return `<style>${this.styles()}</style>${this.html()}`
	}
}

customElements.define('cui-example', CUIExample);
