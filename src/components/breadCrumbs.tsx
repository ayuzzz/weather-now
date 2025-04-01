import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/breadcrumbs.module.css";

const BreadCrumbs = () => {
  const router = useRouter();
  const pathSegments = router.asPath.split("/").filter((segment) => segment);

  return (
    <div className={styles.breadcrumbs}>
      <Link className={styles.breadcrumb} href="/">
        <span className={styles.breadcrumb_text}>{` Dashboard `}</span>
      </Link>
      {pathSegments.map((segment, index) => {
        const path = `${pathSegments.slice(0, index + 1).join("/")}`;

        return (
          <>
            <span
              className={styles.breadcrumb_separator}
            >{`\u00A0>\u00A0`}</span>
            <Link className={styles.breadcrumb} key={path} href={path}>
              <span className={styles.breadcrumb_text}>{`${segment}`}</span>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default BreadCrumbs;
