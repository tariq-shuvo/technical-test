import React, {Fragment, useState, useEffect} from 'react'
import Navbar from '../layout/AdminNavbar';
import Spinner from '../layout/Spinner'
import {connect} from 'react-redux'
import { getFoods, addMenu, updateMenu } from '../../actions/foodMenu';
import Alert from '../layout/Alert';

const Menu = ({food_menu: {foods, loading}, getFoods, updateMenu, addMenu}) => {
    let initialState = {
        menuID:'',
        name: '',
        price: '',
        status: false
    }

    let showHideInitialState = {
        addFormVisible: false,
        updateFormVisible: false
    }
    

    const [showHideForms, setShowHideForms] = useState(showHideInitialState)
    const [formData, setFormData] = useState(initialState)
    
    const {addFormVisible, updateFormVisible} = showHideForms
    const {name, price, status} = formData

    const onChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    useEffect(()=>{
        getFoods()
    }, [getFoods])

    const addMenuInfo = (e) => {
        e.preventDefault();
        addMenu(formData)
    }

    const updateMenuInfo = (e) => {
        e.preventDefault();
        updateMenu(formData)
    }

    return (
        <Fragment>
            <Navbar />
            <section className="container">
                <h1>Admin Food Menu</h1>
                <hr />
                <br/>
                <Alert />
                {addFormVisible==true? (
                    <form className="form" id="addMenuForm" onSubmit={(e)=>addMenuInfo(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Menu Name"
                            name="name"
                            value={name}
                            onChange={(e)=>onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            placeholder="Price"
                            name="price"
                            value={price}
                            min="1"
                            onChange={(e)=>onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <select name="status" value={status} onChange={(e)=>onChange(e)}>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Add Menu" />
                </form>
                ): ''}
                {updateFormVisible==true? (
                    <form className="form" id="updateMenuForm" onSubmit={(e)=>updateMenuInfo(e)}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Menu Name"
                            name="name"
                            value={name}
                            onChange={(e)=>onChange(e)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            placeholder="Price"
                            name="price"
                            value={price}
                            min="1"
                            onChange={(e)=>onChange(e)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <select name="status" value={status} onChange={(e)=>onChange(e)}>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    <input type="submit" className="btn btn-primary" value="Update Menu" />
                </form>  
                ): ''}
                 
                <button onClick={()=> {setFormData(initialState); setShowHideForms({
            ...showHideForms,
            addFormVisible: true,
            updateFormVisible: false
        })}} className="btn btn-primary float-right mb-2">+</button>
                <br/>
                
                {loading ? (
            <Spinner />
            ) : (
                <Fragment>
                    <table width="100%" align="center" className="admin-table" border="1">
                <thead>
                    <tr>
                        <th>Serial No</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody align="center">
                    {foods.data.map((food, index) => ( 
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{food.name}</td>
                            <td>{food.price} tk</td>
                            <td>{food.status===true?'active': 'inactive'}</td>
                            <td><button onClick={()=> {setFormData({
            ...formData,
            menuID: food._id,
            name: food.name,
            price: food.price,
            status: food.status
        }); setShowHideForms({
            ...showHideForms,
            updateFormVisible: true,
            addFormVisible: false
        })}} className="btn btn-primary mtb-1"><i className="fas fa-edit"></i></button></td>
                        </tr>
                    ))}
                </tbody>
                </table>    
                </Fragment>
            )}  
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    food_menu: state.food_menu
})

export default connect(
    mapStateToProps,
    {getFoods, updateMenu, addMenu}
)(Menu)
