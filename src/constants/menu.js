// Menu Data Constants
export const MENU_GROUPS = [
  {
    title: 'محشي ورق عنب بدبس الرمان',
    description: 'أوراق عنب طازجة محشوة بالأرز والخضروات مع نكهة دبس الرمان المميزة',
    image: 'grape-leaves-pomegranate',
    items: [
      { 
        name: 'صغير 15 قطعة', 
        price: '190 ج', 
        description: 'مثالي للوجبات الخفيفة',
        calories: 450,
        ingredients: ['ورق عنب', 'أرز', 'دبس رمان', 'بقدونس', 'طماطم']
      },
      { 
        name: 'متوسط 30 قطعة', 
        price: '270 ج', 
        description: 'يكفي لشخصين',
        calories: 900,
        ingredients: ['ورق عنب', 'أرز', 'دبس رمان', 'بقدونس', 'طماطم']
      },
      { 
        name: 'كبير 55 قطعة', 
        price: '500 ج', 
        description: 'مثالي للعائلات والضيوف',
        calories: 1650,
        ingredients: ['ورق عنب', 'أرز', 'دبس رمان', 'بقدونس', 'طماطم']
      },
    ],
  },
  {
    title: 'فتة ورق عنب',
    description: 'ورق عنب مفروم مع الخبز المحمص والصلصة الشهية',
    image: 'grape-leaves-fatteh',
    items: [
      { 
        name: 'صغير', 
        price: '170 ج', 
        description: 'حصة فردية',
        calories: 380,
        ingredients: ['ورق عنب', 'خبز محمص', 'صلصة', 'ثوم', 'طحينة']
      },
      { 
        name: 'كبير', 
        price: '240 ج', 
        description: 'يكفي لشخصين',
        calories: 760,
        ingredients: ['ورق عنب', 'خبز محمص', 'صلصة', 'ثوم', 'طحينة']
      },
    ],
  },
  {
    title: 'محشي ورق عنب بنكهة الليمون',
    description: 'أوراق عنب محشوة بنكهة الليمون المنعشة',
    image: 'grape-leaves-lemon',
    items: [
      { 
        name: 'صغير 15 قطعة', 
        price: '190 ج', 
        description: 'نكهة منعشة ولذيذة',
        calories: 420,
        ingredients: ['ورق عنب', 'أرز', 'ليمون', 'نعناع', 'بقدونس']
      },
      { 
        name: 'متوسط 30 قطعة', 
        price: '270 ج', 
        description: 'الحجم الأكثر طلباً',
        calories: 840,
        ingredients: ['ورق عنب', 'أرز', 'ليمون', 'نعناع', 'بقدونس']
      },
      { 
        name: 'كبير 55 قطعة', 
        price: '500 ج', 
        description: 'للمناسبات الخاصة',
        calories: 1540,
        ingredients: ['ورق عنب', 'أرز', 'ليمون', 'نعناع', 'بقدونس']
      },
    ],
  },
  {
    title: 'محشي بطاطس',
    description: 'بطاطس محشوة بالأرز والخضروات المتبلة',
    image: 'stuffed-potatoes',
    items: [
      { 
        name: 'صغير', 
        price: '130 ج', 
        description: '6 قطع بطاطس متوسطة',
        calories: 520,
        ingredients: ['بطاطس', 'أرز', 'بصل', 'جزر', 'بهارات']
      },
      { 
        name: 'كبير', 
        price: '220 ج', 
        description: '10 قطع بطاطس كبيرة',
        calories: 880,
        ingredients: ['بطاطس', 'أرز', 'بصل', 'جزر', 'بهارات']
      },
    ],
  },
  {
    title: 'محشي بصل',
    description: 'بصل محشو بالأرز واللحمة المفرومة',
    image: 'stuffed-onions',
    items: [
      { 
        name: 'صغير', 
        price: '160 ج', 
        description: '8 حبات بصل متوسطة',
        calories: 480,
        ingredients: ['بصل', 'أرز', 'لحمة مفرومة', 'بهارات', 'بقدونس']
      },
      { 
        name: 'كبير', 
        price: '250 ج', 
        description: '12 حبة بصل كبيرة',
        calories: 720,
        ingredients: ['بصل', 'أرز', 'لحمة مفرومة', 'بهارات', 'بقدونس']
      },
    ],
  },
  {
    title: 'محشي الكوسا اللبنية',
    description: 'كوسا صغيرة محشوة على الطريقة اللبنانية',
    image: 'stuffed-zucchini',
    items: [
      { 
        name: 'صغير', 
        price: '190 ج', 
        description: '10 قطع كوسا صغيرة',
        calories: 380,
        ingredients: ['كوسا', 'أرز', 'لحمة', 'بقدونس', 'نعناع']
      },
      { 
        name: 'كبير', 
        price: '270 ج', 
        description: '15 قطعة كوسا متنوعة',
        calories: 570,
        ingredients: ['كوسا', 'أرز', 'لحمة', 'بقدونس', 'نعناع']
      },
    ],
  },
  {
    title: 'طبق الضيافة',
    description: 'مجموعة متنوعة من جميع الأصناف المحشوة',
    image: 'mixed-platter',
    items: [
      { 
        name: 'سعر الطبق', 
        price: '700 ج', 
        description: 'تشكيلة كاملة من جميع الأصناف',
        calories: 1200,
        ingredients: ['تشكيلة متنوعة من جميع المحاشي']
      },
    ],
  },
]
