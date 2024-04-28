import React, { useContext } from "react";

import { authContext } from "../../Context/AuthContext";

const PremiumFeatures = () => {
  const { user } = useContext(authContext);

  console.log(user);
  return <div>PremiumFeatures</div>;
};

export default PremiumFeatures;
