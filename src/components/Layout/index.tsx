import { Outlet } from "react-router-dom";

import HeaderComponent from "../Header-Component/headerComponent";

const Layout = () => {
  return (
    <>
      <HeaderComponent />
      <Outlet />
    </>
  );
};

export default Layout;
