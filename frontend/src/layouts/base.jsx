import { Navbar } from "../components";
import AppFooter from "../components/footer";
<<<<<<< HEAD

export default function BaseLayout({
  hasSearch = true,
  hasFooter = false,
  children,
}) {
=======
// import "./base.css";
// export default function BaseLayout({ hasSearch = true, children }) {
  export default function BaseLayout({
    hasSearch = true,
    hasFooter = false,
    children,
  }) {
>>>>>>> origin/main
  return (
    <>
      <Navbar hasSearch={hasSearch} />
      <div className="mt-3 container">{children}</div>
<<<<<<< HEAD
=======
      {/* <AppFooter/> */}
>>>>>>> origin/main
      {hasFooter && <AppFooter />}
    </>
  );
}
