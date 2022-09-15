import React from 'react';
import { getOrders } from '../services/db.services';


const Orders = () => {
const [orders,setOrder] = React.useState(getOrders())

return ( <div className="container m-auto ">
    <br/>
    <h1 className="text-2xl font-ubuntu">Orders</h1>
    <div className="flex flex-wrap gap-5 flex-col mt-5">

    { orders.map((order)=>(
      <RenderOrderCard order={order} key={Math.random()}/>
      ))}
      </div>
  </div> );
}
 
export default Orders;



function RenderOrderCard(props) {
  const { productName,userName ,quantity,orderDate } = props.order;
    return (
			<div className="shadow-md duration-300 hover:shadow-xl rounded-xl xl p-5">
				<h1 className="font-montserrat text-xl">Name: {userName}</h1>
				<h1 className="font-montserrat text-xl">Order: {productName}</h1>
        <h1 className="font-montserrat text-xl">Quantity: {quantity}</h1>
        <h1 className="font-montserrat text-xl">Order Date: {orderDate}</h1>
			</div>
		);
}