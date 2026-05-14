import StorageKeys from 'constants/storage-keys';

const MOCK_STORAGE_KEYS = {
  USERS: 'web_mock_users',
  ORDERS: 'web_mock_orders',
  ORDER_COMPLETES: 'web_mock_order_completes',
  RESET_TOKENS: 'web_mock_reset_tokens',
};

const productImages = {
  bagWomen: '/image/BK507PK0ZY027-01-01.jpg',
  bagWomenAlt: '/image/BK507PK0ZY027-01-02.jpg',
  menShirt: '/image/BM00LX11YS001-02-01.jpg',
  menShirtAlt1: '/image/BM00LX11YS001-02-03.jpg',
  menShirtAlt2: '/image/BM00LX11YS001-02-04.jpg',
  menShirtAlt3: '/image/BM00LX11YS001-02-06.jpg',
  menShirtAlt4: '/image/BM00LX11YS001-02-08.jpg',
  menShirtAlt5: '/image/BM00LX11YS001-02-09.jpg',
  sneaker: '/image/BH601ZH0NN001-01-01.jpg',
  wallet: '/image/BE0019E0VZ038-01-01.jpg',
  accessory: '/image/BMJ07G30AF004-01-01.jpg',
  accessoryAlt: '/image/BMJ0AA30AF001-01-01.jpg',
  womenCollection: '/image/CATALOGUE FW20 - WOMEN DROP01 BAG_2244x1104.jpg',
  shoesCollection: '/image/CATALOGUE FW20 - WOMEN DROP01 SHOES_2244x1104.jpg',
  accessoryCollection: '/image/CATALOGUE FW20 - WOMEN DROP01 ACCESS_Recadree_2244x1104_300DPI.jpg',
  womenBrowse: '/image/Home_Browse_FW20Antigona_W.jpg',
  menBrowse: '/image/Winter20_FlyOut_Men.jpg',
};

const mockCategories = [
  { _id: 1, nameCategory: 'Nu', status: true, icon: productImages.womenBrowse },
  { _id: 2, nameCategory: 'Nam', status: true, icon: productImages.menBrowse },
  { _id: 3, nameCategory: 'Phu kien', status: true, icon: productImages.accessoryCollection },
];

const mockSubcategories = [
  { _id: 101, categoryId: 1, namesubCategory: 'Tui xach', substatus: true, icon: productImages.womenCollection },
  { _id: 102, categoryId: 1, namesubCategory: 'Giay nu', substatus: true, icon: productImages.shoesCollection },
  { _id: 201, categoryId: 2, namesubCategory: 'Ao nam', substatus: true, icon: productImages.menShirt },
  { _id: 202, categoryId: 2, namesubCategory: 'Sneaker', substatus: true, icon: productImages.sneaker },
  { _id: 301, categoryId: 3, namesubCategory: 'Vi da', substatus: true, icon: productImages.wallet },
];

const mockProducts = [
  {
    _id: 1001,
    name: 'Antigona Mini Bag',
    content: 'New',
    description: 'Mini leather bag for daily styling',
    material: 'Cow leather',
    orgin: 'Italy',
    price: 4590000,
    status: true,
    subcategoryId: 101,
    imageMain: productImages.bagWomen,
    images: [productImages.bagWomen, productImages.bagWomenAlt, productImages.womenCollection],
    saleId: { _id: 5001, percentSale: 10 },
    gender: 'Female',
  },
  {
    _id: 1002,
    name: 'Voyou Shoulder Bag',
    content: 'Hot',
    description: 'Soft shoulder bag with adjustable strap',
    material: 'Calf leather',
    orgin: 'France',
    price: 5190000,
    status: true,
    subcategoryId: 101,
    imageMain: productImages.womenBrowse,
    images: [productImages.womenBrowse, productImages.bagWomenAlt, productImages.womenCollection],
    saleId: null,
    gender: 'Female',
  },
  {
    _id: 1003,
    name: 'Elegant Heel',
    content: 'Limited',
    description: 'Classic heel with clean silhouette',
    material: 'Leather',
    orgin: 'Spain',
    price: 3290000,
    status: true,
    subcategoryId: 102,
    imageMain: productImages.shoesCollection,
    images: [productImages.shoesCollection, productImages.sneaker],
    saleId: { _id: 5002, percentSale: 15 },
    gender: 'Female',
  },
  {
    _id: 2001,
    name: 'Oversized Logo Tee',
    content: 'Best seller',
    description: 'Relaxed fit cotton tee',
    material: '100% cotton',
    orgin: 'Vietnam',
    price: 1290000,
    status: true,
    subcategoryId: 201,
    imageMain: productImages.menShirt,
    images: [productImages.menShirt, productImages.menShirtAlt1, productImages.menShirtAlt2],
    saleId: null,
    gender: 'Male',
  },
  {
    _id: 2002,
    name: 'Streetwear Hoodie',
    content: 'New',
    description: 'Heavyweight hoodie for everyday use',
    material: 'French terry',
    orgin: 'Vietnam',
    price: 2190000,
    status: true,
    subcategoryId: 201,
    imageMain: productImages.menShirtAlt3,
    images: [productImages.menShirtAlt3, productImages.menShirtAlt4, productImages.menShirtAlt5],
    saleId: { _id: 5003, percentSale: 20 },
    gender: 'Male',
  },
  {
    _id: 2003,
    name: 'Minimal Polo',
    content: 'Classic',
    description: 'Lightweight polo with refined collar',
    material: 'Pique cotton',
    orgin: 'Portugal',
    price: 1490000,
    status: true,
    subcategoryId: 201,
    imageMain: productImages.menBrowse,
    images: [productImages.menBrowse, productImages.menShirt],
    saleId: null,
    gender: 'Male',
  },
  {
    _id: 2004,
    name: 'Urban Runner',
    content: 'Trend',
    description: 'Chunky sneaker with soft sole',
    material: 'Mesh and suede',
    orgin: 'China',
    price: 2890000,
    status: true,
    subcategoryId: 202,
    imageMain: productImages.sneaker,
    images: [productImages.sneaker, productImages.shoesCollection],
    saleId: null,
    gender: 'Male',
  },
  {
    _id: 3001,
    name: 'Leather Card Holder',
    content: 'Everyday',
    description: 'Slim wallet for cards and cash',
    material: 'Leather',
    orgin: 'Italy',
    price: 890000,
    status: true,
    subcategoryId: 301,
    imageMain: productImages.wallet,
    images: [productImages.wallet, productImages.accessory],
    saleId: null,
    gender: 'Unisex',
  },
  {
    _id: 3002,
    name: 'Signature Bracelet',
    content: 'Gift',
    description: 'Metal bracelet with logo charm',
    material: 'Steel',
    orgin: 'Korea',
    price: 990000,
    status: true,
    subcategoryId: 301,
    imageMain: productImages.accessory,
    images: [productImages.accessory, productImages.accessoryAlt],
    saleId: { _id: 5004, percentSale: 5 },
    gender: 'Unisex',
  },
];

const mockSizesByProductId = {
  1001: [
    { _id: 9101, nameSize: 'S', colors: [{ colorName: 'Black', quantity: 5 }, { colorName: 'Cream', quantity: 3 }] },
    { _id: 9102, nameSize: 'M', colors: [{ colorName: 'Black', quantity: 4 }, { colorName: 'Cream', quantity: 2 }] },
  ],
  1002: [
    { _id: 9103, nameSize: 'S', colors: [{ colorName: 'Brown', quantity: 6 }, { colorName: 'White', quantity: 1 }] },
    { _id: 9104, nameSize: 'M', colors: [{ colorName: 'Brown', quantity: 4 }, { colorName: 'White', quantity: 2 }] },
  ],
  1003: [
    { _id: 9105, nameSize: 'S', colors: [{ colorName: 'Beige', quantity: 3 }, { colorName: 'Black', quantity: 1 }] },
    { _id: 9106, nameSize: 'M', colors: [{ colorName: 'Beige', quantity: 2 }, { colorName: 'Black', quantity: 2 }] },
  ],
  2001: [
    { _id: 9201, nameSize: 'M', colors: [{ colorName: 'Black', quantity: 8 }, { colorName: 'White', quantity: 5 }] },
    { _id: 9202, nameSize: 'L', colors: [{ colorName: 'Black', quantity: 6 }, { colorName: 'White', quantity: 4 }] },
    { _id: 9203, nameSize: 'XL', colors: [{ colorName: 'Black', quantity: 2 }, { colorName: 'White', quantity: 1 }] },
  ],
  2002: [
    { _id: 9204, nameSize: 'M', colors: [{ colorName: 'Grey', quantity: 5 }, { colorName: 'Black', quantity: 3 }] },
    { _id: 9205, nameSize: 'L', colors: [{ colorName: 'Grey', quantity: 4 }, { colorName: 'Black', quantity: 2 }] },
  ],
  2003: [
    { _id: 9206, nameSize: 'M', colors: [{ colorName: 'Navy', quantity: 7 }] },
    { _id: 9207, nameSize: 'L', colors: [{ colorName: 'Navy', quantity: 3 }] },
  ],
  2004: [
    { _id: 9208, nameSize: '42', colors: [{ colorName: 'Black', quantity: 6 }, { colorName: 'White', quantity: 5 }] },
    { _id: 9209, nameSize: '43', colors: [{ colorName: 'Black', quantity: 4 }, { colorName: 'White', quantity: 3 }] },
  ],
  3001: [{ _id: 9301, nameSize: 'S', colors: [{ colorName: 'Black', quantity: 12 }, { colorName: 'Tan', quantity: 7 }] }],
  3002: [{ _id: 9302, nameSize: 'S', colors: [{ colorName: 'Silver', quantity: 10 }, { colorName: 'Gold', quantity: 6 }] }],
};

const mockTrending = [{ key: 'bag' }, { key: 'hoodie' }, { key: 'sneaker' }, { key: 'wallet' }, { key: 'bracelet' }, { key: 'tee' }];

const mockVouchers = [
  {
    _id: 8001,
    nameVouncher: 'WELCOME10',
    description: 'Discount for first purchase',
    discountPercent: 10,
    priceOrderLimit: 300000,
    dateEnd: { day: 31, month: 12, year: 2026 },
  },
  {
    _id: 8002,
    nameVouncher: 'FREESHIP',
    description: 'Support discount for shipping-heavy carts',
    discountPercent: 5,
    priceOrderLimit: 150000,
    dateEnd: { day: 31, month: 12, year: 2026 },
  },
];

const defaultAddress = {
  _id: 7001,
  gender: 'Female',
  nameCustomer: 'Lan Anh',
  detailAddress: '25 Nguyen Hue',
  phoneNumber: '0909000111',
  city: { value: '79', label: 'Ho Chi Minh' },
  district: { value: '760', label: 'District 1' },
  ward: { value: '26734', label: 'Ben Nghe' },
  default: true,
};

const defaultUser = {
  _id: 6001,
  role: 'user',
  gender: 'Female',
  fistname: 'Lan',
  lastname: 'Anh',
  email: 'demo@homie.local',
  password: '123456',
  phonenumber: '0909000111',
  date: 15,
  month: 8,
  addresses: [defaultAddress],
};

const clone = (value) => JSON.parse(JSON.stringify(value));

function hasStorage() {
  return typeof window !== 'undefined' && !!window.localStorage;
}

function readStorage(key, fallbackValue) {
  if (!hasStorage()) {
    return clone(fallbackValue);
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? JSON.parse(rawValue) : clone(fallbackValue);
  } catch (error) {
    return clone(fallbackValue);
  }
}

function writeStorage(key, value) {
  if (!hasStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

function getNextId(list) {
  return list.reduce((maxValue, item) => Math.max(maxValue, Number(item._id) || 0), 0) + 1;
}

function ensureUsers() {
  const users = readStorage(MOCK_STORAGE_KEYS.USERS, [defaultUser]);
  if (!users.some((user) => String(user._id) === String(defaultUser._id))) {
    users.unshift(clone(defaultUser));
    writeStorage(MOCK_STORAGE_KEYS.USERS, users);
  }
  return users;
}

function getCurrentUser() {
  const savedUser = readStorage(StorageKeys.USER, null);
  if (savedUser && savedUser._id) {
    return savedUser;
  }

  return clone(defaultUser);
}

function persistCurrentUser(user) {
  if (!hasStorage()) {
    return;
  }

  window.localStorage.setItem(StorageKeys.USER, JSON.stringify(user));
}

function syncUser(user) {
  const users = ensureUsers();
  const nextUsers = users.map((item) => (String(item._id) === String(user._id) ? clone(user) : item));

  if (!nextUsers.some((item) => String(item._id) === String(user._id))) {
    nextUsers.unshift(clone(user));
  }

  writeStorage(MOCK_STORAGE_KEYS.USERS, nextUsers);
  persistCurrentUser(user);

  return clone(user);
}

function ensureOrders() {
  const seededOrders = [
    {
      _id: 4001,
      userId: clone(defaultUser),
      addressrecevie: { name: 'Lan Anh', phonenumber: '0909000111', address: '25 Nguyen Hue' },
      totalPrice: 2580000,
      priceDiscount: 0,
      paymentMethod: 'None',
      status: 'Pending',
      createdAt: '2026-05-10T08:30:00.000Z',
      items: [
        {
          _id: 4101,
          productId: clone(mockProducts.find((product) => product._id === 2001)),
          quantity: 2,
          totalPrice: 2580000,
          saleId: null,
          sizeId: 9201,
          colorName: 'Black',
          sizeName: 'M',
        },
      ],
    },
    {
      _id: 4002,
      userId: clone(defaultUser),
      addressrecevie: { name: 'Lan Anh', phonenumber: '0909000111', address: '25 Nguyen Hue' },
      totalPrice: 4590000,
      priceDiscount: 300000,
      paymentMethod: 'None',
      status: 'Cancel',
      createdAt: '2026-05-08T11:20:00.000Z',
      items: [
        {
          _id: 4102,
          productId: clone(mockProducts.find((product) => product._id === 1001)),
          quantity: 1,
          totalPrice: 4590000,
          saleId: 5001,
          sizeId: 9101,
          colorName: 'Black',
          sizeName: 'S',
        },
      ],
    },
  ];

  return readStorage(MOCK_STORAGE_KEYS.ORDERS, seededOrders);
}

function saveOrders(orders) {
  writeStorage(MOCK_STORAGE_KEYS.ORDERS, orders);
}

function ensureOrderCompletes() {
  const seededCompletes = [
    {
      _id: 4501,
      orderId: {
        _id: 4003,
        userId: clone(defaultUser),
        addressrecevie: { name: 'Lan Anh', phonenumber: '0909000111', address: '25 Nguyen Hue' },
        totalPrice: 5190000,
        priceDiscount: 0,
        paymentMethod: 'Paypal',
        status: 'Done',
        createdAt: '2026-05-05T09:00:00.000Z',
        items: [
          {
            _id: 4103,
            productId: clone(mockProducts.find((product) => product._id === 1002)),
            quantity: 1,
            totalPrice: 5190000,
            saleId: null,
            sizeId: 9103,
            colorName: 'Brown',
            sizeName: 'S',
          },
        ],
      },
      shiprice: 30000,
      status: 'Done',
    },
    {
      _id: 4502,
      orderId: {
        _id: 4004,
        userId: clone(defaultUser),
        addressrecevie: { name: 'Lan Anh', phonenumber: '0909000111', address: '25 Nguyen Hue' },
        totalPrice: 2890000,
        priceDiscount: 0,
        paymentMethod: 'VNPAY',
        status: 'Waitting',
        createdAt: '2026-05-12T14:10:00.000Z',
        items: [
          {
            _id: 4104,
            productId: clone(mockProducts.find((product) => product._id === 2004)),
            quantity: 1,
            totalPrice: 2890000,
            saleId: null,
            sizeId: 9208,
            colorName: 'White',
            sizeName: '42',
          },
        ],
      },
      shiprice: 30000,
      status: 'Waitting',
    },
    {
      _id: 4503,
      orderId: {
        _id: 4005,
        userId: clone(defaultUser),
        addressrecevie: { name: 'Lan Anh', phonenumber: '0909000111', address: '25 Nguyen Hue' },
        totalPrice: 990000,
        priceDiscount: 0,
        paymentMethod: 'None',
        status: 'Failed',
        createdAt: '2026-05-02T16:45:00.000Z',
        items: [
          {
            _id: 4105,
            productId: clone(mockProducts.find((product) => product._id === 3002)),
            quantity: 1,
            totalPrice: 990000,
            saleId: 5004,
            sizeId: 9302,
            colorName: 'Silver',
            sizeName: 'S',
          },
        ],
      },
      shiprice: 30000,
      status: 'Failed',
    },
  ];

  return readStorage(MOCK_STORAGE_KEYS.ORDER_COMPLETES, seededCompletes);
}

function saveOrderCompletes(orderCompletes) {
  writeStorage(MOCK_STORAGE_KEYS.ORDER_COMPLETES, orderCompletes);
}

function getProductById(id) {
  return mockProducts.find((product) => String(product._id) === String(id));
}

function getCategoryWithChildren(categoryId) {
  const category = mockCategories.find((item) => String(item._id) === String(categoryId));
  if (!category) {
    return {};
  }

  return {
    ...clone(category),
    subcategories: clone(mockSubcategories.filter((item) => String(item.categoryId) === String(categoryId))),
  };
}

function createAddressLabel(value, fallbackLabel) {
  if (value && typeof value === 'object') {
    return value;
  }

  return {
    value: String(value || fallbackLabel).toLowerCase().replace(/\s+/g, '-'),
    label: fallbackLabel,
  };
}

function normalizeAddress(values, fallbackId) {
  return {
    _id: values._id || fallbackId,
    gender: values.gender || 'Male',
    nameCustomer: values.nameCustomer || '',
    detailAddress: values.detailAddress || '',
    phoneNumber: values.phoneNumber || '',
    city: createAddressLabel(values.city, 'Ho Chi Minh'),
    district: createAddressLabel(values.district, 'District 1'),
    ward: createAddressLabel(values.ward, 'Ben Nghe'),
    default: values.default === true || values.isdefault === true,
  };
}

function buildUserFromPayload(payload) {
  const users = ensureUsers();
  const nextId = getNextId(users);
  const fallbackName = payload.email ? payload.email.split('@')[0] : 'guest';
  const capitalizedName = fallbackName.charAt(0).toUpperCase() + fallbackName.slice(1);

  return {
    _id: nextId,
    role: 'user',
    gender: payload.gender || 'Male',
    fistname: payload.fistname || capitalizedName,
    lastname: payload.lastname || 'User',
    email: payload.email,
    password: payload.password || '123456',
    phonenumber: payload.phonenumber || payload.phoneNumber || '0909000222',
    date: payload.date || 1,
    month: payload.month || 1,
    addresses: [
      {
        _id: nextId + 1000,
        gender: payload.gender || 'Male',
        nameCustomer: `${payload.fistname || capitalizedName} ${payload.lastname || 'User'}`.trim(),
        detailAddress: 'Mock address',
        phoneNumber: payload.phoneNumber || '0909000222',
        city: { value: '79', label: 'Ho Chi Minh' },
        district: { value: '760', label: 'District 1' },
        ward: { value: '26734', label: 'Ben Nghe' },
        default: true,
      },
    ],
  };
}

function mapOrderItems(items = []) {
  return items.map((item, index) => {
    const product = getProductById(item.productId) || mockProducts[0];
    return {
      _id: item._id || Date.now() + index,
      productId: clone(product),
      quantity: item.quantity || 1,
      totalPrice: item.totalPrice || product.price,
      saleId: item.saleId || product.saleId?._id || null,
      sizeId: item.sizeId || null,
      colorName: item.colorName || 'Black',
      sizeName: item.sizeName || 'M',
    };
  });
}

export const webMockApi = {
  getCategories(params = {}) {
    let categories = [...mockCategories];

    if (typeof params.status !== 'undefined') {
      categories = categories.filter((item) => item.status === params.status);
    }

    if (params.limit) {
      categories = categories.slice(0, Number(params.limit));
    }

    return clone(categories);
  },

  getCategory(id) {
    return getCategoryWithChildren(id);
  },

  getCategoryChildren(id) {
    return getCategoryWithChildren(id);
  },

  getSubcategory(id) {
    return clone(mockSubcategories.find((item) => String(item._id) === String(id)) || {});
  },

  getProducts(params = {}) {
    let products = [...mockProducts];

    if (params.subcategoryId) {
      products = products.filter((item) => String(item.subcategoryId) === String(params.subcategoryId));
    }

    if (typeof params.status !== 'undefined') {
      products = products.filter((item) => item.status === params.status);
    }

    if (params.limit) {
      products = products.slice(0, Number(params.limit));
    }

    return clone(products);
  },

  getAllSearchProducts() {
    return clone(mockProducts.filter((item) => item.status));
  },

  getProduct(id) {
    return clone(getProductById(id) || {});
  },

  getProductSizes(id) {
    return clone(mockSizesByProductId[id] || []);
  },

  getRecommendations(values = {}) {
    const previousProduct = String(values.previousProduct || '');
    const currentProduct = getProductById(previousProduct);
    let products = mockProducts.filter((item) => String(item._id) !== previousProduct && item.status);

    if (currentProduct) {
      products = products.sort((left, right) => {
        const leftScore = Number(left.subcategoryId === currentProduct.subcategoryId) + Number(left.gender === currentProduct.gender);
        const rightScore = Number(right.subcategoryId === currentProduct.subcategoryId) + Number(right.gender === currentProduct.gender);
        return rightScore - leftScore;
      });
    }

    return {
      prediction: clone(products.slice(0, 4)),
    };
  },

  searchProducts(params = {}) {
    const keyword = String(params.stringSearch || '').trim().toLowerCase();
    if (!keyword) {
      return [];
    }

    return clone(
      mockProducts.filter((item) => `${item.name} ${item.content} ${item.description}`.toLowerCase().includes(keyword))
    );
  },

  getTopTrending() {
    return {
      listTrending: clone(mockTrending),
    };
  },

  registerUser(payload) {
    const users = ensureUsers();
    const existingUser = users.find((item) => item.email === payload.email);
    const nextUser = existingUser
      ? {
          ...existingUser,
          ...payload,
          addresses: existingUser.addresses?.length ? existingUser.addresses : clone(defaultUser.addresses),
          role: 'user',
        }
      : buildUserFromPayload(payload);

    const nextUsers = existingUser ? users.map((item) => (item.email === payload.email ? clone(nextUser) : item)) : [clone(nextUser), ...users];
    writeStorage(MOCK_STORAGE_KEYS.USERS, nextUsers);
    persistCurrentUser(nextUser);

    return {
      jwt: 'mock-jwt-token',
      user: clone(nextUser),
    };
  },

  loginUser(payload) {
    const users = ensureUsers();
    let user = users.find((item) => item.email === payload.email);

    if (!user) {
      user = buildUserFromPayload(payload);
      writeStorage(MOCK_STORAGE_KEYS.USERS, [clone(user), ...users]);
    }

    persistCurrentUser(user);

    return {
      jwt: 'mock-jwt-token',
      user: clone(user),
    };
  },

  loginGoogleUser() {
    const googleUser = {
      ...clone(defaultUser),
      _id: 6010,
      email: 'google.mock@homie.local',
      fistname: 'Google',
      lastname: 'User',
    };

    syncUser(googleUser);

    return {
      jwt: 'mock-google-jwt-token',
      user: clone(googleUser),
    };
  },

  updateUser(payload) {
    const currentUser = getCurrentUser();
    const nextUser = {
      ...currentUser,
      ...payload,
      addresses: currentUser.addresses || [],
      role: 'user',
    };

    return syncUser(nextUser);
  },

  changePassword(values) {
    return {
      success: true,
      passwordOld: values.passwordOld || null,
      passwordNew: values.passwordNew || null,
    };
  },

  getAddresses() {
    return clone(getCurrentUser().addresses || []);
  },

  addAddress(values) {
    const currentUser = getCurrentUser();
    const nextAddress = normalizeAddress(values, Date.now());
    const hasDefault = currentUser.addresses?.some((item) => item.default);

    if (!hasDefault) {
      nextAddress.default = true;
    }

    const nextUser = {
      ...currentUser,
      addresses: [...(currentUser.addresses || []), nextAddress],
    };

    return syncUser(nextUser);
  },

  updateAddress(id, values) {
    const currentUser = getCurrentUser();
    const normalizedAddress = normalizeAddress(values, id);
    let addresses = (currentUser.addresses || []).map((item) => {
      if (String(item._id) !== String(id)) {
        return item;
      }

      return {
        ...item,
        ...normalizedAddress,
      };
    });

    if (normalizedAddress.default) {
      addresses = addresses.map((item) => ({
        ...item,
        default: String(item._id) === String(id),
      }));
    }

    if (addresses.length > 0 && !addresses.some((item) => item.default)) {
      addresses[0].default = true;
    }

    return syncUser({
      ...currentUser,
      addresses,
    });
  },

  deleteAddress(id) {
    const currentUser = getCurrentUser();
    const addresses = (currentUser.addresses || []).filter((item) => String(item._id) !== String(id));

    if (addresses.length > 0 && !addresses.some((item) => item.default)) {
      addresses[0].default = true;
    }

    return syncUser({
      ...currentUser,
      addresses,
    });
  },

  resetPassword(values) {
    const tokens = readStorage(MOCK_STORAGE_KEYS.RESET_TOKENS, {});
    tokens[values.email] = 'mock-reset-token';
    writeStorage(MOCK_STORAGE_KEYS.RESET_TOKENS, tokens);

    return {
      success: true,
      token: 'mock-reset-token',
    };
  },

  confirmResetPassword(values) {
    return {
      success: true,
      token: values.token,
      passwordNew: values.passwordNew,
    };
  },

  getVouchersForUser() {
    return clone(mockVouchers);
  },

  addOrder(values) {
    const orders = ensureOrders();
    const currentUser = ensureUsers().find((item) => String(item._id) === String(values.userId)) || getCurrentUser();
    const nextOrder = {
      _id: getNextId(orders),
      userId: clone(currentUser),
      addressrecevie: clone(values.addressrecevie),
      totalPrice: values.totalPrice || 0,
      priceDiscount: values.priceDiscount || 0,
      paymentMethod: values.isPaypal ? 'Paypal' : 'None',
      status: 'Pending',
      createdAt: new Date().toISOString(),
      items: mapOrderItems(values.items),
    };

    const nextOrders = [nextOrder, ...orders];
    saveOrders(nextOrders);

    return clone(nextOrder);
  },

  getOrders(params = {}) {
    const currentUser = getCurrentUser();
    let orders = ensureOrders().filter((item) => String(item.userId._id) === String(currentUser._id));

    if (params.status) {
      orders = orders.filter((item) => item.status === params.status);
    }

    return clone(orders);
  },

  cancelOrder(id) {
    const orders = ensureOrders();
    let cancelledOrder = null;
    const nextOrders = orders.map((item) => {
      if (String(item._id) !== String(id)) {
        return item;
      }

      cancelledOrder = {
        ...item,
        status: 'Cancel',
      };

      return cancelledOrder;
    });

    saveOrders(nextOrders);

    return clone(cancelledOrder || {});
  },

  getCompletedOrders(params = {}) {
    const currentUser = getCurrentUser();
    let orderCompletes = ensureOrderCompletes().filter((item) => String(item.orderId.userId._id) === String(currentUser._id));

    if (params.status) {
      orderCompletes = orderCompletes.filter((item) => item.status === params.status);
    }

    return clone(orderCompletes);
  },

  payWithVNPay(id) {
    const orders = ensureOrders();
    const orderIndex = orders.findIndex((item) => String(item._id) === String(id));

    if (orderIndex === -1) {
      return {
        vnpUrl: '/orderPending',
      };
    }

    const [order] = orders.splice(orderIndex, 1);
    const orderCompletes = ensureOrderCompletes();
    const nextOrderComplete = {
      _id: getNextId(orderCompletes),
      orderId: {
        ...order,
        paymentMethod: 'VNPAY',
        status: 'Waitting',
      },
      shiprice: 30000,
      status: 'Waitting',
    };

    saveOrders(orders);
    saveOrderCompletes([nextOrderComplete, ...orderCompletes]);

    return {
      vnpUrl: '/orderPending',
    };
  },
};
