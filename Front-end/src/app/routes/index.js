import React from 'react';

const routes = [{
        path: '/admin/home',
        component: React.lazy(() =>
            import ('../scenes/pages/HomeAdmin/HomeAdmin')),
        exact: true
    },
    {
        path: '/admin/edu',
        component: React.lazy(() =>
            import ('../scenes/pages/ManageClass/ManageClass')),
        exact: false
    },
    {
        path: '/admin/account',
        component: React.lazy(() =>
            import ('../scenes/pages/ManageAccount/ManageAccount')),
        exact: false
    }
];

export default routes;