import React from "react";

export const ConditionalWrap = ({
  condition,
  children,
  wrap,
}: {
  condition: boolean;
  children: React.ReactNode;
  wrap: (children: React.ReactNode) => React.ReactElement;
}) => (condition ? React.cloneElement(wrap(children)) : children);

export default ConditionalWrap;
