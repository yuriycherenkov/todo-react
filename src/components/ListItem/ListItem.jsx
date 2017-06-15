import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ListItem.scss';

class ListItem extends Component {
  state = {
    value: this.props.listItem.title,
    isEditable: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isEditable !== this.state.isEditable && this.textInput) {
      this.textInput.focus();
    }
  }

  onRemoveBtnClick = (e) => {
    e.preventDefault();
    this.props.removeListItem(this.props.listItem.id);
  };

  onDoneBtnClick = (e) => {
    e.preventDefault();
    this.props.toggleListItemDone(this.props.listItem.id);
  };

  onEditBtnClick = (e) => {
    e.preventDefault();
    this.setState({ isEditable: true });
    this.props.onEditListitem(this.props.listItem.id, this.state.value);
  };

  onChangeInput = (e) => {
    const inputValue = e.target.value;
    this.setState({ value: inputValue });
  };

  obBlurInput = () => {
    this.props.onEditListitem(this.props.listItem.id, this.state.value);
    this.setState({ isEditable: false });
  };

  render() {
    const { listItem } = this.props;
    const { isEditable } = this.state;
    return (
      <li
        className="list_item"
        id={listItem.id}
        style={{ textDecoration: listItem.isDone ? 'line-through' : '' }}
      >
        {isEditable ? <input
          value={this.state.value}
          onChange={this.onChangeInput}
          onBlur={this.obBlurInput}
          ref={(input) => { this.textInput = input; }}
        /> : <p>{listItem.title}</p>}
        <button
          className="list_item-remove"
          onClick={this.onRemoveBtnClick}
        >{''}
        </button>
        <button
          className="list_item_done"
          onClick={this.onDoneBtnClick}
        >{''}
        </button>
        <button
          className="list_item-edit"
          onClick={this.onEditBtnClick}
        >{''}
        </button>
      </li>
    );
  }
}

ListItem.propTypes = {
  listItem: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isDone: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  removeListItem: PropTypes.func.isRequired,
  toggleListItemDone: PropTypes.func.isRequired,
  onEditListitem: PropTypes.func.isRequired,
};

export default ListItem;
