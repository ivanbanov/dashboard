import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  filterName as filterNameAction,
  filterIsActive as filterIsActiveAction
} from '../actions/filters';

const filtersIsActive = [
  {
    label: 'All',
    checkedWhen: null,
  },
  {
    label: 'Active',
    checkedWhen: true,
  },
  {
    label: 'Inactive',
    checkedWhen: false,
  },
]

class Filters extends React.Component {
  renderInput() {
    const { filterNameAction } = this.props;
    
    return (
      <div className="filters-input">
        <strong>Device </strong>
        <br />
        <input
          ref={node => this.input = node}
          placeholder='search "" for all'
        />
        <button onClick={() => filterNameAction(this.input.value)}>ok</button>
      </div>
    );
  }

  renderChecks() {
    const { isActive, filterIsActiveAction } = this.props;

    return (
      <div className="filters-checks">
        <strong>Status</strong>
        <br />
        
        {filtersIsActive.map(item => {
          const labelFor = `label-is-${item.label.toLowerCase()}`;
          
          return (
            <div key={labelFor}>
              <input
                type="radio"
                name="checks"
                id={labelFor}
                onChange={() => filterIsActiveAction(item.checkedWhen)}
                checked={item.checkedWhen === isActive}
              />
              <label htmlFor={labelFor}> {item.label}</label>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div className="filters">
        <strong>Filter by</strong>
        <br /><br />
        {this.renderInput()}
        <br />
        {this.renderChecks()}
      </div>
    )
  }
}

Filters.displayName = 'Filters';

const mapStateToProps = state => state.filtersReducer;
const mapDispatchToProps = dispatch => bindActionCreators({
  filterNameAction,
  filterIsActiveAction,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Filters);