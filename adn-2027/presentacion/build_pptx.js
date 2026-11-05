// Genera ADN-2027-Oficinas.pptx (12 diapositivas, 16:9 ancho).
// Uso: node build_pptx.js   (requiere: npm install pptxgenjs)
const pptxgen = require("pptxgenjs");
const path = require("path");

const NAVY = "0D1B2E";
const NAVY2 = "0F2240";
const GOLD = "C9A227";
const GOLD2 = "E8BC3A";
const WHITE = "FFFFFF";
const LIGHT = "D4E4F7";
const FONT = "Arial";

const pres = new pptxgen();
pres.layout = "LAYOUT_WIDE"; // 13.33 x 7.5 in
pres.author = "Rudy Morales · Team Rudy";
pres.title = "ADN 2027 · Casa Propia";

function base(tag, title, notes) {
  const s = pres.addSlide();
  s.background = { color: NAVY };
  if (tag) {
    s.addText(tag.toUpperCase(), {
      x: 0.7, y: 0.55, w: 4.2, h: 0.42, fontFace: FONT, fontSize: 12, bold: true,
      color: NAVY, fill: { color: GOLD }, align: "center", valign: "middle",
      charSpacing: 2, isTextBox: true,
    });
  }
  if (title) {
    s.addText(title, {
      x: 0.7, y: 1.15, w: 11.9, h: 1.0, fontFace: FONT, fontSize: 36, bold: true,
      color: WHITE, valign: "middle", isTextBox: true,
    });
  }
  if (notes) s.addNotes(notes);
  return s;
}

function card(s, x, y, w, h) {
  s.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, rectRadius: 0.12,
    fill: { color: WHITE, transparency: 94 },
    line: { color: GOLD, width: 1 },
  });
}

function bullets(s, items, x, y, w, h, size = 19) {
  s.addText(
    items.map((text, i) => ({
      text,
      options: { bullet: true, breakLine: i < items.length - 1 },
    })),
    {
      x, y, w, h, fontFace: FONT, fontSize: size, color: LIGHT, valign: "top",
      paraSpaceAfter: 10, isTextBox: true,
    }
  );
}

function quote(s, text, y = 5.6) {
  s.addText(text, {
    x: 0.7, y, w: 11.9, h: 0.9, fontFace: FONT, fontSize: 24, italic: true, bold: true,
    color: GOLD2, valign: "middle", isTextBox: true,
  });
}

function steps(s, items, y0, rowH = 0.95) {
  items.forEach((t, i) => {
    const y = y0 + i * rowH;
    card(s, 0.7, y, 11.9, rowH - 0.2);
    s.addShape(pres.ShapeType.ellipse, {
      x: 0.95, y: y + (rowH - 0.2) / 2 - 0.3, w: 0.6, h: 0.6,
      fill: { color: GOLD }, line: { color: GOLD, width: 0 },
    });
    s.addText(String(i + 1), {
      x: 0.95, y: y + (rowH - 0.2) / 2 - 0.3, w: 0.6, h: 0.6, fontFace: FONT,
      fontSize: 18, bold: true, color: NAVY, align: "center", valign: "middle", margin: 0, isTextBox: true,
    });
    s.addText(t, {
      x: 1.85, y, w: 10.5, h: rowH - 0.2, fontFace: FONT, fontSize: 17, color: LIGHT,
      valign: "middle", isTextBox: true,
    });
  });
}

function table(s, header, rows, y = 2.4) {
  const head = header.map((t) => ({
    text: t, options: { bold: true, color: GOLD, fill: { color: NAVY2 }, fontSize: 13, charSpacing: 1 },
  }));
  const body = rows.map((r) =>
    r.map((c, j) => ({
      text: c,
      options: { color: j === 0 ? LIGHT : WHITE, bold: j > 0, fontSize: j > 0 ? 20 : 16 },
    }))
  );
  s.addTable([head, ...body], {
    x: 0.7, y, w: 11.9, fontFace: FONT,
    colW: header.length === 3 ? [4.3, 3.0, 4.6] : [5.0, 2.3, 2.3, 2.3],
    rowH: 0.52,
    border: { type: "solid", pt: 0.75, color: "5A4A1A" },
    valign: "middle",
  });
}

// 1. PORTADA
{
  const s = pres.addSlide();
  s.background = { color: NAVY };
  s.addText("TEAM RUDY · CASA PROPIA REALTY", {
    x: 0.7, y: 1.2, w: 5.6, h: 0.45, fontFace: FONT, fontSize: 12, bold: true,
    color: NAVY, fill: { color: GOLD }, align: "center", valign: "middle", isTextBox: true,
  });
  s.addText([
    { text: "ADN ", options: { color: WHITE } },
    { text: "2027", options: { color: GOLD } },
  ], { x: 0.7, y: 2.0, w: 11.9, h: 1.7, fontFace: FONT, fontSize: 80, bold: true, isTextBox: true });
  s.addText("Cómo nos organizamos como asesores para tener casa propia, cerrar más y construir una marca personal que trabaje por nosotros.", {
    x: 0.7, y: 3.9, w: 10.5, h: 1.2, fontFace: FONT, fontSize: 20, color: LIGHT, isTextBox: true,
  });
  s.addText("APRENDE · ACTÚA · CRECE · VUELA MÁS ALTO", {
    x: 0.7, y: 5.8, w: 11.9, h: 0.5, fontFace: FONT, fontSize: 13, bold: true, color: GOLD, charSpacing: 2, isTextBox: true,
  });
  s.addNotes(
    "Bienvenida. Presentar el objetivo: hoy salimos con un plan para 2027, con metas, contenido y una forma de medirnos. " +
    "Tiempo sugerido: 1 minuto. Preguntar quién ya tiene un plan escrito para el próximo año."
  );
}

// 2. PROPÓSITO
{
  const s = base("01 · Propósito", null,
    "Por qué 2027 tiene que ser distinto. Todos tenemos las mismas 24 horas; la diferencia está en tener un plan, medirlo y ajustarlo cada mes. " +
    "Las cifras son un ejemplo: 21 ventas, 68 alquileres y 70 captaciones al año, calculadas con un ingreso neto de $2.500 al mes. Cada asesor pone sus propios números.");
  s.addText([
    { text: "Por qué ", options: { color: WHITE } },
    { text: "2027", options: { color: GOLD } },
    { text: " tiene que ser distinto", options: { color: WHITE } },
  ], { x: 0.7, y: 1.15, w: 11.9, h: 1.0, fontFace: FONT, fontSize: 36, bold: true, valign: "middle", isTextBox: true });
  s.addText("Todos tenemos las mismas 24 horas. La diferencia está en tener un plan, medirlo y ajustarlo cada mes.", {
    x: 0.7, y: 2.2, w: 11.9, h: 0.8, fontFace: FONT, fontSize: 18, color: LIGHT, isTextBox: true,
  });
  [
    ["21", "Ventas al año"],
    ["68", "Alquileres al año"],
    ["70", "Captaciones propias"],
  ].forEach(([n, t], i) => {
    const x = 0.7 + i * 4.1;
    card(s, x, 3.4, 3.7, 2.3);
    s.addText(n, { x, y: 3.6, w: 3.7, h: 1.1, fontFace: FONT, fontSize: 60, bold: true, color: GOLD, align: "center", valign: "middle", isTextBox: true });
    s.addText(t, { x, y: 4.8, w: 3.7, h: 0.5, fontFace: FONT, fontSize: 16, bold: true, color: WHITE, align: "center", isTextBox: true });
  });
  s.addText("Cifras de ejemplo, calculadas con un ingreso neto de $2.500 al mes.", {
    x: 0.7, y: 6.2, w: 11.9, h: 0.5, fontFace: FONT, fontSize: 13, color: LIGHT, italic: true, isTextBox: true,
  });
}

// 3. NICHO
{
  const s = base("02 · Nicho", "Dónde ganamos",
    "Nuestro nicho principal es la primera vivienda: familias y profesionales jóvenes que hoy pagan renta. " +
    "La diáspora es el segundo enfoque. Regla: cada asesor elige un nicho y lo trabaja 90 días antes de cambiarlo. " +
    "Pedir a cada asesor que escriba su frase de valor usando la plantilla de la diapositiva.");
  bullets(s, [
    "Primera vivienda: familias y profesionales jóvenes que hoy pagan renta. Es la mayor demanda.",
    "Diáspora: personas que compran desde el exterior para su familia o como inversión.",
    "Regla: cada asesor elige un nicho y lo trabaja 90 días antes de cambiarlo.",
  ], 0.7, 2.4, 11.9, 2.8, 20);
  quote(s, "“Ayudo a familias jóvenes a comprar su primera casa en Valencia, evitando pagar de más.”", 5.5);
}

// 4. ORGANIZACIÓN
{
  const s = base("03 · Organización", "Del lead al cierre",
    "Recorrer el embudo: lead, calificado, cita o visita, reserva y cierre. Cada lead tiene próximo paso y fecha; sin fecha no existe. " +
    "Bloques fijos: prospección en la mañana y captación los miércoles.");
  steps(s, [
    "Lead: entra por redes, referidos o la oficina. Próximo paso y fecha siempre.",
    "Calificado: presupuesto, plazo y financiamiento claros en 5 preguntas.",
    "Cita o visita: llegamos con propuesta y lista de documentos.",
    "Reserva y cierre: seguimiento hasta el final, sin dejar que se enfríe.",
  ], 2.4);
  s.addText("Regla de la semana: bloques fijos de prospección (mañana) y de captación (miércoles).", {
    x: 0.7, y: 6.45, w: 11.9, h: 0.5, fontFace: FONT, fontSize: 14, italic: true, color: LIGHT, isTextBox: true,
  });
}

// 5. CONTENIDO
{
  const s = base("04 · Contenido", "Cuánto, cuándo y cómo",
    "Frecuencia mínima sostenible: 3 reels, 1 carrusel, historias diarias y un vivo cada dos semanas. " +
    "Horarios de referencia en hora de Caracas: 7 a 9 de la mañana, 12 a 1 del mediodía y 7 a 9 de la noche. Ajustar con las métricas a las cuatro semanas.");
  table(s, ["Formato", "Frecuencia", "Para qué"], [
    ["Reels / TikTok", "3 por semana", "Alcance y gancho"],
    ["Carrusel educativo", "1 por semana", "Autoridad y guardados"],
    ["Historias", "Diarias", "Cercanía y confianza"],
    ["En vivo o preguntas", "Cada 2 semanas", "Comunidad y citas"],
  ]);
  s.addText("Horarios sugeridos (Caracas): 7–9 a. m., 12–1 p. m. y 7–9 p. m. Ajustar a las 4 semanas.", {
    x: 0.7, y: 5.6, w: 11.9, h: 0.5, fontFace: FONT, fontSize: 14, italic: true, color: LIGHT, isTextBox: true,
  });
}

// 6. MÉTODO
{
  const s = base("05 · Método", "Cómo creamos cada pieza",
    "Cuatro pasos: banco de ideas con 15 preguntas reales de la semana; elegir un gancho; guion en tres partes (gancho de 2 segundos, valor de 30, acción de 5); grabar en lote y responder comentarios en los primeros 30 minutos.");
  steps(s, [
    "Banco de ideas: 15 preguntas reales que nos hicieron esta semana.",
    "Gancho: “Lo que nadie te dice sobre…”, “Errores que cometen…”, “Si estás rentando…”",
    "Guion en 3 partes: gancho (2 s) · valor (30 s) · acción (5 s).",
    "Grabar en lote y responder comentarios en los primeros 30 minutos.",
  ], 2.4);
}

// 7. METAS
{
  const s = base("06 · Metas", "Lo que hay que hacer",
    "Estas metas salen de la calculadora con un ejemplo: ingreso neto de $2.500 al mes, comisión de 3 por ciento y 50 por ciento de split. " +
    "El punto clave: las captaciones son el cuello de botella, por eso se necesita un bloque fijo semanal solo para captar. " +
    "Cada asesor corre la calculadora con sus propios números.");
  table(s, ["Meta", "Año", "Mes", "Semana"], [
    ["Ventas cerradas", "21", "1,8", "0,5"],
    ["Alquileres cerrados", "68", "5,7", "1,5"],
    ["Leads nuevos", "2.562", "213", "56"],
    ["Citas / visitas", "332", "28", "7"],
    ["Captaciones", "70", "6", "1,5"],
  ]);
  s.addText("Ejemplo: ingreso neto de $2.500 al mes, comisión de 3 % y 50 % de split. Calculadora: adn-2027/calculadora_metas.py", {
    x: 0.7, y: 6.1, w: 11.9, h: 0.5, fontFace: FONT, fontSize: 13, italic: true, color: LIGHT, isTextBox: true,
  });
}

// 8. PRESUPUESTO
{
  const s = base("07 · Presupuesto", "Números que sostienen la meta",
    "Con el ejemplo, el ingreso bruto necesario es de $4.222 al mes, incluyendo gastos y reserva para impuestos. " +
    "La tajada por venta es de $1.500 y por alquiler de $300. La pauta necesaria es de $3.843 al año y hay $3.600 disponibles: faltan $243. " +
    "Regla: si el presupuesto no alcanza, se sube el marketing o se baja la meta de leads pagados.");
  bullets(s, [
    "Ingreso bruto necesario: $4.222 al mes, con gastos y reserva para impuestos.",
    "Tu parte por venta: $1.500 neto. Por alquiler: $300 neto.",
    "Pauta necesaria: $3.843 al año. Con $3.600 disponibles, faltan $243.",
    "Regla: si el presupuesto no alcanza, subimos marketing o bajamos la meta de leads pagados.",
  ], 0.7, 2.4, 11.9, 2.9, 19);
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.7, y: 5.5, w: 11.9, h: 0.95, rectRadius: 0.1,
    fill: { color: GOLD, transparency: 85 }, line: { color: GOLD, width: 1.5 },
  });
  s.addText([
    { text: "Tu tarea: ", options: { bold: true, color: GOLD2 } },
    { text: "completa tu hoja de datos (gastos, ticket, comisión, split, marketing y tasas actuales) y corre la calculadora con tus números.", options: { color: LIGHT } },
  ], { x: 0.95, y: 5.5, w: 11.4, h: 0.95, fontFace: FONT, fontSize: 16, valign: "middle", isTextBox: true });
}

// 9. MARCA PERSONAL
{
  const s = base("08 · Marca personal", "Tu bio vende antes que tú",
    "La bio tiene cuatro líneas: quién eres, para quién, la prueba y la acción. Ejemplo: asesor de Casa Propia Realty, ayudo a familias jóvenes a comprar su primera casa, +45 familias en 6 años en Valencia, y la palabra clave CASA. " +
    "Misma foto, mismo nombre de usuario y mismo enlace en todas las redes.");
  [
    ["Quién eres", "Asesor inmobiliario · Casa Propia Realty"],
    ["Para quién", "Ayudo a familias jóvenes a comprar su primera casa"],
    ["Prueba", "+45 familias · 6 años · Valencia, Carabobo"],
    ["Acción", "👇 Escribe “CASA” para tu plan gratis"],
  ].forEach(([t, d], i) => {
    const x = 0.7 + (i % 2) * 6.05;
    const y = 2.4 + Math.floor(i / 2) * 1.85;
    card(s, x, y, 5.85, 1.6);
    s.addText(t.toUpperCase(), { x: x + 0.3, y: y + 0.18, w: 5.3, h: 0.4, fontFace: FONT, fontSize: 13, bold: true, color: GOLD, charSpacing: 1, isTextBox: true });
    s.addText(d, { x: x + 0.3, y: y + 0.6, w: 5.3, h: 0.8, fontFace: FONT, fontSize: 18, color: WHITE, isTextBox: true });
  });
  s.addText("Misma foto, mismo nombre de usuario y mismo enlace en todas las redes.", {
    x: 0.7, y: 6.3, w: 11.9, h: 0.5, fontFace: FONT, fontSize: 14, italic: true, color: LIGHT, isTextBox: true,
  });
}

// 10. ANÁLISIS DE PERFIL
{
  const s = base("09 · Análisis de perfil", "Tu perfil, evaluado en 100 puntos",
    "Seis áreas: perfil y bio (20), claridad de nicho (15), consistencia (15), calidad de contenido (20), interacción (15) y conversión (15). " +
    "Pedir a cada asesor el link de su perfil o nueve capturas de sus últimas publicaciones. El skill analisis-perfil-redes devuelve el puntaje, la bio reescrita y un plan de 30 días. " +
    "Ejemplo ficticio: un perfil de 1.200 seguidores obtuvo 60,5 de 100.");
  const areas = [["20", "Perfil y bio"], ["15", "Claridad de nicho"], ["15", "Consistencia"], ["20", "Calidad de contenido"], ["15", "Interacción"], ["15", "Conversión"]];
  areas.forEach(([n, t], i) => {
    const x = 0.7 + (i % 3) * 4.1;
    const y = 2.3 + Math.floor(i / 3) * 1.65;
    card(s, x, y, 3.7, 1.4);
    s.addText(n, { x: x + 0.25, y: y + 0.2, w: 1.3, h: 1.0, fontFace: FONT, fontSize: 40, bold: true, color: GOLD, valign: "middle", isTextBox: true });
    s.addText(t, { x: x + 1.55, y: y + 0.2, w: 2.0, h: 1.0, fontFace: FONT, fontSize: 15, bold: true, color: WHITE, valign: "middle", isTextBox: true });
  });
  s.addShape(pres.ShapeType.roundRect, {
    x: 0.7, y: 5.85, w: 11.9, h: 0.95, rectRadius: 0.1,
    fill: { color: GOLD, transparency: 85 }, line: { color: GOLD, width: 1.5 },
  });
  s.addText([
    { text: "Traigan el link de su perfil o 9 capturas. ", options: { bold: true, color: GOLD2 } },
    { text: "El skill analisis-perfil-redes entrega puntaje, bio reescrita y plan de 30 días.", options: { color: LIGHT } },
  ], { x: 0.95, y: 5.85, w: 11.4, h: 0.95, fontFace: FONT, fontSize: 16, valign: "middle", isTextBox: true });
}

// 11. PLAN 90 DÍAS
{
  const s = base("10 · Plan de 90 días", "Arranque en tres pasos",
    "Semanas 1 y 2: diagnóstico, análisis de perfil, nicho definido, CRM creado y bio actualizada. " +
    "Semanas 3 a 8: ritmo, con 3 reels y 1 carrusel por semana y 2 captaciones nuevas por semana. " +
    "Semanas 9 a 12: ajuste, revisar métricas, corregir el embudo y planear el segundo trimestre.");
  steps(s, [
    "Semanas 1–2 · Diagnóstico: análisis de perfil, nicho definido, CRM creado, bio actualizada.",
    "Semanas 3–8 · Ritmo: 3 reels y 1 carrusel por semana, 2 captaciones nuevas por semana.",
    "Semanas 9–12 · Ajuste: revisar métricas, corregir el embudo y planear el segundo trimestre.",
  ], 2.4, 1.2);
}

// 12. CIERRE
{
  const s = base("Próximos pasos", "Lo que hacemos esta semana",
    "Cierre: cada asesor sale con cuatro tareas. Completar la hoja de datos y correr la calculadora, enviar el link o capturas de su perfil, escribir su frase de valor y su nicho, y revisar el ADN completo. " +
    "Terminar con la frase: las mismas 24 horas; la diferencia es quién toma acción.");
  bullets(s, [
    "Completar la hoja de datos y correr la calculadora con tus números.",
    "Enviar el link o las capturas de tu perfil para el análisis.",
    "Escribir tu frase de valor y tu nicho.",
    "Revisar el ADN 2027 completo en la carpeta adn-2027.",
  ], 0.7, 2.4, 11.9, 2.8, 20);
  quote(s, "“Las mismas 24 horas. La diferencia es quién toma acción.”", 5.5);
  s.addText("RUDY MORALES · TEAM RUDY · CASA PROPIA REALTY", {
    x: 0.7, y: 6.6, w: 11.9, h: 0.4, fontFace: FONT, fontSize: 12, bold: true, color: GOLD, charSpacing: 1, isTextBox: true,
  });
}

const out = path.join(__dirname, "ADN-2027-Oficinas.pptx");
pres.writeFile({ fileName: out }).then((f) => console.log("Creado:", f));
