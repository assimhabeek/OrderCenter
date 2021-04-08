// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    url: 'http://localhost:8080/api/public',
    authHeader: 'Authorization',
    routes: {
        upload: '/upload',
        exportOrders: '/orders/export',
        orders: '/orders',
        ordersQueueAll: '/orders/queueAll',
        ordersQueuedRange: '/orders/export/preview',
        isLoggedIn: '/isLoggedIn',
        login: '/login',
        skus: '/skus',
        history: '/history',
        users: '/users',
        shopifyOrders: '/shopify-orders',
        shopifyProducts: '/shopify-products',
        ordersAll: '/orders-all',
        notification: '/notification',
        files: '/history/files',
        vehicles: '/vehicles',
        year: '/year',
        make: '/make',
        model: '/model',
        productSkus: '/productSkus',
        exportVehicles: '/exportVehicles'
    }
};

