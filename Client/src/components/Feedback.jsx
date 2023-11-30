import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Card} from "@nextui-org/react";

const Feedback = () => {
  return (
    <section className="funcDiv">
      <div className="flex flex-col justify-center items-center mt-40">
        <h1 className="mt-72 mb-4 text-5xl text-center">
          Solicitud de{" "}
          <span className="bg-clip-text text-transparent text-center bg-gradient-to-b from-[#d25eef] to-[#f500f5] text-5xl lg:text-5xl">
            Desempeño
          </span>
        </h1>
        <p className="text-center mb-12 max-w-[52rem] text-default-500 text-lg lg:text-xl ">
          La solicitud de desempeño se utiliza para capturar la evaluación de
          el/la líder de equipo sobre el desempeño mostrado por el/la miembro de
          equipo en las responsabilidades de su cargo.{" "}
        </p>
        <div className="flex flex-row flex-wrap max-w-[1280px] w-[100%] justify-center items-center gap-4 mb-10">
          <div>
            <h2 className="text-center mb-2">Asigna una fecha para tu snapshot</h2>
            <Card
              isBlurred={true}
              className="max-w-[330px] bg-background/100 dark:bg-default-100/30"
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateCalendar", "DateCalendar"]}>
                  <DateCalendar
                    className="calendarClass"
                    defaultValue={dayjs("2023-11-21")}
                    readOnly
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
