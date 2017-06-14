import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './List.scss';
import ListItem from '../ListItem/ListItem';

class List extends Component {
  showListItems = items =>
    items.map(item => (
      <ListItem
        key={item.id}
        item={item}
        removeListItem={this.props.removeListItem}
        toggleDoneListItem={this.props.toggleDoneListItem}
        onEditListitem={this.props.onEditListitem}
      />
  ));

  render() {
    const { items } = this.props;
    return (
      <div className="col-xs-12 col-sm-3">
        <ul className="list">
          {items.length > 0 ? this.showListItems(items) : 'no items'}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      isDone: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  removeListItem: PropTypes.func.isRequired,
  toggleDoneListItem: PropTypes.func.isRequired,
  onEditListitem: PropTypes.func.isRequired,
};

export default List;
