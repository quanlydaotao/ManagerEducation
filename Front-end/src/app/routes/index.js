import React from 'react';

const routes = [
    {
        path: '/administrator/home',
        component: React.lazy(() => import('../scenes/pages/HomeAdmin/HomeAdmin')),
        exact: true
    },
    {
        path: '/administrator/class',
        component: React.lazy(() => import('../scenes/pages/ManageClass/ManageClass')),
        exact: true
    },
    {
        path: '/administrator/account',
        component: React.lazy(() => import('../scenes/pages/ManageAccount/ManageAccount')),
        exact: false
    },
    {
        path: '/administrator/account/edit/:id',
        component: React.lazy(() => import('../scenes/pages/ManageAccount/PopupFormEdit/PopupFormEdit')),
        exact: false
    }
];

export default routes;