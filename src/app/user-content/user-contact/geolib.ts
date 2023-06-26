import * as x from 'geolib';
import * as geolib from 'geolib';

type geolibType = typeof geolib;
const theGeolib = (x as any).default as geolibType;

export { theGeolib as geolib };
