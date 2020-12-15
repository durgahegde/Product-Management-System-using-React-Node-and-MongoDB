import React, { Component } from 'react'
import ProductRow from './ProductRow'

class ProductTable extends Component {
    constructor(props) {
        super(props)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleDestroy = this.handleDestroy.bind(this)
    }

    handleEdit(id) {
        this.props.onEdit(id)
    }

    handleDestroy(id) {
        this.props.onDestroy(id)
    }
    
    render () {
        let productsArray = this.props.products;
        let rows = []

        productsArray.forEach((product) => {
            if (product.product.name.indexOf(this.props.filterText) === -1) {
                return
            }
            rows.push (
                <ProductRow 
                    product={product} 
                    key={product.id} 
                    onEdit={this.handleEdit}
                    onDestroy={this.handleDestroy}></ProductRow>
            )
        })

        return (
            <div>
                <table className="table table-striped table-sm">
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>In stock</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ProductTable