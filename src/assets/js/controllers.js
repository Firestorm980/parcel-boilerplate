import * as THREE from 'three'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
import { isEqual } from './utils'
import renderer from './renderer'
import scene from './scenes/main'

export const controllers = []
const grips = []
const raycasters = []
const gamepadsInputData = []

/**
 * Build controller.
 * Adds the line that comes from the controller.
 * Helps with selecting elements / aiming.
 *
 * @returns Line object
 */
const buildController = () => {
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3))
  geometry.setAttribute('color', new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3))

  const material = new THREE.LineBasicMaterial({ vertexColors: true, blending: THREE.AdditiveBlending })

  return new THREE.Line(geometry, material)
}

const bind = () => {
  controllers.forEach((controller, index) => {
    // Trigger
    // controller.addEventListener('select', (event) => { console.log(event) })
    controller.addEventListener('selectstart', (event) => { console.log(event) })
    controller.addEventListener('selectend', (event) => { console.log(event) })

    // // Grip
    // controller.addEventListener('squeeze', (event) => { console.log(event) })
    controller.addEventListener('squeezestart', (event) => { console.log(event) })
    controller.addEventListener('squeezeend', (event) => { console.log(event) })

    // Gamepad
    // These are extended controls that were added on top of THREE.
    controller.addEventListener('press', (event) => { console.log(event) })
    controller.addEventListener('pressstart', (event) => { console.log(event) })
    controller.addEventListener('pressend', (event) => { console.log(event) })
    // controller.addEventListener('touchstart', (event) => { console.log(event) })
    // controller.addEventListener('touchend', (event) => { console.log(event) })
    // controller.addEventListener('value', (event) => { console.log(event) })
    // controller.addEventListener('axes', (event) => { console.log(event) })
  })
}

const setup = () => {
  // Make the controllers.
  const controller1 = renderer.xr.getController(0)
  const controller2 = renderer.xr.getController(1)

  controller1.name = 'controller-right'
  controller2.name = 'controller-left'

  if (controller1) controllers.push(controller1)
  if (controller2) controllers.push(controller2)

  controllers.forEach((controller, index) => {
    // Add a raycaster from the controller.
    const raycaster = new THREE.Raycaster()
    const rayMatrix = new THREE.Matrix4()

    rayMatrix.identity().extractRotation(controller.matrixWorld)
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld)
    raycaster.ray.direction.set(0, 0, -1).applyMatrix4(rayMatrix)
    raycasters[index] = raycaster

    // Add the visual line from the controller.
    controller.add(buildController())

    // Add to scene
    scene.add(controller)
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

  grips.forEach((grip) => {
    scene.add(grip)
  })
}

/**
 * Controller update.
 * Updates all our XR controllers with event changes for additional button handling.
 *
 * @param {object} renderer The renderer object. Needs to be called every frame.
 */
export function update (renderer) {
  const XRSession = renderer.xr.getSession()

  // Check if there is an active session.
  if (!XRSession) {
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

    // Get the raycaster
    const raycaster = raycasters[index]
    const [intersected] = raycaster.intersectObjects(scene.children)
    let intersects = null

    // Set the intersected object.
    // Don't include if it is part of the controller.
    if (![intersected?.object?.parent?.uuid, intersected?.object?.uuid].includes(controller?.uuid)) {
      intersects = intersected?.object?.uuid
    }

    // Current input state data.
    // We'll make an object to compare and save later.
    const currentInputData = {
      axes,
      handedness,
      buttons: {
        values: buttons.map(button => button.value),
        touches: buttons.map(button => button.touched),
        presses: buttons.map(button => button.pressed)
      },
      intersects
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
        // Loop through all buttons.
        // We can get more specific data with individual buttons.
        currentInputData.buttons.presses.forEach((pressed, index) => {
          // See if it changed first.
          const isChanged = pressed !== previousInputData.buttons.presses[index]

          // Only if it changed.
          if (!isChanged) {
            return
          }

          // If true, the press has started.
          if (pressed) {
            controller.dispatchEvent({
              type: 'pressstart',
              data: input, // Same as XRInput object native events use.
              buttonIndex: index,
              raycaster, // Including so that the developer doesn't have to make another one.
              intersected // Get the intersected object, if any.
            })
          } else {
            // Press ended
            // If the ray from the controller is still intersecting the same object as when it started, do a "press" event.
            // This is similar to how "squeeze" or "select" are handled, as well as "click".
            if (currentInputData.intersects && isEqual(currentInputData.intersects, previousInputData.intersects)) {
              controller.dispatchEvent({
                type: 'press',
                data: input, // Same as XRInput object native events use.
                buttonIndex: index,
                raycaster, // Including so that the developer doesn't have to make another one.
                intersected // Get the intersected object, if any.
              })
            }

            // No matter what, send the press end.
            controller.dispatchEvent({
              type: 'pressend',
              data: input, // Same as XRInput object native events use.
              buttonIndex: index,
              raycaster, // Including so that the developer doesn't have to make another one.
              intersected // Get the intersected object, if any.
            })
          }
        })
      }

      // Check for any button touch changes.
      // This is for any change (start/end) and for any button.
      const buttonTouchChange = !isEqual(
        previousInputData.buttons.touches,
        currentInputData.buttons.touches
      )
      if (buttonTouchChange) {
        // Since this can also be per button, loop through to see if there were changes.
        currentInputData.buttons.touches.forEach((touched, index) => {
          // See if it changed first.
          const isChanged = touched !== previousInputData.buttons.touches[index]

          // Only if it changed.
          if (!isChanged) {
            return
          }

          // If true, touch has started.
          if (touched) {
            controller.dispatchEvent({
              type: 'touchstart',
              data: input, // Same as XRInput object native events use.
              buttonIndex: index,
              raycaster, // Including so that the developer doesn't have to make another one.
              intersected // Get the intersected object, if any.
            })
          } else {
            // Touch ended.
            controller.dispatchEvent({
              type: 'touchend',
              data: input, // Same as XRInput object native events use.
              buttonIndex: index,
              raycaster, // Including so that the developer doesn't have to make another one.
              intersected // Get the intersected object, if any.
            })
          }
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

/**
 * Init
 */
export function init () {
  setup()
  bind()
}
