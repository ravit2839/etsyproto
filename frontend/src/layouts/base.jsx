import { Navbar } from "../components";
import AppFooter from "../components/footer";
// import "./base.css";
// export default function BaseLayout({ hasSearch = true, children }) {
  export default function BaseLayout({
    hasSearch = true,
    hasFooter = false,
    children,
  }) {
  return (
    <>
      <Navbar hasSearch={hasSearch} />
      <div className="mt-3 container">{children}</div>
      {/* <AppFooter/> */}
      {hasFooter && <AppFooter />}
    </>
  );
}
