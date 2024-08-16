import "@/styles/globals.css";
import "@/styles/theme.css";
import "primeflex/primeflex.css";
//core
import "primereact/resources/primereact.min.css";
//icons
import "primeicons/primeicons.css";
import { PagesProgressBar } from "next-nprogress-bar";
import Navbar from "@/Components/navegacion/Navbar";
export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <PagesProgressBar
        options={{
          showSpinner: true,
        }}
        shallowRouting
        color="var(--primary-color)"
      />
      <Component {...pageProps} />
    </>
  );
}
