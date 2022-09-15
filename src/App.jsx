import { useState } from 'react'
import HomeScreen from './screens/HomeScreen'
import Orders from './screens/OrdersScreen'
import ProductScreen from './screens/ProductsScreen'
import UserSCreen from './screens/UserList'
import { Routes, Route, Outlet, Link } from "react-router-dom";
function App() {
  const [count, setCount] = useState(0)

  return (
    <div  >
<Routes>
<Route  path="/" element={<HomeScreen />} />
<Route  path="/products" element={<ProductScreen />} />
<Route  path="/orders" element={<Orders />} />
<Route  path="/users" element={<UserSCreen />} />

</Routes>
<RenderFloatingMenu/>
    </div>
  )
}

export default App



function RenderFloatingMenu(){
  return (
		<div>
			<div className="fixed flex gap-5 bottom-0 right-0 m-5">
				<Link to="/products">
					<button className="btn-primary">
						<i className="fas fa-list"></i>
					</button>
				</Link>

				<Link to="/orders">
					<button className="btn-primary">
						<i className="fas fa-shopping-cart"></i>
					</button>
				</Link>

				<Link to="/users">
					<button className="btn-primary">
						<i className="fas fa-users"></i>
					</button>
				</Link>

				<Link to="/">
					<button className="btn-primary">
						<i className="fas fa-home"></i>
					</button>
				</Link>
			</div>
		</div>
	);
}