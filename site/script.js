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
   持ち物リスト
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
  "ボードゲーム",
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