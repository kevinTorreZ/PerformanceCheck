import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useAuth } from "./verificador";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/LOGO.png";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Image,
  Switch,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import { MoonIcon } from "../assets/MoonIcon";
import { SunIcon } from "../assets/SunIcon";
import { useTheme } from "next-themes";

export function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const [rol, setRol] = useState("");
  const Navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const handleLogout = () => {
    Navigate("/Logout");
  };

  const [checked, setChecked] = useState(
    Cookies.get("checked") === "true" ? true : false
  );

  const toggleTheme = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    Cookies.set("checked", newChecked.toString());
    if (newChecked) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem("token");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.user_id;

      axios
        .get(`http://localhost:8000/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setRol(response.data.Cargo);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            Navigate("/Logout");
          }
        });
    } else {
      setRol("");
    }
  }, [isLoggedIn]);

  useEffect(() => {
    const intervalo = setInterval(async () => {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      if (token) {
        try {
          const decodedToken = jwt_decode(token);
          const dateNow = new Date();
          if (
            decodedToken.exp < dateNow.getTime() / 2000 ||
            dateNow.getTime() - decodedToken.iat > 86400
          ) {
            try {
              const response = await fetch(
                "http://127.0.0.1:8000/api/token/refresh/",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ refresh: refreshToken }),
                }
              );
              if (response.ok) {
                const data = await response.json();
                localStorage.setItem("token", data.access);
              } else {
                console.error("Error al refrescar el token");
              }
            } catch (error) {
              console.error("Error al refrescar el token", error);
            }
          }
        } catch (error) {
          console.error("Error al decodificar el token", error);
        }
      }
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = ["Inicio", "Login", "Perfil"];
  return (
    <div>
      <Navbar
        className="bg-inherit"
        position="static"
        shouldHideOnScroll
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
      >
        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Cerrar menu" : "Abrir menu"}
          />
        </NavbarContent>
        <NavbarContent className="sm:hidden pr-3" justify="center">
          <NavbarBrand>
            <p className="font-bold text-inherit">Performance Check</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <NavbarBrand>
            <Link href="/">
              <Image width={80} src={Logo} />
            </Link>
          </NavbarBrand>
          <NavbarItem>
            <Switch
              defaultSelected={checked}
              onChange={toggleTheme}
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <SunIcon className={className} />
                ) : (
                  <MoonIcon className={className} />
                )
              }
            />
          </NavbarItem>
          {isLoggedIn && rol === "Lider" && (
            <NavbarItem>
              <Link href={"/SolicitudGrupal"}>Solitud Grupal</Link>
            </NavbarItem>
          )}
          {isLoggedIn && rol === "Administrador" && (
            <NavbarItem>
              <Link color="foreground" href={"/GestionUsuarios"}>
                Gestionar Usuarios
              </Link>
            </NavbarItem>
          )}
          {isLoggedIn && rol === "Administrador" && (
            <NavbarItem>
              <Link color="foreground" href={"/GestionProyectos"}>
                Gestionar Proyectos
              </Link>
            </NavbarItem>
          )}
          {isLoggedIn ? (
            rol === "Lider" || rol === "Miembro" ? (
              <NavbarItem>
                <Link color="foreground" href={"/Home"}>
                  Inicio
                </Link>
              </NavbarItem>
            ) : (
              <NavbarItem>
                <Link color="foreground" href={"/"}>
                  Inicio
                </Link>
              </NavbarItem>
            )
          ) : (
            <NavbarItem>
              <Link color="foreground" href={"/"}>
                Inicio
              </Link>
            </NavbarItem>
          )}
          <NavbarItem>
            {isLoggedIn ? (
              <Link color="foreground" href={"/logout"} onClick={handleLogout}>
                Salir
              </Link>
            ) : (
              <Link color="foreground" href={"/login"} onClick={handleLogout}>
                Login
              </Link>
            )}
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </div>
  );
}
