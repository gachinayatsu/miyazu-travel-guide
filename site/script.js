/* ============================
   スムーススクロール
============================ */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
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

  }, {
    threshold: 0.15
  });

  sections.forEach((section) => {
    observer.observe(section);
  });

} else {

  sections.forEach((section) => {
    section.classList.add("fade-in");
  });

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
   三谷専用リスト（別枠）
============================ */
const mitaniItems = [
  "ボードゲーム",
  "虫刺されかゆみ止め",
  "アルコールウェットティッシュ",
  "虫除けスプレー（サラテクト）",
  "使い捨て鍋",
  "ジップロック",
  "味噌（小分け）",
  "豆板醤（小分け）",
  "砂糖（小分け）",
  "練りからし（小分け）",
  "塩（小瓶）",
  "味の素（小瓶）",
  "黒胡椒（小瓶）",
  "ナツメグ（小瓶）",
  "ハイミー（小瓶）",
  "おろし金",
  "キッチンスケール",
  "計量スプーン",
  "新聞紙",
  "温度計（揚げ物用）",
  "ブンブンチョッパー"
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
   設定
============================ */
const PEOPLE = 7;

// 共用品（使い捨て鍋なし）
const commonItems = {
  itch: 799,
  wet: 382,
  spray: 555,
  zip: 668
};

// マーダーミステリー
const murderMystery = 3960;

// 宿泊・レンタカー
const lodging = 175605;
const rentalCar = 46860;

// 交通費（往復）
const shinkansen = 9520;
const tokkyu = 6160;
const miyazuLocal = 400;

// 乗車券（往復）
const ticketNormal = 12600;
const ticketHalf = 6300;

/* ============================
   計算
============================ */

// 共用品合計
const commonTotal = Object.values(commonItems).reduce((a, b) => a + b, 0);
const commonPerPerson = Math.floor(commonTotal / PEOPLE);

// マーダーミステリー
const murderPerPerson = Math.floor(murderMystery / PEOPLE);

// 共通費用（交通費＋宿泊＋レンタカー＋共用品＋マダミス）
const baseCost =
  shinkansen +
  tokkyu +
  miyazuLocal +
  Math.floor(lodging / PEOPLE) +
  Math.floor(rentalCar / PEOPLE) +
  commonPerPerson +
  murderPerPerson;

/* ============================
   乗車券 2パターン
============================ */

// パターン①：1人が半額を丸取り
const pattern1_mitani = baseCost + ticketHalf;
const pattern1_special = baseCost + ticketHalf;
const pattern1_others = baseCost + ticketNormal;

// パターン②：6人で均等割り
const discountTotal = ticketNormal * 7 - (ticketHalf * 2 + ticketNormal * 5); // 12,600円
const discountPerPerson = Math.floor(discountTotal / 6); // 2,100円

const pattern2_mitani = baseCost + ticketHalf;
const pattern2_others = baseCost + (ticketNormal - discountPerPerson);

/* ============================
   HTMLへ反映
============================ */

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value.toLocaleString() + "円";
}

// 共用品
setText("common-total", commonTotal);
setText("common-per", commonPerPerson);

// マーダーミステリー
setText("murder-total", murderMystery);
setText("murder-per", murderPerPerson);

// 最終総額（2パターン）
setText("p1-mitani", pattern1_mitani);
setText("p1-special", pattern1_special);
setText("p1-others", pattern1_others);

setText("p2-mitani", pattern2_mitani);
setText("p2-others", pattern2_others);


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

    } else {

      content.classList.add("open");
      content.style.maxHeight = content.scrollHeight + "px";

    }

  });

});