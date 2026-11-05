---
name: analisis-perfil-redes
description: Analiza perfiles de redes sociales de un asesor inmobiliario (Instagram, TikTok, Facebook, YouTube, LinkedIn) y entrega un diagnóstico con puntaje, plan de 30 días, bio reescrita, pilares y ganchos de contenido. Úsalo cuando el usuario pida "analiza mi perfil", "revisa mis redes", "qué tan fuerte es mi marca personal", "cómo mejorar mi Instagram/TikTok", "audita mi contenido" o "crea mi plan de contenido".
---

# Análisis de perfil de redes para asesor inmobiliario

Este skill hace un diagnóstico completo de la presencia digital de un asesor (marca personal, contenido, interacción y conversión) y deja un plan accionable. El contexto del proyecto está en `adn-2027/ADN-2027.md`; úsalo para alinear el análisis con el nicho y las metas de la persona.

La rúbrica con los criterios y puntajes está en `rubrica.md` (en esta misma carpeta). Léela antes de puntuar.

## 1. Reúne los datos (antes de analizar)

Pide solo lo que falte, en un único mensaje:

1. **Redes a analizar** (Instagram, TikTok, Facebook, YouTube, LinkedIn).
2. **Enlace público** de cada perfil, o **capturas** de: portada/bio, últimas 9 publicaciones y una historia.
3. **Métricas** si las tiene: exportación de Instagram "Información de la cuenta", analítica de TikTok o YouTube Studio. Sin métricas, el análisis se limita a lo visible y lo dice explícitamente.
4. **Nicho y zona** que quiere trabajar (si no lo ha definido, marca esto como hallazgo).
5. **Meta de ventas o alquileres** (de `config.json` si ya existe).

Si el perfil es privado o no se puede leer, no lo inventes: pide capturas o métricas.

## 2. Evalúa en seis áreas

Usa la rúbrica de `rubrica.md` (100 puntos). Las seis áreas son:

1. **Perfil y bio (20):** nombre con palabra clave, bio con propuesta de valor, foto profesional, enlace con acción clara, nombre de usuario consistente.
2. **Claridad de nicho (15):** ¿en 3 segundos se entiende a quién ayuda y en qué zona?
3. **Consistencia y frecuencia (15):** publicaciones por semana, regularidad, coherencia visual.
4. **Calidad del contenido (20):** gancho en los primeros 2 segundos, valor concreto, formato variado, pilares definidos.
5. **Interacción (15):** guardados, compartidos, comentarios y respuesta del asesor.
6. **Conversión (15):** llamadas a la acción, mensajes recibidos, cómo se atienden, citas generadas.

Cada criterio se puntúa **0, 1 o 2** según la rúbrica. Escribe la evidencia concreta (qué publicación, qué bio) junto a cada puntuación. Sin evidencia no hay puntuación.

### Cómo calcular la interacción

- **Tasa de interacción por publicación** = (likes + comentarios + guardados + compartidos) ÷ alcance × 100.
- Compara contra el propio historial del asesor, no contra cifras genéricas. Si no hay historial, usa las últimas 9 publicaciones como línea base.
- Los **guardados y compartidos** pesan más que los likes: indican contenido útil.

## 3. Entrega el diagnóstico

Entrega el informe con esta estructura (en español, tono directo y sin relleno):

```
# Diagnóstico de marca personal · [Nombre] · [Fecha]

## Puntaje: XX / 100
| Área | Puntaje | Evidencia |
|---|---|---|

## Lo que funciona (3 puntos con evidencia)
## Lo que frena el crecimiento (3 puntos con evidencia, ordenados por impacto)

## Bio reescrita
[Propuesta de bio con la estructura: quién eres · para quién · prueba · acción]

## Pilares de contenido
[4 pilares con el porcentaje sugerido]

## Plan de 30 días
Semana 1 · Semana 2 · Semana 3 · Semana 4 (acciones concretas, con cantidad)

## 10 ideas de contenido (con gancho)
[Usa la biblioteca de ganchos del método de abajo]

## Métricas a seguir
[3 a 5 métricas con meta mensual]
```

Si se analizan varias redes, haz un diagnóstico por red y un resumen común al final.

Guarda el informe en `adn-2027/analisis/<red>-<AAAA-MM-DD>.md` cuando el usuario lo pida, o cuando el análisis sea para su plan 2027.

## 4. Método para crear contenido (para usar en el plan)

### Paso 1: banco de ideas
Toma las preguntas reales que recibe el asesor (WhatsApp, citas, comentarios). Cada pregunta frecuente es un video.

### Paso 2: elige el formato según el objetivo
| Objetivo | Formato recomendado |
|---|---|
| Alcance nuevo | Reel o TikTok de 30–45 s |
| Autoridad | Carrusel educativo de 5–8 diapositivas |
| Confianza | Video personal de 60–90 s o historia con proceso |
| Captar leads | Reel con oferta + palabra clave ("escríbeme CASA") |

### Paso 3: guion en tres partes
1. **Gancho (0–2 s):** afirmación fuerte, pregunta o error común.
2. **Valor (2–35 s):** un solo punto, con un ejemplo real.
3. **Acción (último 5 s):** qué hacer y cómo (palabra clave, enlace o pregunta).

### Biblioteca de ganchos (adaptar al nicho)
- "Lo que nadie te dice antes de [acción inmobiliaria]…"
- "[Número] errores que cometen quienes quieren comprar su primera casa"
- "Si estás pagando renta y [situación], mira esto"
- "Antes de firmar [documento], revisa estos 3 puntos"
- "Esto me pasó con un cliente y cambió todo"
- "Pregunta que me hacen todas las semanas: [pregunta]"
- "Hice cuentas para [caso real]: el resultado te sorprenderá"

### Paso 4: revisión antes de publicar
- ¿El gancho se entiende sin sonido?
- ¿Hay una sola idea?
- ¿Hay una acción clara al final?
- ¿Se cumplen las reglas de la sección 6?

## 5. Método para armar la bio

Estructura de 4 líneas (máximo 150 caracteres por línea en Instagram):

```
[Quién eres] Asesor inmobiliario · Casa Propia Realty
[Para quién] Ayudo a [cliente ideal] a [resultado]
[Prueba] [dato real: familias, años, zona]
[Acción] 👇 [palabra clave] para [beneficio]
```

Evita: "el mejor", "el número 1", adjetivos sin prueba, y listas de servicios sin resultado.

## 6. Reglas de contenido (no negociables)

- No publicar precios de propiedades sin verificar ni cifras de rentabilidad garantizada.
- No mostrar datos personales de clientes ni documentos de propiedades sin autorización.
- No criticar a otros asesores, oficinas o desarrolladores.
- Toda cifra de mercado debe tener fuente o fecha.
- Si una publicación usa música o imágenes de terceros, verifica que se puede usar.

## 7. Qué NO hacer

- No inventar métricas, seguidores ni resultados.
- No dar una calificación sin evidencia.
- No prometer crecimiento en un plazo concreto (por ejemplo "1.000 seguidores en un mes").
- No analizar perfiles de personas distintas al usuario sin su autorización.
- No copiar bios o guiones de otros asesores.

## 8. Cierre

Termina siempre con **una sola acción para hacer hoy** (menos de 30 minutos) y una pregunta concreta sobre lo que falte para completar el análisis.
