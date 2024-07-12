class RangeItem {
  constructor(minCount, maxCount, minFee, price, unit) {
    this.minCount = minCount;
    this.maxCount = maxCount;
    this.minFee = minFee;
    this.price = price;
    this.unit = unit;
  }
}

class RangePriceCfg {
  constructor(name, range) {
    this.name = name;
    this.range = range;
  }
}

class CalcConfig {
  constructor(paper, print, surface, cut) {
    this.paper = paper;
    this.print = print;
    this.surface = surface;
    this.cut = cut;
  }
}

class CalcParams {
  constructor(
    count,
    knifeX,
    knifeY,
    paperName,
    printName,
    printSide,
    surfaceName,
    cutName
  ) {
    this.count = count;
    this.knifeX = knifeX;
    this.knifeY = knifeY;
    this.paperName = paperName;
    this.printName = printName;
    this.printSide = printSide;
    this.surfaceName = surfaceName;
    this.cutName = cutName;
  }
}

class CalcResultItem {
  constructor(name, mode, count, minFee, price, unit, fee) {
    this.name = name;
    this.mode = mode;
    this.count = count;
    this.minFee = minFee;
    this.price = price;
    this.unit = unit;
    this.fee = fee;
  }
}

class CalcResult {
  constructor(fee, list) {
    this.fee = fee;
    this.list = list;
  }
}

class SimpleQuotation {
  constructor(config) {
    this.config = config;
  }

  makeQuotation(params) {
    this.params = params;
    const resItems = [
      this.feePaper(),
      this.feePrint(),
      this.feeSurface(),
      this.feeCut(),
    ];
    const totalFee = resItems.reduce((total, item) => total + item.fee, 0);
    return new CalcResult(totalFee, resItems);
  }

  getQuotationConfig(type, name, count) {
    const cfg = this.config[type];
    if (!cfg) throw new Error();
    const c = cfg.find((item) => item.name === name);
    if (!c) throw new Error();
    let config;
    for (const r of c.range) {
      if (r.minCount <= count && r.maxCount > count) config = r;
    }
    return config;
  }

  makeQuotationByArea({ area, count }, config) {
    const fee = Math.max(area * config.price * count, config.minFee || 0);
    return new CalcResultItem(
      config.name,
      "area",
      count,
      config.minFee,
      config.price,
      config.unit,
      fee
    );
  }

  makeQuotationByCount({ count }, config) {
    const fee = Math.max(config.price * count, config.minFee || 0);
    return new CalcResultItem(
      config.name,
      "count",
      count,
      config.minFee,
      config.price,
      config.unit,
      fee
    );
  }

  feePaper() {
    const { count, knifeX, knifeY, paperName } = this.params;
    const cfg = this.getQuotationConfig("paper", paperName, count);
    return this.makeQuotationByArea(
      { area: (knifeX * knifeY) / 1e6, count },
      cfg
    );
  }

  feePrint() {
    const { count, knifeX, knifeY, printName, printSide } = this.params;
    const cfg = this.getQuotationConfig("print", printName, count);
    return this.makeQuotationByArea(
      { area: (knifeX * knifeY) / 1e6, count: count * printSide },
      cfg
    );
  }

  feeSurface() {
    const { count, knifeX, knifeY, surfaceName } = this.params;
    const cfg = this.getQuotationConfig("surface", surfaceName, count);
    return this.makeQuotationByArea(
      { area: (knifeX * knifeY) / 1e6, count },
      cfg
    );
  }

  feeCut() {
    const { count, cutName = "default" } = this.params;
    const cfg = this.getQuotationConfig("cut", cutName, count);
    return this.makeQuotationByCount({ count }, cfg);
  }
}

const PRICE_CONFIG = {
  paper: [
    {
      name: "White card board",
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 1.5,
          unit: "m",
          minFee: 0,
        },
      ],
    },
    {
      name: "E-flute paper",
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 2.6,
          unit: "m",
          minFee: 0,
        },
      ],
    },
    {
      name: "B-flute paper",
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 2.9,
          unit: "m",
          minFee: 0,
        },
      ],
    },
    {
      name: "Kraft paper",
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 1.2,
          unit: "m",
          minFee: 0,
        },
      ],
    },
  ],
  print: [
    {
      name: "default",
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 0.5,
          unit: "m",
          minFee: 0,
        },
      ],
    },
  ],
  surface: [
    {
      name: "blank",
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 0,
          unit: "m",
          minFee: 0,
        },
      ],
    },
    {
      name: "gloss",
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 0.35,
          unit: "m",
          minFee: 0,
        },
      ],
    },
    {
      name: "matte",
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 0.3,
          unit: "m",
          minFee: 0,
        },
      ],
    },
  ],
  cut: [
    {
      name: "default",
      range: [
        {
          minCount: 1,
          maxCount: 999999,
          price: 0.1,
          unit: "",
          minFee: 0,
        },
      ],
    },
  ],
};

function allowMakeQuotation() {
  const modelId = getQueryValue("modelId");
  if (!isNumber(modelId) || Number(modelId) >= 400000) {
    return false;
  }
  return true;
}

function makeQuotation() {
  if (allowMakeQuotation()) {
    return makeQuotationForBox();
  } else {
    return makeQuotationForMockup();
  }
}

function makeQuotationForBox() {
  const dimension = document.querySelector("#dimension");
  const material = document.querySelector("#material");
  const print = document.querySelector("#print");
  const finishing = document.querySelector("#finishing");
  const number = document.querySelector("#number");

  if (
    !dimension.value ||
    !material.value ||
    !print.value ||
    !finishing.value ||
    !number.value
  ) {
    return;
  }

  const sizes = dimension.value.split("*");
  const length = Number(sizes[0]);
  const width = Number(sizes[1]);
  const height = Number(sizes[2]);

  const knifeX = 2 * (length + width);
  const knifeY = height + 2 * width;

  const quotation = new SimpleQuotation(PRICE_CONFIG);
  let faces = 0;
  if (print.value === "inside" || print.value === "outside") {
    faces = 1;
  } else if (print.value === "both") {
    faces = 2;
  }

  const result = quotation.makeQuotation({
    count: Number(number.value),
    knifeX: knifeX,
    knifeY: knifeY,
    paperName: material.value,
    printName: "default",
    printSide: faces,
    surfaceName: finishing.value,
    cutName: "default",
  });
  if (result) {
    const price = document.querySelector("#price-box");
    price.innerHTML = "$" + result.fee.toFixed(1);
    price.innerHTML = `
    <span class="price-text">Total:</span>
    <span class="price-total">$${result.fee.toFixed(1)} </span>
    <span class="price-unit">($${(result.fee / Number(number.value)).toFixed(
      2
    )} / unit)</span>
    `;
    console.log("quotation:", result.fee.toFixed(2));
  }
}

function makeQuotationForMockup() {
  const number = document.querySelector("#number");
  if (!number.value) {
    return;
  }

  const fee = 3 * Number(number.value);

  const price = document.querySelector("#price-box");
  price.innerHTML = "$" + fee.toFixed(1);
  price.innerHTML = `
  <span class="price-text">Total:</span>
  <span class="price-total">$${fee.toFixed(1)} </span>
  `;
}
