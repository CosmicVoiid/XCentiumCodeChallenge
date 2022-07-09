import type { NextPage, GetServerSideProps } from "next";
import Router from "next/router";
import { useState } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Login.module.css";
import { useFormik } from "formik";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	try {
		await axios.get(process.env.NEXT_PUBLIC_SERVER_URL! + "/account/user", {
			withCredentials: true,
			headers: {
				"Content-Type": "application/json",
				Cookie: `${req.headers.cookie}`,
			},
		});

		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	} catch {
		return {
			props: {},
		};
	}
};

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
				Router.push("/");
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
				<Image
					src="/logo.svg"
					alt="XCentium Logo"
					width={200}
					height={100}
				></Image>
				<div className={styles.mainContainer}>
					<h1 className={styles.header}>Log In</h1>
					<div className={styles.formContainer}>
						<form className={styles.form} onSubmit={formik.handleSubmit}>
							<label className={styles.label} htmlFor="username">
								Username
							</label>
							<input
								className={styles.textInput}
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

							<label className={styles.label} htmlFor="password">
								Password
							</label>
							<input
								className={styles.textInput}
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
								className={styles.btn}
								type="submit"
								disabled={
									formik.values.username.length === 0 ||
									formik.values.password.length === 0
								}
							>
								Log In
							</button>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
};

export default Login;

//https://www.xcentium.com/-/media/images/logo/xcentium-logo-dark.svg?h=111&iar=0&w=717&rev=c5fcdf17621c46499831bebd24654b21&hash=2986364333BC09037F34217B55C16539
