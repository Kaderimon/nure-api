import React, { Component } from 'react';
import './PageHead.css'

class PageHead extends Component {
    onSearch = (e) => {
        this.props.onChange(e.target.value);
    }
    render () {
        return <div className="col-xs-offset-1 col-xs-10 page-header">
            <h1 className="App-title">{this.props.title}</h1>
            <input type={'search'} className="search" placeholder="Поиск" onChange={this.onSearch}/>
        </div>
    }
}
export default PageHead;