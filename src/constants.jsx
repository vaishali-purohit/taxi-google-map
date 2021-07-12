/* eslint-disable no-nested-ternary */
// import person from "./lib/assets/person.svg";

export const MAP_OPTIONS = {
  center: [52.2053, 0.1218],
  zoom: 19,
  minZoom: 15,
  maxZoom: 19,
  maxBounds: [
    [52.1953, 0.1018],
    [52.2153, 0.1418],
  ],
  maxBoundsViscosity: 1,
  preferCanvas: true,
}

export const DRIVER_OPTIONS = {
  radius: 15,
  color: '#14e360',
  fillOpacity: 0.6,
  bubblingMouseEvents: false,
}

export const PASSENGER_OPTIONS = {
  radius: 15,
  color: '#ed2a07',
  fillOpacity: 0.6,
  bubblingMouseEvents: false,
  // backgroundimage: { person }
}

export const HIGHLIGHT_OPTIONS = {
  radius: 15,
  color: '#f3f70c',
  fillOpacity: 0,
  bubblingMouseEvents: false,
}

// let temp;
// if (process.env.NODE_APP_ENV !== "prod") {
//   temp = process.env.REACT_APP_DEV_API_URL;
// } else {
//   temp = process.env.REACT_APP_API_URL;
// }

export const API_URL = 'http://localhost:8082/Entity/'

export const EXPLORER_URL = 'https://explore-testnet/transactions/0x'

export const format = (v) =>
  typeof v === 'number'
    ? Number(v.toFixed(3))
    : typeof v === 'string' && v.length > 12
    ? `${v.slice(0, 4)}...${v.slice(-4)}`
    : v

export const formatArr = (arr) =>
  JSON.stringify(
    arr,
    (k, v) =>
      typeof v === 'number'
        ? Number(v.toFixed(3))
        : typeof v === 'string' && v.length > 12
        ? `${v.substring(0, 9)}...`
        : v,
    2,
  )

export const formatTx = (v) =>
  typeof v === 'number'
    ? Number(v.toFixed(3))
    : typeof v === 'string' && v.length > 12
    ? `${v.slice(0, 11)}......${v.slice(-14)}`
    : v
