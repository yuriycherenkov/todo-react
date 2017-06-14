import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form/Form';
import List from '../components/List/List';

import './App.scss';

const initData = ['first', 'second', 'third', 'forth'];

class App extends Component {
  state = {
    initData: this.prepareInitData(initData),
  }

  onEditListitem = (id, text) => {
    const newListToggleEditItem = this.state.initData.map((elem) => {
      if (elem.id === id) {
        elem.isEditable = !elem.isEditable;
        elem.title = text;
      }
      return elem;
    });
    this.setState({ initData: newListToggleEditItem });
  };

  toggleDoneListItem = (id) => {
    const newListToggleDoneItem = this.state.initData.map((elem) => {
      if (elem.id === id) {
        elem.isDone = !elem.isDone;
      }
      return elem;
    });
    this.setState({ initData: newListToggleDoneItem });
  };

  removeListElem = (id) => {
    const newList = this.state.initData.filter(elem => (
      elem.id !== id));
    this.setState({ initData: newList });
  };

  get generateId() {
    return parseInt((Math.random() * 10000), 10);
  }

  prepareInitData(arr) {
    return arr.reduce((result, item) => {
      result.push({ title: item, id: this.generateId, isDone: false });
      return result;
    }, []);
  }

  formOnSubmit = (value) => {
    this.state.initData.push({
      title: value,
      id: this.generateId,
      isDone: false,
    });
    this.setState({ initData: this.state.initData });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <Form formOnSubmit={this.formOnSubmit} />
        </div>
        <div className="row">
          <List
            items={this.state.initData}
            removeListItem={this.removeListElem}
            toggleDoneListItem={this.toggleDoneListItem}
            onEditListitem={this.onEditListitem}
          />
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    state,
  }),
  dispatch => ({}),
)(App);
