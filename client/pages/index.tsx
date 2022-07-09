import type { NextPage, GetServerSideProps } from "next";
import Router from "next/router";
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

		return {
			props: {
				fullName: response.data.user,
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

type Props = {
	fullName: string;
};

const Home: NextPage<Props> = (props: Props) => {
	const handleLogout = async () => {
		const response = await fetch(
			process.env.NEXT_PUBLIC_SERVER_URL! + "/account/logout",
			{
				method: "GET",
				credentials: "include",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status === 200) {
			Router.push("/login");
		}
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Home</title>
				<meta name="home page" content="home" />
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
					<div className={styles.btnContainer}>
						<button className={styles.btn} onClick={handleLogout}>
							Log Out
						</button>
					</div>
					<h1>Welcome {props.fullName}!</h1>
					<Image src="/dog.jpg" width={350} height={450} alt="party dog" />{" "}
				</div>
			</main>
		</div>
	);
};

export default Home;
