export const functionsDefinition = [
  {
    'name': 'get_current_weather',
    'description': 'Get the current weather in a given location',
    'parameters': {
      'type': 'object',
      'properties': {
        'location': {
          'type': 'string',
          'description': 'The city and state, e.g. San Francisco, CA',
        },
        'unit': { 'type': 'string', 'enum': ['celsius', 'fahrenheit'] },
      },
      'required': ['location', 'unit'],
    },
  },
  {
    'name': 'track_my_package',
    'description': 'Get the current location of the package with the given tracking number',
    'parameters': {
      'type': 'object',
      'properties': {
        'tracking_number': {
          'type': 'string',
          'description': 'The tracking number of the package, e.g. 1234567890',
        },
      },
      'required': ['tracking_number'],
    },
  },
  {
    'name': 'getVesselDetails',
    'description': 'Gets the current status of the vessel. Vessel is also knows as ship or container.',
    'parameters': {
      'type': 'object',
      'properties': {
        'vesselid': {
          'type': 'string',
          'description': 'The vessel id, eg: 112',
        },
      },
      'required': ['vesselid'],
    },
  },
  {
    'name': 'getFuelConsumption',
    'description': 'Gets the fuel consupmtion of the vessel. Vessel is also knows as ship or container.',
    'parameters': {
      'type': 'object',
      'properties': {
        'vesselid': {
          'type': 'string',
          'description': 'The vessel id, eg: 112',
        },
      },
      'required': ['vesselid'],
    },
  }
]


export class SmartVoyage {
  constructor() {
    if (SmartVoyage.instance) {
      return SmartVoyage.instance; // Return the existing instance
    }

    SmartVoyage.instance = this; // Store the instance
  }

  getVesselDetails(vesselid) {
    return JSON.stringify(
      {
        "vesselid": vesselid,
        "vesselname": "MOL TRADITION",
        "vesseltype": "Container Ship",
        "vesselstatus": "Underway",
        "date": "2021-06-13T00:00:00",
        "location": "Singapore",
        "lat": "1.283333",
        "long": "103.833333",
        "country": "Singapore",
        "countrycode": "SG",
      }
    );
  }

  getFuelConsumption(vesselid) {
    return JSON.stringify(
      {
        "vesselid": vesselid,
        "vslfo": "1200",
        "lsmgo": "834",
        "hsfo": "54",
        "date": "2021-06-13T00:00:00",
      }
    );
  }

  get_current_weather(location, unit = 'fahrenheit') {
    const weather_info = {
      'location': location,
      'temperature': '72',
      'unit': unit,
      'forecast': ['sunny', 'windy'],
    };
    return JSON.stringify(weather_info);
  }

  track_my_package(tracking_number) {
    return `Your package with tracking number ${tracking_number} is currently in Palakkad, MA.`;
  }
}
