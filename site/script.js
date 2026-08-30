/* ============================
   スムーススクロール
============================ */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

/* ============================
   セクションのふわっと表示
============================ */

const sections = document.querySelectorAll(".section");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  sections.forEach((section) => observer.observe(section));
} else {
  sections.forEach((section) => section.classList.add("fade-in"));
}

/* ============================
   持ち物リスト（共通）
============================ */

const packingItems = [
  "財布",
  "スマホ",
  "充電器",
  "着替え",
  "タオル",
  "歯ブラシ",
  "常備薬",
  "モバイルバッテリー",
  "身分証",
  "飲み物",
  "お菓子"
];

const packingList = document.getElementById("packing-list");

if (packingList) {
  packingItems.forEach((item, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "item-" + index;

    if (localStorage.getItem("packing-" + index) === "true") {
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", function () {
      localStorage.setItem("packing-" + index, this.checked);
    });

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = item;

    li.appendChild(checkbox);
    li.appendChild(label);
    packingList.appendChild(li);
  });
}

/* ============================
   三谷専用リスト（料理道具削除）
============================ */

const mitaniItems = [
  "ボードゲーム",
  "虫刺されかゆみ止め",
  "アルコールウェットティッシュ",
  "虫除けスプレー（サラテクト）"
];

const mitaniList = document.getElementById("mitani-list");

if (mitaniList) {
  mitaniItems.forEach((item, index) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "mitani-" + index;

    if (localStorage.getItem("mitani-" + index) === "true") {
      checkbox.checked = true;
    }

    checkbox.addEventListener("change", function () {
      localStorage.setItem("mitani-" + index, this.checked);
    });

    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = item;

    li.appendChild(checkbox);
    li.appendChild(label);
    mitaniList.appendChild(li);
  });
}

/* ============================
   設定（最新）
============================ */

const PEOPLE = 7;

// 共用品（2つだけ）
const commonItemsCost = {
  spray: 555,
  wet: 382
};

// マーダーミステリー（奇想、アムネジア）
const murderMystery = 3342;

// 宿泊・レンタカー
const lodging = 175605;
const rentalCar = 46860;

/* ============================
   交通費（実費）
============================ */

// 新幹線（片道）
const shinkansen_oneway = 4760;

// 特急はしだて（片道）
const hashidate_oneway = 3080;

// 乗車券（片道）
const fare_normal_oneway = 6200;
const fare_discount_oneway = 3100;

// 往復計算
const shinkansen_round = shinkansen_oneway * 2;
const hashidate_round = hashidate_oneway * 2;

const discountedPeople = 2;
const normalPeople = PEOPLE - discountedPeople;

// 乗車券合計（7人）
const fare_total =
  fare_normal_oneway * 2 * normalPeople +
  fare_discount_oneway * 2 * discountedPeople;

const fare_perPerson = Math.floor(fare_total / PEOPLE);

/* ============================
   共用品・マダミス
============================ */

const commonTotal = Object.values(commonItemsCost).reduce((a, b) => a + b, 0);
const commonPerPerson = Math.floor(commonTotal / PEOPLE);

const murderPerPerson = Math.floor(murderMystery / PEOPLE);

/* ============================
   一人あたり交通費
============================ */

const transportPerPerson =
  shinkansen_round +
  hashidate_round +
  fare_perPerson;

/* ============================
   最終一人あたり総額
============================ */

const lodgingPerPerson = Math.floor(lodging / PEOPLE);
const rentalPerPerson = Math.floor(rentalCar / PEOPLE);

const totalPerPerson =
  transportPerPerson +
  lodgingPerPerson +
  rentalPerPerson +
  commonPerPerson +
  murderPerPerson;

/* ============================
   HTMLへ反映
============================ */

function setYen(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value.toLocaleString() + "円";
}

setYen("common-total", commonTotal);
setYen("common-per", commonPerPerson);

setYen("murder-total", murderMystery);
setYen("murder-per", murderPerPerson);

setYen("fare-total", fare_total);
setYen("transport-per", transportPerPerson);

setYen("total-per", totalPerPerson);

/* ============================
   アコーディオン
============================ */

const accordions = document.querySelectorAll(".accordion-header");

accordions.forEach((header) => {
  header.addEventListener("click", function () {
    const content = this.nextElementSibling;
    if (!content) return;

    if (content.classList.contains("open")) {
      content.classList.remove("open");
      content.style.maxHeight = null;
      this.classList.remove("active");
    } else {
      content.classList.add("open");
      content.style.maxHeight = content.scrollHeight + "px";
      this.classList.add("active");
    }
  });
});
