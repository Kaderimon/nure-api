import React, { Component } from 'react';
import './PageHead.css'

class PageHead extends Component {
    onSearch = (e) => {
        this.props.onChange(e.target.value);
    }
    render () {
        return <div className="page-header">
            <h1 className="App-title">{this.props.title}</h1>
            <input type={'search'} onChange={this.onSearch}/>
        </div>
    }
}
export default PageHead;