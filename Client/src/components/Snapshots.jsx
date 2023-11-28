import React from "react";
import { Card, CardBody } from "@nextui-org/react";

const Snapshots = () => {
  return (
    <section className="funcDiv h-[500px] masDiv ">
      <div className="flex flex-col justify-center items-center mt-4">
       
        <h1 className="mt-72 mb-4 text-5xl text-center">
          Solicitud de{" "}
          <span className="bg-clip-text text-transparent text-center bg-gradient-to-b from-[#5EA2EF] to-[#0072F5] text-5xl lg:text-5xl">
            Team Member
          </span>
        </h1>
        <p className="text-center mb-12 max-w-[52rem] text-default-500 text-lg lg:text-xl ">
          Como Team Member tendras acceso a un boton para solicitar un snapshot y otro para ver el reporte de dicho
          snapshot o de snapshots pasados.{" "}
        </p>
        <div className="flex flex-row flex-wrap max-w-[1280px] w-[100%] justify-center items-center gap-4 mb-10">
          <Card
            isBlurred={true}
            className="max-w-[250px] w-[100%] h-[200px] bg-background/100 dark:bg-default-100/30"
          >
            <CardBody className="flex items-center justify-center px-4 py-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                className="bi bi-plus-circle mb-3"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
              </svg>
              <h1 className="text-xl" >Pide un snapshot</h1>
            </CardBody>
          </Card>
          <Card
            isBlurred={true}
            className="max-w-[250px] w-[100%] h-[200px] bg-background/100 dark:bg-default-100/30 "
          >
            <CardBody className="flex items-center px-4 py-4 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                fill="currentColor"
                class="bi bi-file-earmark-text mb-3"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
              </svg>
              <h1 className="text-xl">Revisa tu reporte</h1>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Snapshots;
