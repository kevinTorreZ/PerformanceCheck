import React, { useState } from 'react';

export function CompletarSnapshot({ handleCancelarClick,info }) {
    const [respuesta1, setRespuesta1] = useState('');
    const [respuesta2, setRespuesta2] = useState('');
    const [respuesta3, setRespuesta3] = useState('');
    const [respuesta4, setRespuesta4] = useState('');
    const [justificacion4, setJustificacion4] = useState('');
    const [respuesta5, setRespuesta5] = useState('');
    const [justificacion5, setJustificacion5] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Aquí puedes manejar las respuestas del formulario
        if (!respuesta1 || !respuesta2 || !respuesta3 || !respuesta4 || !justificacion4.trim() || !respuesta5 || !justificacion5.trim()) {
            alert('Por favor, completa todas las respuestas antes de enviar.');
            return;
        }
        console.log(respuesta1, respuesta2, respuesta3, respuesta4,justificacion4,respuesta5,justificacion5,info);
    };

    return (
        <div style={{width: '50%', margin: '0 auto', fontFamily: 'Arial'}}>
            <h1 style={{textAlign: 'center'}}>Por favor responde estas preguntas para completar el Snapshot</h1>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '20px'}}>
                    <label>
                        1. ¿El profesional demuestra un alto nivel de habilidad en su área de trabajo?
                        <p>Esta pregunta evalúa si el profesional tiene las habilidades necesarias para realizar su trabajo de manera efectiva. Debes pensar en la calidad del trabajo del profesional, su conocimiento técnico y su capacidad para aplicar sus habilidades en situaciones prácticas.</p>
                        <div onChange={(e) => setRespuesta1(e.target.value)}>
                            <label style={respuesta1 === 'totalmenteEnDesacuerdo' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="totalmenteEnDesacuerdo" name="pregunta1" style={{display: 'none'}} /> Totalmente en desacuerdo</label>
                            <label style={respuesta1 === 'enDesacuerdo' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="enDesacuerdo" name="pregunta1" style={{display: 'none'}} /> En desacuerdo</label>
                            <label style={respuesta1 === 'neutral' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="neutral" name="pregunta1" style={{display: 'none'}} /> Neutral</label>
                            <label style={respuesta1 === 'deAcuerdo' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="deAcuerdo" name="pregunta1" style={{display: 'none'}} /> De acuerdo</label>
                            <label style={respuesta1 === 'totalmenteDeAcuerdo' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="totalmenteDeAcuerdo" name="pregunta1" style={{display: 'none'}} /> Totalmente de acuerdo</label>
                        </div>
                    </label>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <label>
                        2. ¿El profesional respeta y promueve un ambiente de trabajo inclusivo y diverso?
                        <p>Esta pregunta evalúa si el profesional respeta las diferencias y promueve un ambiente de trabajo inclusivo. Debes considerar si el profesional respeta a todos los miembros del equipo independientemente de su origen, género, religión, etc., y si promueve un ambiente de trabajo en el que todos se sientan valorados y aceptados.</p>
                        <div onChange={(e) => setRespuesta2(e.target.value)}>
                            <label style={respuesta2 === 'totalmenteEnDesacuerdo' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="totalmenteEnDesacuerdo" name="pregunta2" style={{display: 'none'}} /> Totalmente en desacuerdo</label>
                            <label style={respuesta2 === 'enDesacuerdo' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="enDesacuerdo" name="pregunta2" style={{display: 'none'}} /> En desacuerdo</label>
                            <label style={respuesta2 === 'neutral' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="neutral" name="pregunta2" style={{display: 'none'}} /> Neutral</label>
                            <label style={respuesta2 === 'deAcuerdo' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="deAcuerdo" name="pregunta2" style={{display: 'none'}} /> De acuerdo</label>
                            <label style={respuesta2 === 'totalmenteDeAcuerdo' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="totalmenteDeAcuerdo" name="pregunta2" style={{display: 'none'}} /> Totalmente de acuerdo</label>
                        </div>
                    </label>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <label>
                        3. ¿El profesional se comunica de manera efectiva con los demás?
                        <p>Esta pregunta evalúa si el profesional se comunica de manera clara y efectiva. Debes pensar en cómo el profesional se comunica con los demás, si sus mensajes son claros y comprensibles, y si escucha y responde adecuadamente a los demás.</p>
                        <div onChange={(e) => setRespuesta3(e.target.value)}>
                            <label style={respuesta3 === 'totalmenteEnDesacuerdo' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="totalmenteEnDesacuerdo" name="pregunta2" style={{display: 'none'}} /> Totalmente en desacuerdo</label>
                            <label style={respuesta3 === 'enDesacuerdo' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="enDesacuerdo" name="pregunta2" style={{display: 'none'}} /> En desacuerdo</label>
                            <label style={respuesta3 === 'neutral' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="neutral" name="pregunta2" style={{display: 'none'}} /> Neutral</label>
                            <label style={respuesta3 === 'deAcuerdo' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="deAcuerdo" name="pregunta2" style={{display: 'none'}} /> De acuerdo</label>
                            <label style={respuesta3 === 'totalmenteDeAcuerdo' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="totalmenteDeAcuerdo" name="pregunta2" style={{display: 'none'}} /> Totalmente de acuerdo</label>
                        </div>
                    </label>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <label>
                        4. Considerando su desempeño, ¿Esta persona está en riesgo de tener un bajo desempeño?
                        <p>Esta pregunta evalúa si crees que el profesional podría tener un rendimiento bajo en el futuro. Debes considerar el rendimiento pasado del profesional, su motivación, su capacidad para manejar el estrés y cualquier otro factor que pueda afectar su rendimiento.</p>
                        <div onChange={(e) => setRespuesta4(e.target.value)}>
                            <label style={respuesta4 === 'si' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="si" name="pregunta4" style={{display: 'none'}} /> Sí</label>
                            <label style={respuesta4 === 'no' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="no" name="pregunta4" style={{display: 'none'}} /> No</label>
                        </div>
                        <p>Justifica la respuesta que seleccionaste para esta pregunta</p>
                        <textarea style={{width: '100%', padding: '10px'}} value={justificacion4} onChange={(e) => setJustificacion4(e.target.value)} />
                    </label>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <label>
                        5. Considerando su desempeño, ¿Esta persona podría desempeñar efectivamente la responsabilidades del siguiente nivel?
                        <p>Esta pregunta evalúa si crees que el profesional está listo para asumir más responsabilidades. Debes pensar en el rendimiento actual del profesional, su capacidad para manejar responsabilidades adicionales y su potencial para crecer y aprender.</p>
                        <div onChange={(e) => setRespuesta5(e.target.value)}>
                            <label style={respuesta5 === 'si' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="si" name="pregunta4" style={{display: 'none'}} /> Sí</label>
                            <label style={respuesta5 === 'no' ? {textDecoration: 'underline', textDecorationColor: 'green'} : {}}><input type="radio" value="no" name="pregunta4" style={{display: 'none'}} /> No</label>
                        </div>
                        <p>Justifica la respuesta que seleccionaste para esta pregunta</p>
                        <textarea style={{width: '100%', padding: '10px'}} value={justificacion5} onChange={(e) => setJustificacion5(e.target.value)} />
                    </label>
                </div>
                <button style={{display: 'block', width: '100%', padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'}} type="submit">Completar Snapshot</button>
                <button style={{display: 'block', width: '100%', padding: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px'}} type="button" onClick={() => handleCancelarClick(false)}>Cancelar</button>
            </form>
        </div>
    );
}
