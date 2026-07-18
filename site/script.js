/* ============================
   スムーススクロール
============================ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });
  
  /* ============================
     セクションのふわっと表示
  ============================ */
  const fadeTargets = document.querySelectorAll('.section');
  
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: 0.2 });
  
  fadeTargets.forEach(target => fadeObserver.observe(target));
  
  /* ============================
     持ち物リスト（チェック式）
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
  
  packingItems.forEach((item, index) => {
    const li = document.createElement("li");
  
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `item-${index}`;
  
    const saved = localStorage.getItem(`packing-${index}`);
    if (saved === "true") checkbox.checked = true;
  
    checkbox.addEventListener("change", () => {
      localStorage.setItem(`packing-${index}`, checkbox.checked);
    });
  
    const label = document.createElement("label");
    label.htmlFor = checkbox.id;
    label.textContent = item;
  
    li.appendChild(checkbox);
    li.appendChild(label);
    packingList.appendChild(li);
  });
  