import React from 'react';
import { createOrders, getProducts, getUsers } from '../services/db.services';


const HomeScreen = () => {
const [products, setProducts] = React.useState(getProducts(50));
const [users, setUsers] = React.useState(getUsers(50));
const  [data,setData]=React.useState({
  productId:"",
  userId:""})


  const handelChange=(e)=>{
  setData({...data,[e.target.name]:e.target.value})

  }
  const handelOrders=()=>{
    createOrders(data)

  }
 

  return (
		<div className="w-full grid place-content-center h-screen">
			<div className="w-96 h-96">
				<div className="grid grid-cols-2 gap-5">
					<div>
						<h1 className="text-lg font-montserrat p-3">Users</h1>
						<select
							name="userId"
							onChange={handelChange}
							className="w-full h-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-t-2 focus:border-blue-500"
						>
							{users.map((user) => {
								return <option value={user.userId}>{user.userName}</option>;
							})}
						</select>
					</div>
					<div>
						<h1 className="text-lg font-montserrat p-3">Products</h1>
						<select
							name="productId"
							onChange={handelChange}
							className="w-full h-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-t-2 focus:border-blue-500"
						>
							{products.map((prod) => {
								return (
									<option value={prod.productId}>{prod.productName}</option>
								);
							})}
						</select>
					</div>
				</div>
				<input
					onChange={handelChange}
					name="quantity"
					type="number"
					className="w-full px-5 h-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-t-2 focus:border-blue-500 mt-5"
					placeholder="Quantity"
				/>

				<button
					onClick={handelOrders}
					className="w-full h-10 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-t-2 bg-blue-500 text-white font-ubuntu focus:border-blue-500 mt-5"
				>
					Add
				</button>
			</div>
		</div>
	);
}
 
export default HomeScreen;