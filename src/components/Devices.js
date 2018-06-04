import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  getDevices as getDevicesAction,
  updateDevice as updateDeviceAction,
} from '../actions/devices';


class Devices extends React.Component {
  constructor(props) {
    super(props);
    this.filteredDevices = this.filteredDevices.bind(this);
    this.renderDevice = this.renderDevice.bind(this);
  }

  componentDidMount() {
    this.props.getDevicesAction();
  }

  filterNames(devices = [], name = null) {
    if (name === null) {
      return devices;
    }

    const regExp = new RegExp(name, 'gi');

    return devices.filter(device => device.name.match(regExp));
  }

  filterActives(devices = [], isActive = null) {
    return devices.filter(device => {
      return isActive === null || device.active === isActive;
    });
  }

  filteredDevices() {
    const { devices } = this.props;
    const { name, isActive } = this.props.filters;

    const filters = [
      { fn: this.filterActives,
        params: [isActive]
      },
      { fn: this.filterNames,
        params: [name]
      }
    ];

    return filters.reduce((holder, filter) => {
      return filter.fn(holder, ...filter.params);
    }, devices);
  }

  renderDevice(device, index) { 
    if (!device) {
      return null;
    }

    const { name, unit, value, timestamp, active } = device;
    const deviceUpdateState = this.props.devicesUpdating.find(item => item.name === name) || {};
    const checkActiveId = `device-${index}`;
    
    let helperMsg;

    if (deviceUpdateState.error) {
      helperMsg = deviceUpdateState.error;
    }
    
    if (deviceUpdateState.isUpdating) {
      helperMsg = 'loading...';
    }

    return (
      <ul className="devices-item" key={index}>
        <li>Name: {name}</li>
        <li>Unit: {unit}</li>
        <li>Value: {value}</li>
        <li>Timestamp: {timestamp}</li>
        <li>
          <input
            type="checkbox"
            checked={active}
            disabled={deviceUpdateState.isUpdating}
            onChange={() => this.props.updateDeviceAction(name, !active)}
            id={checkActiveId}
          />
          <label htmlFor={checkActiveId}> Active</label>
          {helperMsg && <span> ({helperMsg})</span>}
        </li>
      </ul>
    )
  }
  
  render() {
    const { devices, error, isLoading } = this.props;
    let nActive = 0;
    let nInactive = 0;
    
    devices.forEach(device => device.active ? nActive++ : nInactive++);

    let customState = null;

    if (isLoading) {
      customState = "Loading...";
    }
    
    if (error) {
      customState = error;
    }

    return (
      <div className="devices">
        { customState ||
          <div>
            <strong>Devices</strong>
            <span> (Active: {nActive}/ Inactive: {nInactive})</span>
            <br /><br />
            { this.filteredDevices().map(this.renderDevice) }
          </div>
        }
      </div>
    );
  }
}

Devices.displayName = 'Devices';

const mapStateToProps = state => ({
  ...state.devicesReducer,
  filters: state.filtersReducer
});
const mapDispatchToProps = dispatch => bindActionCreators({
  getDevicesAction,
  updateDeviceAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Devices);