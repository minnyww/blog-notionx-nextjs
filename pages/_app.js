import "../styles/globals.css";

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-coy.css";

// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'

// used for collection views selector (optional)
// TODO: re-add if we enable collection view dropdowns
// import 'rc-dropdown/assets/index.css'

// used for rendering equations (optional)
import "katex/dist/katex.min.css";

// core styles for static tweet renderer (optional)

// global style overrides for notion
// import "styles/notion.css";

// global style overrides for prism theme (optional)

// here we're bringing in any languages we want to support for
// syntax highlighting via Notion's Code block

// import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* <Head>
        <meta
          name="theme-color"
          content={"#ecd96f"}
          // media="(prefers-color-scheme: dark)"
        />
      </Head> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
