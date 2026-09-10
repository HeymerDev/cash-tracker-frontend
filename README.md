# CashTrackr — Frontend

Aplicación web de finanzas personales para administrar **presupuestos** y **gastos**. Construida con Next.js 16 (App Router), React 19, TypeScript y Tailwind CSS v4.

Este repositorio contiene **únicamente el frontend**. Consume una API REST externa (backend de CashTrackr) que se configura mediante la variable de entorno `API_URL`.

---

## Tabla de contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Requisitos previos](#requisitos-previos)
- [Variables de entorno](#variables-de-entorno)
- [Instalación e inicialización](#instalación-e-inicialización)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura de carpetas](#estructura-de-carpetas)
- [Arquitectura y flujo de datos](#arquitectura-y-flujo-de-datos)
- [Capa de API](#capa-de-api)
- [Endpoints del backend consumidos](#endpoints-del-backend-consumidos)
- [Funciones importantes](#funciones-importantes)
- [Esquemas de validación (Zod)](#esquemas-de-validación-zod)
- [Autenticación y sesión](#autenticación-y-sesión)
- [Estilos y diseño](#estilos-y-diseño)
- [Convenciones del proyecto](#convenciones-del-proyecto)
- [Solución de problemas](#solución-de-problemas)

---

## Stack tecnológico

| Tecnología                                                                           | Versión   | Uso                                                       |
| ------------------------------------------------------------------------------------ | --------- | --------------------------------------------------------- |
| [Next.js](https://nextjs.org)                                                        | `16.2.6`  | Framework (App Router, Server Components, Server Actions) |
| [React](https://react.dev)                                                           | `19.2.4`  | Librería de UI (`useActionState`, `cache`)                |
| [TypeScript](https://www.typescriptlang.org)                                         | `^5`      | Tipado estático                                           |
| [Tailwind CSS](https://tailwindcss.com)                                              | `^4`      | Estilos (configuración CSS-first)                         |
| [@tailwindcss/forms](https://github.com/tailwindlabs/tailwindcss-forms)              | `^0.5.11` | Reset de formularios                                      |
| [Zod](https://zod.dev)                                                               | `^4.4.3`  | Validación de formularios y de respuestas de la API       |
| [@headlessui/react](https://headlessui.com)                                          | `^2.2.10` | Modales (`Dialog`), menús (`Popover`), transiciones       |
| [@heroicons/react](https://heroicons.com)                                            | `^2.2.0`  | Iconos                                                    |
| [@chakra-ui/pin-input](https://chakra-ui.com)                                        | `^2.1.0`  | Inputs de código OTP (6 dígitos)                          |
| [react-circular-progressbar](https://github.com/kevinsqi/react-circular-progressbar) | `^2.2.0`  | Gráfico circular de gastos                                |
| [sonner](https://sonner.emilkowal.ski)                                               | `^2.0.7`  | Notificaciones (toasts)                                   |
| [server-only](https://www.npmjs.com/package/server-only)                             | `^0.0.1`  | Blindaje de módulos exclusivos del servidor               |

---

## Requisitos previos

| Requisito                 | Versión mínima | Notas                                                                             |
| ------------------------- | -------------- | --------------------------------------------------------------------------------- |
| **Node.js**               | `>= 20.9.0`    | Exigido por el campo `engines` de Next.js 16. Verifica con `node -v`              |
| **pnpm**                  | `>= 9`         | Gestor de paquetes del proyecto (existe `pnpm-lock.yaml`). Verifica con `pnpm -v` |
| **Backend de CashTrackr** | —              | API REST en ejecución y accesible desde `API_URL`                                 |

> Entorno verificado en este equipo: Node.js `v22.17.0` y pnpm `11.5.1`.

### Instalar pnpm

Si aún no tienes pnpm, actívalo con Corepack (incluido en Node.js):

```bash
corepack enable pnpm
```

O instálalo globalmente con npm:

```bash
npm install -g pnpm
```

> **Importante:** este proyecto usa pnpm. No mezcles gestores de paquetes: usar `npm install` o `yarn` generará un lockfile distinto y puede romper la resolución de dependencias.

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto. El archivo está en `.gitignore` (`.env*`), por lo que **nunca se sube al repositorio**.

```bash
# URL base de la API REST del backend. Solo servidor: nunca se expone al navegador.
API_URL=http://localhost:4000/api

# URL base pública de ESTA aplicación. Se usa para que el servidor
# llame a sus propios Route Handlers internos (/handlers/...).
NEXT_PUBLIC_URL=http://localhost:3000
```

| Variable          | Ámbito       | Descripción                                                                                                                                                                     |
| ----------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `API_URL`         | **Servidor** | URL base del backend. Al no tener el prefijo `NEXT_PUBLIC_`, Next.js no la incluye en el bundle del cliente. Se usa en Server Actions, `src/api/`, `src/dal/` y Route Handlers. |
| `NEXT_PUBLIC_URL` | **Público**  | URL base de esta app. La usa `getExpenseById()` para construir la URL absoluta hacia el Route Handler interno.                                                                  |

---

## Instalación e inicialización

```bash
# 1. Clonar el repositorio
git clone https://github.com/HeymerDev/cash-tracker-frontend.git
cd cash-tracker-frontend

# 2. Instalar dependencias
pnpm install

# 3. Crear el archivo de variables de entorno
#    (copia el bloque de la sección anterior en un archivo .env)

# 4. Levantar el servidor de desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Build de producción

```bash
pnpm build
pnpm start
```

### Nota sobre `pnpm-workspace.yaml`

El archivo declara qué dependencias tienen permitido ejecutar scripts de compilación nativa:

```yaml
allowBuilds:
  sharp: true
  unrs-resolver: true
```

pnpm bloquea por defecto los scripts post-instalación por seguridad. `sharp` (optimización de imágenes de Next.js) y `unrs-resolver` (resolución de módulos de ESLint) están explícitamente permitidos.

---

## Scripts disponibles

| Comando      | Descripción                                                      |
| ------------ | ---------------------------------------------------------------- |
| `pnpm dev`   | Servidor de desarrollo con Hot Reload en `http://localhost:3000` |
| `pnpm build` | Compila la aplicación optimizada para producción                 |
| `pnpm start` | Sirve el build de producción (requiere `pnpm build` previo)      |
| `pnpm lint`  | Ejecuta ESLint sobre el proyecto                                 |

---

## Estructura de carpetas

```
cash-tracker-frontend/
├── public/                      # Assets estáticos servidos en la raíz
│   ├── logo.svg                 # Logo de CashTrackr
│   └── grafico.svg              # Ilustración decorativa (fondo de auth y hero)
│
├── src/
│   ├── app/                     # App Router: rutas, layouts y páginas
│   │   ├── layout.tsx           # Layout raíz: fuente Outfit + <Toaster /> de sonner
│   │   ├── page.tsx             # Landing page pública (/)
│   │   ├── globals.css          # Tailwind v4 + plugin forms + utilidad bg-auth
│   │   ├── favicon.ico
│   │   │
│   │   ├── auth/                # Rutas públicas de autenticación
│   │   │   ├── layout.tsx       # Layout a 2 columnas (logo + formulario)
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── verify-email/
│   │   │   ├── forgot-password/
│   │   │   └── new-password/
│   │   │
│   │   ├── admin/               # Rutas protegidas (requieren sesión)
│   │   │   ├── layout.tsx       # Header + AdminMenu; llama a verifySession()
│   │   │   ├── page.tsx         # Listado de presupuestos (/admin)
│   │   │   ├── budget/
│   │   │   │   ├── new/         # Crear presupuesto
│   │   │   │   └── [id]/        # Detalle del presupuesto + gastos
│   │   │   │       ├── page.tsx
│   │   │   │       ├── edit/
│   │   │   │       └── not-found.tsx
│   │   │   └── profile/
│   │   │       ├── layout.tsx   # Pestañas de perfil
│   │   │       ├── settings/    # Editar nombre y email
│   │   │       └── update-password/
│   │   │
│   │   └── handlers/            # Route Handlers internos (API interna del frontend)
│   │       └── budget/[budgetId]/expenses/[expenseId]/route.ts
│   │
│   ├── api/                     # Funciones de lectura (GET) para Server Components
│   │   └── admin/
│   │       ├── budgets/
│   │       │   ├── getBudgets.ts
│   │       │   └── getBudgetById.ts
│   │       └── expenses/
│   │           └── getExpenseById.ts
│   │
│   ├── actions/                 # Server Actions ("use server") — mutaciones
│   │   ├── auth/                # login, register, logout, recuperación de password
│   │   └── admin/               # budget, expense, profile, update-password
│   │
│   ├── dal/                     # Data Access Layer — sesión y token
│   │   ├── auth.ts              # verifySession()
│   │   └── token.ts             # getToken()
│   │
│   ├── schemas/                 # Esquemas Zod (validación de entrada y respuestas)
│   │   ├── index.ts             # Errores de validación de la API
│   │   ├── auth/index.ts        # Login, Register, Token, User, Password...
│   │   └── admin/
│   │       ├── budget.ts
│   │       ├── expense.ts
│   │       └── profile.ts
│   │
│   ├── types/                   # Tipos TypeScript (muchos inferidos de los schemas)
│   │   ├── auth/                # login, register, verify-email, forgot/new-password
│   │   └── admin/               # budget, expense, profile
│   │
│   ├── components/              # Componentes de UI
│   │   ├── logo/
│   │   ├── auth/
│   │   │   ├── forms/           # LoginForm, RegisterFrom, ForgotPassword, NewPasswordForm
│   │   │   ├── inputs/          # FormField, OTPConfirmAccount, OTPValidatePasswordToken
│   │   │   ├── handlers/        # ResetPasswordHandler
│   │   │   ├── errors/          # ErrorMessage
│   │   │   └── success/         # SuccessMessage
│   │   └── admin/
│   │       ├── forms/           # New/Edit Budget y Expense, Profile, UpdatePassword...
│   │       ├── cards/           # BudgetCard, ExpenseCard
│   │       ├── list/            # BudgetList, ExpenseLists, Amount
│   │       ├── dialogs/         # GenericDialog, DeleteBudgetDialog
│   │       ├── navigations/     # AdminMenu, BudgetMenu, ExpenseMenu, ProfileTabs
│   │       ├── buttons/         # AddExpenseButton
│   │       └── grafic/          # ExpensesGrafic
│   │
│   └── utils/
│       └── index.ts             # hasError, formatCurrency, formatDate
│
├── .env                         # Variables de entorno (NO versionado)
├── next.config.ts               # Configuración de Next.js
├── tsconfig.json                # TypeScript + alias @/* → ./src/*
├── eslint.config.mjs            # Configuración de ESLint (flat config)
├── postcss.config.mjs           # PostCSS con @tailwindcss/postcss
├── pnpm-workspace.yaml          # Dependencias con builds permitidos
└── package.json
```

### Alias de importación

`tsconfig.json` define `@/*` → `./src/*`. Importa siempre con el alias:

```ts
import { getToken } from "@/dal/token";
import { formatCurrency } from "@/utils";
```

---

## Arquitectura y flujo de datos

La aplicación separa claramente **lectura** de **escritura**:

```
                    ┌─────────────────────────────┐
                    │      Server Component       │
                    │  (app/admin/**/page.tsx)    │
                    └──────────────┬──────────────┘
                                   │  await getBudgets()
                                   ▼
   LECTURA          ┌─────────────────────────────┐
   (GET)            │      src/api/**             │──── getToken() ──► cookie
                    └──────────────┬──────────────┘
                                   │  fetch + Bearer token
                                   ▼
                    ┌─────────────────────────────┐
                    │   Backend REST (API_URL)    │
                    └──────────────▲──────────────┘
                                   │  fetch + Bearer token
   ESCRITURA        ┌──────────────┴──────────────┐
   (POST/PATCH/     │   src/actions/** ("use      │──── getToken() ──► cookie
    DELETE)         │   server") + revalidatePath │
                    └──────────────▲──────────────┘
                                   │  useActionState(action, initialState)
                    ┌──────────────┴──────────────┐
                    │   Client Component (form)   │
                    └─────────────────────────────┘
```

**Puntos clave del flujo:**

1. **Todas las llamadas al backend ocurren en el servidor.** El token JWT vive en una cookie `httpOnly` que el navegador nunca lee por JavaScript.
2. **Toda respuesta del backend se valida con Zod** antes de usarse. Si la forma no coincide, el parseo falla y se maneja el error.
3. **Los formularios usan Server Actions** conectadas con `useActionState`, que devuelve un objeto de estado con `errors`, `fields`, `message` y `status`.
4. **Tras una mutación exitosa se llama a `revalidatePath()`** para refrescar la caché del segmento afectado.

---

## Capa de API

El proyecto tiene **cuatro** piezas relacionadas con datos. Es importante no confundirlas:

### 1. `src/api/` — Lecturas para Server Components

Funciones asíncronas que hacen `GET` al backend y validan la respuesta con Zod. Se invocan directamente desde Server Components con `await`.

**`src/api/admin/budgets/getBudgets.ts`**

```ts
export const getBudgets = async (): Promise<Budget[]> => {
  const token = await getToken();
  try {
    const request = await fetch(`${process.env.API_URL}/budgets`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await request.json();
    return BudgetsSchema.parse(json); // valida el array de presupuestos
  } catch (error) {
    console.log(error);
    return []; // ante error devuelve lista vacía
  }
};
```

**`src/api/admin/budgets/getBudgetById.ts`** — Si la respuesta no es `ok`, invoca `notFound()` de `next/navigation`, lo que renderiza `app/admin/budget/[id]/not-found.tsx`. Valida con `BudgetSchema` (incluye el array `expenses`).

**`src/api/admin/expenses/getExpenseById.ts`** — Caso especial: **no llama al backend directamente**, sino al Route Handler interno usando `NEXT_PUBLIC_URL`, porque también se consume desde el cliente:

```ts
const request = await fetch(
  `${process.env.NEXT_PUBLIC_URL}/handlers/budget/${budgetId}/expenses/${expenseId}`,
);
```

### 2. `src/actions/` — Server Actions (mutaciones)

Archivos marcados con `"use server"`. Todos siguen el mismo patrón de 5 pasos:

```ts
"use server";

export const createBudget = async (
  prevState: CreateBudgetState, // 1. estado previo (useActionState)
  formData: FormData, //    datos del formulario
): Promise<CreateBudgetState> => {
  const token = await getToken();

  // 2. Extraer y validar con Zod
  const budget = CreateBudgetSchema.safeParse({ name, amount });
  if (!budget.success) {
    return {
      //    devuelve errores por campo
      errors: budget.error.issues.map((e) => ({
        path: String(e.path[0]),
        message: e.message,
      })),
      fields: { name, amount },
      message: "",
    };
  }

  // 3. Llamar al backend con el Bearer token
  const request = await fetch(`${process.env.API_URL}/budgets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(budget.data),
  });

  // 4. Validar la respuesta
  const { message } = ResponseSchema.parse(await request.json());

  // 5. Revalidar caché (en las acciones que lo requieren) y devolver estado
  revalidatePath("/admin");
  return {
    errors: [],
    fields: { name: "", amount: 0 },
    message,
    status: request.status,
  };
};
```

> El ejemplo ilustra el patrón general. El paso 5 varía según la acción: consulta la [tabla de revalidación](#panel-de-administración--srcactionsadmin) para ver qué ruta refresca cada una (`createBudget`, en concreto, no llama a `revalidatePath`).

### 3. `src/dal/` — Data Access Layer

Utilidades de sesión reutilizadas por `src/api/`, `src/actions/` y los Route Handlers. Ver [Autenticación y sesión](#autenticación-y-sesión).

### 4. `src/app/handlers/` — Route Handlers internos

Endpoints HTTP propios del frontend, definidos con archivos `route.ts`. Se llaman `handlers/` (no `api/`) para no confundirlos con la carpeta `src/api/`.

**`src/app/handlers/budget/[budgetId]/expenses/[expenseId]/route.ts`** → `GET /handlers/budget/:budgetId/expenses/:expenseId`

Actúa como proxy autenticado: verifica la sesión, adjunta el token y reenvía la petición al backend. Existe para que los formularios del cliente puedan obtener un gasto sin exponer `API_URL` ni el token.

```ts
export async function GET(request, { params }) {
  await verifySession(); // exige sesión válida
  const token = await getToken();
  const { budgetId, expenseId } = await params;

  const req = await fetch(
    `${process.env.API_URL}/budgets/${budgetId}/expenses/${expenseId}`,
    { method: "GET", headers: { Authorization: `Bearer ${token}` } },
  );

  const json = await req.json();
  if (!req.ok) {
    const { message } = ResponseSchema.parse(json);
    return Response.json({ message }, { status: req.status });
  }
  return Response.json(ExpenseSchema.parse(json), { status: req.status });
}
```

> **Nota (Next.js 16):** en esta versión `params` es una **Promise** y debe resolverse con `await` (como se hace arriba). Consulta `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/route.md`.

---

## Endpoints del backend consumidos

Todos se construyen sobre `API_URL` y, salvo los públicos, envían la cabecera `Authorization: Bearer <token>`.

### Autenticación

| Método  | Endpoint                      | Origen en el código                                    | Auth |
| ------- | ----------------------------- | ------------------------------------------------------ | :--: |
| `POST`  | `/auth/register`              | `actions/auth/register/create-account.ts`              |  —   |
| `POST`  | `/auth/verify-email`          | `actions/auth/verify-email/verify-email.ts`            |  —   |
| `POST`  | `/auth/login`                 | `actions/auth/login/login.ts`                          |  —   |
| `POST`  | `/auth/forgot-password`       | `actions/auth/forgot-password/forgot-password.ts`      |  —   |
| `POST`  | `/auth/validate-reset-token`  | `actions/auth/new-password/validate-token-password.ts` |  —   |
| `POST`  | `/auth/reset-password/:token` | `actions/auth/new-password/reset-password.ts`          |  —   |
| `GET`   | `/auth/user`                  | `dal/auth.ts` (`verifySession`)                        |  ✅  |
| `PATCH` | `/auth/user/`                 | `actions/admin/profile/update-profile.ts`              |  ✅  |
| `POST`  | `/auth/update-password/`      | `actions/admin/auth/update-password.ts`                |  ✅  |
| `POST`  | `/auth/check-password`        | `actions/admin/budget/delte-budget.ts`                 |  ✅  |

### Presupuestos

| Método   | Endpoint       | Origen en el código                     | Auth |
| -------- | -------------- | --------------------------------------- | :--: |
| `GET`    | `/budgets`     | `api/admin/budgets/getBudgets.ts`       |  ✅  |
| `POST`   | `/budgets`     | `actions/admin/budget/create-budget.ts` |  ✅  |
| `GET`    | `/budgets/:id` | `api/admin/budgets/getBudgetById.ts`    |  ✅  |
| `PATCH`  | `/budgets/:id` | `actions/admin/budget/edit-budget.ts`   |  ✅  |
| `DELETE` | `/budgets/:id` | `actions/admin/budget/delte-budget.ts`  |  ✅  |

### Gastos

| Método   | Endpoint                                 | Origen en el código                       | Auth |
| -------- | ---------------------------------------- | ----------------------------------------- | :--: |
| `POST`   | `/budgets/:budgetId/expenses`            | `actions/admin/expense/create-expense.ts` |  ✅  |
| `GET`    | `/budgets/:budgetId/expenses/:expenseId` | `app/handlers/.../route.ts`               |  ✅  |
| `PATCH`  | `/budgets/:budgetId/expenses/:expenseId` | `actions/admin/expense/edit-expense.ts`   |  ✅  |
| `DELETE` | `/budgets/:budgetId/expenses/:expenseId` | `actions/admin/expense/delete-expense.ts` |  ✅  |

---

## Funciones importantes

### Sesión y token — `src/dal/`

#### `getToken()` — `src/dal/token.ts`

Lee el JWT desde la cookie `CASHTRACKER_TOKEN`. Es la base de toda petición autenticada.

```ts
export const getToken = async () => {
  const cookieStore = await cookies(); // en Next.js 16, cookies() es asíncrona
  return cookieStore.get("CASHTRACKER_TOKEN")?.value;
};
```

#### `verifySession()` — `src/dal/auth.ts`

Guardia de autenticación de todas las rutas `/admin`. Es la función más importante del proyecto:

- Está marcada con `import "server-only"`: si alguien la importa desde un Client Component, el build falla.
- Está envuelta en `cache()` de React: **se ejecuta una sola vez por request**, aunque la llamen el layout y varios componentes.
- Si no hay token, o el backend no devuelve un usuario válido según `UserSchema`, hace `redirect("/auth/login")`.
- Reenvía los errores de redirección (`isRedirectError`) en lugar de tragárselos, porque `redirect()` funciona lanzando una excepción interna.
- Devuelve `{ user, isAuth: true }`.

```ts
export const verifySession = cache(async () => {
  const token = await getToken();
  if (!token) redirect("/auth/login");

  try {
    const request = await fetch(`${process.env.API_URL}/auth/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const session = UserSchema.safeParse(await request.json());
    if (!session.success) redirect("/auth/login");
    return { user: session.data, isAuth: true };
  } catch (error) {
    if (isRedirectError(error)) throw error; // deja pasar el redirect
    console.error(error);
    redirect("/auth/login");
  }
});
```

### Utilidades — `src/utils/index.ts`

| Función          | Firma                                                 | Descripción                                                                                            |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `hasError`       | `(errors: RegisterError[], field: string) => boolean` | Indica si un campo tiene errores de validación. La usa `FormField` para pintar el borde en rojo.       |
| `formatCurrency` | `(amount: number) => string`                          | Formatea a pesos colombianos con `Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" })`. |
| `formatDate`     | `(date: string) => string`                            | Formatea una fecha ISO a texto legible en español (`8 de septiembre de 2026`).                         |

### Server Actions

#### Autenticación — `src/actions/auth/`

| Función                 | Archivo                                   | Descripción                                                                          |
| ----------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------ |
| `createAccount`         | `register/create-account.ts`              | Registra un usuario. Valida con `RegisterSchema` (incluye confirmación de password). |
| `verifyEmail`           | `verify-email/verify-email.ts`            | Confirma la cuenta con el código OTP de 6 dígitos.                                   |
| `login`                 | `login/login.ts`                          | Autentica y, si recibe token, **crea la cookie `httpOnly`** y redirige a `/admin`.   |
| `logout`                | `logout/logout.ts`                        | Borra la cookie y redirige a `/auth/login`.                                          |
| `forgotPassword`        | `forgot-password/forgot-password.ts`      | Solicita el email de recuperación.                                                   |
| `validateTokenPassword` | `new-password/validate-token-password.ts` | Valida el código OTP de recuperación antes de mostrar el formulario.                 |
| `resetPassword`         | `new-password/reset-password.ts`          | Establece la nueva contraseña usando el token validado.                              |

#### Panel de administración — `src/actions/admin/`

| Función          | Archivo                     | `revalidatePath()`               |
| ---------------- | --------------------------- | -------------------------------- |
| `createBudget`   | `budget/create-budget.ts`   | —                                |
| `editBudget`     | `budget/edit-budget.ts`     | `/admin` + `/admin/budget/${id}` |
| `deleteBudget`   | `budget/delte-budget.ts`    | `/admin`                         |
| `createExpense`  | `expense/create-expense.ts` | `/admin/budget/${budgetId}`      |
| `editExpense`    | `expense/edit-expense.ts`   | `/admin/budget/${budgetId}`      |
| `deleteExpense`  | `expense/delete-expense.ts` | `/admin/budget/${budgetId}`      |
| `updateProfile`  | `profile/update-profile.ts` | `/admin/profile/settings`        |
| `updatePassword` | `auth/update-password.ts`   | —                                |

> **Regla de revalidación:** las mutaciones de **presupuestos** afectan al listado `/admin`; las de **gastos** afectan a la página de detalle `/admin/budget/${budgetId}` (en singular), que es donde se listan. `editBudget` revalida ambas porque el nombre y el importe se muestran en las dos pantallas.

> **`deleteBudget` es un caso especial de doble verificación:** primero hace `POST /auth/check-password` para confirmar la identidad del usuario y solo si la contraseña es correcta ejecuta el `DELETE /budgets/:id`. Además devuelve un campo `timestamp: Date.now()` en el estado, para que el `useEffect` del cliente dispare un toast nuevo incluso cuando el mensaje de error se repite.

### Componentes destacados

| Componente       | Archivo                           | Función                                                                                                                                                                                                                                                                         |
| ---------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FormField`      | `auth/inputs/FormField.tsx`       | Input reutilizable: renderiza label, input y los `ErrorMessage` filtrados por `name`. Aplica borde rojo con `hasError()`.                                                                                                                                                       |
| `GenericDialog`  | `admin/dialogs/GenericDialog.tsx` | Modal único controlado por **query params**. Lee `showModal`, `addExpense`, `expenseId` y `deleteExpenseId` de la URL y monta el formulario correspondiente mediante un `componentsMap` (`new` / `edit` / `delete`). Al cerrar, limpia todos los params con `router.replace()`. |
| `ExpensesGrafic` | `admin/grafic/ExpensesGrafic.tsx` | Barra de progreso circular. Cambia de ámbar (`#F59E0B`) a rojo (`#DC2626`) cuando el porcentaje gastado llega a 100.                                                                                                                                                            |
| `AdminMenu`      | `admin/navigations/AdminMenu.tsx` | Popover del header con el nombre del usuario, enlaces y botón de cierre de sesión (invoca la Server Action `logout`).                                                                                                                                                           |
| `Amount`         | `admin/list/Amount.tsx`           | Muestra una etiqueta y un importe formateado con `formatCurrency`.                                                                                                                                                                                                              |

### Cálculos del detalle de presupuesto

En `src/app/admin/budget/[id]/page.tsx` se derivan las tres cifras del panel:

```ts
const totalSpent = budget.expenses.reduce((total, e) => e.amount + total, 0);
const totalAvailable = Number(budget.amount) - totalSpent;
const porcentage = ((totalSpent / Number(budget.amount)) * 100).toFixed(2);
```

> `budget.amount` llega como **string** desde el backend (así lo declara `BudgetSchema`), por eso se convierte con `Number()`.

---

## Esquemas de validación (Zod)

Zod cumple dos roles: validar los formularios **y** validar las respuestas de la API.

### `src/schemas/auth/index.ts`

| Esquema                | Uso                                                                                       |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `RegisterSchema`       | Registro. Usa `.refine()` para exigir que `password` y `password_confirmation` coincidan. |
| `LoginSchema`          | Email válido y password no vacío.                                                         |
| `LoginResponseSchema`  | Respuesta del login: `{ message, token? }`.                                               |
| `ResponseSchema`       | Respuesta genérica `{ message }`. Es el esquema más reutilizado del proyecto.             |
| `TokenSchema`          | Código OTP de exactamente 6 caracteres.                                                   |
| `ForgotPasswordSchema` | Email de recuperación.                                                                    |
| `ResetPasswordSchema`  | Nueva contraseña + confirmación.                                                          |
| `UpdatePasswordSchema` | Contraseña actual + nueva + confirmación.                                                 |
| `UserSchema`           | Usuario autenticado: `{ id, name, email }`.                                               |

### `src/schemas/admin/`

| Esquema                                                       | Archivo      | Uso                                                                                 |
| ------------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------- |
| `CreateBudgetSchema` / `EditBudgetSchema`                     | `budget.ts`  | Nombre obligatorio y `amount` numérico ≥ 1 (con `z.coerce.number()`).               |
| `PasswordValidationSchema`                                    | `budget.ts`  | Password requerido para confirmar el borrado.                                       |
| `BudgetSchema`                                                | `budget.ts`  | Presupuesto completo, incluye `expenses: ExpenseSchema[]`.                          |
| `BudgetsSchema`                                               | `budget.ts`  | Array de presupuestos **sin** los gastos (`BudgetSchema.omit({ expenses: true })`). |
| `CreateExpenseSchema` / `EditExpenseSchema` / `ExpenseSchema` | `expense.ts` | Gastos.                                                                             |
| `updateProfileSchema`                                         | `profile.ts` | Nombre y email del perfil.                                                          |

### `src/schemas/index.ts`

`ApiValidationErrorSchema` y `ApiValidationErrorsResponseSchema` describen el formato de errores de validación que devuelve el backend (estilo `express-validator`: `{ type, value, msg, path, location }`).

### Tipos inferidos

Los tipos de `src/types/` se derivan de los esquemas para no duplicar definiciones:

```ts
// Presupuesto completo, con sus gastos (detalle: GET /budgets/:id)
export type Budget = z.infer<typeof BudgetSchema>;

// Presupuesto del listado, SIN gastos (GET /budgets)
export type BudgetSummary = z.infer<typeof BudgetsSchema>[number];
```

> **Importante:** el backend no devuelve `expenses` en el listado, por eso existen dos
> tipos. Usa `BudgetSummary` en todo lo que consuma `getBudgets()` (`BudgetList`,
> `BudgetCard`) y `Budget` en lo que consuma `getBudgetById()` (`EditBudgetForm`, la
> página de detalle). Confundirlos rompe `pnpm build`, que ejecuta el chequeo de tipos.

---

## Autenticación y sesión

| Aspecto                 | Valor                                                     |
| ----------------------- | --------------------------------------------------------- |
| **Nombre de la cookie** | `CASHTRACKER_TOKEN`                                       |
| **`httpOnly`**          | `true` — inaccesible desde JavaScript del navegador       |
| **`path`**              | `/`                                                       |
| **Expiración**          | 7 días (`Date.now() + 1000 * 60 * 60 * 24 * 7`)           |
| **Transporte**          | Cabecera `Authorization: Bearer <token>` hacia el backend |

**Ciclo de vida:**

1. `login()` recibe el token del backend y crea la cookie con `cookies().set()`, luego `redirect("/admin")`.
2. Cada request a `/admin/*` pasa por `verifySession()` en `app/admin/layout.tsx`.
3. `getToken()` recupera el token en cada lectura o mutación.
4. `logout()` elimina la cookie y redirige al login.

> La protección de rutas se hace en el **layout del servidor** (`app/admin/layout.tsx`), no con middleware. Cualquier ruta nueva bajo `/admin` queda protegida automáticamente al heredar ese layout.

---

## Estilos y diseño

### Tailwind CSS v4

Esta versión usa **configuración CSS-first**: no existe `tailwind.config.js`. Todo se declara en `src/app/globals.css`:

```css
@import "tailwindcss";
@plugin "@tailwindcss/forms";

@utility bg-auth {
  background-image: url("/grafico.svg");
  background-size: 30rem;
  background-repeat: no-repeat;
  background-position: left bottom;
}
```

### Paleta y tipografía

| Elemento         | Valor                                                       |
| ---------------- | ----------------------------------------------------------- |
| Color principal  | `purple-950` (fondos oscuros, títulos)                      |
| Color de acento  | `amber-500` (botones, resaltados, gráfico)                  |
| Texto secundario | `gray-500`                                                  |
| Tipografía       | `Outfit` vía `next/font/google` (cargada en el layout raíz) |
| Notificaciones   | `sonner` — `<Toaster richColors position="top-right" />`    |

> ⚠️ **Cuidado con Tailwind v4:** varias utilidades cambiaron de nombre respecto a v3. Por ejemplo, `bg-gradient-to-b` ya **no** existe; ahora es `bg-linear-to-b`. Si un fondo o degradado "no se aplica", verifica primero el nombre de la clase en la documentación de v4.

---

## Convenciones del proyecto

- **Componentes de servidor por defecto.** Añade `"use client"` solo cuando necesites hooks, estado o eventos del navegador.
- **Server Actions siempre con `"use server"`** al inicio del archivo.
- **Toda respuesta del backend se valida con Zod** antes de usarse.
- **Estado de formularios uniforme:** `{ errors, fields, message?, status? }`, consumido con `useActionState`.
- **`revalidatePath()` tras cada mutación exitosa** para refrescar la caché.
- **Importaciones con el alias `@/`**, nunca rutas relativas largas.
- **Textos de UI y mensajes de validación en español.**

### ⚠️ Sobre la versión de Next.js

Este proyecto usa **Next.js 16**, que introduce cambios de ruptura respecto a versiones anteriores. Antes de escribir código, consulta la documentación incluida en el propio paquete:

```
node_modules/next/dist/docs/
```

Cambios relevantes ya aplicados en este código:

- `cookies()` es **asíncrona** → `const cookieStore = await cookies();`
- `params` en páginas y Route Handlers es una **Promise** → `const { id } = await params;`

---

## Solución de problemas

| Síntoma                              | Causa probable                                                                | Solución                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Redirección infinita a `/auth/login` | `API_URL` incorrecta o backend caído; `verifySession()` no obtiene el usuario | Verifica `.env` y que el backend responda en `GET /auth/user`          |
| `fetch failed` / `ECONNREFUSED`      | El backend no está levantado                                                  | Inicia el servidor de la API                                           |
| Las listas aparecen vacías sin error | `getBudgets()` captura el fallo y devuelve `[]`                               | Revisa la consola del servidor: el error se registra con `console.log` |
| Error de parseo de Zod               | La respuesta del backend no coincide con el esquema                           | Compara la respuesta real con el esquema en `src/schemas/`             |
| Un color o degradado no se aplica    | Nombre de utilidad de Tailwind v3 que cambió en v4                            | Consulta la documentación de Tailwind v4 (ej. `bg-linear-to-b`)        |
| El puerto 3000 está ocupado          | Otra instancia en ejecución                                                   | `pnpm dev --port 3001`                                                 |

---

## Licencia

Proyecto privado. Todos los derechos reservados.
