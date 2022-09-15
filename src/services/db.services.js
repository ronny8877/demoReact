import { faker } from "@faker-js/faker";

export function generateId() {
  return faker.database.mongodbObjectId();
}


export function getProduct() {
	// PRODUCTS: [{ ProductId: number, ProductName: string, InStock: number }];

return {
	productId: faker.database.mongodbObjectId(),
	productName: faker.commerce.productName(),
	inStock: faker.random.numeric(),
};
}



export function getUser(){
  // USERS: [{ UserId: number, UserName: string, MobileNo: number }];
  return{
    userId:faker.database.mongodbObjectId(),
    userName:faker.name.firstName()+faker.name.lastName(),
    mobileNo:faker.phone.number()
  }
}


export function getUsers(n){
  // USERS: [{ UserId: number, UserName: string, MobileNo: number }];
  
  
if (localStorage.getItem("users") === null) {
	const users = [];
	for (let i = 0; i < n; i++) {
		users.push(getUser());
	}
	localStorage.setItem("users", JSON.stringify(users));
	return users;
} else {
	return JSON.parse(localStorage.getItem("users"));
}

}


export function deleteProduct(id){
 localStorage.setItem("products",
  JSON.stringify(
    JSON.parse(localStorage.getItem("products")).filter((product)=>product.productId!==id)
  )
  ) 
}

export function addProduct(product){
  
  product.productId=generateId()
  localStorage.setItem("products",
  JSON.stringify(
    [...JSON.parse(localStorage.getItem("products")),product]
  )
  ) 
}


export function updateProduct(product){
  localStorage.setItem("products",
  JSON.stringify(
    JSON.parse(localStorage.getItem("products")).map((prod)=>prod.productId===product.productId?product:prod)
  )
  ) 
}

export function getProducts(n=10) {
  // PRODUCTS: [{ ProductId: number, ProductName: string, InStock: number }];

if(localStorage.getItem("products")===null){
  const products = [];
  for (let i = 0; i < n; i++) {
    products.push(getProduct());
  }
  localStorage.setItem("products", JSON.stringify(products));
  return products;}
  else{
    return JSON.parse(localStorage.getItem("products"));
  }
}


export function deleteUser(id)
{
  localStorage.setItem("users",
  JSON.stringify(
    JSON.parse(localStorage.getItem("users")).filter((user)=>user.userId!==id)
  )
  ) 
}


export function addUser(user){
  user.userId=generateId()
  localStorage.setItem("users",
  JSON.stringify(
    [...JSON.parse(localStorage.getItem("users")),user]
  )
  ) 
}

export function updateUser(u){
  localStorage.setItem("users",
  JSON.stringify(
    JSON.parse(localStorage.getItem("users")).map((user)=>user.userId===u.userId?u:user)
  )
  ) 
}

export function createUser(user){
  user.userId=generateId()
  localStorage.setItem("users",
  JSON.stringify(
    [...JSON.parse(localStorage.getItem("users")),user]
  )
  ) 

}




export function getUserById(id){
  return JSON.parse(localStorage.getItem("users")).filter((user)=>user.userId===id)

}

export function getProductById(id){
  return JSON.parse(localStorage.getItem("products")).filter((product)=>product.productId===id)

}



export function createOrders(data){
data.orderId=generateId()
data.orderDate=new Date()
let prd=getProductById(data.productId)
if(prd[0].inStock<0&&prd[0].inStock<data.quantity)return alert("We don't have enough stock")
else{
  prd[0].inStock-=data.quantity
  updateProduct(prd[0])
  if(localStorage.getItem("orders")===null){
    localStorage.setItem("orders",JSON.stringify([data]))
  }
else
{  localStorage.setItem("orders",
  JSON.stringify(
    [...JSON.parse(localStorage.getItem("orders")),data]
  )
  )
}
alert("Order Placed")
}

}



export function getOrders(){
  let data=[]
  if(localStorage.getItem("orders")===null)return []
  let orders= JSON.parse(localStorage.getItem("orders"))
  orders.forEach((order)=>{
    let prd=getProductById(order.productId)
    let usr=getUserById(order.userId)
    data.push({...order,productName:prd[0].productName,userName:usr[0].userName})
  })
  

  return data
}