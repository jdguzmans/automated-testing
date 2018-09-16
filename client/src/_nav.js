export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      title: true,
      name: 'Configuracion General',
      wrapper: {            // optional wrapper object
        element: '',        // required valid HTML5 element tag
        attributes: {}        // optional valid JS object with JS API naming ex: { className: "my-class", style: { fontFamily: "Verdana" }, id: "my-id"}
      },
      class: ''             // optional class names space delimited list for title item ex: "text-center"
    },
    {
      name: 'Registro Aplicacion',
      url: '/registerApplication',
      icon: 'icon-pencil',
    },
    {
      title: true,
      name: 'Pruebas',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Pruebas E2E',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Crear Prueba',
          url: '/testingE2E/create',
          icon: 'icon-puzzle',
        },
        {
          name: 'Ejecutar Pruebas',
          url: '/testingE2E/start',
          icon: 'icon-puzzle',
        },
        {
          name: 'Informe Pruebas',
          url: '/testingE2E/report',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Pruebas Monkey',
      icon: 'icon-cursor',
      children: [
        {
          name: 'Crear Prueba',
          url: '/base/breadcrumbs',
          icon: 'icon-cursor',
        },
        {
          name: 'Ejecutar Pruebas',
          url: '/base/cards',
          icon: 'icon-cursor',
        },
        {
          name: 'Informe Pruebas',
          url: '/base/carousels',
          icon: 'icon-cursor',
        },
      ],
    },
    {
      name: 'Pruebas BDD',
      icon: 'icon-star',
      children: [
        {
          name: 'Crear Prueba',
          url: '/base/breadcrumbs',
          icon: 'icon-star',
        },
        {
          name: 'Ejecutar Pruebas',
          url: '/base/cards',
          icon: 'icon-star',
        },
        {
          name: 'Informe Pruebas',
          url: '/base/carousels',
          icon: 'icon-star',
        },
      ],
    },
  ],
};
