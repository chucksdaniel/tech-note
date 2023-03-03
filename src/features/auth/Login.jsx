import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

const Login = () => {
	const userRef = userRef();
	const errRef = userRef();
	const [username, SetUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errMsg, steErrMsg] = useState("");

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login, { isLoading }] = useLoginMutation();

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		steErrMsg("");
	}, [username, password]);

	const handleUserInput = (e) => SetUsername(e.target.value);
	const handlePwdInput = (e) => setPassword(e.target.value);
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { accessToken } = await login({ username, password }).unwrap();
			dispatch(setCredentials({ accessToken }));
			SetUsername("");
			setPassword("");
			navigate("/dash");
		} catch (err) {
			if (!err.status) {
				steErrMsg("No server Response");
			} else if (err.status === 400) {
				steErrMsg("Missing Username of Password");
			} else if (err.status == 401) {
				steErrMsg("Unauthorized");
			} else {
				steErrMsg(err.data?.message);
			}
			errRef.current.focus();
		}
	};

	const errClass = errMsg ? "errmsg" : "offscreen";

	if (isLoading) return <p>Loading...</p>;

	const content = (
		<section className="public">
			<header>
				<h1>Employee Login</h1>
			</header>
			<main className="login">
				<p ref={errRef} className={errClass}>
					{errMsg}
				</p>
				<form className="form" onSubmit={handleSubmit}>
					<label htmlFor="username">Username: </label>
					<input
						className="form__input"
						type="text"
						id="username"
						ref={userRef}
						value={username}
						onChange={handleUserInput}
						autoComplete="off"
						required
					/>
					<label htmlFor="password">Password: </label>
					<input
						className="form__input"
						type="password"
						id="password"
						value={password}
						onChange={handlePwdInput}
						required
					/>
					<button className="form__submit-button">Sign In</button>
				</form>
			</main>
			<footer>
				<Link to="/">Back to Home</Link>
			</footer>
		</section>
	);

	return content;
};

export default Login;
