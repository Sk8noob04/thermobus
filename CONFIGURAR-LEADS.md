# Leads del formulario → correo → Excel online

Cómo queda armado el circuito y qué falta configurar.

```
Visitante completa el formulario
        │
        ▼
POST /api/contacto  (servidor en Vercel)
        │
        ├──► Correo con formato fijo a info@thermobus.com.co   (vía Resend)
        │            │
        │            ▼
        │    Power Automate lee el correo y agrega la fila
        │            │
        │            ▼
        │    Excel online en OneDrive / SharePoint
        │
        └──► Si eligió WhatsApp, se abre la conversación
```

El registro se hace **siempre**, antes de abrir WhatsApp. No se pierde ningún contacto.

Si `RESEND_API_KEY` no está configurada, el formulario funciona igual pero vuelve
al método anterior (abrir WhatsApp o el cliente de correo). El sitio nunca se rompe.

---

## Paso 1 — Cuenta de Resend

1. Crear cuenta en **resend.com**.
2. **Importante:** registrarse usando `info@thermobus.com.co`. Mientras el dominio no esté verificado, Resend solo entrega al correo con el que se creó la cuenta — haciéndolo así, el circuito funciona sin tocar ni un registro DNS.
3. Ir a **API Keys → Create API Key**, permiso *Sending access*. Copiar la clave (se muestra una sola vez).

El plan gratuito da 3.000 correos al mes y 100 por día. De sobra.

### Después, opcional: verificar el dominio

Para que el remitente sea `no-responder@thermobus.com.co` en vez del de pruebas, hay que agregar en GoDaddy los registros que indique Resend (SPF, DKIM y uno de rebotes). Mejora la entregabilidad y se ve más profesional, pero no es necesario para arrancar.

Al verificar, cambiar `CONTACTO_FROM` en Vercel.

⚠️ Al tocar DNS, **no modificar los MX ni el SPF existente de Outlook.** Resend agrega registros propios, normalmente sobre un subdominio.

---

## Paso 2 — Variables en Vercel

En **vercel.com → proyecto thermobus → Settings → Environment Variables**, agregar para *Production*:

| Nombre | Valor |
|---|---|
| `RESEND_API_KEY` | la clave del paso 1 |
| `CONTACTO_TO` | `info@thermobus.com.co` |
| `CONTACTO_FROM` | `Thermobus <onboarding@resend.dev>` |

Después de guardarlas hay que **redesplegar** para que tomen efecto: Deployments → el último → menú `···` → Redeploy.

---

## Paso 3 — El Excel

Crear un libro en OneDrive o SharePoint, por ejemplo `Leads Thermobus.xlsx`, con esta fila de encabezados en la primera hoja:

| fecha | nombre | empresa | email | telefono | ciudad | linea | cantidad | mensaje | canal |
|---|---|---|---|---|---|---|---|---|---|

Seleccionar el rango y usar **Insertar → Tabla** (marcando "La tabla tiene encabezados"). Power Automate solo puede escribir en tablas, no en rangos sueltos.

Nombrar la tabla `Leads` desde Diseño de tabla.

---

## Paso 4 — El flujo en Power Automate

**Disparador:** *Cuando llega un correo nuevo (V3)* — conector Office 365 Outlook.

Configurar:
- Carpeta: `Inbox`
- Filtro de asunto: `[LEAD]`

**Acción 1 — Redactar (Compose).** Extrae el bloque JSON del cuerpo:

```
substring(
  body('...'),
  add(indexOf(body('...'), '---DATOS---'), 11),
  sub(indexOf(body('...'), '---FIN---'), add(indexOf(body('...'), '---DATOS---'), 11))
)
```

Reemplazar `body('...')` por el campo **Cuerpo** del disparador.

**Acción 2 — Analizar JSON (Parse JSON).** Contenido: la salida del paso anterior. Esquema:

```json
{
  "type": "object",
  "properties": {
    "fecha":    { "type": "string" },
    "nombre":   { "type": "string" },
    "empresa":  { "type": "string" },
    "email":    { "type": "string" },
    "telefono": { "type": "string" },
    "ciudad":   { "type": "string" },
    "linea":    { "type": "string" },
    "cantidad": { "type": "string" },
    "mensaje":  { "type": "string" },
    "canal":    { "type": "string" }
  }
}
```

**Acción 3 — Agregar una fila a una tabla** — conector Excel Online (Business). Elegir el libro y la tabla `Leads`, y mapear cada columna con el campo correspondiente del Parse JSON.

Los tres conectores son **estándar**: no hace falta licencia premium de Power Automate.

---

## Formato del correo

El cuerpo llega siempre así. La parte de arriba es para leer; el bloque entre `---DATOS---` y `---FIN---` es el que consume el flujo.

```
Nueva solicitud de cotización desde thermobus.com.co

Nombre              : Juan Pérez
Empresa             : Transportes del Norte S.A.S.
Correo              : jperez@transnorte.com.co
Teléfono            : +57 320 555 1212
Ciudad              : Medellín
Tipo de vehículo    : Urbano
Cantidad de equipos : 12
Canal               : Formulario web

Detalle del requerimiento:
Chasis Chevrolet NPR, carrocería Marcopolo. Ruta urbana Medellín.


---DATOS---
{"fecha":"2026-09-15T14:32:08.441Z","nombre":"Juan Pérez","empresa":"Transportes del Norte S.A.S.","email":"jperez@transnorte.com.co","telefono":"+57 320 555 1212","ciudad":"Medellín","linea":"Urbano","cantidad":"12","mensaje":"Chasis Chevrolet NPR, carrocería Marcopolo. Ruta urbana Medellín.","canal":"Formulario web"}
---FIN---
```

El asunto es `[LEAD] Cotización — <empresa o nombre>`, y el **responder a** apunta al correo del visitante: se le contesta desde Outlook sin copiar la dirección a mano.

Los campos vacíos no aparecen en la parte legible, pero **siempre están en el JSON** como cadena vacía. El flujo nunca se rompe por un campo faltante.

---

## Protecciones incluidas

- **Honeypot**: campo oculto que los bots completan y las personas no. Si viene lleno, se descarta en silencio.
- **Límite de frecuencia**: máximo 5 envíos por minuto desde la misma IP.
- **Validación**: nombre y correo obligatorios, correo con formato válido, límite de largo por campo.
- **Saltos de línea removidos** de los campos de una sola línea.

---

## Probar que funciona

1. Entrar a `thermobus.com.co/contacto`, completar y enviar con la opción **Correo**.
2. Debe aparecer la pantalla de "Solicitud enviada".
3. Verificar que llegó el correo a `info@thermobus.com.co`.
4. Verificar que se agregó la fila en el Excel.

Si no llega el correo: **Vercel → Logs**, buscar `/api/contacto`. Los errores de Resend quedan registrados ahí con el motivo exacto.

---

## Si algún día crece el volumen

Este circuito tiene un eslabón de más: el correo. Si un mensaje se demora o lo filtran, la fila se demora. Para el volumen de una empresa que arranca no es problema, pero pasando los cientos de leads diarios conviene que el servidor escriba directo al Excel con Microsoft Graph, salteando el correo. Eso exige registrar una app en Azure y consentimiento de administrador del tenant.
