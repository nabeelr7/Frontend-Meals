import React, { Component } from 'react';
import { connect } from 'react-redux';

class Homepage extends Component {
    constructor(){
        super()
        this.state={
            items: []
        }
    }
    componentDidMount(){
        fetch('/getmeals')
    }
    render(){
        return (
            <div className='featured-container'>
                <div>Featured Meals</div>

            </div>
        )
    }
}