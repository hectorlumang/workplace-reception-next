import Head from 'next/head'

import styles from '../styles/Home.module.css';

import { useRouter } from 'next/router';

import Image from 'next/image';

import Link from 'next/link'

import logo from './../public/logo.png';
import circle_left from './../public/img/circle-left.png';
import circle_right from './../public/img/circle-right.png';
import button from './../public/img/button.png';
import bottom from './../public/img/bottom.png';
import setting_ico from './../public/img/settings-button.png';

export default function Home(props) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Workplace Cafe Reception</title>
        <meta name="viewport" content="width=device-width,initial-scale=1"></meta>
        <meta name="description" content="Workplace Cafe Reception Application" />
        <link rel="icon" href="/workplace-cafe-logo.ico" />
        <style>
          @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800;900&display=swap");
        </style>
      </Head>

      <div className="App home-page">
        <div className="setting_ico" onClick={() => router.push('/settings')}>
          <Image src={setting_ico} alt="Setting" />
        </div>
        <div className="circles">
          <div className="left circle">
            <Image src={circle_left} alt="circle-left"/>
          </div>
          <div className="right circle">
            <Image src={circle_right} alt="circle-right" />
          </div>
        </div>
        <div className="App-logo">
          <Image src={logo} alt="logo" />
        </div>
        <div className="welcome-title">
          <p className="welcome">
            Welcome to <span className="app-name">Workplace Cafe.</span>
          </p>
          <p className="sub-welcome">Glad to be working with you.</p>
        </div>
        <div className="home_start">
          <Link href="./sessiontypes">
            <button className="btn start">
              <Image src={button} alt="Button" />
              <span className="btn title">START</span>
            </button>
          </Link>
        </div>
        <div className="bottoms">
          <div className="left bottom">
            <Image src={bottom} alt="bottom-left"/>
          </div>
          <div className="right bottom">
            <Image src={bottom} alt="bottom-right"/>
          </div>
        </div>

      </div>
    </div>
  )
}
