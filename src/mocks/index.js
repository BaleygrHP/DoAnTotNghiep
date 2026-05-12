import StorageKeys from 'constants/storage-keys';

export const MOCK_DB_KEY = 'mock_db_v1';
export const MOCK_SESSION_KEY = 'mock_session_v1';
export const DATA_MODE = String(process.env.REACT_APP_DATA_MODE || 'MOCK')
  .trim()
  .toUpperCase();
export const isApiMode = DATA_MODE === 'API';
export const isMockMode = !isApiMode;

const INITIAL_COUNTERS = {
  user: 4,
  address: 4,
  category: 4,
  subcategory: 7,
  product: 9,
  size: 13,
  sale: 3,
  coupon: 4,
  order: 9004,
  orderComplete: 10004,
  resetToken: 2,
};

const LOCATION_TREE = {
  cities: [
    {
      id: '79',
      name: 'Ho Chi Minh',
      districts: [
        {
          id: '760',
          name: 'District 1',
          wards: [
            { id: '26734', name: 'Ben Nghe' },
            { id: '26737', name: 'Ben Thanh' },
          ],
        },
        {
          id: '769',
          name: 'District 7',
          wards: [
            { id: '27196', name: 'Tan Phong' },
            { id: '27208', name: 'Tan Quy' },
          ],
        },
      ],
    },
    {
      id: '01',
      name: 'Ha Noi',
      districts: [
        {
          id: '001',
          name: 'Ba Dinh',
          wards: [
            { id: '00001', name: 'Phuc Xa' },
            { id: '00004', name: 'Truc Bach' },
          ],
        },
        {
          id: '007',
          name: 'Hoan Kiem',
          wards: [
            { id: '00100', name: 'Hang Trong' },
            { id: '00103', name: 'Hang Bong' },
          ],
        },
      ],
    },
  ],
};

const PRODUCT_IMAGES = {
  shirtWhite: ['/image/BB50F2B0WD051-01-01.jpg', '/image/BK507PK0ZY027-01-01.jpg', '/image/BK507PK0ZY027-01-02.jpg'],
  blazerBlack: ['/image/BMJ07G30AF004-01-01.jpg', '/image/BM00LX11YS001-02-01.jpg', '/image/BM00LX11YS001-02-03.jpg'],
  dressRed: ['/image/BE0019E0VZ038-01-01.jpg', '/image/Home_Browse_FW20Antigona_W.jpg', '/image/GIVENCHY_DIGITAL_AD_CAMPAIGN_750x750_03.jpg'],
  bagBrown: ['/image/AntigonaPouch_Browse_Men.jpg', '/image/Collection-Land-Desktop.jpg', '/image/Home_Menu_Collection_Flyout.jpg'],
  shoesBlack: ['/image/BH601ZH0NN001-01-01.jpg', '/image/Winter20_FlyOut_Men.jpg', '/image/GIVENCHY_DIGITAL_AD_CAMPAIGN_750x750_03 (1).jpg'],
  trouserGrey: ['/image/BM710P3002055-02-01.jpg', '/image/BM710P3002055-02-02.jpg', '/image/BM710P3002055-02-04.jpg'],
  handbagPink: ['/image/CATALOGUE FW20 - WOMEN DROP01 BAG_2244x1104.jpg', '/image/Home_Carousel_Spring21_Antigona-Desktop.jpg', '/image/Homepage_Carousel_Holiday_ForHer_Desktop.jpg'],
  accessory: ['/image/discover.png', '/image/Parfum_Linterdit.jpg', '/image/GIVENCHY_DIGITAL_AD_CAMPAIGN_2244x1104_03.jpg'],
};

function getStorage() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  return window.localStorage;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readStorage(key) {
  const storage = getStorage();
  if (!storage) {
    return null;
  }

  try {
    return storage.getItem(key);
  } catch (error) {
    return null;
  }
}

function writeStorage(key, value) {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.setItem(key, value);
}

function removeStorage(key) {
  const storage = getStorage();
  if (!storage) {
    return;
  }

  storage.removeItem(key);
}

function nowIso() {
  return new Date().toISOString();
}

function toBoolean(value, fallback = false) {
  if (value === true || value === 'true') {
    return true;
  }

  if (value === false || value === 'false') {
    return false;
  }

  return fallback;
}

function toNumber(value, fallback = null) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim() !== '') {
    const numericValue = Number(value);
    if (Number.isFinite(numericValue)) {
      return numericValue;
    }
  }

  return fallback;
}

function normalizeDateParts(dateValue, fallback = new Date()) {
  if (dateValue && typeof dateValue === 'object' && dateValue.day && dateValue.month && dateValue.year) {
    return {
      day: Number(dateValue.day),
      month: Number(dateValue.month),
      year: Number(dateValue.year),
    };
  }

  return {
    day: fallback.getDate(),
    month: fallback.getMonth() + 1,
    year: fallback.getFullYear(),
  };
}

function delay(result) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(clone(result)), 120);
  });
}

function rejectWithMessage(message) {
  throw new Error(message);
}

function fileToDataUrl(file) {
  if (!file) {
    return Promise.resolve('');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Khong doc duoc tep tai len'));
    reader.readAsDataURL(file);
  });
}

async function extractPhotos(formData) {
  if (!formData || typeof formData.getAll !== 'function') {
    return [];
  }

  const files = formData.getAll('photo').filter(Boolean);
  return Promise.all(files.map((file) => fileToDataUrl(file)));
}

function createLocation(labelIds) {
  const city = LOCATION_TREE.cities.find((item) => item.id === labelIds.cityId) || LOCATION_TREE.cities[0];
  const district = city.districts.find((item) => item.id === labelIds.districtId) || city.districts[0];
  const ward = district.wards.find((item) => item.id === labelIds.wardId) || district.wards[0];

  return {
    city: { value: city.id, label: city.name },
    district: { value: district.id, label: district.name },
    ward: { value: ward.id, label: ward.name },
  };
}

function createSeedDb() {
  const primaryLocation = createLocation({ cityId: '79', districtId: '760', wardId: '26734' });
  const secondaryLocation = createLocation({ cityId: '79', districtId: '769', wardId: '27196' });
  const hanoiLocation = createLocation({ cityId: '01', districtId: '001', wardId: '00001' });

  return {
    version: 1,
    counters: clone(INITIAL_COUNTERS),
    locations: clone(LOCATION_TREE),
    resetTokens: [],
    users: [
      {
        _id: 1,
        gender: 'Male',
        lastname: 'Mock',
        fistname: 'Admin',
        email: 'admin@mock.local',
        password: 'Admin123!',
        phonenumber: '0900000001',
        role: 'admin',
        status: true,
        date: '01',
        month: '01',
        createdAt: '2026-01-01T08:00:00.000Z',
        updatedAt: '2026-05-01T08:00:00.000Z',
        addresses: [
          {
            _id: 1,
            gender: 'Male',
            nameCustomer: 'Mock Admin',
            detailAddress: '12 Nguyen Hue',
            phoneNumber: '0900000001',
            default: true,
            ...primaryLocation,
          },
        ],
      },
      {
        _id: 2,
        gender: 'Female',
        lastname: 'Nguyen',
        fistname: 'An',
        email: 'user@mock.local',
        password: 'User123!',
        phonenumber: '0900000002',
        role: 'user',
        status: true,
        date: '12',
        month: '05',
        createdAt: '2026-01-10T09:30:00.000Z',
        updatedAt: '2026-05-02T10:15:00.000Z',
        addresses: [
          {
            _id: 2,
            gender: 'Female',
            nameCustomer: 'Nguyen An',
            detailAddress: '88 Le Loi',
            phoneNumber: '0900000002',
            default: true,
            ...secondaryLocation,
          },
          {
            _id: 3,
            gender: 'Female',
            nameCustomer: 'Nguyen An',
            detailAddress: '21 Hang Gai',
            phoneNumber: '0900000003',
            default: false,
            ...hanoiLocation,
          },
        ],
      },
      {
        _id: 3,
        gender: 'Female',
        lastname: 'Tran',
        fistname: 'Google',
        email: 'google@mock.local',
        password: 'Google123!',
        phonenumber: '0900000004',
        role: 'user',
        status: true,
        date: '20',
        month: '08',
        createdAt: '2026-02-01T08:00:00.000Z',
        updatedAt: '2026-05-02T08:00:00.000Z',
        addresses: [],
        provider: 'google',
      },
    ],
    categories: [
      {
        _id: 1,
        nameCategory: 'Nam',
        status: true,
        datecreated: '2026-01-01T08:00:00.000Z',
      },
      {
        _id: 2,
        nameCategory: 'Nu',
        status: true,
        datecreated: '2026-01-02T08:00:00.000Z',
      },
      {
        _id: 3,
        nameCategory: 'Phu kien',
        status: true,
        datecreated: '2026-01-03T08:00:00.000Z',
      },
    ],
    subcategories: [
      {
        _id: 101,
        namesubCategory: 'Ao so mi nam',
        categoryID: 1,
        substatus: true,
        icon: '/image/Home_Menu_Collection_Flyout.jpg',
        date: '2026-01-05T08:00:00.000Z',
      },
      {
        _id: 102,
        namesubCategory: 'Quan tay nam',
        categoryID: 1,
        substatus: true,
        icon: '/image/Winter20_FlyOut_Men.jpg',
        date: '2026-01-05T09:00:00.000Z',
      },
      {
        _id: 201,
        namesubCategory: 'Dam nu',
        categoryID: 2,
        substatus: true,
        icon: '/image/Home_Browse_FW20Antigona_W.jpg',
        date: '2026-01-06T08:00:00.000Z',
      },
      {
        _id: 202,
        namesubCategory: 'Tui xach nu',
        categoryID: 2,
        substatus: true,
        icon: '/image/Collection-Land-Desktop.jpg',
        date: '2026-01-06T09:00:00.000Z',
      },
      {
        _id: 301,
        namesubCategory: 'Giay',
        categoryID: 3,
        substatus: true,
        icon: '/image/CATALOGUE FW20 - WOMEN DROP01 SHOES_2244x1104.jpg',
        date: '2026-01-07T08:00:00.000Z',
      },
      {
        _id: 302,
        namesubCategory: 'Phu kien nho',
        categoryID: 3,
        substatus: true,
        icon: '/image/discover.png',
        date: '2026-01-07T09:00:00.000Z',
      },
    ],
    sales: [
      {
        _id: 401,
        productId: 1001,
        nameSale: 'SUMMER20',
        percentSale: 20,
        description: 'Giam gia mua he',
        statusSale: true,
      },
      {
        _id: 402,
        productId: 2002,
        nameSale: 'BAG15',
        percentSale: 15,
        description: 'Tui xach uu dai',
        statusSale: true,
      },
    ],
    products: [
      {
        _id: 1001,
        content: 'New',
        description: 'Ao so mi linen form regular cho nam.',
        name: 'Ao so mi linen trang',
        material: 'Linen',
        orgin: 'Viet Nam',
        price: 590000,
        status: true,
        subcategoryId: 101,
        saleId: 401,
        imageMain: PRODUCT_IMAGES.shirtWhite[0],
        images: PRODUCT_IMAGES.shirtWhite,
      },
      {
        _id: 1002,
        content: 'Classic',
        description: 'Blazer toi gian phu hop cong so.',
        name: 'Blazer den slim fit',
        material: 'Polyester wool',
        orgin: 'Viet Nam',
        price: 1290000,
        status: true,
        subcategoryId: 101,
        saleId: null,
        imageMain: PRODUCT_IMAGES.blazerBlack[0],
        images: PRODUCT_IMAGES.blazerBlack,
      },
      {
        _id: 1003,
        content: 'Smart',
        description: 'Quan tay xam de ket hop blazer.',
        name: 'Quan tay xam',
        material: 'Cotton twill',
        orgin: 'Viet Nam',
        price: 690000,
        status: true,
        subcategoryId: 102,
        saleId: null,
        imageMain: PRODUCT_IMAGES.trouserGrey[0],
        images: PRODUCT_IMAGES.trouserGrey,
      },
      {
        _id: 2001,
        content: 'Elegant',
        description: 'Dam do tay phong thanh lich.',
        name: 'Dam do midi',
        material: 'Silk blend',
        orgin: 'Italy',
        price: 1490000,
        status: true,
        subcategoryId: 201,
        saleId: null,
        imageMain: PRODUCT_IMAGES.dressRed[0],
        images: PRODUCT_IMAGES.dressRed,
      },
      {
        _id: 2002,
        content: 'Hot',
        description: 'Tui xach mini cho ngay cuoi tuan.',
        name: 'Tui mini da nau',
        material: 'Leather',
        orgin: 'Italy',
        price: 2190000,
        status: true,
        subcategoryId: 202,
        saleId: 402,
        imageMain: PRODUCT_IMAGES.bagBrown[0],
        images: PRODUCT_IMAGES.bagBrown,
      },
      {
        _id: 2003,
        content: 'Limited',
        description: 'Handbag tong hong phong cach vintage.',
        name: 'Handbag hong pastel',
        material: 'Leather',
        orgin: 'France',
        price: 2590000,
        status: true,
        subcategoryId: 202,
        saleId: null,
        imageMain: PRODUCT_IMAGES.handbagPink[0],
        images: PRODUCT_IMAGES.handbagPink,
      },
      {
        _id: 3001,
        content: 'Running',
        description: 'Giay da co phom gon nhe.',
        name: 'Giay da den',
        material: 'Leather',
        orgin: 'Spain',
        price: 1890000,
        status: true,
        subcategoryId: 301,
        saleId: null,
        imageMain: PRODUCT_IMAGES.shoesBlack[0],
        images: PRODUCT_IMAGES.shoesBlack,
      },
      {
        _id: 3002,
        content: 'Gift',
        description: 'Khan lua va charm phu kien cao cap.',
        name: 'Bo phu kien cao cap',
        material: 'Silk',
        orgin: 'France',
        price: 490000,
        status: true,
        subcategoryId: 302,
        saleId: null,
        imageMain: PRODUCT_IMAGES.accessory[0],
        images: PRODUCT_IMAGES.accessory,
      },
    ],
    sizes: [
      { _id: 501, productId: 1001, nameSize: 'S', colors: [{ colorName: 'Trang', quantity: 4 }, { colorName: 'Den', quantity: 2 }] },
      { _id: 502, productId: 1001, nameSize: 'M', colors: [{ colorName: 'Trang', quantity: 5 }, { colorName: 'Den', quantity: 2 }] },
      { _id: 503, productId: 1002, nameSize: 'M', colors: [{ colorName: 'Den', quantity: 3 }] },
      { _id: 504, productId: 1002, nameSize: 'L', colors: [{ colorName: 'Den', quantity: 1 }] },
      { _id: 505, productId: 1003, nameSize: 'M', colors: [{ colorName: 'Xam', quantity: 5 }] },
      { _id: 506, productId: 1003, nameSize: 'L', colors: [{ colorName: 'Xam', quantity: 4 }] },
      { _id: 507, productId: 2001, nameSize: 'S', colors: [{ colorName: 'Do', quantity: 2 }] },
      { _id: 508, productId: 2001, nameSize: 'M', colors: [{ colorName: 'Do', quantity: 3 }] },
      { _id: 509, productId: 2002, nameSize: 'M', colors: [{ colorName: 'Nau', quantity: 6 }] },
      { _id: 510, productId: 2003, nameSize: 'S', colors: [{ colorName: 'Hong', quantity: 2 }] },
      { _id: 511, productId: 3001, nameSize: '42', colors: [{ colorName: 'Den', quantity: 5 }] },
      { _id: 512, productId: 3002, nameSize: 'M', colors: [{ colorName: 'Vang', quantity: 8 }] },
    ],
    coupons: [
      {
        _id: 701,
        nameVouncher: 'WELCOME10',
        description: 'Giam 10% cho don hang dau tien',
        discountPercent: 10,
        priceOrderLimit: 100000,
        statusCoupon: true,
        dateStart: { day: 1, month: 1, year: 2026 },
        dateEnd: { day: 31, month: 12, year: 2026 },
      },
      {
        _id: 702,
        nameVouncher: 'FREESHIP',
        description: 'Giam toi da 50000',
        discountPercent: 5,
        priceOrderLimit: 50000,
        statusCoupon: true,
        dateStart: { day: 1, month: 2, year: 2026 },
        dateEnd: { day: 31, month: 12, year: 2026 },
      },
      {
        _id: 703,
        nameVouncher: 'VIP20',
        description: 'Uu dai cho thanh vien VIP',
        discountPercent: 20,
        priceOrderLimit: 200000,
        statusCoupon: true,
        dateStart: { day: 1, month: 3, year: 2026 },
        dateEnd: { day: 31, month: 12, year: 2026 },
      },
    ],
    orders: [
      {
        _id: 9001,
        userId: 2,
        addressrecevie: {
          name: 'Nguyen An',
          phonenumber: '0900000002',
          address: '88 Le Loi, District 7, Ho Chi Minh',
        },
        items: [
          {
            _id: 1,
            productId: 1001,
            quantity: 1,
            totalPrice: 472000,
            saleId: 401,
            colorName: 'Trang',
            sizeId: 502,
            sizeName: 'M',
          },
        ],
        priceDiscount: 0,
        totalPrice: 472000,
        paymentMethod: 'None',
        status: 'Pending',
        isPaypal: false,
        createdAt: '2026-05-08T09:00:00.000Z',
      },
      {
        _id: 9002,
        userId: 2,
        addressrecevie: {
          name: 'Nguyen An',
          phonenumber: '0900000002',
          address: '21 Hang Gai, Ba Dinh, Ha Noi',
        },
        items: [
          {
            _id: 2,
            productId: 3002,
            quantity: 1,
            totalPrice: 490000,
            saleId: null,
            colorName: 'Vang',
            sizeId: 512,
            sizeName: 'M',
          },
        ],
        priceDiscount: 0,
        totalPrice: 490000,
        paymentMethod: 'None',
        status: 'Cancel',
        isPaypal: false,
        createdAt: '2026-05-02T09:00:00.000Z',
      },
      {
        _id: 9003,
        userId: 2,
        addressrecevie: {
          name: 'Nguyen An',
          phonenumber: '0900000002',
          address: '88 Le Loi, District 7, Ho Chi Minh',
        },
        items: [
          {
            _id: 3,
            productId: 2002,
            quantity: 1,
            totalPrice: 93,
            saleId: 402,
            colorName: 'Nau',
            sizeId: 509,
            sizeName: 'M',
          },
        ],
        priceDiscount: 0,
        totalPrice: 1861500,
        paymentMethod: 'Paypal',
        status: 'Pending',
        isPaypal: true,
        createdAt: '2026-05-11T11:00:00.000Z',
      },
    ],
    orderCompletes: [
      {
        _id: 10001,
        orderId: {
          _id: 8901,
          userId: 2,
          addressrecevie: {
            name: 'Nguyen An',
            phonenumber: '0900000002',
            address: '88 Le Loi, District 7, Ho Chi Minh',
          },
          items: [
            {
              _id: 4,
              productId: 1003,
              quantity: 1,
              totalPrice: 690000,
              saleId: null,
              colorName: 'Xam',
              sizeId: 505,
              sizeName: 'M',
            },
          ],
          priceDiscount: 0,
          totalPrice: 690000,
          paymentMethod: 'None',
          status: 'Pending',
          isPaypal: false,
          createdAt: '2026-05-09T12:00:00.000Z',
        },
        shiprice: 10000,
        totalPrice: 700000,
        status: 'Waitting',
        createdAt: '2026-05-09T14:00:00.000Z',
      },
      {
        _id: 10002,
        orderId: {
          _id: 8902,
          userId: 2,
          addressrecevie: {
            name: 'Nguyen An',
            phonenumber: '0900000002',
            address: '88 Le Loi, District 7, Ho Chi Minh',
          },
          items: [
            {
              _id: 5,
              productId: 2001,
              quantity: 1,
              totalPrice: 1490000,
              saleId: null,
              colorName: 'Do',
              sizeId: 508,
              sizeName: 'M',
            },
          ],
          priceDiscount: 0,
          totalPrice: 1490000,
          paymentMethod: 'None',
          status: 'Pending',
          isPaypal: false,
          createdAt: '2026-05-03T12:00:00.000Z',
        },
        shiprice: 10000,
        totalPrice: 1500000,
        status: 'Done',
        createdAt: '2026-05-03T14:00:00.000Z',
      },
      {
        _id: 10003,
        orderId: {
          _id: 8903,
          userId: 2,
          addressrecevie: {
            name: 'Nguyen An',
            phonenumber: '0900000002',
            address: '21 Hang Gai, Ba Dinh, Ha Noi',
          },
          items: [
            {
              _id: 6,
              productId: 3001,
              quantity: 1,
              totalPrice: 1890000,
              saleId: null,
              colorName: 'Den',
              sizeId: 511,
              sizeName: '42',
            },
          ],
          priceDiscount: 0,
          totalPrice: 1890000,
          paymentMethod: 'None',
          status: 'Pending',
          isPaypal: false,
          createdAt: '2026-04-28T12:00:00.000Z',
        },
        shiprice: 10000,
        totalPrice: 1900000,
        status: 'Failed',
        createdAt: '2026-04-28T14:00:00.000Z',
      },
    ],
  };
}

function getDb() {
  const rawValue = readStorage(MOCK_DB_KEY);
  if (!rawValue) {
    const seededDb = createSeedDb();
    writeStorage(MOCK_DB_KEY, JSON.stringify(seededDb));
    return seededDb;
  }

  try {
    const parsedDb = JSON.parse(rawValue);
    if (parsedDb?.version === 1 && parsedDb?.counters) {
      return parsedDb;
    }
  } catch (error) {
    // fall through to reseed
  }

  const reseededDb = createSeedDb();
  writeStorage(MOCK_DB_KEY, JSON.stringify(reseededDb));
  return reseededDb;
}

function saveDb(db) {
  writeStorage(MOCK_DB_KEY, JSON.stringify(db));
}

function nextId(db, key) {
  const currentValue = db.counters[key] || 1;
  db.counters[key] = currentValue + 1;
  return currentValue;
}

function getSession() {
  const rawSession = readStorage(MOCK_SESSION_KEY);
  if (!rawSession) {
    return null;
  }

  try {
    return JSON.parse(rawSession);
  } catch (error) {
    return null;
  }
}

function persistLegacyUser(user, token) {
  if (user) {
    writeStorage(StorageKeys.USER, JSON.stringify(user));
  } else {
    removeStorage(StorageKeys.USER);
  }

  if (token) {
    writeStorage(StorageKeys.TOKEN, token);
  } else {
    removeStorage(StorageKeys.TOKEN);
  }
}

function setSession(user) {
  const token = `mock-token-${user._id}`;
  const safeUser = formatUser(user);
  writeStorage(
    MOCK_SESSION_KEY,
    JSON.stringify({
      token,
      userId: user._id,
      updatedAt: nowIso(),
    })
  );
  persistLegacyUser(safeUser, token);

  return {
    jwt: token,
    user: safeUser,
  };
}

export function clearMockSession() {
  removeStorage(MOCK_SESSION_KEY);
  persistLegacyUser(null, null);
}

function ensureCurrentUser(db) {
  const session = getSession();
  const userId = session?.userId;
  const currentUser = db.users.find((user) => user._id === userId);
  if (!currentUser) {
    rejectWithMessage('Ban can dang nhap de thuc hien hanh dong nay');
  }

  return currentUser;
}

function findUserById(db, id) {
  return db.users.find((user) => user._id === toNumber(id, id));
}

function findCategoryById(db, id) {
  return db.categories.find((category) => category._id === toNumber(id, id));
}

function findSubcategoryById(db, id) {
  return db.subcategories.find((subcategory) => subcategory._id === toNumber(id, id));
}

function findProductById(db, id) {
  return db.products.find((product) => product._id === toNumber(id, id));
}

function findSizeById(db, id) {
  return db.sizes.find((size) => size._id === toNumber(id, id));
}

function findSaleById(db, id) {
  return db.sales.find((sale) => sale._id === toNumber(id, id));
}

function formatUser(user) {
  const safeUser = clone(user);
  delete safeUser.password;

  return {
    ...safeUser,
    id: safeUser._id,
    FName: `${safeUser.lastname || ''} ${safeUser.fistname || ''}`.trim(),
    Address: safeUser.addresses?.find((address) => address.default)?.detailAddress || '',
    avatarUrl: safeUser.avatarUrl || '/image/auth.jpeg',
  };
}

function formatCategory(category, db) {
  return {
    ...clone(category),
    id: category._id,
    subcategories: db.subcategories.filter((subcategory) => subcategory.categoryID === category._id).map((subcategory) => formatSubcategory(subcategory, db)),
  };
}

function formatCategoryOption(category) {
  return {
    _id: category._id,
    id: category._id,
    label: category.nameCategory,
    value: category._id,
    nameCategory: category.nameCategory,
    status: category.status,
  };
}

function formatSubcategory(subcategory, db) {
  const parentCategory = findCategoryById(db, subcategory.categoryID);
  return {
    ...clone(subcategory),
    id: subcategory._id,
    categoryID: parentCategory ? formatCategoryOption(parentCategory) : subcategory.categoryID,
  };
}

function formatSaleForProduct(sale) {
  if (!sale) {
    return null;
  }

  return {
    _id: sale._id,
    nameSale: sale.nameSale,
    percentSale: Number(sale.percentSale),
    description: sale.description,
    statusSale: sale.statusSale,
  };
}

function formatProduct(product, db) {
  const productSubcategory = findSubcategoryById(db, product.subcategoryId);
  const sale = findSaleById(db, product.saleId);

  return {
    ...clone(product),
    id: product._id,
    subcategoryId: productSubcategory ? formatSubcategory(productSubcategory, db) : product.subcategoryId,
    saleId: formatSaleForProduct(sale),
    images: Array.isArray(product.images) ? clone(product.images) : [],
  };
}

function formatSize(size) {
  return {
    ...clone(size),
    id: size._id,
  };
}

function formatOrderItem(item, db) {
  const productSnapshot = item.productSnapshot || findProductById(db, item.productId);
  const formattedProduct = productSnapshot ? formatProduct(productSnapshot, db) : null;

  return {
    ...clone(item),
    id: item._id,
    productId: formattedProduct || item.productId,
  };
}

function formatOrder(order, db) {
  const rawUser = typeof order.userId === 'object' ? order.userId : findUserById(db, order.userId);
  return {
    ...clone(order),
    id: order._id,
    userId: rawUser ? formatUser(rawUser) : order.userId,
    items: (order.items || []).map((item) => formatOrderItem(item, db)),
  };
}

function formatOrderComplete(orderComplete, db) {
  return {
    ...clone(orderComplete),
    id: orderComplete._id,
    orderId: formatOrder(orderComplete.orderId, db),
  };
}

function getActiveCoupons(db) {
  return db.coupons.filter((coupon) => coupon.statusCoupon !== false);
}

function sortByDate(items, key = 'createdAt') {
  return [...items].sort((firstItem, secondItem) => new Date(secondItem[key]) - new Date(firstItem[key]));
}

function sortByNumberDesc(items, key) {
  return [...items].sort((firstItem, secondItem) => Number(secondItem[key] || 0) - Number(firstItem[key] || 0));
}

function normalizeAddressPayload(values, existingAddresses = []) {
  const shouldBeDefault = values.isdefault === true || values.isdefault === 'true' || values.default === true || values.default === 'true' || existingAddresses.length === 0;

  return {
    _id: values._id ? toNumber(values._id, values._id) : null,
    gender: values.gender || 'Male',
    nameCustomer: values.nameCustomer || '',
    detailAddress: values.detailAddress || '',
    phoneNumber: values.phoneNumber || '',
    default: shouldBeDefault,
    city: values.city,
    district: values.district,
    ward: values.ward,
  };
}

function ensureLocationObject(locationValue, collectionName) {
  if (locationValue?.value && locationValue?.label) {
    return locationValue;
  }

  if (collectionName === 'cities') {
    const selectedCity = LOCATION_TREE.cities.find((item) => item.id === locationValue);
    if (selectedCity) {
      return { value: selectedCity.id, label: selectedCity.name };
    }
  }

  if (collectionName === 'districts') {
    const selectedDistrict = LOCATION_TREE.cities.flatMap((city) => city.districts).find((item) => item.id === locationValue);
    if (selectedDistrict) {
      return { value: selectedDistrict.id, label: selectedDistrict.name };
    }
  }

  if (collectionName === 'wards') {
    const selectedWard = LOCATION_TREE.cities
      .flatMap((city) => city.districts)
      .flatMap((district) => district.wards)
      .find((item) => item.id === locationValue);

    if (selectedWard) {
      return { value: selectedWard.id, label: selectedWard.name };
    }
  }

  return locationValue;
}

function getSearchTerm(params) {
  const rawQuery = params?.stringSearch || params?.q || '';
  return String(rawQuery).trim().toLowerCase();
}

function getUserSearchList(db) {
  return db.users.map((user) => formatUser(user));
}

function aggregateProductSales(db) {
  const saleMap = new Map();

  db.orderCompletes
    .filter((orderComplete) => orderComplete.status === 'Done')
    .forEach((orderComplete) => {
      (orderComplete.orderId.items || []).forEach((item) => {
        const existingItem = saleMap.get(item.productId) || { productId: item.productId, totalQuantitySale: 0, totalPriceSale: 0 };
        existingItem.totalQuantitySale += Number(item.quantity) || 0;

        if (orderComplete.orderId.paymentMethod === 'Paypal') {
          existingItem.totalPriceSale += Number(item.totalPrice || 0) * 20000;
        } else {
          existingItem.totalPriceSale += Number(item.totalPrice || 0);
        }

        saleMap.set(item.productId, existingItem);
      });
    });

  return sortByNumberDesc(
    Array.from(saleMap.values()).map((saleItem) => ({
      ...saleItem,
      product: formatProduct(findProductById(db, saleItem.productId) || saleItem.productSnapshot, db),
    })),
    'totalQuantitySale'
  );
}

function getTrendingKeywords(db) {
  const aggregatedSales = aggregateProductSales(db);
  if (aggregatedSales.length > 0) {
    return aggregatedSales.slice(0, 6).map((saleItem) => ({
      key: saleItem.product?.name || `San pham ${saleItem.productId}`,
      total: saleItem.totalQuantitySale,
    }));
  }

  return db.products.slice(0, 6).map((product) => ({ key: product.name, total: 1 }));
}

function buildProductStatistics(db) {
  const productList = aggregateProductSales(db);
  const totalTurnover = productList.reduce((total, productItem) => total + Number(productItem.totalPriceSale || 0), 0);

  return {
    productList,
    totalTurnover,
  };
}

function buildOrderStatistics(db) {
  const completedOrders = db.orderCompletes.filter((orderComplete) => orderComplete.status === 'Done').map((orderComplete) => formatOrderComplete(orderComplete, db));
  const totalTurnover = completedOrders.reduce((total, orderComplete) => total + Number(orderComplete.orderId.totalPrice || 0), 0);

  return {
    listOrder: completedOrders,
    totalTurnover,
  };
}

function buildDashboardTotals(db) {
  const today = new Date().toISOString().slice(0, 10);

  return {
    getTotalOrderCompleteDay: db.orderCompletes.filter((orderComplete) => orderComplete.status === 'Done' && orderComplete.createdAt?.slice(0, 10) === today).length,
    totalUser: db.users.filter((user) => user.role === 'user').length,
    getTotalOrderWaitingShipping: db.orderCompletes.filter((orderComplete) => orderComplete.status === 'Waitting').length,
    totalOrderByDay: db.orders.filter((order) => order.createdAt?.slice(0, 10) === today).length + db.orderCompletes.filter((orderComplete) => orderComplete.createdAt?.slice(0, 10) === today).length,
  };
}

function buildLatestOrders(db) {
  const latestOrders = sortByDate(
    [
      ...db.orders.map((order) => formatOrder(order, db)),
      ...db.orderCompletes.map((orderComplete) => formatOrder(orderComplete.orderId, db)),
    ],
    'createdAt'
  ).slice(0, 5);

  return {
    orderlist: latestOrders,
  };
}

function buildTopProducts(db) {
  return {
    listProduct: aggregateProductSales(db)
      .sort((firstItem, secondItem) => secondItem.totalQuantitySale - firstItem.totalQuantitySale)
      .slice(0, 5)
      .map((productItem) => ({
        productId: productItem.productId,
        product: productItem.product,
        totalQuantity: productItem.totalQuantitySale,
      })),
  };
}

function createOrderRecord(values, db) {
  const user = findUserById(db, values.userId) || ensureCurrentUser(db);
  const createdAt = nowIso();
  const items = (values.items || []).map((item, index) => {
    const productId = toNumber(item.productId?._id || item.productId, item.productId);
    const sourceProduct = findProductById(db, productId);
    return {
      _id: index + 1,
      productId,
      productSnapshot: sourceProduct ? clone(sourceProduct) : null,
      quantity: Number(item.quantity) || 1,
      totalPrice: Number(item.totalPrice) || 0,
      saleId: item.saleId ? toNumber(item.saleId, item.saleId) : null,
      colorName: item.colorName || item.color || 'Mac dinh',
      sizeId: item.sizeId ? toNumber(item.sizeId, item.sizeId) : null,
      sizeName: item.sizeName || item.size || '',
    };
  });

  return {
    _id: nextId(db, 'order'),
    userId: user._id,
    addressrecevie: values.addressrecevie || {
      name: `${user.lastname} ${user.fistname}`.trim(),
      phonenumber: user.phonenumber,
      address: user.addresses?.find((address) => address.default)?.detailAddress || '',
    },
    items,
    priceDiscount: Number(values.priceDiscount || 0),
    totalPrice: Number(values.totalPrice || 0),
    paymentMethod: values.paymentMethod || (values.isPaypal ? 'Paypal' : 'None'),
    status: values.status || 'Pending',
    isPaypal: Boolean(values.isPaypal),
    paymentId: values.paymentId || null,
    createdAt,
    updatedAt: createdAt,
  };
}

function updateCurrentUserSnapshot(db, userId) {
  const session = getSession();
  if (session?.userId === userId) {
    const user = findUserById(db, userId);
    if (user) {
      setSession(user);
    }
  }
}

function filterOrdersByStatus(orders, status) {
  if (!status) {
    return orders;
  }

  return orders.filter((order) => order.status === status);
}

function filterOrderCompletesByStatus(orderCompletes, status) {
  if (!status) {
    return orderCompletes;
  }

  return orderCompletes.filter((orderComplete) => orderComplete.status === status);
}

export const mockCategoryApi = {
  async getAll(params = {}) {
    const db = getDb();
    const categories = db.categories
      .filter((category) => (params.status === undefined ? true : category.status === toBoolean(params.status, true)))
      .map((category) => formatCategory(category, db));

    return delay(categories);
  },

  async get(id) {
    const db = getDb();
    const category = findCategoryById(db, id);
    if (!category) {
      rejectWithMessage('Khong tim thay danh muc');
    }

    return delay(formatCategory(category, db));
  },
};

export const mockCategoryCApi = {
  async getAll(id, params = {}) {
    const db = getDb();
    const category = findCategoryById(db, id);
    if (!category) {
      rejectWithMessage('Khong tim thay danh muc');
    }

    const formattedCategory = formatCategory(category, db);
    formattedCategory.subcategories = formattedCategory.subcategories.filter((subcategory) =>
      params.status === undefined ? true : subcategory.substatus === toBoolean(params.status, true)
    );

    return delay(formattedCategory);
  },

  async get(id) {
    const db = getDb();
    const subcategory = findSubcategoryById(db, id);
    if (!subcategory) {
      rejectWithMessage('Khong tim thay danh muc con');
    }

    return delay(formatSubcategory(subcategory, db));
  },
};

export const mockProductApi = {
  async getAll(params = {}) {
    const db = getDb();
    const subcategoryId = params.subcategoryId ? toNumber(params.subcategoryId, params.subcategoryId) : null;
    const products = db.products
      .filter((product) => {
        if (subcategoryId && product.subcategoryId !== subcategoryId) {
          return false;
        }

        return true;
      })
      .map((product) => formatProduct(product, db));

    return delay(products);
  },

  async getAllSearch() {
    const db = getDb();
    return delay(db.products.map((product) => formatProduct(product, db)));
  },

  async get(id) {
    const db = getDb();
    const product = findProductById(db, id);
    if (!product) {
      rejectWithMessage('Khong tim thay san pham');
    }

    return delay(formatProduct(product, db));
  },

  async getSizeByProductId(id) {
    const db = getDb();
    const sizes = db.sizes.filter((size) => size.productId === toNumber(id, id)).map((size) => formatSize(size));
    return delay(sizes);
  },

  async getRecommand(values) {
    const db = getDb();
    const previousProductId = toNumber(values.previousProduct, values.previousProduct);
    const previousProduct = findProductById(db, previousProductId);
    const fallbackProducts = db.products.filter((product) => product.status !== false && product._id !== previousProductId);

    const recommendedProducts = previousProduct
      ? fallbackProducts.filter(
          (product) =>
            product.subcategoryId === previousProduct.subcategoryId || findSubcategoryById(db, product.subcategoryId)?.categoryID === findSubcategoryById(db, previousProduct.subcategoryId)?.categoryID
        )
      : fallbackProducts;

    const prediction = (recommendedProducts.length > 0 ? recommendedProducts : fallbackProducts).slice(0, 4).map((product) => formatProduct(product, db));

    return delay({
      prediction,
    });
  },
};

export const mockSearchApi = {
  async getSearch(params = {}) {
    const db = getDb();
    const query = getSearchTerm(params);
    const result = db.products
      .filter((product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query))
      .map((product) => formatProduct(product, db));

    return delay(result);
  },

  async getSearchByWord(params = {}) {
    return this.getSearch(params);
  },

  async getTopTrending() {
    const db = getDb();
    return delay({
      listTrending: getTrendingKeywords(db),
    });
  },
};

export const mockVoucherApi = {
  async getAll() {
    const db = getDb();
    return delay(getActiveCoupons(db));
  },

  async add(data) {
    const db = getDb();
    const coupon = {
      _id: nextId(db, 'coupon'),
      nameVouncher: data.nameVouncher,
      description: data.description,
      discountPercent: Number(data.discountPercent),
      priceOrderLimit: Number(data.priceOrderLimit),
      statusCoupon: data.statusCoupon === undefined ? true : toBoolean(data.statusCoupon, true),
      dateStart: normalizeDateParts(data.dateStart),
      dateEnd: normalizeDateParts(data.dateEnd),
    };
    db.coupons.unshift(coupon);
    saveDb(db);

    return delay({ coupon: clone(coupon) });
  },

  async delete(id) {
    const db = getDb();
    db.coupons = db.coupons.filter((coupon) => coupon._id !== toNumber(id, id));
    saveDb(db);

    return delay({ _id: toNumber(id, id) });
  },

  async update(data) {
    const db = getDb();
    const couponId = toNumber(data.id || data._id, data.id || data._id);
    const couponIndex = db.coupons.findIndex((coupon) => coupon._id === couponId);
    if (couponIndex === -1) {
      rejectWithMessage('Khong tim thay voucher');
    }

    db.coupons[couponIndex] = {
      ...db.coupons[couponIndex],
      ...data,
      _id: couponId,
      discountPercent: Number(data.discountPercent),
      priceOrderLimit: Number(data.priceOrderLimit),
      statusCoupon: data.statusCoupon === undefined ? db.coupons[couponIndex].statusCoupon : toBoolean(data.statusCoupon, true),
      dateStart: normalizeDateParts(data.dateStart, new Date(db.coupons[couponIndex].dateStart?.year || 2026, (db.coupons[couponIndex].dateStart?.month || 1) - 1, db.coupons[couponIndex].dateStart?.day || 1)),
      dateEnd: normalizeDateParts(data.dateEnd, new Date(db.coupons[couponIndex].dateEnd?.year || 2026, (db.coupons[couponIndex].dateEnd?.month || 1) - 1, db.coupons[couponIndex].dateEnd?.day || 1)),
    };
    saveDb(db);

    return delay({ coupon: clone(db.coupons[couponIndex]) });
  },

  async getAllUser() {
    return this.getAll();
  },
};

export const mockUserApi = {
  async register(data) {
    const db = getDb();
    const existingUser = db.users.find((user) => user.email.toLowerCase() === String(data.email).toLowerCase());
    if (existingUser) {
      rejectWithMessage('Email da ton tai');
    }

    const createdUser = {
      _id: nextId(db, 'user'),
      gender: data.gender || 'Male',
      lastname: data.fistname || '',
      fistname: data.lastname || '',
      email: data.email,
      password: data.password,
      phonenumber: data.phonenumber || '',
      role: data.role || 'user',
      status: true,
      date: data.date || '',
      month: data.month || '',
      createdAt: nowIso(),
      updatedAt: nowIso(),
      addresses: [],
    };

    db.users.unshift(createdUser);
    saveDb(db);

    return delay(setSession(createdUser));
  },

  async login(data) {
    const db = getDb();
    const user = db.users.find((currentUser) => currentUser.email.toLowerCase() === String(data.email).toLowerCase());
    if (!user || user.password !== data.password || user.status === false) {
      rejectWithMessage('Mat khau hoac tai khoan khong chinh xac');
    }

    return delay(setSession(user));
  },

  async updateInformationUser(data) {
    const db = getDb();
    const currentUser = ensureCurrentUser(db);
    const userIndex = db.users.findIndex((user) => user._id === currentUser._id);
    db.users[userIndex] = {
      ...db.users[userIndex],
      ...data,
      password: db.users[userIndex].password,
      updatedAt: nowIso(),
    };
    saveDb(db);
    updateCurrentUserSnapshot(db, currentUser._id);

    return delay(formatUser(db.users[userIndex]));
  },

  async loginGoogle() {
    const db = getDb();
    const googleUser = db.users.find((user) => user.provider === 'google') || db.users.find((user) => user.email === 'user@mock.local');
    if (!googleUser) {
      rejectWithMessage('Khong tim thay tai khoan Google mock');
    }

    return delay(setSession(googleUser));
  },

  async ChangePassword(data) {
    const db = getDb();
    const currentUser = ensureCurrentUser(db);
    const userIndex = db.users.findIndex((user) => user._id === currentUser._id);

    if (typeof data === 'string' || typeof data === 'number') {
      db.users[userIndex].status = false;
      db.users[userIndex].updatedAt = nowIso();
      saveDb(db);
      updateCurrentUserSnapshot(db, currentUser._id);
      return delay(formatUser(db.users[userIndex]));
    }

    if (data.passwordOld && db.users[userIndex].password !== data.passwordOld) {
      rejectWithMessage('Mat khau cu khong chinh xac');
    }

    db.users[userIndex].password = data.passwordNew;
    db.users[userIndex].updatedAt = nowIso();
    saveDb(db);
    updateCurrentUserSnapshot(db, currentUser._id);

    return delay({ message: 'Cap nhat mat khau thanh cong' });
  },

  async addAddress(data) {
    const db = getDb();
    const currentUser = ensureCurrentUser(db);
    const userIndex = db.users.findIndex((user) => user._id === currentUser._id);
    const normalizedAddress = normalizeAddressPayload(
      {
        ...data,
        city: data.city || data.selectedCity,
        district: data.district || data.selectedDistrict,
        ward: data.ward || data.selectedWard,
      },
      db.users[userIndex].addresses
    );

    normalizedAddress._id = nextId(db, 'address');
    normalizedAddress.city = ensureLocationObject(normalizedAddress.city, 'cities');
    normalizedAddress.district = ensureLocationObject(normalizedAddress.district, 'districts');
    normalizedAddress.ward = ensureLocationObject(normalizedAddress.ward, 'wards');

    if (normalizedAddress.default) {
      db.users[userIndex].addresses = db.users[userIndex].addresses.map((address) => ({
        ...address,
        default: false,
      }));
    }

    db.users[userIndex].addresses.unshift(normalizedAddress);
    db.users[userIndex].updatedAt = nowIso();
    saveDb(db);
    updateCurrentUserSnapshot(db, currentUser._id);

    return delay(formatUser(db.users[userIndex]));
  },

  async getAddress() {
    const db = getDb();
    const currentUser = ensureCurrentUser(db);
    return delay(clone(currentUser.addresses || []));
  },

  async updateAddress(id, data) {
    const db = getDb();
    const currentUser = ensureCurrentUser(db);
    const userIndex = db.users.findIndex((user) => user._id === currentUser._id);
    const addressId = toNumber(id, id);
    const addressIndex = db.users[userIndex].addresses.findIndex((address) => address._id === addressId);
    if (addressIndex === -1) {
      rejectWithMessage('Khong tim thay dia chi');
    }

    const normalizedAddress = normalizeAddressPayload(
      {
        ...data,
        city: data.city || data.selectedCity,
        district: data.district || data.selectedDistrict,
        ward: data.ward || data.selectedWard,
      },
      db.users[userIndex].addresses
    );

    if (normalizedAddress.default) {
      db.users[userIndex].addresses = db.users[userIndex].addresses.map((address) => ({
        ...address,
        default: false,
      }));
    }

    normalizedAddress.city = ensureLocationObject(normalizedAddress.city, 'cities');
    normalizedAddress.district = ensureLocationObject(normalizedAddress.district, 'districts');
    normalizedAddress.ward = ensureLocationObject(normalizedAddress.ward, 'wards');

    db.users[userIndex].addresses[addressIndex] = {
      ...db.users[userIndex].addresses[addressIndex],
      ...normalizedAddress,
      _id: addressId,
    };
    db.users[userIndex].updatedAt = nowIso();
    saveDb(db);
    updateCurrentUserSnapshot(db, currentUser._id);

    return delay(formatUser(db.users[userIndex]));
  },

  async deleteAddress(id) {
    const db = getDb();
    const currentUser = ensureCurrentUser(db);
    const userIndex = db.users.findIndex((user) => user._id === currentUser._id);
    const addressId = toNumber(id, id);
    const deletedAddress = db.users[userIndex].addresses.find((address) => address._id === addressId);
    db.users[userIndex].addresses = db.users[userIndex].addresses.filter((address) => address._id !== addressId);

    if (deletedAddress?.default && db.users[userIndex].addresses[0]) {
      db.users[userIndex].addresses[0].default = true;
    }

    db.users[userIndex].updatedAt = nowIso();
    saveDb(db);
    updateCurrentUserSnapshot(db, currentUser._id);

    return delay(formatUser(db.users[userIndex]));
  },

  async resetPassword(values) {
    const db = getDb();
    const user = db.users.find((currentUser) => currentUser.email.toLowerCase() === String(values.email).toLowerCase());
    if (!user) {
      rejectWithMessage('Khong tim thay email');
    }

    const token = `mock-reset-${nextId(db, 'resetToken')}-${user._id}`;
    db.resetTokens = db.resetTokens.filter((resetToken) => resetToken.userId !== user._id);
    db.resetTokens.push({
      token,
      userId: user._id,
      createdAt: nowIso(),
    });
    saveDb(db);

    return delay({
      message: 'Tao token thanh cong',
      token,
      resetUrl: `/reset-password/${token}`,
    });
  },

  async confirmResetPassword(data) {
    const db = getDb();
    const resetToken = db.resetTokens.find((tokenItem) => tokenItem.token === data.token);
    if (!resetToken) {
      rejectWithMessage('Token dat lai mat khau khong hop le');
    }

    const userIndex = db.users.findIndex((user) => user._id === resetToken.userId);
    if (userIndex === -1) {
      rejectWithMessage('Khong tim thay nguoi dung');
    }

    db.users[userIndex].password = data.passwordNew;
    db.users[userIndex].updatedAt = nowIso();
    db.resetTokens = db.resetTokens.filter((tokenItem) => tokenItem.token !== data.token);
    saveDb(db);

    return delay({ message: 'Dat lai mat khau thanh cong' });
  },
};

export const mockOrderApi = {
  async getAll(params = {}) {
    const db = getDb();
    const currentUser = ensureCurrentUser(db);
    const userOrders = db.orders.filter((order) => order.userId === currentUser._id);
    const filteredOrders = filterOrdersByStatus(userOrders, params.status).map((order) => formatOrder(order, db));
    return delay(sortByDate(filteredOrders));
  },

  async get(id) {
    const db = getDb();
    const order = db.orders.find((currentOrder) => currentOrder._id === toNumber(id, id));
    if (!order) {
      rejectWithMessage('Khong tim thay don hang');
    }

    return delay(formatOrder(order, db));
  },

  async add(data) {
    const db = getDb();
    const newOrder = createOrderRecord(data, db);
    db.orders.unshift(newOrder);
    saveDb(db);
    return delay(formatOrder(newOrder, db));
  },

  async delete(id) {
    const db = getDb();
    const orderIndex = db.orders.findIndex((order) => order._id === toNumber(id, id));
    if (orderIndex === -1) {
      rejectWithMessage('Khong tim thay don hang');
    }

    db.orders[orderIndex] = {
      ...db.orders[orderIndex],
      status: 'Cancel',
      updatedAt: nowIso(),
    };
    saveDb(db);

    return delay(formatOrder(db.orders[orderIndex], db));
  },

  async update(data) {
    const db = getDb();
    const orderId = toNumber(data.id || data._id, data.id || data._id);
    const orderIndex = db.orders.findIndex((order) => order._id === orderId);
    if (orderIndex === -1) {
      rejectWithMessage('Khong tim thay don hang');
    }

    db.orders[orderIndex] = {
      ...db.orders[orderIndex],
      ...data,
      _id: orderId,
      updatedAt: nowIso(),
    };
    saveDb(db);

    return delay(formatOrder(db.orders[orderIndex], db));
  },

  async getOrderByEmail(params = {}) {
    const db = getDb();
    const currentUser = ensureCurrentUser(db);
    const filteredOrderCompletes = db.orderCompletes
      .filter((orderComplete) => toNumber(orderComplete.orderId.userId, orderComplete.orderId.userId) === currentUser._id)
      .filter((orderComplete) => (params.status ? orderComplete.status === params.status : true))
      .map((orderComplete) => formatOrderComplete(orderComplete, db));

    return delay(sortByDate(filteredOrderCompletes));
  },

  async getPaymentVNPAY(id) {
    return delay({
      vnpUrl: `/order?mockVnpay=success&orderId=${id}`,
    });
  },

  async finalizeMockVnpay(id) {
    const db = getDb();
    const orderIndex = db.orders.findIndex((order) => order._id === toNumber(id, id));
    if (orderIndex === -1) {
      rejectWithMessage('Khong tim thay don hang de thanh toan');
    }

    db.orders[orderIndex] = {
      ...db.orders[orderIndex],
      paymentMethod: 'VNPAY',
      updatedAt: nowIso(),
    };
    saveDb(db);

    return delay(formatOrder(db.orders[orderIndex], db));
  },
};

export const mockStaticApi = {
  async getProduct() {
    const db = getDb();
    return delay(buildProductStatistics(db));
  },

  async getOrder() {
    const db = getDb();
    return delay(buildOrderStatistics(db));
  },

  async getTotalField() {
    const db = getDb();
    return delay(buildDashboardTotals(db));
  },

  async getLastedOrder() {
    const db = getDb();
    return delay(buildLatestOrders(db));
  },

  async getTopProduct() {
    const db = getDb();
    return delay(buildTopProducts(db));
  },
};

export const mockAdminAPI = {
  async listProduct(params = {}) {
    return mockProductApi.getAll(params);
  },

  async addProduct(data) {
    const db = getDb();
    const newProduct = {
      _id: nextId(db, 'product'),
      content: data.content || '',
      description: data.description || '',
      name: data.name || 'San pham moi',
      material: data.material || '',
      orgin: data.orgin || '',
      price: Number(data.price || 0),
      status: true,
      subcategoryId: toNumber(data.subcategoryId, data.subcategoryId),
      saleId: null,
      imageMain: '/image/1.jpg',
      images: ['/image/1.jpg'],
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    db.products.unshift(newProduct);
    saveDb(db);

    return delay(formatProduct(newProduct, db));
  },

  async deleteProduct(id) {
    const db = getDb();
    db.products = db.products.filter((product) => product._id !== toNumber(id, id));
    db.sizes = db.sizes.filter((size) => size.productId !== toNumber(id, id));
    db.sales = db.sales.filter((sale) => sale.productId !== toNumber(id, id));
    saveDb(db);

    return delay({ _id: toNumber(id, id) });
  },

  async updateProduct(id, data) {
    const db = getDb();
    const productIndex = db.products.findIndex((product) => product._id === toNumber(id, id));
    if (productIndex === -1) {
      rejectWithMessage('Khong tim thay san pham');
    }

    db.products[productIndex] = {
      ...db.products[productIndex],
      ...data,
      _id: toNumber(id, id),
      price: Number(data.price ?? db.products[productIndex].price),
      status: data.status === undefined ? db.products[productIndex].status : toBoolean(data.status, db.products[productIndex].status),
      subcategoryId: toNumber(data.subcategoryId, db.products[productIndex].subcategoryId),
      updatedAt: nowIso(),
    };
    saveDb(db);

    return delay(formatProduct(db.products[productIndex], db));
  },

  async updateImageProduct(id, data) {
    const db = getDb();
    const productIndex = db.products.findIndex((product) => product._id === toNumber(id, id));
    if (productIndex === -1) {
      rejectWithMessage('Khong tim thay san pham');
    }

    const images = await extractPhotos(data);
    if (images[0]) {
      db.products[productIndex].imageMain = images[0];
      db.products[productIndex].images = images;
    }
    db.products[productIndex].updatedAt = nowIso();
    saveDb(db);

    return delay(formatProduct(db.products[productIndex], db));
  },

  async updateMultipleImageProduct(id, data) {
    const db = getDb();
    const productIndex = db.products.findIndex((product) => product._id === toNumber(id, id));
    if (productIndex === -1) {
      rejectWithMessage('Khong tim thay san pham');
    }

    const images = await extractPhotos(data);
    if (images.length > 0) {
      db.products[productIndex].images = images;
      if (!db.products[productIndex].imageMain) {
        db.products[productIndex].imageMain = images[0];
      }
    }
    db.products[productIndex].updatedAt = nowIso();
    saveDb(db);

    return delay(formatProduct(db.products[productIndex], db));
  },

  async listCategories(params = {}) {
    return mockCategoryApi.getAll(params);
  },

  async getCategories(id) {
    return mockCategoryApi.get(id);
  },

  async addCategories(data) {
    const db = getDb();
    const category = {
      _id: nextId(db, 'category'),
      nameCategory: data.nameCategory,
      status: true,
      datecreated: nowIso(),
    };
    db.categories.unshift(category);
    saveDb(db);

    return delay(formatCategory(category, db));
  },

  async updateCategories(id, data) {
    const db = getDb();
    const categoryIndex = db.categories.findIndex((category) => category._id === toNumber(id, id));
    if (categoryIndex === -1) {
      rejectWithMessage('Khong tim thay danh muc');
    }

    db.categories[categoryIndex] = {
      ...db.categories[categoryIndex],
      ...data,
      _id: toNumber(id, id),
      status: data.status === undefined ? db.categories[categoryIndex].status : toBoolean(data.status, db.categories[categoryIndex].status),
    };
    saveDb(db);

    return delay(formatCategory(db.categories[categoryIndex], db));
  },

  async deleteCategories(id) {
    const db = getDb();
    const categoryId = toNumber(id, id);
    db.categories = db.categories.filter((category) => category._id !== categoryId);
    db.subcategories = db.subcategories.filter((subcategory) => subcategory.categoryID !== categoryId);
    db.products = db.products.filter((product) => findSubcategoryById({ ...db, subcategories: db.subcategories }, product.subcategoryId));
    saveDb(db);

    return delay({ _id: categoryId });
  },

  async listCategoriesC(params = {}) {
    const db = getDb();
    const list = db.subcategories
      .filter((subcategory) => {
        if (params.categoryID && subcategory.categoryID !== toNumber(params.categoryID, params.categoryID)) {
          return false;
        }

        return true;
      })
      .map((subcategory) => formatSubcategory(subcategory, db));

    return delay(list);
  },

  async getCategoriesC(id) {
    return mockCategoryCApi.get(id);
  },

  async addCategoriesC(data) {
    const db = getDb();
    const subcategory = {
      _id: nextId(db, 'subcategory'),
      namesubCategory: data.namesubCategory,
      categoryID: toNumber(data.categoryID, data.categoryID),
      substatus: data.substatus === undefined ? true : toBoolean(data.substatus, true),
      icon: data.icon || '/image/discover.png',
      date: nowIso(),
    };
    db.subcategories.unshift(subcategory);
    saveDb(db);

    return delay(formatSubcategory(subcategory, db));
  },

  async deleteCategoriesC(id) {
    const db = getDb();
    const subcategoryId = toNumber(id, id);
    db.subcategories = db.subcategories.filter((subcategory) => subcategory._id !== subcategoryId);
    db.products = db.products.filter((product) => product.subcategoryId !== subcategoryId);
    saveDb(db);

    return delay({ _id: subcategoryId });
  },

  async updateCategoriesC(id, data) {
    const db = getDb();
    const subcategoryIndex = db.subcategories.findIndex((subcategory) => subcategory._id === toNumber(id, id));
    if (subcategoryIndex === -1) {
      rejectWithMessage('Khong tim thay danh muc con');
    }

    db.subcategories[subcategoryIndex] = {
      ...db.subcategories[subcategoryIndex],
      ...data,
      _id: toNumber(id, id),
      categoryID: toNumber(data.categoryID, db.subcategories[subcategoryIndex].categoryID),
      substatus: data.substatus === undefined ? db.subcategories[subcategoryIndex].substatus : toBoolean(data.substatus, db.subcategories[subcategoryIndex].substatus),
    };
    saveDb(db);

    return delay(formatSubcategory(db.subcategories[subcategoryIndex], db));
  },

  async updateImageCategoriesC(id, data) {
    const db = getDb();
    const subcategoryIndex = db.subcategories.findIndex((subcategory) => subcategory._id === toNumber(id, id));
    if (subcategoryIndex === -1) {
      rejectWithMessage('Khong tim thay danh muc con');
    }

    const images = await extractPhotos(data);
    if (images[0]) {
      db.subcategories[subcategoryIndex].icon = images[0];
    }
    saveDb(db);

    return delay(formatSubcategory(db.subcategories[subcategoryIndex], db));
  },

  async listOrder(params = {}) {
    const db = getDb();
    const orders = filterOrdersByStatus(db.orders, params.status).map((order) => formatOrder(order, db));
    return delay(sortByDate(orders));
  },

  async deletOrder(id) {
    return mockOrderApi.delete(id);
  },

  async addOrderComplete(data) {
    const db = getDb();
    const orderId = toNumber(data.orderId, data.orderId);
    const orderIndex = db.orders.findIndex((order) => order._id === orderId);
    if (orderIndex === -1) {
      rejectWithMessage('Khong tim thay don hang can xu ly');
    }

    const orderSnapshot = clone(db.orders[orderIndex]);
    db.orders.splice(orderIndex, 1);
    const orderComplete = {
      _id: nextId(db, 'orderComplete'),
      orderId: orderSnapshot,
      shiprice: Number(data.shiprice || 0),
      totalPrice: Number(data.totalPrice || orderSnapshot.totalPrice || 0),
      status: 'Waitting',
      createdAt: nowIso(),
    };
    db.orderCompletes.unshift(orderComplete);
    saveDb(db);

    return delay({
      orderComplete: formatOrderComplete(orderComplete, db),
    });
  },

  async listOrderComplete(params = {}) {
    const db = getDb();
    const orderCompletes = filterOrderCompletesByStatus(db.orderCompletes, params.status).map((orderComplete) => formatOrderComplete(orderComplete, db));
    return delay(sortByDate(orderCompletes));
  },

  async statusOrderComplete(id) {
    const db = getDb();
    const orderCompleteIndex = db.orderCompletes.findIndex((orderComplete) => orderComplete._id === toNumber(id, id));
    if (orderCompleteIndex === -1) {
      rejectWithMessage('Khong tim thay don hang giao');
    }

    db.orderCompletes[orderCompleteIndex].status = 'Done';
    saveDb(db);

    return delay(formatOrderComplete(db.orderCompletes[orderCompleteIndex], db));
  },

  async statusOrderFail(id) {
    const db = getDb();
    const orderCompleteIndex = db.orderCompletes.findIndex((orderComplete) => orderComplete._id === toNumber(id, id));
    if (orderCompleteIndex === -1) {
      rejectWithMessage('Khong tim thay don hang giao');
    }

    db.orderCompletes[orderCompleteIndex].status = 'Failed';
    saveDb(db);

    return delay(formatOrderComplete(db.orderCompletes[orderCompleteIndex], db));
  },

  async getAllUser() {
    const db = getDb();
    return delay(getUserSearchList(db));
  },

  async updateUser(id, data) {
    const db = getDb();
    const userIndex = db.users.findIndex((user) => user._id === toNumber(id, id));
    if (userIndex === -1) {
      rejectWithMessage('Khong tim thay nguoi dung');
    }

    db.users[userIndex] = {
      ...db.users[userIndex],
      ...data,
      _id: toNumber(id, id),
      status: data.status === undefined ? db.users[userIndex].status : toBoolean(data.status, db.users[userIndex].status),
      updatedAt: nowIso(),
    };
    saveDb(db);
    updateCurrentUserSnapshot(db, db.users[userIndex]._id);

    return delay(formatUser(db.users[userIndex]));
  },

  async deleteAccountUser(id) {
    const db = getDb();
    const userIndex = db.users.findIndex((user) => user._id === toNumber(id, id));
    if (userIndex === -1) {
      rejectWithMessage('Khong tim thay nguoi dung');
    }

    db.users[userIndex].status = false;
    db.users[userIndex].updatedAt = nowIso();
    saveDb(db);
    updateCurrentUserSnapshot(db, db.users[userIndex]._id);

    return delay(formatUser(db.users[userIndex]));
  },

  async addUser(data) {
    const db = getDb();
    const existingUser = db.users.find((user) => user.email.toLowerCase() === String(data.email).toLowerCase());
    if (existingUser) {
      rejectWithMessage('Email da ton tai');
    }

    const user = {
      _id: nextId(db, 'user'),
      gender: data.gender || 'Male',
      lastname: data.lastname || '',
      fistname: data.fistname || '',
      email: data.email,
      password: data.password || 'User123!',
      phonenumber: data.phonenumber || '',
      role: data.role || 'user',
      status: true,
      date: data.date || '',
      month: data.month || '',
      createdAt: nowIso(),
      updatedAt: nowIso(),
      addresses: [],
    };

    db.users.unshift(user);
    saveDb(db);

    return delay({ user: formatUser(user) });
  },

  async addVoucher(data) {
    return mockVoucherApi.add(data);
  },

  async deleteVoucher(id) {
    return mockVoucherApi.delete(id);
  },

  async updateVoucher(id, data) {
    return mockVoucherApi.update({ ...data, _id: toNumber(id, id) });
  },

  async addSale(data) {
    const db = getDb();
    const sale = {
      _id: nextId(db, 'sale'),
      productId: toNumber(data.productId, data.productId),
      nameSale: data.nameSale,
      percentSale: Number(data.percentSale),
      description: data.description,
      statusSale: data.statusSale === undefined ? true : toBoolean(data.statusSale, true),
    };
    db.sales.unshift(sale);

    const productIndex = db.products.findIndex((product) => product._id === sale.productId);
    if (productIndex !== -1) {
      db.products[productIndex].saleId = sale._id;
    }
    saveDb(db);

    return delay({ sale: clone(sale), status: true });
  },

  async deleteSale(id) {
    const db = getDb();
    const sale = findSaleById(db, id);
    db.sales = db.sales.filter((currentSale) => currentSale._id !== toNumber(id, id));
    if (sale) {
      const productIndex = db.products.findIndex((product) => product._id === sale.productId);
      if (productIndex !== -1) {
        db.products[productIndex].saleId = null;
      }
    }
    saveDb(db);

    return delay({ _id: toNumber(id, id) });
  },

  async updateSale(id, data) {
    const db = getDb();
    const saleIndex = db.sales.findIndex((sale) => sale._id === toNumber(id, id));
    if (saleIndex === -1) {
      rejectWithMessage('Khong tim thay sale');
    }

    db.sales[saleIndex] = {
      ...db.sales[saleIndex],
      ...data,
      _id: toNumber(id, id),
      productId: toNumber(data.productId, db.sales[saleIndex].productId),
      percentSale: Number(data.percentSale),
      statusSale: data.statusSale === undefined ? db.sales[saleIndex].statusSale : toBoolean(data.statusSale, db.sales[saleIndex].statusSale),
    };

    const productIndex = db.products.findIndex((product) => product._id === db.sales[saleIndex].productId);
    if (productIndex !== -1) {
      db.products[productIndex].saleId = db.sales[saleIndex]._id;
    }
    saveDb(db);

    return delay({
      sale: {
        ...clone(db.sales[saleIndex]),
        productId: formatProduct(findProductById(db, db.sales[saleIndex].productId), db),
      },
      status: db.sales[saleIndex].statusSale !== false,
    });
  },

  async getSaleByProductId(id) {
    const db = getDb();
    const sale = db.sales.find((currentSale) => currentSale.productId === toNumber(id, id) && currentSale.statusSale !== false);
    if (!sale) {
      return delay({
        status: false,
      });
    }

    return delay({
      status: true,
      sale: {
        ...clone(sale),
        productId: formatProduct(findProductById(db, sale.productId), db),
      },
    });
  },

  async getSizeProduct(id) {
    const db = getDb();
    const sizes = db.sizes.filter((size) => size.productId === toNumber(id, id)).map((size) => formatSize(size));
    return delay(sizes);
  },

  async getSizeById(id) {
    const db = getDb();
    const size = findSizeById(db, id);
    if (!size) {
      rejectWithMessage('Khong tim thay size');
    }

    return delay(formatSize(size));
  },

  async addSizeAColor(data) {
    const db = getDb();
    const size = {
      _id: nextId(db, 'size'),
      nameSize: data.nameSize,
      productId: toNumber(data.productId, data.productId),
      colors: clone(data.colors || []),
    };
    db.sizes.unshift(size);
    saveDb(db);

    return delay(formatSize(size));
  },

  async deleteSizeAColor(id) {
    const db = getDb();
    db.sizes = db.sizes.filter((size) => size._id !== toNumber(id, id));
    saveDb(db);

    return delay({ _id: toNumber(id, id) });
  },

  async updateSizeAColor(id, data) {
    const db = getDb();
    const sizeIndex = db.sizes.findIndex((size) => size._id === toNumber(id, id));
    if (sizeIndex === -1) {
      rejectWithMessage('Khong tim thay size');
    }

    db.sizes[sizeIndex] = {
      ...db.sizes[sizeIndex],
      ...data,
      _id: toNumber(id, id),
      productId: toNumber(data.productId, db.sizes[sizeIndex].productId),
      colors: clone(data.colors || db.sizes[sizeIndex].colors),
    };
    saveDb(db);

    return delay(formatSize(db.sizes[sizeIndex]));
  },
};

export const mockLocationApi = {
  async getCities() {
    return delay(LOCATION_TREE.cities.map((city) => ({ value: city.id, label: city.name })));
  },

  async getDistricts(cityId) {
    const city = LOCATION_TREE.cities.find((cityItem) => cityItem.id === cityId) || LOCATION_TREE.cities[0];
    return delay(city.districts.map((district) => ({ value: district.id, label: district.name })));
  },

  async getWards(districtId) {
    const district =
      LOCATION_TREE.cities.flatMap((city) => city.districts).find((districtItem) => districtItem.id === districtId) ||
      LOCATION_TREE.cities[0].districts[0];

    return delay(district.wards.map((ward) => ({ value: ward.id, label: ward.name })));
  },

  async getInitialLocation() {
    const firstCity = LOCATION_TREE.cities[0];
    const firstDistrict = firstCity.districts[0];
    const firstWard = firstDistrict.wards[0];

    return delay({
      cityId: firstCity.id,
      districtId: firstDistrict.id,
      wardId: firstWard.id,
    });
  },
};
