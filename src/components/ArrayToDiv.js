import React, {Component} from 'react';
import shortId from 'shortid';

/** A simple component that takes an array of strings as props (propname: 'array')
 * and renders a 
 * <ul>
 *  <li/>
 *  <li/>
 *  <li/>
 *  ...
 * </ul> 
 */
class ArrayToDiv extends Component
{
    renderList()
    {
        let ret = [];

        for (let i = 0; i < this.props.array.length; i++)
        {
            ret.push(<div className='ing'key={shortId.generate()}>{this.props.array[i]}</div>);
        }

        return ret;
    }

    render()
    {
        return  (<div className='ingredients'>
                    {this.renderList()}
                </div>);
    }
}

export default ArrayToDiv;