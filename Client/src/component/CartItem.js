import React, { useState, useEffect } from 'react'
import { ImCross } from "react-icons/im";
function CartItem(props) {
    const [total, setTotal] = useState(0);
    useEffect(() => {
        calculateTotal();
    }, [props.cartItems]);

    const calculateTotal = () => {
        let total = 0;
        if (props.cartItems) {
            props.cartItems.forEach(item => {
                total += item.count * item.price;
            });
        }
        setTotal(total);
    }

    return (
        <div className='cartItem'>
            <div className='cartItem-img-container'>
                <ImCross className='cancel' onClick={props.removeItem} />
                <img className='cartItem-img' src={props.img} alt={props.productName} />
            </div>


            <h1>{props.productName}</h1>
            <h2>${props.price}</h2>
            <div className='cartItem-count'>
                <button onClick={props.increaseItem} >+</button>
                <h2 >{props.count}</h2>
                <button onClick={props.decreaseItem}>-</button>
            </div>
            <h2 >Subtotal :<span>${props.count * props.price}</span> </h2>
        </div>

    )
}

export default CartItem