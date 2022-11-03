import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import EditProfile from './EditProfile';
import { useDispatch } from 'react-redux';
import { editUser, fetchSingleUser } from '../admin/allUsersSlice';

const profilePage = (props) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchSingleUser(user.id));
	}, [dispatch]);

	const user = useSelector((state) => state.auth.me);
	const username = user.username;

	// const [firstName, setFirstName] = useState(`${user.firstName}`);
	// const [lastName, setLastName] = useState(`${user.lastName}`);
	// const [email, setEmail] = useState(`${user.email}`);
	// const [address, setAddress] = useState(`${user.address}`);
	// const [displayName, setDisplayName] = useState(`${user.displayName}`);
	// const [edit, setEdit] = useState(false);

	console.log(user.firstName);
	console.log(user.lastName);
	console.log(user.email);
	console.log(user.address);
	console.log(user.username);

	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [edit, setEdit] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		let objectSend = {
			id: user.id,
			firstName,
			lastName,
			email,
			address,
		};

		dispatch(editUser(objectSend));
		setEdit(false);
	};

	return (
		<div>
			{!edit ? (
				<>
					<h3>Welcome, {username}</h3>
					<p>
						Name: {user.firstName} {user.lastName}
					</p>
					<p>Username: {username}</p>
					<p>Email: {user.email}</p>
					<p>Address: {user.address}</p>

					<br />
					<button onClick={() => setEdit(true)}>Edit</button>
				</>
			) : (
				<>
					<label htmlFor="firstName">First Name: </label>
					<input
						name="firstName"
						value={firstName}
						onChange={(e) => setFirstName(e.target.value)}
						placeholder={user.firstName}
					/>

					<label htmlFor="lastName">Last Name: </label>
					<input
						name="lastName"
						value={lastName}
						onChange={(e) => setLastName(e.target.value)}
						placeholder={user.lastName}
					/>

					<label htmlFor="displayName">Username: </label>
					<input
						name="displayName"
						value={displayName}
						onChange={(e) => setDisplayName(e.target.value)}
						placeholder={user.username}
					/>

					<label htmlFor="email">Email: </label>
					<input
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder={user.email}
					/>

					<label htmlFor="address">Address: </label>
					<input
						name="address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder={user.address}
					/>

					<button onClick={handleSubmit}>Save</button>
				</>
			)}
		</div>
	);
};

export default profilePage;
