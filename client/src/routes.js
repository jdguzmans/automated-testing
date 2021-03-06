import React from 'react';
import Loadable from 'react-loadable'

import DefaultLayout from './containers/DefaultLayout';

function Loading() {
  return <div>Loading...</div>;
}

const RegisterApplication = Loadable({
  loader: () => import('./views/Base/Register'),
  loading: Loading,
});

const ListApplication = Loadable({
  loader: () => import('./views/Application/List'),
  loading: Loading,
});

const CreateTestingE2E = Loadable({
  loader: () => import('./views/PruebasE2E/CreateForm'),
  loading: Loading,
});

const StartTestingE2E = Loadable({
  loader: () => import('./views/PruebasE2E/StartTesting'),
  loading: Loading,
});

const EditTestingE2E = Loadable({
  loader: () => import('./views/PruebasE2E/EditCode'),
  loading: Loading,
});

const MatrizTestE2E = Loadable({
  loader: () => import('./views/Application/MatrizTestE2E'),
  loading: Loading,
});

const MatrizTestMovil = Loadable({
  loader: () => import('./views/PruebasMonkey/MatrizTestMovil'),
  loading: Loading,
});

const EmulatorAndroid = Loadable({
  loader: () => import('./views/PruebasMonkey/EmulatorAndroid'),
  loading: Loading,
});

const ReportE2E = Loadable({
  loader: () => import('./views/PruebasE2E/ListReport'),
  loading: Loading,
});

const ReportTestingMonkey = Loadable({
  loader: () => import('./views/PruebasMonkey/ListReport'),
  loading: Loading,
});

const ViewReportE2E = Loadable({
  loader: () => import('./views/PruebasE2E/ViewReport'),
  loading: Loading,
});

const ViewReportRandom = Loadable({
  loader: () => import('./views/PruebasMonkey/ViewReport'),
  loading: Loading,
});

const ViewScreenshotsE2E = Loadable({
  loader: () => import('./views/PruebasE2E/ViewScreenshots'),
  loading: Loading,
});

const CreateTestingMonkey = Loadable({
  loader: () => import('./views/PruebasMonkey/CreateTest'),
  loading: Loading,
});

const StartTestingMonkey = Loadable({
  loader: () => import('./views/PruebasMonkey/StartTesting'),
  loading: Loading,
});

const CreateUploadData = Loadable({
  loader: () => import('./views/GAD/CreateForm'),
  loading: Loading,
});

const StartUploadData = Loadable({
  loader: () => import('./views/GAD/StartUpload'),
  loading: Loading,
});

const ReportUploadData = Loadable({
  loader: () => import('./views/GAD/ListReport'),
  loading: Loading,
});

const Breadcrumbs = Loadable({
  loader: () => import('./views/Base/Breadcrumbs'),
  loading: Loading,
});

const VissualRegressionExecute = Loadable({
  loader: () => import('./views/VisualRegression/Execute'),
  loading: Loading,
});

const VissualRegressionRegister = Loadable({
  loader: () => import('./views/VisualRegression/Register'),
  loading: Loading,
});

const VissualRegressionReports = Loadable({
  loader: () => import('./views/VisualRegression/Reports'),
  loading: Loading,
});

const Cards = Loadable({
  loader: () => import('./views/Base/Cards'),
  loading: Loading,
});

const Carousels = Loadable({
  loader: () => import('./views/Base/Carousels'),
  loading: Loading,
});

const Collapses = Loadable({
  loader: () => import('./views/Base/Collapses'),
  loading: Loading,
});

const Dropdowns = Loadable({
  loader: () => import('./views/Base/Dropdowns'),
  loading: Loading,
});

const Forms = Loadable({
  loader: () => import('./views/Base/Forms'),
  loading: Loading,
});

const Jumbotrons = Loadable({
  loader: () => import('./views/Base/Jumbotrons'),
  loading: Loading,
});

const ListGroups = Loadable({
  loader: () => import('./views/Base/ListGroups'),
  loading: Loading,
});

const Navbars = Loadable({
  loader: () => import('./views/Base/Navbars'),
  loading: Loading,
});

const Navs = Loadable({
  loader: () => import('./views/Base/Navs'),
  loading: Loading,
});

const Paginations = Loadable({
  loader: () => import('./views/Base/Paginations'),
  loading: Loading,
});

const Popovers = Loadable({
  loader: () => import('./views/Base/Popovers'),
  loading: Loading,
});

const ProgressBar = Loadable({
  loader: () => import('./views/Base/ProgressBar'),
  loading: Loading,
});

const Switches = Loadable({
  loader: () => import('./views/Base/Switches'),
  loading: Loading,
});

const Tables = Loadable({
  loader: () => import('./views/Base/Tables'),
  loading: Loading,
});

const Tabs = Loadable({
  loader: () => import('./views/Base/Tabs'),
  loading: Loading,
});

const Tooltips = Loadable({
  loader: () => import('./views/Base/Tooltips'),
  loading: Loading,
});

const BrandButtons = Loadable({
  loader: () => import('./views/Buttons/BrandButtons'),
  loading: Loading,
});

const ButtonDropdowns = Loadable({
  loader: () => import('./views/Buttons/ButtonDropdowns'),
  loading: Loading,
});

const ButtonGroups = Loadable({
  loader: () => import('./views/Buttons/ButtonGroups'),
  loading: Loading,
});

const Buttons = Loadable({
  loader: () => import('./views/Buttons/Buttons'),
  loading: Loading,
});

const Charts = Loadable({
  loader: () => import('./views/Charts'),
  loading: Loading,
});

const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading,
});

const CoreUIIcons = Loadable({
  loader: () => import('./views/Icons/CoreUIIcons'),
  loading: Loading,
});

const Flags = Loadable({
  loader: () => import('./views/Icons/Flags'),
  loading: Loading,
});

const FontAwesome = Loadable({
  loader: () => import('./views/Icons/FontAwesome'),
  loading: Loading,
});

const SimpleLineIcons = Loadable({
  loader: () => import('./views/Icons/SimpleLineIcons'),
  loading: Loading,
});

const Alerts = Loadable({
  loader: () => import('./views/Notifications/Alerts'),
  loading: Loading,
});

const Badges = Loadable({
  loader: () => import('./views/Notifications/Badges'),
  loading: Loading,
});

const Modals = Loadable({
  loader: () => import('./views/Notifications/Modals'),
  loading: Loading,
});

const Colors = Loadable({
  loader: () => import('./views/Theme/Colors'),
  loading: Loading,
});

const Typography = Loadable({
  loader: () => import('./views/Theme/Typography'),
  loading: Loading,
});

const Widgets = Loadable({
  loader: () => import('./views/Widgets/Widgets'),
  loading: Loading,
});

const Users = Loadable({
  loader: () => import('./views/Users/Users'),
  loading: Loading,
});

const User = Loadable({
  loader: () => import('./views/Users/User'),
  loading: Loading,
});

const ViewE2EVR = Loadable({
  loader: () => import('./views/VisualRegression/E2E'),
  loading: Loading,
});

const ViewE2EMutation = Loadable({
  loader: () => import('./views/Mutation/E2E'),
  loading: Loading,
});

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home', component: DefaultLayout },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/registerApplication', exact: true, name: 'Registrar Aplicacion', component: RegisterApplication },
  { path: '/registerApplication/:id', exact: true, name: 'Registrar Aplicacion', component: RegisterApplication },
  { path: '/testingE2E/create', exact: true, name: 'Crear Pruebas E2E', component: CreateTestingE2E },
  { path: '/testingE2E/create/:id', exact: true, name: 'Modificar Pruebas E2E', component: CreateTestingE2E },
  { path: '/testingE2E/edit/:id', exact: true, name: 'Modificar codigo Pruebas E2E', component: EditTestingE2E },
  { path: '/testingE2E/start', exact: true, name: 'Ejecutar Pruebas E2E', component: StartTestingE2E },
  { path: '/testingE2E/report', exact: true, name: 'Reporte Pruebas E2E', component: ReportE2E },
  { path: '/listApplication', exact: true, name: 'Lista de Aplicaciones', component: ListApplication },
  { path: '/matrizTest/:idTest/:idApplication', exact: true, name: 'Matriz de pruebas', component: MatrizTestE2E },
  { path: '/matrizTest/:idApplicationRandom', exact: true, name: 'Matriz de pruebas random', component: MatrizTestE2E },
  { path: '/matrizTestMovil/:idApplicationRandom', exact: true, name: 'Matriz de pruebas random movil', component: MatrizTestMovil },
  { path: '/viewreport/:id', exact: true, name: 'Vista Reportes', component: ViewReportE2E },
  { path: '/viewscreenshots/:id', exact: true, name: 'Vista Screenshots', component: ViewScreenshotsE2E },
  { path: '/testingMonkey/create', exact: true, name: 'Crear Pruebas Monkey', component: CreateTestingMonkey },
  { path: '/testingMonkey/start', exact: true, name: 'Ejecutar Pruebas Monkey', component: StartTestingMonkey },
  { path: '/testingMonkey/report', exact: true, name: 'Reporte Pruebas Random Testing', component: ReportTestingMonkey },
  { path: '/datosAutomaticos/start', exact: true, name: 'Ejecutar Cargue Datos', component: StartUploadData },
  { path: '/datosAutomaticos/create', exact: true, name: 'Crear Cargue Datos', component: CreateUploadData },
  { path: '/datosAutomaticos/report', exact: true, name: 'Reporte Cargue Datos', component: ReportUploadData },
  { path: '/EmulatorAndroid', exact: true, name: 'Emulador Android', component: EmulatorAndroid },

  { path: '/viewE2EVR/:idTest/:id', exact: true, name: 'Vista de Regresión Visual E2E', component: ViewE2EVR },
  { path: '/viewE2EMutation/:idTest/:id', exact: true, name: 'Vista de Mutation Testing en E2E', component: ViewE2EMutation },

  { path: '/viewreportR/:id', exact: true, name: 'Vista Reportes', component: ViewReportRandom },

  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User },

  { path: '/visualRegression/execute', name: 'VisualRegressionExecute', component: VissualRegressionExecute },
  { path: '/visualRegression/register', name: 'VisualRegressionRegister', component: VissualRegressionRegister },
  { path: '/visualRegression/reports', name: 'VisualRegressionReports', component: VissualRegressionReports },
];

export default routes;
