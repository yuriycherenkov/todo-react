import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from '../components/Form/Form';
import ListItem from '../components/ListItem/ListItem';
import { addListItem, removeListItem, toggleListItemDone, editListItem } from '../actions/index';
import './App.scss';

class App extends Component {

  renderListItems = list => (
    list.map(listItem => (
      <ListItem
        listItem={listItem}
        key={listItem.id}
        removeListItem={this.props.removeListItem}
        toggleListItemDone={this.props.toggleListItemDone}
        onEditListitem={this.props.onEditListitem}
      />
    ))
  );

  render() {
    const { list } = this.props;
    return (
      <div className="container">
        <div className="row">
          <Form
            addToList={this.props.addToList}
          />
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-3">
            <ul className="list">
              {list.length > 0 ? this.renderListItems(list) : 'no items'}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      isDone: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
    }),
  ).isRequired,
  addToList: PropTypes.func.isRequired,
  removeListItem: PropTypes.func.isRequired,
  toggleListItemDone: PropTypes.func.isRequired,
  onEditListitem: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    list: state.listReducer,
  }),
  dispatch => ({
    addToList: (value) => {
      dispatch(addListItem(value));
    },
    removeListItem: (id) => {
      dispatch(removeListItem(id));
    },
    toggleListItemDone: (id) => {
      dispatch(toggleListItemDone(id));
    },
    onEditListitem: (id, value) => {
      dispatch(editListItem(id, value));
    },
  }),
)(App);
