import * as THREE from 'three'
import { XRControllerModelFactory } from 'three/examples/jsm/webxr/XRControllerModelFactory'
import { isEqual } from './helpers'
import { renderer } from './renderer'
import { scene } from '../scenes/main'

export const controllers = []

const lines = []
const grips = []
const raycasters = new Map()
const gamepadsInputData = new Map()
const rayMatrix = new THREE.Matrix4()

/**
 * Get intersections.
 * Uses a raycaster with the controller to get a array of intersecting objects.
 *
 * @param {object3d} controller The ctonroller.
 * @param {number} x x coordinate, relative to controller.
 * @param {number} y y coordinate, relative to controller.
 * @param {number} z z coordinate, relative to controller.
 * @return {array} The array of intersecting objects.
 */
export function getIntersections (controller, x = 0, y = 0, z = -1) {
  const raycaster = raycasters.get(controller)

  rayMatrix.identity().extractRotation(controller.matrixWorld)
  raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld)
  raycaster.ray.direction.set(x, y, z).applyMatrix4(rayMatrix)

  // Raw array of intersected objects.
  const intersectedObjects = raycaster.intersectObjects(scene.children)

  // There are a bunch of things we don't care about that are included with the controllers by default.
  // Make an exclusion list out of those and filter out any matching intersected objects.
  // We should get a nice clean set of objects then.
  const filteredIntersectedObjects = intersectedObjects.filter((intersectedObject) => {
    const exclude = [
      ...controllers.map(controller => controller.uuid),
      ...lines.map(line => line.uuid),
      ...grips.map(grip => grip.uuid)
    ]

    // The actual filtering.
    return !exclude.includes(intersectedObject.object.uuid) && intersectedObject.object.name !== 'controller'
  })

  return filteredIntersectedObjects
}

/**
 * Bind events
 */
const bind = () => {
  controllers.forEach((controller) => {
    // Trigger
    // controller.addEventListener('select', (event) => { console.log(event) })
    // controller.addEventListener('selectstart', (event) => { console.log(event) })
    // controller.addEventListener('selectend', (event) => { console.log(event) })

    // // Grip
    // controller.addEventListener('squeeze', (event) => { console.log(event) })
    // controller.addEventListener('squeezestart', (event) => { console.log(event) })
    // controller.addEventListener('squeezeend', (event) => { console.log(event) })

    // // Gamepad
    // // These are extended controls that were added on top of THREE.
    // controller.addEventListener('press', (event) => { console.log(event) })
    // controller.addEventListener('pressstart', (event) => { console.log(event) })
    // controller.addEventListener('pressend', (event) => { console.log(event) })
    // controller.addEventListener('touchstart', (event) => { console.log(event) })
    // controller.addEventListener('touchend', (event) => { console.log(event) })
    // controller.addEventListener('value', (event) => { console.log(event) })
    // controller.addEventListener('axes', (event) => { console.log(event) })
    // controller.addEventListener('intersect', (event) => { console.log(event) })
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

  controllers.forEach((controller) => {
    // // Add a raycaster from the controller.
    const raycaster = new THREE.Raycaster()
    raycasters.set(controller, raycaster)

    // Add the visual line from the controller.
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 0, 0, -1], 3))
    lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute([0.5, 0.5, 0.5, 0, 0, 0], 3))

    const lineMaterial = new THREE.LineBasicMaterial({ vertexColors: true, blending: THREE.AdditiveBlending })
    const line = new THREE.Line(lineGeometry, lineMaterial)

    lines.push(line)

    controller.add(line)

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
    const previousInputData = gamepadsInputData.get(controller)

    // Get the intersected objects.
    const intersections = getIntersections(controller)

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
      intersections: intersections.map((intersection) => intersection.object.uuid)
    }

    // Only run if we have previous input data.
    // When the application initially starts in XR mode, this will be null and cause lots of errors otherwise.
    if (previousInputData && previousInputData.handedness === currentInputData.handedness) {
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
              additionalData: {
                buttonIndex: index
              }
            })
          } else {
            // Press ended
            // If the ray from the controller is still intersecting the same object as when it started, do a "press" event.
            // This is similar to how "squeeze" or "select" are handled, as well as "click".
            if (currentInputData.intersections && isEqual(currentInputData.intersections, previousInputData.intersections)) {
              controller.dispatchEvent({
                type: 'press',
                data: input, // Same as XRInput object native events use.
                additionalData: {
                  buttonIndex: index
                }
              })
            }

            // No matter what, send the press end.
            controller.dispatchEvent({
              type: 'pressend',
              data: input, // Same as XRInput object native events use.
              additionalData: {
                buttonIndex: index
              }
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
              additionalData: {
                buttonIndex: index
              }
            })
          } else {
            // Touch ended.
            controller.dispatchEvent({
              type: 'touchend',
              data: input, // Same as XRInput object native events use.
              additionalData: {
                buttonIndex: index
              }
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

      // Intersection changed
      const intersectsChanged = isEqual(previousInputData.intersections, currentInputData.intersections)
      if (!intersectsChanged) {
        controller.dispatchEvent({
          type: 'intersect',
          data: input // Same as XRInput object native events use.
        })
      }
    }

    // Save the data for the next run to compare.
    gamepadsInputData.set(controller, currentInputData)
  })
}

/**
 * Init
 */
export function init () {
  console.log('Controllers: init')
  setup()
  bind()
}
