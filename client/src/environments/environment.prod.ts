
export const environment = {
  production: true,
  url: 'https://order-center-staging.azurewebsites.net/api/public',
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
    productSkus: '/productSkus',
    ordersAll: '/orders-all',
    notification: '/notification',
    files: '/files',
    vehicles: '/vehicles',
    year: '/year',
    make: '/make',
    model: '/model'
  }
};

