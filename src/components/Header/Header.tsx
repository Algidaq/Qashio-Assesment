"use client";
import React, { useState } from "react";

// Types
import { HeaderPropsTypes } from "./types";

// styles
import styles from "./Header.module.css";
import Countdown from "../Countdown/Countdown";

const Header: React.FC<HeaderPropsTypes> = ({
  title,
  currentBalance,
  availableBalance,
  maxBalance,
}) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.titleStyle}>Overview</h3>
      <div className={styles.headerWrapper}>
        <div className={styles.amountWrapper}>
          <div className={styles.current}>
            <p className={styles.subTitle}>Current Balance</p>
            <Countdown
              className={styles.amout}
              countdown={628432.9}
              speed={1}
              step={5000}
              preText="$"
              postText=""
            />
          </div>
          <div className={styles.available}>
            <p className={styles.subTitle}>Available Balance</p>
            <Countdown
              className={styles.amout}
              countdown={1371568.1}
              speed={1}
              step={10000}
              preText="$"
              postText=""
            />
            <p className={styles.subTitle}>$2,000,000</p>
          </div>
        </div>
        <div className={styles.progressbarWrapper}>
          <div className={styles.progressbar} style={{ width: "30%" }} />
        </div>

        <div className={styles.infoWrappr}>
          <div className={styles.info}>
            <p className={styles.subTitle}> Next Payment</p>
            <p className={styles.content}> Jun 3rd</p>
          </div>
          <div className={styles.info}>
            <p className={styles.subTitle}> Available Cashback</p>
            <Countdown
              className={styles.content}
              countdown={85382}
              speed={1}
              step={1000}
              preText="$"
              postText=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
