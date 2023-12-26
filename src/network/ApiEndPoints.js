// export const BASE_URL = 'https://masteradmin-zti3.onrender.com';
// export const BASE_URL = 'https://asicom.store/asicombackend';
export const BASE_URL = 'https://nervous-jang.212-227-236-230.plesk.page/';

export const SERVER_KEY =
    '';
export const API = '/api/admin/delivery-boy/';
// export const IMAGE_BASE_URL = 'https://asicom.store/asicombackend/uploads/images/';
export const IMAGE_BASE_URL =
    'https://nervous-jang.212-227-236-230.plesk.page/uploads/images/';
export const APICALL = '/api/admin/delivery-boy/order/';
export const UPDATE = '/api/admin/profile/';
export const NOTIFICATION = '/api/admin/deliveryboy/notification/user/'


export const API_END_POINTS = {

    // LOGIN: `${BASE_URL}${API}login`,


    LOGIN: BASE_URL + API + 'login',
    GET_PROFILE_LIST: BASE_URL + API + 'list',
    PROFILE_UPDATE: BASE_URL + UPDATE + 'updateprofile',


    DASHBOARD: BASE_URL + APICALL + 'dashboard',
    ORDER_DETAILS: BASE_URL + APICALL + 'show/',


    // https://asicom.store/asicombackend/api/admin/delivery-boy/order/return_order_list

    RETURN_ORDER_DELIVERY: BASE_URL + APICALL + 'return_order_list',

    ASSIGNED_DELIVERY: BASE_URL + APICALL + 'list',
    PICKEDUP_order_list: BASE_URL + APICALL + 'pickedup-order-list',
    PendingDeliveryList: BASE_URL + APICALL + 'pending-order-list',

    ON_The_Way_OrderList: BASE_URL + APICALL + 'ontheway-order-list',
    cancelled_delivery: BASE_URL + APICALL + 'cancelled-delivery',
    delivered_order_list: BASE_URL + APICALL + 'delivered-order-list',

    orderstatusupdate: BASE_URL + APICALL + 'orderstatusupdate',
    delivery_boy_earning_list: BASE_URL + APICALL + 'delivery-boy-earning-list',
    request_to_cancel_order: BASE_URL + APICALL + 'request-to-cancel-order',
    Request_Cancel_List: BASE_URL + APICALL + 'cancelled-process-request-list',


    // http://localhost:8000/api/admin/deliveryboy/notification/user/list
    NOTIFICATION_GET: BASE_URL + NOTIFICATION + 'list',
    NOTIFICATION_VIEW: BASE_URL + NOTIFICATION + 'show/',
    CLEAR_NOTIFICATION: BASE_URL + NOTIFICATION + 'notification/',


    // Withdrawal List

    WITHDRAWAL_LIST: BASE_URL + API + 'withdrawal/list',
    ADD_WITHDRAWAL: BASE_URL + API + 'withdrawal/create',
    BALANCE_WITHDRAWAL_LIST: BASE_URL + API + 'withdrawal/getbalance',

    // Bank

    BANK_LIST: BASE_URL + API + 'bank/list',
    CREATE_BANK_PAYMENT: BASE_URL + API + 'bank/create',
    DETAILS_BANK_LIST: BASE_URL + API + 'bank/show/', //{id}
    UPDATE_BANK_LIST: BASE_URL + API + 'bank/update', //{id}

};

export const API_TYPE = {
    POST: 'post',
    GET: 'get',
};
