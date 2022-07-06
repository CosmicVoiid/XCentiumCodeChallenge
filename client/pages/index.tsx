import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
	return (
		<div className={styles.container}>
			<Head>
				<title>Login</title>
				<meta name="login page" content="user log in" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div className={styles.formContainer}>
					<form className={styles.form}>
						<label htmlFor="username">Username</label>
						<input type="text" id="username" name="username" />
						<label htmlFor="password">Password</label>
						<input type="password" id="password" name="password" />
						<button type="submit">Log In</button>
					</form>
				</div>
			</main>
		</div>
	);
};

export default Home;
