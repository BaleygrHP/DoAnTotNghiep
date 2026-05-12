export const STATIC_HOST = 'https://new-api-homie.herokuapp.com';
export const THUMNAIL_URL_PRODUCTLIST = '/image/not_found.png';
export const THUMNAIL_URL_PRODUCTINFO = '/image/not_found.png';
export const THUMNAIL_URL_CATEGORYCHILD = '/image/not_found.png';
export const IMAGE_HOST = 'http://res.cloudinary.com';

export const listNavUser = [
  { _id: 0, href: '/order', label: 'Đang xử lý' },
  { _id: 1, href: '/orderPending', label: 'Chờ vận chuyển' },
  { _id: 2, href: '/orderComplete', label: 'Hoàn thành' },
  { _id: 3, href: '/orderCancel', label: 'Đã huỷ vận chuyển' },
  { _id: 4, href: '/orderUserCancel', label: 'Đã huỷ' },
  { _id: 5, href: '/editaccount', label: 'Thông tin cá nhân' },
  { _id: 6, href: '/addresses', label: 'Địa chỉ' }
];
