import React from "react";

// styles
import styles from "./MainText.module.css";

interface MainTextProps {
  title: string;
}

const MainText: React.FC<MainTextProps> = ({ title }) => {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>{title}</h3>
    </div>
  );
};

export default MainText;
