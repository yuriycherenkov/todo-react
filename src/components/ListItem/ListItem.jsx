import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ListItem.scss';

class ListItem extends Component {
  state = {
    value: this.props.item.title,
    isEditable: false,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isEditable !== this.state.isEditable && this.textInput) {
      this.textInput.focus();
    }
  }

  onRemoveBtnClick = (e) => {
    e.preventDefault();
    this.props.removeListItem(this.props.item.id);
  };

  onDoneBtnClick = (e) => {
    e.preventDefault();
    this.props.toggleDoneListItem(this.props.item.id);
  };

  onEditBtnClick = (e) => {
    e.preventDefault();
    this.setState({ isEditable: true });
    this.props.onEditListitem(this.props.item.id, this.state.value);
  };

  onChangeInput = (e) => {
    const inputValue = e.target.value;
    this.setState({ value: inputValue });
  };

  obBlurInput = () => {
    this.props.onEditListitem(this.props.item.id, this.state.value);
    this.setState({ isEditable: false });
  };

  render() {
    const { item } = this.props;
    const { isEditable } = this.state;
    return (
      <li
        className="list_item"
        id={item.id}
        style={{ textDecoration: item.isDone ? 'line-through' : '' }}
      >
        {isEditable ? <input
          value={this.state.value}
          onChange={this.onChangeInput}
          onBlur={this.obBlurInput}
          ref={(input) => { this.textInput = input; }}
        /> : <p>{item.title}</p>}
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
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    isDone: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  removeListItem: PropTypes.func.isRequired,
  toggleDoneListItem: PropTypes.func.isRequired,
  onEditListitem: PropTypes.func.isRequired,
};

export default ListItem;
