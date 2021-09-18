import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { NotionAPI } from "notion-client";
import { NotionRenderer, CollectionRow, Code } from "react-notion-x";
import { useEffect, useState } from "react";
// import { useRouter } from "next/router";

const Pdf = dynamic(() =>
  import("react-notion-x").then((notion) => notion.Pdf),
);

const Equation = dynamic(() =>
  import("react-notion-x").then((notion) => notion.Equation),
);

const Collection = dynamic(
  () => import("react-notion-x").then((notion) => notion.Collection),
  { ssr: false },
);

const Modal = dynamic(
  () => import("react-notion-x").then((notion) => notion.Modal),
  { ssr: false },
);

const COLORS = ["#d96f68", "#7666a7", "#fa0566"];
export default function Home({ recordMap }) {
  const [currentBroswerTheme, setBrowserTheme] = useState("");
  const changeBrowswerTheme = () => {
    const themeColor = document.querySelector('meta[name="theme-color"]');

    const COLOR = COLORS[Math.floor(Math.random() * COLORS?.length)];
    themeColor.setAttribute("content", COLOR);
    setBrowserTheme(COLOR.toString());
  };
  // useEffect(() => {
  //   const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");

  //   // Check if users don't have a preference for reduced motion
  //   if (motion.matches) {
  //     let scheme = document.querySelector('meta[name="theme-color"]');
  //     let hue = 0;
  //     let color;

  //     setInterval(() => {
  //       color = `hsl(${(hue += 5)} 50% 30%)`;
  //       // document.body.style.background = color;
  //       scheme.setAttribute("content", color);
  //     }, 50);
  //   }
  // }, []);

  return (
    <div suppressHydrationWarning>
      <Head>
        <title>Min with Notion</title>
        <meta name="description" content="Min with notion" />
        <link rel="icon" href="/favicon.ico" />

        <meta
          name="theme-color"
          content={"#7666a7"}
          // media="(prefers-color-scheme: dark)"
        />
      </Head>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Home</h2>
        <button onClick={() => changeBrowswerTheme()}>
          Random Broswer Theme
        </button>
      </div>
      <NotionRenderer
        suppressHydrationWarning
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        components={{
          pageLink: ({
            href,
            as,
            passHref,
            prefetch,
            replace,
            scroll,
            shallow,
            locale,
            ...props
          }) => (
            <Link
              href={href}
              as={as}
              passHref={passHref}
              prefetch={prefetch}
              replace={replace}
              scroll={scroll}
              shallow={shallow}
              locale={locale}
            >
              <a {...props} />
            </Link>
          ),
          code: Code,
          collection: Collection,
          collectionRow: CollectionRow,
          modal: Modal,
          pdf: Pdf,
          equation: Equation,
        }}
        showCollectionViewDropdown={true}
        // showTableOfContents={true}
        // previewImages={true}
      />
    </div>
  );
}

const notion = new NotionAPI();
export const getStaticProps = async () => {
  // const pageId = context.params.pageId;
  const pageId = "12ee34fde6824900a7cd367792703941";

  const recordMap = await notion.getPage(pageId);
  return {
    props: {
      recordMap,
    },
    revalidate: 10,
  };
};

// export async function getStaticProps() {
//   const data = await fetch(
//     "https://notion-api.splitbee.io/v1/table/12ee34fde6824900a7cd367792703941",
//   ).then((res) => res.json());
//   return {
//     props: {
//       posts: data,
//     },
//   };
// }
