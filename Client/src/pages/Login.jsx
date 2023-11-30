import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/verificador";
import { BuscarUsuarioForId } from "../api/UserManagerAPI";
import { Button, Card, CardBody, Divider, Image, Input } from "@nextui-org/react";
import { MailIcon } from "../assets/MailIcon";
import { EyeFilledIcon } from "../assets/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../assets/EyeSlashFilledIcon";
import docsRight from "../img/docs-right.png";
import bluePurple from "../img/blue-purple-1.svg";
import Greendots from "../img/greenl.png";
import analyticsGif from "../img/tecnico.gif"

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      navigate("/");
    }
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/token/",
        data
      );
      const tokens = response.data;
      login(tokens.access, tokens.refresh, tokens.user);
      const userObjt = await BuscarUsuarioForId();
      if (userObjt && userObjt.Cargo) {
        localStorage.setItem("refreshToken", tokens.refresh);
        localStorage.setItem("UserData", userObjt.Cargo);
        window.location.href = "/";
      } else {
        throw new Error("No se pudo obtener el cargo del usuario");
      }
    } catch (error) {
      toast.error("Contraseña o correo inválido!");
    }
  };

  return (
    <div className="formCenter h-[80vh]  w-full flex  items-center">
      <div className="fixed hidden 3xl:-top-[30%] 3xl:-right-[40%] md:block opacity-100  -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] -z-10 rotate-12">
        <img src={docsRight} />
      </div>
      <div className="fixed hidden 3xl:-bottom-[20%] 3xl:-left-[20%] md:block opacity-100 -bottom-[40%] -left-[20%] -z-10">
        <img src={bluePurple} />
      </div>
      <div className="fixed hidden 3xl:block 3xl:opacity-100 md:block lg:block xs:block dark:opacity-40 -bottom-[20%] left-[20%] -z-10">
        <img src={Greendots} />
      </div>
      <Card isBlurred={true} shadow="lg" fullWidth={true} className="bg-background/100 dark:bg-default-100/40 h-[400px]">
        <CardBody className="flex flex-row">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center py-2 px-2 w-[50%] justify-center"
            id="formularioLogin"
          >
            <h1 className="text-3xl text-center">Bienvenido a <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5594d6] to-[#d21b9a]">Performance Check</span></h1>
            <Input
              type="email"
              {...register("email", { required: "El correo es requerido" })}
              //   onInput={() => (document.getElementById("ErrorLogin").innerHTML = "")}
              labelPlacement="inside"
              label="Email"
              placeholder="Ingresa tu correo"
              className="mt-4 bg-transparent"
              startContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
            />
            {errors.email?.message && <p>{errors.email.message}</p>}
            <Input
              {...register("password", {
                required: "La contraseña es requerida",
              })}
              //   onInput={() => (document.getElementById("ErrorLogin").innerHTML = "")}
              labelPlacement="inside"
              label="Pasword"
              placeholder="Ingresa tu contraseña"
              className="mt-4"
              color=""
             
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
            {errors.password?.message && <p>{errors.password.message}</p>}
            <Button className="w-[100%] max-w-[200px] mt-4" type="submit">
              Iniciar sesión
            </Button>
          </form>
          <Divider orientation="vertical"/>
          <div className="w-[50%] flex flex-col align-middle items-center py-2 px-2">
            <Image
            src={analyticsGif}
            width="300px"
            />
            <h1 className="text-center text-lg">Incrementa el rendimiento de tus proyectos con Performance Check</h1>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
