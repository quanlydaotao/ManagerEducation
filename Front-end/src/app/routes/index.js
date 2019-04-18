import { HomeAdmin } from '../scenes/pages/HomeAdmin';
import { ManageClass } from '../scenes/pages/ManageClass';
const routes = [
    {
        path: '/admin',
        component: HomeAdmin,
        exact: true
    },
    {
        path: '/admin/class',
        component: ManageClass,
        exact: true
    }
];

export default routes;