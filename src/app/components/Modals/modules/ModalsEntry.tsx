"use client";

import { FunctionComponent, JSX, useContext } from "react";
import { ModalContext } from "@/app/providers";
import Success from "./Success";
import Error from "./Error";

const ModalsEntry: FunctionComponent<{ dict: any; lang: string }> = ({
  dict,
  lang,
}): JSX.Element => {
  const context = useContext(ModalContext);
  return (
    <>
      {context?.success && <Success lang={lang} dict={dict} />}
      {context?.error && <Error lang={lang} dict={dict} />}
    </>
  );
};

export default ModalsEntry;
