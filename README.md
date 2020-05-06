# E-commerce Marketplace (Template)
> Tienda en línea multiplataforma, la cual cuenta con un sistema de pagos en línea, cobro de comisión por transición, envió de SMS, registro de tiendas entro otras características

![](https://i.imgur.com/FfEhmDv.png)

> Puedes ver algunos de nuestros clientes

![](https://i.imgur.com/1KYwHuo.png)

# Requerimientos
> - Node
> - Angular CLI
> - [Stripe](https://stripe.com/es/connect): Para el correcto funcionamiento de la plataforma de pago
> - [Facebook ID](https://developers.facebook.com/apps/): App de facebook para el correcto funcionamiento del login
> - [Google ID](https://console.developers.google.com/?hl=ES): App de google para el correcto funcionamiento del login


# Instalacion

> __Recuerda__ Si tienes dudas o problemas para instalar podemos instalarlo por ti [Ver más](https://www.codigoencasa.com/te-ayudamos-con-tu-codigo/)

- Debes descargar o clonar el respositorio
- `git clone https://github.com/leifermendez/ecommerce-front.git`
- Entra en el directorio ecommerce-front
- Ejecutamos `npm install`
- Nos dirigimos a `ecommerce-front/src/environments/`
- Configuramos nuestras credenciales de Google ID, FB ID y nuestra url de API [Ver más](https://github.com/leifermendez/ecommerce-api)

```ts 
export const environment = {
  production: false,
  endpoint: 'https://TU_URL_DE_API/api/1.0',
  AH_url: '',
  AH_token: '',
  stripe_public_key: 'STRIPE_PK',
  sentry_key: null,
  google_provider: 'GOOGLE_ID',
  fb_provider: 'FB_ID',
  tawk: '',
  intercom: '',
  country: 'ES'
};

```
> Recuerda cambiarlo en ambos archivos `environment.prod.ts` y `environment.ts`
__Importante__ el archivo que termina en `.prod.ts` contiene la configuracion de producción, el otro archivo solo tiene efecto cuando estas probando en tu localhost.

- Ejecutamos `ng serve` y nos dirigimos a `http://localhost:4200/` realizamos una revision para probar el uso general.
- Finalizando. Ejecutas `ng build --prod`
- A continuación se crea un nuevo directo llamado `dist` el cual contiene todo nuestro codigo compilado.
- Solo falta un paso, debes subir el contenido del directorio `dist/` a tu hosting.
- Listo!

### Templates
1. ![](https://i.imgur.com/3lvIRv8.png)
2. ![](https://i.imgur.com/FfEhmDv.png)
3. ![](https://i.imgur.com/Y1xp4WN.png)



### Contacto
Para dudas información, recomendaciones [codigoencasa.com](https://www.codigoencasa.com/te-ayudamos-con-tu-codigo/)

__Grupo de facebook:__ https://www.facebook.com/groups/163216871776185

__Slack:__ https://desarrolloah.slack.com/archives/C0133SK41EZ

<a href="https://www.buymeacoffee.com/leifermendez" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>


