import React, {Component} from 'react';

/** A simple component that takes an array of strings as props (propname: 'array')
 * and renders a 
 * <ul>
 *  <li/>
 *  <li/>
 *  <li/>
 *  ...
 * </ul> 
 */
class ArrayToUl extends Component
{
    renderList()
    {
        let ret = [];

        for (let i = 0; i < this.props.array.length; i++)
        {
            ret.push(<li>{this.props.array[i]}</li>);
        }

        return ret;
    }

    render()
    {
        return  (<ul>
                    {this.renderList()}
                </ul>);
    }
}

export default ArrayToUl;