import React from "react";
import { useBansosData } from "./DataProvider";

const Preview = () => {
  const { bansosData } = useBansosData();

  console.log(bansosData);
  return <div></div>;
};

export default Preview;
