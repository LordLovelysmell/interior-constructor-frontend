import { FC } from "react";

type LayoutDefaultProps = {
  children: React.ReactNode;
};

const layoutDefault: FC<LayoutDefaultProps> = ({ children }) => {
  return <main>{children}</main>;
};
