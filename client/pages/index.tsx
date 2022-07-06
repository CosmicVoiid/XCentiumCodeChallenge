import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useFormik } from "formik";

const Home: NextPage = () => {
	const formik = useFormik({
		initialValues: {
			username: "",
			password: "",
		},
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
				<h1 className="header">Log In</h1>
				<div className={styles.formContainer}>
					<form className={styles.form} onSubmit={formik.handleSubmit}>
						<label htmlFor="username">Username</label>
						<input
							type="text"
							id="username"
							name="username"
							onChange={formik.handleChange}
							value={formik.values.username}
						/>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							onChange={formik.handleChange}
							value={formik.values.password}
						/>
						<button type="submit">Log In</button>
					</form>
				</div>
			</main>
		</div>
	);
};

export default Home;
