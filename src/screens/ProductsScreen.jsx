import React from 'react';
import { getProducts, deleteProduct, addProduct, updateProduct } from "../services/db.services";

const ProductScreen = () => {
  const [products, setProducts] = React.useState(getProducts(50));
	const [isModalOpen,setModalOpen] = React.useState(false)
  
	const handelDelete=(id)=>{
    deleteProduct(id)
    setProducts(getProducts())
  }

	const handelAddProduct = (data) => {	
			addProduct(data)
			setProducts([...products, data]);
	};

	const handelToggleModal = ()=>{
		setModalOpen(!isModalOpen)
	}

	const handelUpdateProduct = (id, data) => {
	updateProduct({id, ...data})
	setProducts(getProducts())		
	};


  return (
		<div className="container relative m-auto p-5">
			{isModalOpen ? (
				<RenderInputMOdal
				prod={{}}
					handelAddProduct={handelAddProduct}
					handelToggleModal={handelToggleModal}
				/>
			) : null}
			<div className="flex flex-wrap justify-between">
				<h1 className="mt-20 font-ubuntu text-5xl">
					Product List
					<i className="fas fa-list text-2xl ml-2"></i>
				</h1>
				<hr />
				<button onClick={handelToggleModal} className="btn-primary">
					New Product &nbsp; <i className="fas fa-add" />{" "}
				</button>
			</div>
			<div className="flex flex-wrap gap-5 mt-5">
				{products.map((product) => (
					<RenderCards
						handelUpdateProduct={handelUpdateProduct}
						handelDelete={handelDelete}
						product={product}
						key={Math.random()}
					/>
				))}
			</div>
		</div>
	);
}
 
export default ProductScreen;




function RenderCards({ product, handelDelete, handelUpdateProduct }) {
	const { inStock, productId, productName } = product;
	const [isModalOpen, setModalOpen] = React.useState(false);

	const handelEditProduct = () => {
		setModalOpen(!isModalOpen);
	};

	const handelToggleModal = () => {
		setModalOpen(!isModalOpen);
	};

	const handelAddProduct = (data) => {
		handelUpdateProduct(productId, data);
		setModalOpen(!isModalOpen);
	};

	return (
		<div className="p-6 rounded-lg shadow-md hover:shadow-lg duration-300 relative">
			{isModalOpen ? (
				<RenderInputMOdal
					prod={product}
					handelToggleModal={handelToggleModal}
					handelAddProduct={handelAddProduct}
				/>
			) : null}
			<h1 className="font-ubuntu">{productName}</h1>
			<h3 className="text-center font-ubuntu text-sm">In Stock : {inStock}</h3>
			<div className="absolute  left-0 bottom-0 z-10 flex flex-wrap  px-5 mt-2  flex-row gap-5 w-full
			justify-center content-center
			">
				<i
					onClick={() => handelEditProduct(productId)}
					className="fas fa-pencil text-lg text-gray-500 hover:text-red-700 duration-300 cursor-pointer"
				></i>
				<i
					onClick={() => handelDelete(productId)}
					className="fas fa-trash text-lg text-gray-500 hover:text-red-700 duration-300 cursor-pointer"
				></i>
			</div>
		</div>
	);
}



function RenderInputMOdal({prod ,handelToggleModal  , handelAddProduct}) {
	const [product, setProduct] = React.useState(
		prod || {
			productName: "",
			inStock: "",
		}
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};

	const handelAdd = (e) => {
		if (product.productName && product.inStock) {
			handelAddProduct(product);
			handelToggleModal();
		} else {
			alert("Please fill all the fields");
		}
	};
	return (
		<div className="w-full z-50 h-screen grid fixed top-0 left-0 bg-gray-800 place-content-center">
			<div className="w-96 h-96 bg-gray-50 rounded-xl p-3">
				<h3 className="text-center font-ubuntu text-2xl">New Product</h3>
				<div className="flex w-full flex-wrap gap-10 mt-5">
					<input
						onChange={handleChange}
						name="productName"
						value={product.productName}
						className="px-2 py-2  rounded-lg focus:outline-0 font-ubuntu border-b-4 w-full focus:border-t-2"
						placeholder="Product Name"
					/>

					<input
						name="inStock"
						type="number"
						onChange={handleChange}
						value={product.inStock}
						className="px-2 py-2  rounded-lg focus:outline-0 font-ubuntu border-b-4 w-full focus:border-t-2"
						placeholder="Product Quantity"
					/>
					<button onClick={handelAdd} className="btn-primary m-auto">
						{prod.productId
							? "Save"
							: "Add "}
					</button>
					<button onClick={handelToggleModal} className="btn-danger m-auto">
						Close &nbsp; <i className="fas fa-close" />
					</button>
				</div>
			</div>
		</div>
	);
}