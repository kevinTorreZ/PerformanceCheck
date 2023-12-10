import React, { useState } from "react";
import axios from "axios";
import { Divider, Card, CardBody, Textarea, Button } from "@nextui-org/react";


export function CompletarSnapshot({ handleCancelarClick, info }) {
  const [respuesta1, setRespuesta1] = useState("");
  const [respuesta2, setRespuesta2] = useState("");
  const [respuesta3, setRespuesta3] = useState("");
  const [respuesta4, setRespuesta4] = useState("");
  const [justificacion4, setJustificacion4] = useState("");
  const [respuesta5, setRespuesta5] = useState("");
  const [justificacion5, setJustificacion5] = useState("");
  const [step, setStep] = useState(1);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí puedes manejar las respuestas del formulario
    if (
      !respuesta1 ||
      !respuesta2 ||
      !respuesta3 ||
      !respuesta4 ||
      !justificacion4.trim() ||
      !respuesta5 ||
      !justificacion5.trim()
    ) {
      alert("Por favor, completa todas las respuestas antes de enviar.");
      return;
    }

    const evaluacionInfo = {
      pregunta1: respuesta1,
      pregunta2: respuesta2,
      pregunta3: respuesta3,
      pregunta4: respuesta4,
      justificacion4: justificacion4,
      pregunta5: respuesta5,
      justificacion5: justificacion5,
      Evaluador: info.idLider,
      Evaluado: info.idUserSnap,
      Snapshot: info.idSnapshot,
    };
    try {
      // Realiza la petición POST para crear la evaluación
      const response = await axios.post(
        `http://127.0.0.1:8000/evaluaciones/`,
        evaluacionInfo,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);

      // Realiza la petición GET para obtener los datos actuales del snapshot
      const snapshotResponse = await axios.get(
        `http://127.0.0.1:8000/api/Snapshot/${info.idSnapshot}/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Cambia el campo Estado a 'Completado'
      snapshotResponse.data.Estado = "Completado";
      // Realiza la petición PUT para actualizar el estado del snapshot
      const snapshotUpdate = await axios.put(
        `http://127.0.0.1:8000/api/Snapshot/${info.idSnapshot}/`,
        snapshotResponse.data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(snapshotUpdate.data);
      setStep(step + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center" style={{ margin: "0 auto" }}>
      {step === 1 && (
        <div className="letras flex flex-col justify-center items-center max-w-[80%]">
          <h1 className="text-center mb-4 mt-4 text-2xl">
            Por favor responde estas preguntas para completar el Snapshot
          </h1>
          <Divider className="mb-4" />
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              {/* PREGUNTA 1 */}

              <label>
                <span className="font-bold">
                  1. ¿El profesional demuestra un alto nivel de habilidad en su
                  área de trabajo?
                </span>

                <p className="mt-3 mb-2">
                  Esta pregunta evalúa si el profesional tiene las habilidades
                  necesarias para realizar su trabajo de manera efectiva. Debes
                  pensar en la calidad del trabajo del profesional, su
                  conocimiento técnico y su capacidad para aplicar sus
                  habilidades en situaciones prácticas.
                </p>
                <div
                  className="flex flex-row gap-2 justify-center"
                  onChange={(e) => setRespuesta1(e.target.value)}
                >
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta1 === "totalmenteEnDesacuerdo"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="totalmenteEnDesacuerdo"
                          name="pregunta1"
                          className="w-full  h-full"
                          style={{ display: "none" }}
                        />{" "}
                        Totalmente en desacuerdo
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta1 === "enDesacuerdo"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="enDesacuerdo"
                          name="pregunta1"
                          style={{ display: "none" }}
                        />{" "}
                        En desacuerdo
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta1 === "neutral"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="neutral"
                          name="pregunta1"
                          style={{ display: "none" }}
                        />{" "}
                        Neutral
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta1 === "deAcuerdo"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="deAcuerdo"
                          name="pregunta1"
                          style={{ display: "none" }}
                        />{" "}
                        De acuerdo
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta1 === "totalmenteDeAcuerdo"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="totalmenteDeAcuerdo"
                          name="pregunta1"
                          style={{ display: "none" }}
                        />{" "}
                        Totalmente de acuerdo
                      </label>
                    </CardBody>
                  </Card>
                </div>
              </label>
            </div>
            {/* PREGUNTA 2 */}
            <div style={{ marginBottom: "20px" }}>
              <label>
                <span className="font-bold">
                  2. ¿El profesional respeta y promueve un ambiente de trabajo
                  inclusivo y diverso?
                </span>

                <p className="mt-3 mb-2">
                  Esta pregunta evalúa si el profesional respeta las diferencias
                  y promueve un ambiente de trabajo inclusivo. Debes considerar
                  si el profesional respeta a todos los miembros del equipo
                  independientemente de su origen, género, religión, etc., y si
                  promueve un ambiente de trabajo en el que todos se sientan
                  valorados y aceptados.
                </p>
                <div
                  onChange={(e) => setRespuesta2(e.target.value)}
                  className="flex flex-row gap-2 justify-center"
                >
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta2 === "totalmenteEnDesacuerdo"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="totalmenteEnDesacuerdo"
                          name="pregunta2"
                          style={{ display: "none" }}
                        />{" "}
                        Totalmente en desacuerdo
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta2 === "enDesacuerdo"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="enDesacuerdo"
                          name="pregunta2"
                          style={{ display: "none" }}
                        />{" "}
                        En desacuerdo
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta2 === "neutral"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="neutral"
                          name="pregunta2"
                          style={{ display: "none" }}
                        />{" "}
                        Neutral
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta2 === "deAcuerdo"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="deAcuerdo"
                          name="pregunta2"
                          style={{ display: "none" }}
                        />{" "}
                        De acuerdo
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta2 === "totalmenteDeAcuerdo"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="totalmenteDeAcuerdo"
                          name="pregunta2"
                          style={{ display: "none" }}
                        />{" "}
                        Totalmente de acuerdo
                      </label>
                    </CardBody>
                  </Card>
                </div>
              </label>
            </div>
            {/* PREGUNTA 3 */}
            <div style={{ marginBottom: "20px" }}>
              <label>
                <span className="font-bold">
                  3. ¿El profesional se comunica de manera efectiva con los
                  demás?
                </span>

                <p className="mt-3 mb-2">
                  Esta pregunta evalúa si el profesional se comunica de manera
                  clara y efectiva. Debes pensar en cómo el profesional se
                  comunica con los demás, si sus mensajes son claros y
                  comprensibles, y si escucha y responde adecuadamente a los
                  demás.
                </p>
                <div
                  onChange={(e) => setRespuesta3(e.target.value)}
                  className="flex flex-row gap-2 justify-center"
                >
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta3 === "totalmenteEnDesacuerdo"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="totalmenteEnDesacuerdo"
                          name="pregunta2"
                          style={{ display: "none" }}
                        />{" "}
                        Totalmente en desacuerdo
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta3 === "enDesacuerdo"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="enDesacuerdo"
                          name="pregunta2"
                          style={{ display: "none" }}
                        />{" "}
                        En desacuerdo
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta3 === "neutral"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="neutral"
                          name="pregunta2"
                          style={{ display: "none" }}
                        />{" "}
                        Neutral
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta3 === "deAcuerdo"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="deAcuerdo"
                          name="pregunta2"
                          style={{ display: "none" }}
                        />{" "}
                        De acuerdo
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta3 === "totalmenteDeAcuerdo"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="totalmenteDeAcuerdo"
                          name="pregunta2"
                          style={{ display: "none" }}
                        />{" "}
                        Totalmente de acuerdo
                      </label>
                    </CardBody>
                  </Card>
                </div>
              </label>
            </div>
            {/* PREGUNTA 4 */}
            <div style={{ marginBottom: "20px" }}>
              <label>
                <span className="font-bold">
                  4. Considerando su desempeño, ¿Esta persona está en riesgo de
                  tener un bajo desempeño?
                </span>

                <p className="mt-3 mb-2">
                  Esta pregunta evalúa si crees que el profesional podría tener
                  un rendimiento bajo en el futuro. Debes considerar el
                  rendimiento pasado del profesional, su motivación, su
                  capacidad para manejar el estrés y cualquier otro factor que
                  pueda afectar su rendimiento.
                </p>
                <div
                  onChange={(e) => setRespuesta4(e.target.value)}
                  className="flex flex-row gap-2 justify-center"
                >
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta4 === "si"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="si"
                          name="pregunta4"
                          style={{ display: "none" }}
                        />{" "}
                        Sí
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta4 === "no"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="no"
                          name="pregunta4"
                          style={{ display: "none" }}
                        />{" "}
                        No
                      </label>
                    </CardBody>
                  </Card>
                </div>
                <p className="font-bold  mt-10  mb-2">
                  Justifica la respuesta que seleccionaste para esta pregunta
                </p>
                <Textarea
                  style={{ width: "100%", padding: "10px" }}
                  value={justificacion4}
                  onChange={(e) => setJustificacion4(e.target.value)}
                />
              </label>
            </div>
            {/* PREGUNTA 5 */}
            <div style={{ marginBottom: "20px" }}>
              <label>
                <span className="font-bold">
                  5. Considerando su desempeño, ¿Esta persona podría desempeñar
                  efectivamente la responsabilidades del siguiente nivel?
                </span>

                <p className="mt-3 mb-2">
                  Esta pregunta evalúa si crees que el profesional está listo
                  para asumir más responsabilidades. Debes pensar en el
                  rendimiento actual del profesional, su capacidad para manejar
                  responsabilidades adicionales y su potencial para crecer y
                  aprender.
                </p>
                <div
                  onChange={(e) => setRespuesta5(e.target.value)}
                  className="flex flex-row gap-2 justify-center"
                >
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta5 === "si"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="si"
                          name="pregunta4"
                          style={{ display: "none" }}
                        />{" "}
                        Sí
                      </label>
                    </CardBody>
                  </Card>
                  <Card isPressable={true}>
                    <CardBody
                      className="max-w-[150px] w-[150px] max-h-[150px] h-[150px] justify-center text-center"
                      style={
                        respuesta5 === "no"
                          ? {
                              backgroundColor: "green",
                              color: "white",
                            }
                          : {}
                      }
                    >
                      <label className="h-full flex justify-center items-center">
                        <input
                          type="radio"
                          value="no"
                          name="pregunta4"
                          style={{ display: "none" }}
                        />{" "}
                        No
                      </label>
                    </CardBody>
                  </Card>
                </div>
                <p className="font-bold mt-10 mb-2">
                  Justifica la respuesta que seleccionaste para esta pregunta
                </p>
                <Textarea
                  style={{ width: "100%", padding: "10px" }}
                  value={justificacion5}
                  onChange={(e) => setJustificacion5(e.target.value)}
                />
              </label>
            </div>
            <Button
              color="success"
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              type="submit"
              id="btnCompletar"
            >
              Completar Snapshot
            </Button>
            <Button
              color="danger"
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                marginTop: "10px",
              }}
              type="button"
              onClick={() => handleCancelarClick(false)}
              id="btnCancelar"
            >
              Cancelar
            </Button>
          </form>
        </div>
      )}
      {step === 2 && (
        <div className="max-w-[500px] max-h-[400px] w-[500px] h-[400px] flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-20">¡Gracias por completar el Snapshot!</h1>
          <Button
            color="success"
            className="font-bold"
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              marginTop: "10px",
            }}
            onClick={() => handleCancelarClick(false)}
            id="btnCancelar"
          >
            Volver
          </Button>
        </div>
      )}
    </div>
  );
}
