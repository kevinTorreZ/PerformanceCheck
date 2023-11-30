import { Card, CardBody } from "@nextui-org/react";
import React from "react";
import docsRight from "../img/docs-right.png";
import bluePurple from "../img/blue-purple-1.svg";
import Greendots from "../img/greenl.png";

export function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-grow items-center justify-center">
      <div className="fixed hidden 3xl:-top-[30%] 3xl:-right-[40%] md:block opacity-100  -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] -z-10 rotate-12">
        <img src={docsRight} />
      </div>
      <div className="fixed hidden 3xl:-bottom-[20%] 3xl:-left-[20%] md:block opacity-100 -bottom-[40%] -left-[20%] -z-10">
        <img src={bluePurple} />
      </div>
      <div className="fixed hidden 3xl:block 3xl:opacity-100 md:block lg:block xs:block dark:opacity-40 -bottom-[20%] left-[20%] -z-10">
        <img src={Greendots} />
      </div>
      <Card className="py-4 px-4 bg-background/100 dark:bg-default-100/30">
        <CardBody>
          <h1 className="mb-4 text-5xl text-center font-bold">404</h1>
          <p className="light:text-gray-600 dark:text-white">
            Oops! La pagina que buscas no esta disponible o  no existe.
          </p>
          <a
            href="/"
            className="mt-4 inline-block rounded bg-blue-500 px-4 py-2 font-semibold text-white text-center hover:bg-blue-600"
          >
            {" "}
            Volver al inicio{" "}
          </a>
        </CardBody>
      </Card>
    </div>
  );
}
