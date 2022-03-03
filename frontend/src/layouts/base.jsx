import { Navbar } from "../components";

export default function BaseLayout({ hasSearch = true, children }) {
  return (
    <>
      <Navbar hasSearch={hasSearch} />
      <div className="mt-3 container">{children}</div>
    </>
  );
}
