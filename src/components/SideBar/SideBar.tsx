"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Components
import Link from "next/link";

// Types
import { Page } from "./types";

// Icons
import {
  CiGrid42,
  CiShop,
  CiDollar,
  CiCreditCard1,
  CiSettings,
} from "react-icons/ci";
import { GoBook } from "react-icons/go";
import { IoPeopleOutline } from "react-icons/io5";
import { RiExchangeDollarFill } from "react-icons/ri";

// styles
import styles from "./SideBar.module.css";
import useWindowSize from "@/hooks/useWindowSize";
const pages: Page[] = [
  {
    name: "Insights",
    link: "/insights",
    icon: <CiGrid42 className={styles.iconStyle} />,
  },
  {
    name: "Transactions",
    link: "/transactions",
    icon: <CiDollar className={styles.iconStyle} />,
    subPages: [
      { name: "Overview", link: "/transactions/overview" },
      { name: "Needs Review", link: "/transactions/needs-review" },
      { name: "Out Of Policy", link: "/transactions/out-of-policy" },
      { name: "Declined", link: "/transactions/declined" },
    ],
  },
  {
    name: "Card",
    link: "/card",
    icon: <CiCreditCard1 className={styles.iconStyle} />,
  },
  {
    name: "Vendors",
    link: "/vendors",
    icon: <CiShop className={styles.iconStyle} />,
  },
  {
    name: "Accounting",
    link: "/accounting",
    icon: <GoBook className={styles.iconStyle} />,
  },
  {
    name: "People",
    link: "/people",
    icon: <IoPeopleOutline className={styles.iconStyle} />,
  },
  {
    name: "Reimburse",
    link: "/reimburse",
    icon: <RiExchangeDollarFill className={styles.iconStyle} />,
  },
];

const SideBar: React.FC = () => {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState<string>("");

  const handlePageClick = (pageName: string) => {
    setActivePage(activePage === pageName ? "" : pageName);
  };

  const { width } = useWindowSize();

  return width > 991 ? (
    <_SideBar
      activePage={activePage}
      pathname={pathname}
      onPageClick={handlePageClick}
    />
  ) : (
    <_Navbar
      activePage={activePage}
      pathname={pathname}
      onPageClick={handlePageClick}
    />
  );
};

const _SideBar: React.FC<{
  activePage?: string;
  onPageClick?: (page: string) => void;
  pathname: string;
}> = ({ activePage, onPageClick, pathname }) => {
  const [openedLinkGroups, setOpenLinksGroups] = useState<Set<string>>(
    new Set()
  );

  const handleOnGroupLinksClicked = (name: string) => {
    return () => {
      const exits = openedLinkGroups.has(name.toLowerCase());
      if (!exits) {
        const newOpenedLinkedGroups = new Set(openedLinkGroups);
        newOpenedLinkedGroups.add(name.toLowerCase());
        setOpenLinksGroups(newOpenedLinkedGroups);
        return;
      }

      const newOpenedLinkedGroups = new Set(openedLinkGroups);
      newOpenedLinkedGroups.delete(name.toLowerCase());
      setOpenLinksGroups(newOpenedLinkedGroups);
    };
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebarWrapper}>
        <div className={styles.linksWrapper}>
          {pages.map((page) => {
            return (
              <div key={page.name}>
                {page.subPages && page.subPages.length > 0 ? (
                  <SubPagesLink page={page} />
                ) : (
                  <Link href={page.link}>
                    <div
                      className={`${styles.pageLink} ${
                        pathname === page.link ? styles.linkActive : ""
                      }`}
                    >
                      {page.icon}
                      {page.name}
                    </div>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.settingWrapper}>
          <Link href="/">
            <div
              className={`${styles.pageLink} ${
                pathname === "/" ? styles.active : ""
              }`}
            >
              <CiSettings className={styles.iconStyle} /> Settings
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const SubPagesLink: React.FC<{ page: Page; onHideNavbar?: () => void }> = ({
  page,
  onHideNavbar,
}) => {
  const pathname = usePathname();

  const hasSubPages = page.subPages !== undefined && page.subPages.length > 0;

  const [showSubPages, setShowSubPages] = useState(
    pathname.includes(page.link)
  );

  useEffect(() => {
    setShowSubPages(pathname.includes(page.link));
  }, [pathname, page.link]);

  const handleOnParentClick = () => {
    if (!hasSubPages) return;
    setShowSubPages((prev) => !prev);
  };

  return (
    <div key={page.name}>
      <>
        <div
          onClick={handleOnParentClick}
          className={`${styles.pageLink} ${
            pathname.includes(page.link) ? styles.linkActive : ""
          }`}
        >
          {page.icon}
          {page.name}
        </div>
        {(pathname.includes(page.link) || showSubPages) && (
          <div className={styles.subPages}>
            {page.subPages?.map((subPage) => (
              <Link
                href={subPage.link}
                key={subPage.name}
                onClick={onHideNavbar}
              >
                <div
                  className={`${styles.subPageLink} ${
                    pathname === subPage.link ? styles.sublinkActive : ""
                  }`}
                >
                  {subPage.name}
                </div>
              </Link>
            ))}
          </div>
        )}
      </>
    </div>
  );
};

const _Navbar: React.FC<{
  activePage?: string;
  onPageClick?: (page: string) => void;
  pathname: string;
}> = ({ activePage, onPageClick, pathname }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.navbarWrapper}>
      <div className={styles.container}>
        <div
          className={`${styles.navlines} ${isOpen ? styles.navlinesOpen : ""}`}
          onClick={toggleNavbar}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        className={
          isOpen
            ? styles.mobileNavbarWrapperOpen
            : styles.mobileNavbarWrapperClose
        }
      >
        <div className={styles.sidebarWrapper}>
          <div className={styles.linksWrapper}>
            {pages.map((page) => (
              <div key={page.name}>
                {page.subPages ? (
                  <SubPagesLink
                    page={page}
                    onHideNavbar={() => setIsOpen(false)}
                  />
                ) : (
                  <Link href={page.link} onClick={() => setIsOpen(false)}>
                    <div
                      className={`${styles.pageLink} ${
                        pathname === page.link ? styles.linkActive : ""
                      }`}
                    >
                      {page.icon}
                      {page.name}
                    </div>
                  </Link>
                )}
              </div>
            ))}

            <div className={styles.settingWrapper}>
              <Link href="/" onClick={() => setIsOpen(false)}>
                <div
                  className={`${styles.pageLink} ${
                    pathname === "/" ? styles.active : ""
                  }`}
                >
                  <CiSettings className={styles.iconStyle} /> Settings
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
