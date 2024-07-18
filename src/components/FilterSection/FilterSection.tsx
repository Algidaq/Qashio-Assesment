"use client";
import React from "react";

// Components
import Countdown from "../Countdown/Countdown";

// Types
import { CardProps } from "./types";

// Icons
import { HiOutlineDownload } from "react-icons/hi";
import { CiSearch, CiDollar } from "react-icons/ci";
import { MdOutlineDateRange } from "react-icons/md";
import { FaAngleDown } from "react-icons/fa";
import { MdOutlineOpenInFull } from "react-icons/md";

// styles
import styles from "./FilterSection.module.css";

const FilterSection = () => {
  const arrayCard: CardProps[] = [
    {
      CardTitle: "Transactoins",
      CardIcon: "$",
      CardClassName: styles.cardAmount,
      CardAmount: 1563,
    },
    {
      CardTitle: "Total Spend",
      CardIcon: "$",
      CardClassName: styles.cardAmount,
      CardAmount: 1228.9,
    },
    {
      CardTitle: "Missing Receipts",
      PostCardIcon: <MdOutlineOpenInFull className={styles.cardIconStyle} />,
      CardClassName: styles.cardAmountRed,
      CardAmount: 42,
    },
  ];

  return (
    <div className={styles.wrapper}>
      <div className={styles.filterWrapper}>
        <div className={styles.filters}>
          <div className={styles.searchWrapper}>
            <CiSearch className={styles.icon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search & Filter"
            />
          </div>
          <div className={styles.dateWrapper}>
            <div className={styles.searchWrapper}>
              <MdOutlineDateRange className={styles.icon} />
              <p className={styles.dateInpute}>Jun 01 , 2023 - Jun 30 , 2023</p>
              <FaAngleDown className={styles.icon} />
            </div>
            <div className={styles.dollarIcon}>
              <CiDollar className={styles.iconDollar} />
            </div>
          </div>
        </div>
        <a
          href="#"
          download={"#"}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.downloadButton}
        >
          <HiOutlineDownload className={styles.icon} />
        </a>
      </div>
      <div className={styles.cardsWrapper}>
        {arrayCard.map((card, index) => (
          <div key={index}>
            <Card
              CardTitle={card.CardTitle}
              CardAmount={card.CardAmount}
              CardIcon={card.CardIcon}
              PostCardIcon={card.PostCardIcon}
              CardClassName={card.CardClassName}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const Card: React.FC<CardProps> = ({
  CardTitle,
  CardAmount,
  CardIcon,
  CardClassName,
  PostCardIcon,
}) => {
  return (
    <div className={styles.singleCard}>
      <p className={styles.cardTitle}>{CardTitle}</p>
      <Countdown
        className={CardClassName}
        countdown={CardAmount}
        step={100}
        speed={10}
        preText={CardIcon}
        postText={PostCardIcon}
      />
    </div>
  );
};

export default FilterSection;
