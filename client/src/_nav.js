export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer'
    },
    {
      title: true,
      name: 'Configuracion General',
      wrapper: { // optional wrapper object
        element: '', // required valid HTML5 element tag
        attributes: {} // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: '' // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Registro Aplicacion',
      url: '/registerApplication',
      icon: 'icon-pencil'
    },
    {
      name: 'Lista Aplicaciones',
      url: '/listApplication',
      icon: 'icon-list'
    },
    {
      title: true,
      name: 'Pruebas',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Pruebas E2E',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Crear Prueba',
          url: '/testingE2E/create',
          icon: 'icon-puzzle'
        },
        {
          name: 'Ejecutar Pruebas',
          url: '/testingE2E/start',
          icon: 'icon-puzzle'
        },
        {
          name: 'Informe Pruebas',
          url: '/testingE2E/report',
          icon: 'icon-puzzle'
        }
      ]
    },
    {
      name: 'Pruebas Random',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Ejecutar Pruebas',
          url: '/testingMonkey/start',
          icon: 'icon-cursor'
        },
        {
          name: 'Informe Pruebas',
          url: '/testingMonkey/report',
          icon: 'icon-cursor'
        }

      ]
    },
    // {
    //   name: 'Pruebas BDD',
    //   icon: 'icon-star',
    //   children: [
    //     {
    //       name: 'Crear Prueba',
    //       url: '/base/breadcrumbs',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Ejecutar Pruebas',
    //       url: '/base/cards',
    //       icon: 'icon-star'
    //     },
    //     {
    //       name: 'Informe Pruebas',
    //       url: '/base/carousels',
    //       icon: 'icon-star'
    //     }
    //   ]
    // },
    {
      name: 'Regresión Visual',
      icon: 'icon-star',
      children: [
        {
          name: 'Ejecutar Pruebas',
          url: '/visualRegression/execute',
          icon: 'icon-star'
        },
        {
          name: 'Registrar estado',
          url: '/visualRegression/register',
          icon: 'icon-star'
        },
        {
          name: 'Reportes',
          url: '/visualRegression/reports',
          icon: 'icon-star'
        }
      ]
    },
    {
      name: 'Cargue Datos',
      icon: 'icon-star',
      children: [
        {
          name: 'Registrar Tabla',
          url: '/datosAutomaticos/create',
          icon: 'icon-star'
        },
        {
          name: 'Ejecutar Cargue',
          url: '/datosAutomaticos/start',
          icon: 'icon-star'
        },
        {
          name: 'Informe Cargue',
          url: '/datosAutomaticos/report',
          icon: 'icon-star'
        }
      ]
    }
  ]
}
