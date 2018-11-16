import React, {Component} from 'react';
import {connect} from 'react-redux';
import ArrayToUl from './ArrayToUl'
import {Link} from 'react-router-dom'

class MealDescription extends Component
{
    render()
    {
        return (<div>
                    <div className='modal-top'>
                    <img src={this.state.image} className='modal-img'/>
                    </div>
                    <div>{this.state.title}</div>
                    <div>{this.state.description}</div>
                    <div>{this.state.price + '$'}</div>
                    <div>ingredients: 
                        <ArrayToUl array={this.state.ingredients} />
                    </div>
                    <div>dietary considerations: 
                        <ArrayToUl array={this.state.diet} />
                    </div>

                    <div>
                        <button onClick={this.orderThisMeal}>Order this meal</button>
                        <Link to={'/chef/' + this.state.chefName}><button>Chef profile</button></Link>
                    </div>
                </div>
        )
        
    }
}


function mapStateToProps(state)
{
    return {

    }
}

export default connect()(MealDescription);