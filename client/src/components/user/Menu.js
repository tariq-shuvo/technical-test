import React, {useEffect, Fragment} from 'react'

import {connect} from 'react-redux'
import {getActiveFoods} from '../../actions/foodMenu'
import Food from './Food'
import Navbar from '../layout/Navbar';
import Spinner from '../layout/Spinner'

const Menu = ({getActiveFoods, food_menu:{foods, loading}}) => {
    useEffect(()=>{
        getActiveFoods()
    }, [getActiveFoods])
    return (
        <Fragment>
            <Navbar />
            <section className="container">
            {loading ? (
            <Spinner />
            ) : (
                <Fragment>
                    {foods.data.map((food, index) => ( 
                        <Food foodInfo={food} key={index}/>
                    ))}
                </Fragment>
            )}
                
            </section>
        </Fragment>
    )
}

const mapStateToProps = state => ({
    food_menu: state.food_menu
})

export default connect(mapStateToProps, {getActiveFoods})(Menu)
