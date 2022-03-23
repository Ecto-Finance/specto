import React, { useState } from "react";
import { usePingQuery } from "generated/graphql";

function Ping() {
  const { data, loading } = usePingQuery();
  console.log(data);
  if (loading || !data) return <div>loading...</div>;

  return <></>;
}

export default Ping;
