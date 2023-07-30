**Reto de Programación Desarrollo de Aplicativo Móvil**  
  
## Descripción  
  
La empresa de Automóviles, desea tener un sistema de información que le permita llevar el control de sus clientes. Actualmente la empresa posee una red de concesionarios a nivel nacional, alrededor de 15. Pero requiere tener un sistema que le permite gestionar la información de sus clientes y segmentar los mismos por concesionario.
    
## Características Principales  
  
- Insertar clientes
- Eliminado lógico de clientes 
- Mostrar listado de clientes
- Editar cliente 
- Generar PDF: Esta funcionalidad es más óptimo generarla desde el servidor usando una cloud function o algún mecanismo similar que entregue una url del archivo. No está implementada por cuestiones de tiempos.
  
## Requisitos Previos  
  
Antes de ejecutar la aplicación, asegúrate de tener instalados los siguientes componentes:  
  
- Node.js
- Ionic CLI 
  
## Instalación  
  
Sigue los siguientes pasos para instalar y ejecutar la aplicación en tu dispositivo:  
  
1. Clona o descarga este repositorio en tu máquina local.  
2. Abre una terminal y navega hasta el directorio raíz del proyecto.  
3. Ejecuta el siguiente comando para instalar las dependencias:  
`npm install`  
4. Luego, ejecuta el siguiente comando para construir la aplicación:  
`ionic build`
5. Agrega la plataforma que deseas utilizar con Capacitor (iOS o Android):  
`npx cap add android` 
`npx cap add ios`
6. Ejecuta el siguiente comando para abrir el proyecto en tu IDE preferido:  
`ionic capacitor open [android/ios]` 
7. Finalmente, conecta tu dispositivo móvil al ordenador y realiza la siguiente sincronización con Capacitor:  
`npx cap sync`
