# RestoBot IA

RestoBot crea un chat interactivo basado en IA a partir de la fotografía o imagen de un menú. Tus clientes podrán consultar sobre el menú y realizar pedidos en tiempo real, los cuales puedes recibir por medio de un dashboard de pedidos con el cual podrás visualizar el detalle de los productos, la cantidad, tiempo transcurrido y el número de la mesa.

> **INFO:** para utilizar RestoBot deberás registrar una API KEY de OpenAI.

## principales características:

- Basado en OpenAI
- Chat con clientes 
- Consulta de productos del menú
- Creación de pedidos en tiempo real

## Demo 

Esta aplicación está desplegada en [https://resto-bot-generator.vercel.app/](https://resto-bot-generator.vercel.app/). Al dirigirte a la URL podrás visualizar la siguiente página:

![register-page](/docs/register-apikey-page.webp)

Registra tu OpenAI API Key y serás redireccionado a la página de creación de chatbot.

![create-chatbot](/docs/create-chatbot-page.webp)

Una vez que crees exitosamente tu chatbot, recibirás 2 links:
- Chat para clientes con información del menú
- Página de pedidos en tiempo real

![create-chatbot](/docs/chatbot-info.webp)

#### Chat clientes hambrientos

![create-chatbot](/docs/chat.webp)

#### Órdenes en tiempo real

![create-chatbot](/docs/orders.webp)

## Desarrollo

Si eres desarrollador, sigue las siguientes instrucciones para poder desarrollar esta aplicación.

### Tecnologías

- NextJS 14
- TailwindCSS
- Firebase
- Vercel AI SDK

### Variables de entorno 
Configura las siguientes variables de entorno

```shell

# environments: local,prod
NEXT_PUBLIC_ENVIRONMENT="prod"
# Firebase config
NEXT_PUBLIC_API_KEY=""
NEXT_PUBLIC_AUTH_DOMAIN=""
NEXT_PUBLIC_PROJECT_ID=""
NEXT_PUBLIC_STORAGE_BUCKET=""
NEXT_PUBLIC_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_APP_ID=""
NEXT_PUBLIC_MEASURENMENT_ID=""
# Captcha for Firebase service
NEXT_PUBLIC_CAPTCHA_PUBLIC_KEY=""
# Firebase service-account config
FIREBASE_ADMIN_PROJECT_ID="",
FIREBASE_PROJECT_ID="",
## --- Account service JSON file must be formatted in a single line.
FIREBASE_SERVICE_ACCOUNT_KEY=""
```

#### Cómo definir la variable `FIREBASE_SERVICE_ACCOUNT_KEY`
Para trabajar con Firebase Admin en el lado backend, debes definir un account-service en tu Firebase console. Este archivo es un JSON el cual debes definir en la variable `FIREBASE_SERVICE_ACCOUNT_KEY` formateada en una sola línea. Para lograrlo, puedes usar `jq` de bash.

```shell 
#!/bin/bash
cat service-account.json | jq -c
```


### Ejecutar aplicación

Este es un proyecto basado en NextJS, ejecuta la siguiente tarea

```shell
#!/bin/bash
npm run dev
```


---

Desarrollado por Benjamín con 💙 usando NextJS, Typescript, Vercel SDK IA