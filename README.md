This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
# AppDogs-Darwoft



Tareas
Contruir una app que liste los perros usando la api https://thedogapi.com/ con licencia free.
* Crear una pantalla de inicio o home que contenga un listado de todos los perros.
mostrarlos con un formato de tarjeta donde pueda verse la foto del perro y algunos datos que vengan en el api
* Crear una pantalla de detalle del perro a la que accedes haciendo click en la tarjeta de la pantalla del home. Este te muestra una imagen del perro. con más informacion detallada del perro.
* Seguir algunas practicas recomendadas:
    - respetar una estructura de archivos
    - usar la librería de navegación react-navigation
    - crear un archivo para agregar estilos comunes (theme)
    - crear constantes para agregar la base URL (https://thedogapi.com/)
    - crar un service que use la base URL y la concatene para armar la llamada al api. Crear un hook que tenga props de loader y error para consumirlos en la screen
    - crear un componente reutiliza para el loader
    - crear un componente Text para mostrar los mensajes de error.
    
Nuevas Tareas:
* Agrega en el Listado, un buscador por raza, te dejo sugerencias:
    - Agregar un icono de lupa en el header, al precionar la lupa se muestre un modal con un input para escribir el nombre de la raza. Para abrir un modal usa el prop 'Modal' de react-native.
    - usa una imagen de lupa, busca cualquiera en internet y agrega un boton con ella adentro.
    - Para filtrar utiliza el siguiente código:

            React.useLayoutEffect(() => {
            navigation.setOptions({
            // Se reemplaza el título por un componente de filtro
            headerTitle: () => (
                <FiltroHeader 
                valorActual={filtroActual}
                // Esta es la clave: pasamos el setter del estado al Header
                onFiltroChange={setFiltroActual} 
                />
            ),
            });
        }, [navigation, filtroActual]);

        * Este código lo que hace es reempleazar el header por un componente FiltroHeader que tendrías que crear que tengo un callback 'onFilterChange' que cuando se llame, se actualice la variable de estado 'filtroActual' usando 'setFiltroActual'. Dentro de la screen usa un useEffect para escuchar cambios de esta variable y así llamar al api con el valor de este filtro
    - De manera similar, un icono de borrado, para limpiar el filtro

Última Tarea:
* Cuando la pantalla del listado de perro esta filtrada y cierras el modal. La pantalla sigue filtrada y tienes que seleccionar nuevamente la lupa para limpiar el filtro. Lo que quiero, es que cuando la pantalla esta filtrada, que en vez de una lupa, te muestre un icono de limpiar filtro, para diferenciar cuando esta filtrada y cuando no.