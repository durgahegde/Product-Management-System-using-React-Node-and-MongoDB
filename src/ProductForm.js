import React, { Component } from 'react'

const RESET_VALUES = { productid: null, category: '', price: '', name: '', instock: null }

class ProductForm extends Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleReset = this.handleReset.bind(this)
		this.state = {
			product: (this.props.product && this.props.product.product) || Object.assign({}, RESET_VALUES),
			errors: {}
		}	
	}

	handleChange(e) {
		const target = e.target
		const name = target.name
		const value = (name === "instock") ? (target.value === "true") : target.value

		this.setState((prevState) => {
			prevState.product[name] = value
			return { product: prevState.product }
		})
	}

	handleSave(e) {
		e.preventDefault();
		this.props.onSave(this.state.product);
		this.handleReset();
	}

	handleReset() {
		this.setState({
			product: Object.assign({}, RESET_VALUES)
		})
	}

	render() {
		
		return (
            <form>
            <h4>Add a new product</h4>
            <p>
                <label>Name <br /> 
                <input type="text" class="form-control" name="name" onChange={this.handleChange} value={this.state.product.name} /></label>
            </p>
            <p>
                <label>Category <br /> 
                <input type="text" class="form-control" name="category" onChange={this.handleChange} value={this.state.product.category} /></label>
            </p>
            <p>
                <label>Price <br /> 
                <input type="text" class="form-control" name="price" onChange={this.handleChange} value={this.state.product.price} /></label>
            </p>
           
       
				<label className="d-block mb-3">
					In stock &nbsp;
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="radio" name="instock" id="yes" onChange={this.handleChange} value="true" checked={(this.state.product.instock === true)} required />
						<label className="form-check-label" htmlFor="yes">Yes</label>
					</div>
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="radio" name="instock" id="no" onChange={this.handleChange} value="false" checked={(this.state.product.instock === false)} required />
						<label className="form-check-label" htmlFor="no">No</label>
					</div>
				</label>
                
                <input type="submit" class="btn btn-info" value="Save" onClick={this.handleSave}></input>
                </form>
        )
				
            
	}
}

export default ProductForm