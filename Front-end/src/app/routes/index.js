import { HomeAdmin } from '../scenes/pages/HomeAdmin';
import { ManageClass } from '../scenes/pages/ManageClass';
const routes = [
    {
        path: '/administrator/home',
        component: HomeAdmin,
        exact: true
    },
    {
        path: '/administrator/class',
        component: ManageClass,
        exact: true
    }
];

export default routes;