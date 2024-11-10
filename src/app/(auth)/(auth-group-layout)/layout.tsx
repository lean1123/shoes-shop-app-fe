import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <h2>Group lay out</h2>
      <h2>Group lay out</h2>
      <h2>Group lay out</h2>
      <h2>Group lay out</h2>
      <h2>Group lay out</h2>
    </div>
  );
};

export default layout;
