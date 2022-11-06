# DBMOVIEPAGE

Hello there! Mi nombre es Santiago Baliño y esta es mi aplicación de una página para ver distintas péliculas y su información respectiva (En construcción).


## 🛠 Tecnologías

- HTML
- Javascript
- CSS
- React(v18)

### Librerias

- react-dom: "^18.2.0"
- firebase: "^9.13.0"
- chakra-ui: "^2.3.6"
- redux-toolkit: "^1.8.6"
- formik: "^2.2.9"
- yup: "^0.32.11"

### ¿Por qué el uso de estas librerias?

- React-dom : Usada para controlar las rutas de la aplicación.
- Firebase: Es donde estan alojados todos los archivos y donde se guardan las ordenes de compra.
- Chakra UI: Libreria para utilizar componentes con la posiblidad de pasarles style props que se me hacen muy cómodas y mas parecido a CSS puro.
- Redux: Para tener un control mas preciso de los state de la app y poder reutilizarlos donde sea necesario. 
- Formik: Solución muy buena para no tener que crear un custom hook que se encargue de los formularios con sus respectivos states. Cómodo sobre todo.
- Yup: Optimiza y hace mas fácil la validación de los formularios.

## Uso / Instalación

Instalar dependencias

```bash
  npm install
```

Inicializar el servidor

```bash
  npm run start
```
### **TODO:**
- [ ] Migrate components to [Chakra UI](https://chakra-ui.com/).
- [ ] Add linter and prittier files.
- [ ] Add husky.
- [ ] Migrate to TS.
- [ ] Fix routes.
- [ ] Fix Register name and age.
- [ ] Add functionality hamburguer menu.
- [ ] Fix favorite code and add it's unique page.
- [ ] Add search bar in nav.
- [ ] Fix search bar in dashboard.
- [ ] Create logout button.
- [ ] Create Footer.
- [ ] Create theme file for Chakra.
- [ ] Add links to the CardMovie and MovieSelect.
- [ ] Add support to desktop.