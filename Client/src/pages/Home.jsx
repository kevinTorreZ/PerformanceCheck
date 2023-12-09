import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bubbleMorado from "../img/bubbles-morado.png";
import docsRight from "../img/docs-right.png";
import bluePurple from "../img/blue-purple-1.svg";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Divider,
  Listbox,
  ListboxSection,
  ListboxItem,
  User,
  Tabs,
  Tab,
} from "@nextui-org/react";
import jwt_decode from "jwt-decode";
import { Snapshosts } from "./Snpashots";
import LineaTiempo from "./LineaTiempo";



export function HomeUsuario() {
  const [user, setUser] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.user_id;

      axios
        .get(`http://localhost:8000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {});
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className=" flex flex-col items-center mb-10">
      <h1 className="text-center text-4xl mt-10 mb-10 ">
        Perfil de{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5594d6] to-[#d21b9a]">
          usuario
        </span>
      </h1>
      <div className="fixed hidden 3xl:-top-[30%] 3xl:-right-[40%] md:block opacity-100  -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] -z-10 rotate-12">
        <img src={docsRight} />
      </div>
      <div className="fixed hidden 3xl:-bottom-[20%] 3xl:-left-[20%] md:block opacity-100 -bottom-[40%] -left-[20%] -z-10">
        <img src={bluePurple} />
      </div>

      <Card
        className="homeMain max-w-[1280px] w-[100%] h-[660px] py-5 px-5 mb-10 mt-10"
        shadow="lg"
      >
        <CardBody className="homeMain max-w-[1280px] w-[100%] overflow-hidden">
          <section className="flex flex-col max-w-[1280px] w-[100%] max-h-[700px] h-[700px]">
            <Tabs className="max-w-[1280px] w-[100%]  justify-center">
              <Tab key="Perfil" title="Perfil">
                <Card
                  className="w-full bg-background/0 dark:bg-default-100/0"
                  shadow="none"
                >
                  <CardBody>
                    <div className="flex flex-col items-center h-full w-full">
                      <Card
                        className="h-[100px] w-[80%] mt-2 py-2 px-2 border-gray-800 border-1 bg-background/0 dark:bg-default-100/0"
                        shadow="sm"
                      >
                        <CardBody className="flex justify-start items-start letras">
                          {user && (
                            <User
                              size="sm"
                              name={user.Nombre}
                              description={user.Cargo}
                              classNames={{
                                name: "nameUser",
                                description: "descUser",
                              }}
                              avatarProps={{
                                src: "https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/06/29/5fa91c5e49c91.jpeg",
                                size: "lg",
                              }}
                            />
                          )}
                        </CardBody>
                      </Card>
                      <Card
                        className="h-[auto] w-[80%] mt-2 py-2 px-2 border-gray-800 border-1 bg-background/0 dark:bg-default-100/0"
                        shadow="sm"
                      >
                        {user && (
                          <CardBody className="flex justify-start items-start letras">
                            <h1 className="text-lg">Información personal</h1>
                            <div className="flex flex-row h-full w-full ">
                              <section className="h-full w-[300px] ">
                                <h1 className="text-lg mt-3 descletras">
                                  Primer nombre:{" "}
                                </h1>
                                <h1 className="text-lg descletras">Correo: </h1>
                                <h1 className="text-lg descletras">Rut: </h1>
                                <h1 className="text-lg descletras">Cargo: </h1>
                              </section>
                              <section className="w-full">
                                <h1 className="text-lg mt-3 descletras">
                                  {user.Nombre}
                                </h1>
                                <h1 className="text-lg descletras">
                                  {user.email}
                                </h1>
                                <h1 className="text-lg descletras">
                                  {user.Rut}
                                </h1>
                                <h1 className="text-lg descletras">
                                  {user.Cargo}
                                </h1>
                              </section>
                            </div>
                          </CardBody>
                        )}
                      </Card>
                      <Card
                        className="h-[auto] w-[80%] mt-2 py-2 px-2 border-gray-800 border-1 bg-background/0 dark:bg-default-100/0"
                        shadow="sm"
                      >
                        {user && (
                          <CardBody className="flex justify-start items-start letras">
                            <h1 className="text-lg">Información proyecto</h1>
                            <div className="flex flex-row h-full w-full ">
                              <section className="h-full w-[300px] ">
                                <h1 className="text-lg mt-3 descletras">
                                  Proyecto asignado:{" "}
                                </h1>
                                <h1 className="text-lg descletras">
                                  Equipo asignado:{" "}
                                </h1>
                              </section>
                              <section className="w-full">
                                <h1 className="text-lg mt-3 descletras"></h1>
                                <h1 className="text-lg descletras"></h1>
                              </section>
                            </div>
                          </CardBody>
                        )}
                      </Card>
                    </div>
                  </CardBody>
                </Card>
              </Tab>
              <Tab key="LineaTiempo" title="Linea de tiempo">
                <LineaTiempo/>
              </Tab>
              <Tab
                key="Snapshot"
                title="Crear snapshot"
                className="justify-center items-center flex flex-col"
              >
                
                <div className="w-full h-full justify-center items-center flex flex-row flex-wrap ">
                  <Snapshosts/>
                </div>
              </Tab>
            </Tabs>
          </section>
        </CardBody>
      </Card>
    </div>
  );
}
