import React from "react";

// Components
import Header from "@/components/Header/Header";
import FilterSection from "@/components/FilterSection/FilterSection";
import Table from "@/components/Table/Table";

// Data
import { TableData } from "@/data/TableData";

const HeaderData = {
  currentBalance: 628432.9,
  availableBalance: 1371568.1,
  calculateProgressBarPercentage() {
    return (this.currentBalance / this.availableBalance) * 100 + "%";
  },
};

const Overview = () => {
  // console.log(HeaderData.calculateProgressBarPercentage());
  return (
    <>
      <Header
        currentBalance={HeaderData.currentBalance}
        availableBalance={HeaderData.availableBalance}
        maxBalance={HeaderData.calculateProgressBarPercentage()}
      />

      <FilterSection />

      <Table data={TableData} />
    </>
  );
};

export default Overview;
