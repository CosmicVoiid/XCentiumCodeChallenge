import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
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

const Home: NextPage = () => {
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
		validate,
		onSubmit: (values) => {
			alert(JSON.stringify(values, null, 2));
		},
	});

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

export default Home;
