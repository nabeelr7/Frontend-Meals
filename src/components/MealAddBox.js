import React, { Component } from 'react';
import { connect } from 'react-redux';



class MealAddBox extends Component {
    constructor() {
        super()
        this.state = {
            diet: []
        }
        this.handleCheckChange = this.handleCheckChange.bind(this)
        this.handleFileChange = this.handleFileChange.bind(this)
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this)
        this.handleIngredientsChange = this.handleIngredientsChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleTitleChange(event){
        this.setState({title: event.target.value})
    }
    handleDescriptionChange(event){
        this.setState({description: event.target.value})
    }
    handlePriceChange(event){
        this.setState({price: event.target.value})
    }
    handleFileChange(event){
        this.setState({file: event.target.files[0]})
    }
    handleCheckChange(event){
        let newDiet = []
        if (event.target.checked){
            newDiet = newDiet.concat(event.target.name)
            this.setState({diet: this.state.diet.concat(newDiet)})
        }
        if (!event.target.checked){
            newDiet = this.state.diet
            let updated = newDiet.filter(x=>x !== event.target.name)
            this.setState({diet: updated})
        }
    }
    handleIngredientsChange(event){
        this.setState({ingredients: event.target.value})
    }
    handleSubmit(event){
        event.preventDefault()

        let formData = new FormData()

        formData.append('userName', this.props.userName)
        formData.append('title', this.state.title)
        formData.append('description', this.state.description)
        formData.append('price', this.state.price)
        formData.append('image', this.state.file)
        formData.append('diet', this.state.diet)
        formData.append('ingredients', this.state.ingredients)
        formData.append('coordinates', JSON.stringify(this.props.coordinates))

        console.log(formData)

        fetch('/addmeal', {
            method: "POST",
            body: formData
        }).then(function(x){
            return x.text()
        }).then(function(res){
            console.log(res)
            let parsed = JSON.parse(res)
            if (parsed.success){
                console.log("Meal Added")
                alert('Meal Added!')
            }
        })

        this.props.closeModal()
    }

    render() {

        let data = [
            { value: 'vegan', label: 'Vegan' },
            { value: 'vegetarian', label: 'Vegetarian' },
            { value: 'gluten-free', label: 'Gluten-Free' },
            { value: 'dairy-free', label: 'Dairy-Free' },
            { value: 'nut-free', label: 'Nut-Free' },
            { value: 'shellfish', label: 'Contains Shellfish' }
        ]

        return (
            <div className='add-meal-container'>
                <div>Add A Meal!</div>
                <form onSubmit={this.handleSubmit}>
                    <div>Title</div>
                    <input type='text' onChange={this.handleTitleChange} />
                    <div>Description</div>
                    <textarea cols='40' rows='3' onChange={this.handleDescriptionChange}></textarea>
                    <div>Ingredients</div>
                    <input type='text' onChange={this.handleIngredientsChange}/>
                    <div>Additional Information</div>
                    <div>
                        {data.map((item)=>{
                            return <label>
                            {item.label}
                            <input
                                name={item.value}
                                type="checkbox"
                                onChange={this.handleCheckChange} />
                        </label>
                        })}
                    </div>
                    <div>Price</div>
                    <input type='number' onChange={this.handlePriceChange} />
                    <div>Upload A Picture</div>
                    <input type='file' onChange={this.handleFileChange} />
                    <input type='submit' />
                </form>

            </div>
        )
    }
}

let mapStateToProps = function (state) {
    return {
        userName: state.userName
    }
}

let ConnectedMealAddBox = connect(mapStateToProps)(MealAddBox)
export default ConnectedMealAddBox