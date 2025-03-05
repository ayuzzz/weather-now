"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdLightMode, MdOutlineSettings } from "react-icons/md";
import { HiMoon } from "react-icons/hi2";
import { GoHome } from "react-icons/go";
import { LiaMapSolid } from "react-icons/lia";
import styles from "@/styles/navbar.module.css";

const Navbar = () => {
  const [theme, setTheme] = useState("Light");

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image
            src="/favicon.png"
            alt="Logo"
            //layout="responsive"
            width={50} // Acts as aspect ratio
            height={50}
          />
        </Link>
        <Link href="/" className={styles.logo_link}>
          <h1>Weather Now</h1>
        </Link>
      </div>
      <div className={styles.nav_items}>
        <div className={styles.flex_center}>
          <GoHome />
          <Link className={styles.nav_item} href="/">
            Dashboard
          </Link>
        </div>
        <div className={styles.flex_center}>
          <LiaMapSolid />
          <Link className={styles.nav_item} href="/maps">
            Maps
          </Link>
        </div>
        <div className={styles.flex_center}>
          <MdOutlineSettings />
          <Link className={styles.nav_item} href="/settings">
            Settings
          </Link>
        </div>
      </div>
      <div className={styles.theme_toggle}>
        <button
          className={`${styles.btn_theme_toggle} ${styles.flex_center}`}
          onClick={toggleTheme}
        >
          {theme === "Light" ? (
            <HiMoon className={styles.icon} />
          ) : (
            <MdLightMode className={styles.icon} />
          )}
          {theme === "Light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    </div>
  );

  function toggleTheme(): void {
    // If the current theme is light, set it to dark
    if (theme === "Light") {
      setTheme("Dark");
    } else {
      setTheme("Light");
    }
  }
};

export default Navbar;
