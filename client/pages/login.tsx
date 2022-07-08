import type { NextPage } from "next";
import Router from "next/router";
import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import { useFormik } from "formik";

type Values = {
	username: string;
	password: string;
};

type Errors = {
	username?: string;
	password?: string;
};

const validate = (values: Values) => {
	const errors: Errors = {};
	if (!values.username) {
		errors.username = "Username Required";
	}
	if (!values.password) {
		errors.password = "Password Required";
	}

	return errors;
};

const Login: NextPage = () => {
	const [errorMessage, setErrorMessage] = useState<string>("");

	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validate,
		onSubmit: () => {
			handleSubmit();
		},
	});

	const handleSubmit = async () => {
		try {
			const response = await fetch(
				process.env.NEXT_PUBLIC_SERVER_URL! + "/account/login",
				{
					method: "POST",
					mode: "cors",
					credentials: "include",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						username: formik.values.username,
						password: formik.values.password,
					}),
				}
			);
			if (response.status !== 200) {
				const userData = await response.json();
				setErrorMessage(userData.info);
			} else {
				Router.push("/home");
			}
		} catch (err) {
			console.log(process.env.NEXT_PUBLIC_SERVER_URL!);
			console.log(err);
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Login</title>
				<meta name="login page" content="user log in" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.header}>Log In</h1>
				<div className={styles.formContainer}>
					<form className={styles.form} onSubmit={formik.handleSubmit}>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							name="username"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.username}
						/>
						{formik.touched.username && formik.errors.username ? (
							<div className={styles.errorMessage}>
								{formik.errors.username}
							</div>
						) : null}

						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.password}
						/>
						{formik.touched.password && formik.errors.password ? (
							<div className={styles.errorMessage}>
								{formik.errors.password}
							</div>
						) : null}

						{errorMessage.length !== 0 && (
							<div className={styles.errorMessage}>{errorMessage}</div>
						)}

						<button
							type="submit"
							disabled={
								formik.errors.username !== undefined ||
								formik.errors.password !== undefined ||
								!formik.touched.username ||
								!formik.touched.password
							}
						>
							Log In
						</button>
					</form>
				</div>
			</main>
		</div>
	);
};

export default Login;
