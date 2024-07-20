/* eslint-disable @next/next/no-img-element */
import React from "react";

//styles
import styles from "./ReceiptListTile.module.css";

export const ReceiptListTile: React.FC<ReceiptListTileProps> = ({
  headerCaption,
  img,
  title,
  subtitle,
  location,
}) => {
  return (
    <div className={styles.receiptWrapper}>
      <div className={styles.receipt}>
        <p className={styles.receiptDate}>{headerCaption}</p>
        <div className={styles.receiptContent}>
          <img src={img} alt="img" className={styles.receiptImageWrapper} />
          <div className={styles.infoReceipt}>
            <p>{title}</p>
            <div className={styles.infoReceiptTypes}>
              <p>{subtitle}</p>
              <span />
              <p>{location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
