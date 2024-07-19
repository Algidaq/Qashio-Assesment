import Image from "next/image";
import styles from "./page.module.css";
import Overview from "./transactions/overview/page";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/transactions/overview");
  return (
    <>
      <Overview />
    </>
  );
}
