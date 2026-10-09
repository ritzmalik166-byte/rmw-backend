import { cache } from "react";
import HeaderClient from "./HeaderClient";

const Header = async () => {
  // const headerData = await fetchHeaderData();
  return <HeaderClient headerData={[]} />;
};

export default Header;