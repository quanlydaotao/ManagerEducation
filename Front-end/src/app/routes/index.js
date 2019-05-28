import React from 'react';

const routes = [
    {
        path: '/administrator/home',
        component: React.lazy(() => import('../scenes/pages/HomeAdmin/HomeAdmin')),
        exact: true
    },
    {
        path: '/administrator/education',
        component: React.lazy(() => import('../scenes/pages/ManageClass/ManageClass')),
        exact: false
    },
    {
        path: '/administrator/accounts',
        component: React.lazy(() => import('../scenes/pages/ManageAccount/ManageAccount')),
        exact: false
    }
];

export default routes;