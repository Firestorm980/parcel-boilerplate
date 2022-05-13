import * as THREE from 'three'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
import { isEqual } from './utils'
import renderer from './renderer'

export const controllers = []
export const grips = []

const gamepadsInputData = {}

/**
 * Controller update.
 * Updates all our XR controllers with event changes for additional button handling.
 *
 * @param {object} renderer The renderer object. Needs to be called every frame.
 */
export function controllerUpdate (renderer) {
  // Only run if we're actually in XR.
  if (renderer.xr.isPresenting) {
    const XRSession = renderer.xr.getSession()

    // Check if there is an active session.
    if (XRSession) {
      return
    }

    // Get the raw input sources.
    const { inputSources } = XRSession

    // Loop through the input sources.
    inputSources.forEach((input, index) => {
      // Get the controller. We'll need it later to dispatch the event.
      const controller = controllers[index]
      const { handedness, gamepad } = input

      // Only do this if the input exists and supports gamepad options.
      if (!input || !handedness || !gamepad) {
        return
      }

      // Get the buttons and axes.
      const { buttons, axes } = gamepad

      // Another check just in case.
      if (!buttons || !axes) {
        return
      }

      // Get our previous input state data.
      // We'll compare this later so that we can tell when to fire an event.
      const previousInputData = gamepadsInputData[index]

      // Current input state data.
      // We'll make an object to compare and save later.
      const currentInputData = {
        axes,
        handedness,
        buttons: {
          values: buttons.map(button => button.value),
          touches: buttons.map(button => button.touched),
          presses: buttons.map(button => button.pressed)
        }
      }

      // Only run if we have previous input data.
      // When the application initially starts in XR mode, this will be null and cause lots of errors otherwise.
      if (previousInputData) {
        // Check for any button press changes.
        // This is for any change (up/down, start/end) and for any button.
        const buttonPressChange = !isEqual(
          previousInputData.buttons.presses,
          currentInputData.buttons.presses
        )
        if (buttonPressChange) {
          controller.dispatchEvent({
            type: 'press',
            data: input // Same as XRInput object native events use.
          })
        }

        // Check for any button touch changes.
        // This is for any change (start/end) and for any button.
        const buttonTouchChange = !isEqual(
          previousInputData.buttons.touches,
          currentInputData.buttons.touches
        )
        if (buttonTouchChange) {
          controller.dispatchEvent({
            type: 'touch',
            data: input // Same as XRInput object native events use.
          })
        }

        // Check for any value changes.
        // This can be particularly sensitive, depending on the button.
        // It would be best to add a debouncer to it when using and to ignore with a certain threshold.
        const buttonValueChange = !isEqual(
          previousInputData.buttons.values,
          currentInputData.buttons.values
        )
        if (buttonValueChange) {
          controller.dispatchEvent({
            type: 'value',
            data: input // Same as XRInput object native events use.
          })
        }

        // Axes changed.
        // It may only be a single axis (doubtful) but applies to thumbsticks and trackpads, if any.
        const axisChanged = isEqual(previousInputData.axes, currentInputData.axes)
        if (!axisChanged) {
          controller.dispatchEvent({
            type: 'axes',
            data: input // Same as XRInput object native events use.
          })
        }
      }

      // Save the data for the next run to compare.
      gamepadsInputData[index] = currentInputData
    })
  }
}

/**
 * Build controller.
 * Adds the line that comes from the controller.
 * Helps with selecting elements / aiming.
 *
 * @returns Line object
 */
function buildController () {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3))

  const material = new THREE.LineBasicMaterial({ vertexColors: true, blending: THREE.AdditiveBlending })

  return new THREE.Line(geometry, material)
}

// Make the controllers.
const controller1 = renderer.xr.getController(0)
const controller2 = renderer.xr.getController(1)

controller1.name = 'controller-right'
controller2.name = 'controller-left'

if (controller1) controllers.push(controller1)
if (controller2) controllers.push(controller2)

controllers.forEach((controller) => {
  controller.add(buildController())
})

// Make the grips.
const controllerModelFactory = new XRControllerModelFactory()

const controllerGrip1 = renderer.xr.getControllerGrip(0)
const controllerModel1 = controllerModelFactory.createControllerModel(controllerGrip1)
controllerGrip1.add(controllerModel1)

const controllerGrip2 = renderer.xr.getControllerGrip(1)
const controllerModel2 = controllerModelFactory.createControllerModel(controllerGrip2)
controllerGrip2.add(controllerModel2)

if (controllerGrip1) grips.push(controllerGrip1)
if (controllerGrip2) grips.push(controllerGrip2)
