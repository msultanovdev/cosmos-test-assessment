import { FC } from "react";
import cl from "./Container.module.css";

interface IContainerProps {
  children: JSX.Element;
}

const Container: FC<IContainerProps> = ({ children }) => {
  return <div className={cl.container}>{children}</div>;
};

export default Container;
