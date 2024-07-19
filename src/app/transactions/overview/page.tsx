import React from "react";

// Components
import Header from "@/components/Header/Header";
import FilterSection from "@/components/FilterSection/FilterSection";
import Table from "@/components/Table/Table";

// Data
import { TableData } from "@/data/TableData";

const Overview = () => {
  return (
    <>
      <Header
        currentBalance={628432.9}
        availableBalance={1371568.1}
        maxBalance={"30%"}
      />

      <FilterSection />

      <Table data={TableData} />
    </>
  );
};

export default Overview;
