import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bubbleMorado from "../img/bubbles-morado.png";
import docsRight from "../img/docs-right.png";
import bluePurple from "../img/blue-purple-1.svg";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";
import Statscards from "../components/Stats";
import Oval1 from "../img/oval1.png";
import Rocket from "../img/rocket.png";
import bubbles800 from "../img/bubbles800.png";
import Greendots from "../img/greenl.png";
import Snapshots from "../components/Snapshots";
import Feedback from "../components/Feedback";

export function Inicio() {
  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const navigate = useNavigate();
  let timeout;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
    const refreshToken = localStorage.getItem("refreshToken");
    setRefreshToken(refreshToken);
  }, [navigate]);

  return (
    <div>
      <div className="fixed hidden 3xl:-top-[30%] 3xl:-right-[40%] dark:md:block dark:opacity-100 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] -z-10 rotate-12">
        <img src={docsRight} />
      </div>
      <div className="fixed hidden 3xl:-bottom-[20%] 3xl:-left-[20%] dark:md:block dark:opacity-100 -bottom-[40%] -left-[20%] -z-10">
        <img src={bluePurple} />
      </div>
      <div className="fixed hidden dark:3xl:block 3xl:opacity-100 dark:md:block dark:lg:block dark:xs:block dark:opacity-40 -bottom-[20%] left-[20%] -z-10">
        <img src={Greendots} />
      </div>
      <div className="fixed hidden dark:md:block dark:opacity-40 -bottom-[20%] left-[20%] -z-10">
        <img src={bubbles800} />
      </div>
      <section className="heroSection relative">
        <div className="absolute shadow-black/5 opacity-100 shadow-none transition-transform-opacity rounded-large  -z-10">
          <img src={bubbleMorado} />
        </div>
        <div className="flex mt-5 flex-row justify-center align-middle flex-wrap  max-w-[1280px] heroDiv ">
          <div className="max-w-[640px] w-[100%] textsHero flex flex-col justify-center align-middle">
            <h1 className="font-bold text-6xl text-white">Performance Check</h1>
            <p className="text-lg mt-5">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sequi ut
              asperiores, molestiae pariatur dicta incidunt veritatis ipsum
              nesciunt, non error sint excepturi velit. Harum doloremque eius
              quo cupiditate. Atque, modi.
            </p>
            <Button className="mt-8 w-[150px] h-11 text-lg bg-gradient-to-r from-[#5594d6] to-[#d21b9a] font-bold ">
              Ver más
            </Button>
          </div>
          <div className="relative max-w-[640px] w-[100%] imgHero flex justify-center align-middle ">
            <div>
              <Image className="-z-5" src={Oval1} width={500} />
            </div>
            <div className="absolute inset-0 flex justify-center items-center z-10">
              <Image src={Rocket} width={550} />
            </div>
          </div>
        </div>
      </section>
      <section className="globalDiv ">
        <div className=" relative mt-64 flex flex-row py-4 px-2 gap-5 justify-center items-center flex-wrap">
          <div className="absolute lg:opacity-40 shadow-none -z-10 sm:opacity-80">
            <img src={Greendots} />
          </div>
          <Statscards h1="70%" p="Desempeño laboral" duration={500} />
          <Statscards h1="65%" p="Rendimiento de empleados" duration={500} />
          <Statscards h1="70%" p="Satisfacción de empleados" duration={530} />
          <Statscards h1="80%" p="Motivación de empleados" duration={580} />
        </div>
      </section>
      <section className="perfText">
        <h1 className="max-w-[45rem] lg:text-7xl md:text-6xl sm:text-6xl xs:text-5xl text-5xl font-bold text-center">
          Funcionamiento de{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5594d6] to-[#d21b9a]">
            Performance Check
          </span>
        </h1>
      </section>

      <Snapshots />
      <Feedback />
      {/* {token && refreshToken ? <p>Estás logueado.</p> : 
        <p>No estás logueado.</p>}
        */}
    </div>
  );
}
