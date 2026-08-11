# 🍽️ Sistema de Pedidos Automatizado para Restaurante

Sistema Full Stack orientado a la digitalización y optimización del proceso de atención de pedidos en restaurantes.

La solución permite que los clientes realicen sus pedidos de manera autónoma desde un kiosco digital, seleccionen productos y adicionales, elijan un método de pago y reciban un número de pedido.

Una vez confirmado el pago, el pedido es enviado automáticamente al área de cocina, donde el personal puede gestionar su preparación y actualizar su estado en tiempo real.

El sistema está diseñado principalmente para **reducir tiempos de atención, minimizar errores en los pedidos y mejorar la trazabilidad del proceso desde la compra hasta la entrega**.

---

## 📌 Objetivo del proyecto

Desarrollar un sistema digital de autoservicio que permita automatizar el proceso de pedidos de un restaurante, reduciendo la dependencia de la toma manual de pedidos y mejorando la comunicación entre cliente, caja, cocina y personal de entrega.

El sistema busca centralizar todo el flujo:

```text
Cliente
   ↓
Kiosco
   ↓
Pedido
   ↓
Pago
   ↓
Confirmación
   ↓
Cocina
   ↓
Preparación
   ↓
Listo
   ↓
Entrega
```

---

# 🎯 Problema identificado

El proceso tradicional de atención puede presentar diferentes problemas:

* Demoras durante las horas de mayor demanda.
* Formación de colas.
* Errores al registrar productos.
* Errores en cantidades, adicionales o personalizaciones.
* Dependencia del personal para tomar pedidos.
* Errores durante el cobro y cálculo del vuelto.
* Falta de información sobre el estado del pedido.
* Dificultad para conocer los pedidos pendientes y en preparación.
* Poca trazabilidad del proceso.
* Dificultad para obtener métricas de atención y ventas.

El sistema busca solucionar estos problemas mediante la digitalización del flujo completo de atención.

---

# 💡 Propuesta de solución

La solución está compuesta por diferentes módulos que trabajan sobre una API central.

### Componentes principales

* 🖥️ Kiosco de autoservicio
* 💳 Módulo de pagos digitales
* 💵 Módulo de pagos en efectivo
* 🧾 Módulo de caja
* 👨‍🍳 Panel de cocina
* 📦 Gestión de entrega
* 👨‍💼 Panel administrativo
* 📊 Dashboard y reportes
* 🔐 Sistema de autenticación y roles
* 🔄 Comunicación en tiempo real

---

# 👤 Compra sin registro

Una de las modificaciones principales del proyecto es que **el cliente no necesita registrarse ni ingresar DNI para realizar una compra**.

El objetivo es reducir al máximo la cantidad de pasos necesarios para completar un pedido.

### Flujo

```text
Cliente ingresa al kiosco
        ↓
Selecciona productos
        ↓
Selecciona adicionales
        ↓
Revisa pedido
        ↓
Selecciona método de pago
        ↓
Realiza el pago
        ↓
Recibe número de pedido
```

La identificación del cliente mediante DNI, presente en la propuesta inicial, queda fuera del flujo principal del MVP.

En una futura versión podría implementarse como una funcionalidad opcional para programas de fidelización o historial de clientes.

---

# 💳 Métodos de pago

El sistema contempla dos métodos principales:

### 1. Pago digital

El cliente puede realizar el pago mediante un proveedor de pagos integrado, como **Culqi**.

### 2. Pago en efectivo

El cliente puede seleccionar el pago en efectivo y posteriormente acercarse a caja para completar la operación.

### Regla principal

**No existen descuentos dependiendo del método de pago.**

El precio del pedido será exactamente el mismo independientemente de si el cliente paga en efectivo o mediante un medio digital.

Esto permite mantener el objetivo principal del proyecto:

> **Mejorar la eficiencia de atención y despacho, no incentivar un método de pago específico.**

---

# 💳 Flujo de pago digital

El pago digital sigue el siguiente proceso:

```text
Cliente selecciona pago digital
          ↓
Sistema muestra total
          ↓
Cliente realiza pago
          ↓
Proveedor de pagos procesa operación
          ↓
¿Pago aprobado?
      /           \
    NO             SÍ
    ↓               ↓
Reintentar       Confirmar pago
                  ↓
            Generar/confirmar pedido
                  ↓
             Enviar a cocina
```

### Regla importante

El pedido **no debe enviarse a cocina hasta que el pago haya sido confirmado**.

Si el pago es rechazado:

* No se envía el pedido a cocina.
* Se informa al cliente.
* Se permite reintentar.
* Se permite seleccionar otro método de pago.

---

# 💵 Flujo de pago en efectivo

El pago en efectivo tiene un flujo diferente porque la confirmación debe realizarla un cajero.

```text
Cliente selecciona efectivo
          ↓
Sistema crea pedido
          ↓
Estado: Pendiente de pago
          ↓
Cliente recibe número de pedido
          ↓
Cliente se acerca a caja
          ↓
Cajero busca pedido
          ↓
Cliente entrega efectivo
          ↓
Cajero registra monto recibido
          ↓
Sistema calcula vuelto
          ↓
Cajero confirma pago
          ↓
Estado: Pago confirmado
          ↓
Pedido enviado a cocina
```

---

# ⏱️ Límite para pagos en efectivo

Los pedidos realizados mediante pago en efectivo tendrán un tiempo máximo de **20 minutos para completar el pago**.

Ejemplo:

```text
Pedido: #1052
Creado: 18:30
Límite de pago: 18:50
```

Si el cliente paga antes del límite:

```text
Pago confirmado
      ↓
Pedido enviado a cocina
```

Si el cliente no realiza el pago dentro del tiempo establecido:

```text
20 minutos
    ↓
Pago no confirmado
    ↓
Pedido cancelado por falta de pago
```

El pedido cancelado **no será enviado a cocina**.

### Regla de negocio

La validación debe considerar el momento en que el pago fue confirmado.

Esto evita que un pedido sea cancelado incorrectamente cuando el cliente realizó el pago dentro del tiempo permitido.

---

# 🧾 Módulo de caja

El módulo de caja permite gestionar los pedidos pendientes de pago en efectivo.

El cajero podrá visualizar:

* Número de pedido.
* Hora de creación.
* Total a pagar.
* Tiempo restante.
* Estado del pago.

### Ejemplo

```text
PEDIDOS PENDIENTES DE PAGO

#1052     S/ 25.00     12 min
#1053     S/ 18.50     16 min
#1054     S/ 32.00     19 min
```

Al seleccionar un pedido:

```text
Pedido: #1052

Total: S/ 25.00

Monto recibido: S/ 30.00

Vuelto: S/ 5.00

[ CONFIRMAR PAGO ]
```

Una vez confirmado:

```text
Pago confirmado
       ↓
Pedido enviado a cocina
```

---

# 📦 Estados del pedido

El estado del pedido representa la situación operativa del pedido.

```text
PENDIENTE DE PAGO
        ↓
    REGISTRADO
        ↓
  EN PREPARACIÓN
        ↓
       LISTO
        ↓
    ENTREGADO
```

También puede pasar a:

```text
CANCELADO
```

cuando se incumplen las reglas de negocio establecidas.

---

# 💰 Estados del pago

El estado del pago se maneja independientemente del estado del pedido.

### Estados posibles

* Pendiente
* Procesando
* Pagado
* Rechazado
* Expirado
* Anulado

Esto permite diferenciar correctamente situaciones como:

```text
Pedido:
EN PREPARACIÓN

Pago:
PAGADO
```

o:

```text
Pedido:
PENDIENTE DE PAGO

Pago:
PENDIENTE
```

La separación de ambos estados facilita la trazabilidad y el control del sistema.

---

# 🔄 Flujo general del sistema

```text
                    CLIENTE
                       │
                       ▼
                INICIA PEDIDO
                       │
                       ▼
              SELECCIONA PRODUCTOS
                       │
                       ▼
                 REVISA PEDIDO
                       │
                       ▼
                SELECCIONA PAGO
                  /           \
                 /             \
          PAGO DIGITAL       EFECTIVO
               │                 │
               ▼                 ▼
             CULQI        PENDIENTE DE PAGO
               │                 │
          ¿APROBADO?        MÁXIMO 20 MIN
           /      \               │
         NO        SÍ             ▼
         │         │            CAJA
         │         │              │
         │         └──────┬───────┘
         │                │
         ▼                ▼
      REINTENTAR     PAGO CONFIRMADO
                          │
                          ▼
                       COCINA
                          │
                          ▼
                  EN PREPARACIÓN
                          │
                          ▼
                        LISTO
                          │
                          ▼
                      ENTREGADO
```

---

# 👨‍🍳 Panel de cocina

La cocina recibe únicamente pedidos cuyo pago haya sido confirmado.

El panel permitirá visualizar pedidos organizados por estado:

### Nuevos

Pedidos confirmados que esperan iniciar preparación.

### En preparación

Pedidos actualmente en elaboración.

### Listos

Pedidos terminados esperando ser entregados.

### Entregados

Historial de pedidos finalizados.

---

# 🔄 Actualización en tiempo real

La comunicación entre los diferentes módulos deberá realizarse en tiempo real.

Por ejemplo:

```text
Cliente paga
    ↓
Pago confirmado
    ↓
Cocina recibe pedido automáticamente
```

Cuando cocina cambia el estado:

```text
EN PREPARACIÓN
       ↓
     LISTO
```

el sistema deberá actualizar la información correspondiente sin necesidad de recargar manualmente las pantallas.

Para este propósito se plantea utilizar **SignalR**.

---

# 👥 Roles del sistema

## Cliente

Puede:

* Crear pedidos.
* Seleccionar productos.
* Personalizar productos.
* Seleccionar método de pago.
* Consultar número de pedido.
* Consultar estado del pedido.

No necesita crear una cuenta.

---

## Cajero

Puede:

* Consultar pedidos pendientes de pago.
* Buscar pedidos por número.
* Registrar pagos en efectivo.
* Registrar monto recibido.
* Consultar vuelto.
* Confirmar pagos.
* Consultar operaciones de caja.

---

## Cocina

Puede:

* Visualizar pedidos confirmados.
* Iniciar preparación.
* Marcar pedidos como listos.
* Consultar tiempos de preparación.

---

## Personal de entrega

Puede:

* Visualizar pedidos listos.
* Confirmar entrega.
* Finalizar el pedido.

---

## Administrador

Puede:

* Gestionar productos.
* Gestionar categorías.
* Gestionar precios.
* Gestionar disponibilidad.
* Gestionar usuarios.
* Gestionar roles.
* Consultar pedidos.
* Consultar pagos.
* Configurar parámetros del sistema.
* Consultar dashboard.
* Generar reportes.

---

# 📊 Dashboard administrativo

El sistema contará con un panel para analizar el funcionamiento del restaurante.

### Ventas

* Ventas totales.
* Ventas mediante efectivo.
* Ventas mediante pagos digitales.
* Ticket promedio.

### Pedidos

* Pedidos realizados.
* Pedidos por hora.
* Pedidos cancelados.
* Pedidos pendientes de pago.
* Pedidos entregados.

### Operación

* Tiempo promedio de preparación.
* Tiempo promedio de entrega.
* Pedidos retrasados.
* Cantidad de pedidos procesados.

### Productos

* Productos más vendidos.
* Productos menos vendidos.
* Productos no disponibles.

---

# 📈 Indicadores principales

Para determinar si el sistema realmente mejora el proceso, se medirán indicadores antes y después de su implementación.

### Indicadores

* Tiempo promedio de creación del pedido.
* Tiempo promedio desde pago hasta inicio de preparación.
* Tiempo promedio de preparación.
* Tiempo promedio de entrega.
* Pedidos por hora.
* Pedidos cancelados.
* Pedidos corregidos.
* Ticket promedio.
* Productos más vendidos.
* Porcentaje de pedidos realizados mediante kiosco.
* Distribución de métodos de pago.

---

# 🗄️ Arquitectura propuesta

El proyecto utilizará una arquitectura basada en una API central.

```text
┌──────────────────────────┐
│      KIOSCO CLIENTE      │
│         Angular          │
└────────────┬─────────────┘
             │
             │ HTTPS / REST
             ▼
┌──────────────────────────┐
│      ASP.NET CORE API    │
│           C#             │
└────────────┬─────────────┘
             │
      ┌──────┴──────┐
      ▼             ▼
┌────────────┐ ┌────────────┐
│ SQL Server │ │  SignalR   │
└────────────┘ └────────────┘
      │
      ▼
┌──────────────────────────┐
│      Otros módulos       │
│                          │
│ Cocina / Caja / Admin    │
└──────────────────────────┘
```

---

# 🛠️ Tecnologías

| Tecnología            | Uso                         |
| --------------------- | --------------------------- |
| Angular               | Interfaces del sistema      |
| ASP.NET Core          | Backend y API REST          |
| C#                    | Lógica de negocio           |
| Entity Framework Core | Persistencia de datos       |
| SQL Server            | Base de datos               |
| SignalR               | Comunicación en tiempo real |
| JWT                   | Autenticación               |
| ASP.NET Identity      | Usuarios y roles            |
| Culqi                 | Pagos digitales             |
| Git                   | Control de versiones        |
| GitHub                | Repositorio y documentación |
| Azure / Google Cloud  | Despliegue                  |

La arquitectura tecnológica mantiene la propuesta inicial del proyecto, orientada a un perfil Full Stack con .NET.

---

# 🧩 Módulos del sistema

```text
Sistema de Pedidos
│
├── Kiosco
│   ├── Inicio
│   ├── Categorías
│   ├── Productos
│   ├── Personalización
│   ├── Carrito
│   ├── Resumen
│   └── Pago
│
├── Caja
│   ├── Pendientes de pago
│   ├── Registro de efectivo
│   ├── Cálculo de vuelto
│   └── Historial
│
├── Cocina
│   ├── Nuevos
│   ├── En preparación
│   ├── Listos
│   └── Entregados
│
├── Entrega
│   └── Confirmación de entrega
│
├── Administración
│   ├── Productos
│   ├── Categorías
│   ├── Usuarios
│   ├── Roles
│   ├── Pedidos
│   └── Reportes
│
└── Dashboard
    ├── Ventas
    ├── Pedidos
    ├── Productos
    └── Indicadores
```

---

# 🔐 Seguridad

El sistema deberá considerar:

* HTTPS.
* Autenticación.
* Autorización mediante roles.
* Protección de endpoints.
* Validaciones en frontend y backend.
* Protección de información sensible.
* Variables de entorno para credenciales.
* Registro de errores y eventos.
* Copias de seguridad.
* Control de acceso a módulos administrativos.

Las credenciales de servicios externos y secretos no deben almacenarse directamente en el código fuente.

---

# ⚠️ Manejo de excepciones

El sistema deberá contemplar diferentes situaciones.

### Pago digital rechazado

El pedido no se envía a cocina y el cliente puede reintentar.

### Pago digital confirmado pero respuesta tardía

El sistema debe evitar generar pedidos duplicados.

### Doble clic en pagar

Debe existir una validación para evitar múltiples pedidos.

### Pedido en efectivo sin pago

Después de 20 minutos se cancela automáticamente.

### Producto no disponible

No debe poder agregarse a nuevos pedidos.

### Pérdida de conexión

El usuario debe recibir un mensaje controlado y el sistema debe evitar crear operaciones incompletas.

### Varios kioscos simultáneos

Cada pedido debe mantener un número único.

---

# 🧪 Pruebas principales

El proyecto deberá probar escenarios normales y excepcionales.

| Escenario                       | Resultado esperado               |
| ------------------------------- | -------------------------------- |
| Pedido normal                   | Pedido creado correctamente      |
| Pago digital aprobado           | Pedido enviado a cocina          |
| Pago digital rechazado          | No se envía a cocina             |
| Pago en efectivo                | Pedido queda pendiente           |
| Pago efectivo confirmado        | Pedido enviado a cocina          |
| Pago efectivo después de 20 min | Pedido cancelado                 |
| Doble clic en pagar             | No se duplica el pedido          |
| Producto no disponible          | No puede agregarse               |
| Varios kioscos                  | Pedidos mantienen números únicos |
| Cambio de estado                | Actualización en tiempo real     |
| Usuario sin permisos            | Acceso denegado                  |
| Pérdida de conexión             | Operación controlada             |

---

# 🚧 Alcance del MVP

La primera versión estará enfocada exclusivamente en el flujo principal del restaurante.

### Incluido

* Kiosco de autoservicio.
* Compra sin registro.
* Categorías.
* Productos.
* Personalización.
* Carrito.
* Pago digital.
* Pago en efectivo.
* Límite de 20 minutos para pago efectivo.
* Módulo básico de caja.
* Número de pedido.
* Panel de cocina.
* Estados del pedido.
* Estados del pago.
* Gestión de entrega.
* Panel administrativo básico.
* Dashboard básico.
* Comunicación en tiempo real.
* Control de usuarios y roles.

### Fuera del MVP

Las siguientes funciones podrán implementarse posteriormente:

* Inventario avanzado.
* Fidelización de clientes.
* Cupones.
* Promociones.
* Delivery.
* Aplicación móvil.
* Múltiples sucursales.
* Analítica avanzada.
* Integración con impresoras térmicas.
* Notificaciones avanzadas.

---

# 🗓️ Plan de desarrollo

## Fase 1 — Análisis

* Levantamiento de requisitos.
* Definición de actores.
* Definición de reglas de negocio.
* Definición del flujo de pedidos.
* Definición de pagos.
* Definición de estados.
* Definición de excepciones.
* Definición del alcance del MVP.

## Fase 2 — Diseño

* Wireframes.
* Diseño del kiosco.
* Diseño de caja.
* Diseño de cocina.
* Diseño administrativo.
* Diagrama de casos de uso.
* Diagrama de flujo.
* Diagrama de arquitectura.
* Modelo entidad-relación.

## Fase 3 — Base de datos

* Diseño de tablas.
* Relaciones.
* Restricciones.
* Estados.
* Datos iniciales.
* Configuración de Entity Framework Core.

## Fase 4 — Backend

* API REST.
* Arquitectura del proyecto.
* Autenticación.
* Roles.
* Productos.
* Pedidos.
* Pagos.
* Caja.
* Estados.
* Validaciones.
* Swagger.

## Fase 5 — Kiosco

* Interfaz táctil.
* Menú.
* Productos.
* Personalización.
* Carrito.
* Resumen.
* Selección de pago.
* Confirmación de pedido.

## Fase 6 — Pagos y caja

* Integración del proveedor de pagos.
* Confirmación de pagos.
* Manejo de pagos rechazados.
* Pedidos pendientes de efectivo.
* Temporizador de 20 minutos.
* Confirmación desde caja.
* Cálculo de vuelto.

## Fase 7 — Cocina

* Panel de cocina.
* Pedidos nuevos.
* Estados.
* Comunicación en tiempo real.
* Temporizadores.
* Pedidos listos.

## Fase 8 — Administración

* Gestión de productos.
* Categorías.
* Usuarios.
* Roles.
* Pedidos.
* Reportes.
* Dashboard.

## Fase 9 — Pruebas

* Pruebas funcionales.
* Pruebas de pagos.
* Pruebas de concurrencia.
* Pruebas de permisos.
* Pruebas de estados.
* Pruebas de errores.
* Pruebas de pérdida de conexión.

## Fase 10 — Despliegue

* Configuración del servidor.
* HTTPS.
* Variables de entorno.
* Base de datos.
* Backend.
* Frontend.
* Backups.
* Logs.
* Documentación.

---

# 🚀 Futuras mejoras

Después de completar el MVP se podrían incorporar:

### Fidelización

Permitir que los clientes creen una cuenta opcional para acumular beneficios.

### Inventario

Descontar automáticamente ingredientes y controlar stock.

### Promociones

Crear campañas y promociones configurables.

### Delivery

Permitir pedidos fuera del restaurante.

### Multi-sucursal

Gestionar diferentes locales desde una plataforma central.

### Aplicación móvil

Crear una aplicación para clientes.

### Analítica avanzada

Implementar indicadores más avanzados sobre ventas, tiempos y comportamiento de clientes.

---

# 🎯 Resultado esperado

Al finalizar el proyecto, el restaurante contará con un flujo digital centralizado:

```text
CLIENTE
   ↓
KIOSCO
   ↓
SELECCIÓN DE PRODUCTOS
   ↓
PEDIDO
   ↓
PAGO
   ↓
CONFIRMACIÓN
   ↓
COCINA
   ↓
PREPARACIÓN
   ↓
LISTO
   ↓
ENTREGA
   ↓
HISTORIAL
   ↓
MÉTRICAS
```

El objetivo final no es simplemente digitalizar la toma de pedidos, sino **crear un flujo controlado y trazable que reduzca errores, disminuya tiempos de atención y facilite la coordinación entre las diferentes áreas del restaurante.**

---

# 📌 Principales reglas de negocio

1. El cliente puede realizar pedidos sin registrarse.
2. No es obligatorio solicitar DNI para realizar una compra.
3. El precio del pedido es independiente del método de pago.
4. Los pagos digitales deben ser confirmados antes de enviar el pedido a cocina.
5. Los pedidos en efectivo quedan pendientes de pago.
6. Los pedidos en efectivo tienen un plazo máximo de 20 minutos para ser pagados.
7. Un pedido no pagado dentro del plazo se cancela automáticamente.
8. Un pedido cancelado por falta de pago no debe llegar a cocina.
9. El pago confirmado debe estar asociado a un único pedido.
10. El sistema debe evitar pedidos duplicados.
11. El estado del pago y el estado del pedido deben manejarse de forma independiente.
12. Los cambios de estado deben quedar registrados.
13. Solo usuarios autorizados pueden realizar determinadas operaciones.
14. Cocina solo debe recibir pedidos con pago confirmado.
15. El sistema debe mantener trazabilidad desde la creación hasta la entrega.

---

# 📄 Estado del proyecto

**Estado actual:** Análisis y diseño inicial.

### Próximo objetivo

Antes de comenzar la implementación se deberá finalizar:

* Requerimientos funcionales.
* Requerimientos no funcionales.
* Reglas de negocio.
* Casos de uso.
* Flujo completo del sistema.
* Modelo entidad-relación.
* Wireframes.
* Arquitectura definitiva.

Una vez finalizada esta etapa se podrá comenzar con el desarrollo del backend y frontend.

---

## 👨‍💻 Tecnologías principales

**Frontend:** Angular
**Backend:** ASP.NET Core / C#
**Base de datos:** SQL Server
**ORM:** Entity Framework Core
**Tiempo real:** SignalR
**Autenticación:** JWT / ASP.NET Identity
**Pagos:** Culqi
**Control de versiones:** Git / GitHub
**Despliegue:** Azure / Google Cloud

---

## 📌 Nota

Este proyecto se encuentra en etapa de planificación y diseño. Las integraciones con proveedores externos de pago deberán implementarse utilizando los mecanismos y APIs oficialmente disponibles para el comercio.

El diseño definitivo de las reglas de negocio, estructura de datos e integración de pagos deberá validarse antes de comenzar la implementación.
