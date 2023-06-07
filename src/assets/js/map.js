import * as d3 from 'd3'
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
    .attr('href', feature => `#${feature.properties.name.toLowerCase().replace(' ', '-')}`)
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
      const locationLink = document.createElement('a')

      locationLink.href = `#${location.city.toLowerCase().replace(' ', '-')}`

      locationLink.textContent = location.city
      locationElement.appendChild(locationLink)
      locationsList.appendChild(locationElement)
    })

    locations.appendChild(clone)
  })
}

const handleStateClick = event => {
  const id = event.currentTarget.getAttribute('data-state')
  const locations = document.querySelectorAll('.location')
  const acitveLocation = document.getElementById(id)

  event.preventDefault()
  locations.forEach(location => {
    if (location !== acitveLocation) {
      location.close()
    } else {
      location.show()
    }
  })
}

const bind = () => {
  const states = document.querySelectorAll('.state')
  const locations = document.querySelectorAll('.location')

  states.forEach(state => {
    state.addEventListener('click', handleStateClick)
  })
}

const init = () => {
  createSVG()
  createStates()
  createMarkers()
  createLocations()
  bind()
}

export default init
