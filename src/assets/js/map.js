import * as d3 from 'd3'
import { computePosition, autoUpdate, autoPlacement, size } from '@floating-ui/dom'
import us from '../../assets/json/us-states.geo.json'
import locationsJson from '../../assets/json/locations.json'

let svg = null
let projection = null
let path = null

const createSVG = () => {
  const width = 960
  const height = 600

  // Create a projection for the map
  projection = d3.geoAlbersUsa().fitSize([width, height], us)

  // Create a path generator
  path = d3.geoPath().projection(projection)

  // Append the map to the SVG element
  const map = d3.select(document.getElementById('map'))

  svg = map
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .attr('viewBox', `0 0 ${width} ${height}`)
}

const createStates = () => {
  svg
    .append('g')
    .attr('class', 'states')
    .selectAll('a')
    .data(us.features)
    .enter()
    .append('a')
    .attr('class', 'state')
    .attr('data-state', feature => feature.properties.name.toLowerCase().replace(' ', '-'))
    .attr('href', '#')
  // .attr('href', feature => `#${feature.properties.name.toLowerCase().replace(' ', '-')}`)
    .append('path')
    .attr('d', path)
    .append('title')
    .text(feature => feature.properties.name)
}

const createMarkers = () => {
  const markerWidth = 12
  const markerHeight = 16

  const marker = svg
    .append('defs')
    .append('symbol')
    .attr('id', 'marker')
    .attr('viewBox', `0 0 ${markerWidth} ${markerHeight}`)
    .attr('width', markerWidth)
    .attr('height', markerHeight)

  marker
    .append('path')
    .attr('d', 'M.4 5.6C.4 2.504 2.902 0 6 0c3.095 0 5.6 2.504 5.6 5.6C11.6 9.8 6 16 6 16S.4 9.8.4 5.6Z')
    .attr('fill', '#077DB0')

  marker
    .append('path')
    .attr('d', 'M6 7.6a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z')
    .attr('fill', '#fff')

  svg
    .append('g')
    .attr('class', 'markers')
    .selectAll('use')
    .data(locationsJson.locations)
    .enter()
    .append('use')
    .attr('xlink:href', '#marker')
    .attr('x', d => projection([d.longitude, d.latitude])[0])
    .attr('y', d => projection([d.longitude, d.latitude])[1])
    .attr('width', 12)
    .attr('height', 16)
    .attr('transform', `translate(${-markerWidth / 2}, ${-markerHeight})`)
    .attr('class', 'marker')
}

const createLocations = () => {
  const states = {}
  const locations = document.getElementById('locations')
  const template = document.getElementById('location-template')

  locationsJson.locations.forEach(location => {
    if (!states[location.state]) {
      states[location.state] = []
    }

    states[location.state].push(location)
  })

  Object.keys(states).forEach(state => {
    const clone = template.content.cloneNode(true)
    const locationRoot = clone.querySelector('.location')
    const locationName = clone.querySelector('[data-key="state"]')
    const locationsList = clone.querySelector('[data-key="cities"]')

    locationRoot.id = state.toLowerCase().replace(' ', '-')
    locationName.textContent = state
    states[state].forEach(location => {
      const locationElement = document.createElement('li')
      locationElement.textContent = location.city
      locationsList.appendChild(locationElement)
    })

    locations.appendChild(clone)
  })
}

const bindLocations = () => {
  const locations = document.querySelectorAll('.location')

  locations.forEach(location => {
    const state = location.id
    const button = document.querySelector(`a[data-state="${state}"]`)
    const options = {
      middleware: [autoPlacement(),
        size({
          apply ({ availableWidth, availableHeight, elements }) {
            // Do things with the data, e.g.
            Object.assign(elements.floating.style, {
              maxWidth: `${availableWidth}px`,
              maxHeight: `${availableHeight}px`
            })
          }
        })
      ]
    }
    const updateLocationPosition = () => {
      computePosition(button, location, options).then(({ x, y }) => {
        Object.assign(location.style, {
		  transform: `translate(${x}px, ${y}px)`
        })
      })
    }

    autoUpdate(button, location, updateLocationPosition)

    button.addEventListener('click', event => {
      event.preventDefault()
      location.classList.toggle('is-visible')
      updateLocationPosition()
    })
    button.addEventListener('blur', event => {
      location.classList.remove('is-visible')
    })
  })
}

const init = () => {
  createSVG()
  createStates()
  createMarkers()
  createLocations()
  bindLocations()
}

export default init
