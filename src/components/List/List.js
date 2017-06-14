import React, { Component } from 'react';
import ListItem from '../ListItem/ListItem';
import PropTypes from 'prop-types';

import './List.scss';

class List extends Component {
    state = {
        isEditable: false
    }

    showListItems = items => {
        return items.map( item => {
            return <ListItem  key={item.id} 
                              item={item} 
                              removeListItem={this.props.removeListItem}
                              toggleDoneListItem={this.props.toggleDoneListItem}
                              onEditListitem={this.props.onEditListitem}/>
        });
    };

    

    render() {
        console.log(this.props);
        const {items} = this.props;
        return (
            <div className="col-xs-12 col-sm-3">
                <ul className="list">
                    {items.length > 0 ? this.showListItems(items): 'no items'}
                </ul>
            </div>
        );
    }
}

List.PropTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            isDone: PropTypes.bool.isRequired,
            title: PropTypes.string.isRequired
        }).isRequired
    ),  
    removeListItem: PropTypes.func,
    toggleDoneListItem: PropTypes.func,
};

export default List;