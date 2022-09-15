



//NOTE THis is jsut a clone of Product screen as i didn't had enough time to work on this one 
//Barely got an hour and 30 mins to complete the task


import React from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/db.services";

const UserSCreen = () => {
	const [users, setUsers] = React.useState(getUsers(50));
	const [isModalOpen, setModalOpen] = React.useState(false);

	const handelDelete = (id) => {
		deleteUser(id);
		setUsers(getUsers());
	};

	const handelCreateUser = (data) => {
		createUser(data);
		setUsers([...users, data]);
	};

	const handelToggleModal = () => {
		setModalOpen(!isModalOpen);
	};

	const handelUpdateUser = (id, data) => {
		updateUser({ id, ...data });
		setUsers(getUsers());
	};

	return (
		<div className="container relative m-auto p-5">
			{isModalOpen ? (
				<RenderInputMOdal
        prod={{}}
					handelCreateUser={handelCreateUser}
					handelToggleModal={handelToggleModal}
				/>
			) : null}
			<div className="flex flex-wrap justify-between">
				<h1 className="mt-20 font-ubuntu text-5xl">
					User List
					<i className="fas fa-list text-2xl ml-2"></i>
				</h1>
				<hr />
				<button onClick={handelToggleModal} className="btn-primary">
					New User &nbsp; <i className="fas fa-add" />{" "}
				</button>
			</div>
			<div className="flex flex-wrap gap-5 mt-5">
				{users.map((product) => (
					<RenderCards
						handelUpdateUser={handelUpdateUser}
						handelDelete={handelDelete}
						product={product}
						key={Math.random()}
					/>
				))}
			</div>
		</div>
	);
};

export default UserSCreen;

function RenderCards({ product, handelDelete, handelUpdateUser }) {
	const { mobileNo, userId, userName } = product;
	const [isModalOpen, setModalOpen] = React.useState(false);

	const handelEditProduct = () => {
		setModalOpen(!isModalOpen);
	};

	const handelToggleModal = () => {
		setModalOpen(!isModalOpen);
	};

	const handelCreateUser = (data) => {
		handelUpdateUser(userId, data);
		setModalOpen(!isModalOpen);
	};

	return (
		<div className="p-6 rounded-lg shadow-md hover:shadow-lg duration-300 relative">
			{isModalOpen ? (
				<RenderInputMOdal
					prod={product}
					handelToggleModal={handelToggleModal}
					handelCreateUser={handelCreateUser}
				/>
			) : null}
			<h1 className="font-ubuntu text-2xl text-center">{userName}</h1>
			<h3 className="text-center font-ubuntu text-sm"><i className="fa fa-phone"></i> {mobileNo}</h3>
			<div
				className="absolute  left-0 bottom-0 z-10 flex flex-wrap  px-5 mt-2  flex-row gap-5 w-full
			justify-center content-center
			"
			>
				<i
					onClick={() => handelEditProduct(userId)}
					className="fas fa-pencil text-lg text-gray-500 hover:text-red-700 duration-300 cursor-pointer"
				></i>
				<i
					onClick={() => handelDelete(userId)}
					className="fas fa-trash text-lg text-gray-500 hover:text-red-700 duration-300 cursor-pointer"
				></i>
			</div>
		</div>
	);
}

function RenderInputMOdal({ prod, handelToggleModal, handelCreateUser }) {
	const [product, setProduct] = React.useState(
		prod || {
			userName: "",
			mobileNo: "",
		}
	);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};

	const handelAdd = (e) => {
		if (product.userName && product.mobileNo) {
			handelCreateUser(product);
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
						name="userName"
						value={product.userName}
						className="px-2 py-2  rounded-lg focus:outline-0 font-ubuntu border-b-4 w-full focus:border-t-2"
						placeholder="Product Name"
					/>

					<input
						name="mobileNo"
						type="tel"
						onChange={handleChange}
						value={product.mobileNo}
						className="px-2 py-2  rounded-lg focus:outline-0 font-ubuntu border-b-4 w-full focus:border-t-2"
						placeholder="Product Quantity"
					/>
					<button onClick={handelAdd} className="btn-primary m-auto">
						{prod.userId
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
