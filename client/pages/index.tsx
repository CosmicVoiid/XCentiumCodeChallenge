import type { NextPage, GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	try {
		const response = await axios.get(
			process.env.NEXT_PUBLIC_SERVER_URL! + "/account/user",
			{
				withCredentials: true,
				headers: {
					"Content-Type": "application/json",
					Cookie: `${req.headers.cookie}`,
				},
			}
		);

		console.log(response.status);
		const fullName = response.data;

		return {
			props: {
				fullName: fullName,
			},
		};
	} catch {
		return {
			redirect: {
				permanent: false,
				destination: "/login",
			},
		};
	}
};

const Home: NextPage = () => {
	// useEffect(() => {
	// 	//Fetch user from api
	// 	const fetchUser = async () => {
	// 		const response = await fetch(
	// 			process.env.NEXT_PUBLIC_SERVER_URL! + "/account/user",
	// 			{
	// 				method: "GET",
	// 				mode: "cors",
	// 				credentials: "include",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 			}
	// 		);
	// 		console.log(response.status);
	// 		if (response.status !== 200) {
	// 			return Router.push("/login");
	// 		}

	// 		const fullName = await response.json();
	// 	};

	// 	fetchUser();
	// });

	return (
		<div className={styles.container}>
			<Head>
				<title>Home</title>
				<meta name="home page" content="home" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<main className={styles.main}>
				<h1>Welcome {}</h1>
			</main>
		</div>
	);
};

export default Home;
