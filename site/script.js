/* スムーススクロール */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const target = document.querySelector(link.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


/* セクションのふわっと表示 */

const fadeTargets = document.querySelectorAll(".section");

if ("IntersectionObserver" in window) {

  const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("fade-in");

        observer.unobserve(entry.target);

      }

    });

  }, {
    threshold:0.2
  });

  fadeTargets.forEach(target => observer.observe(target));

}else{

  fadeTargets.forEach(target=>{
    target.classList.add("fade-in");
  });

}


/* 持ち物リスト */

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

const packingList=document.getElementById("packing-list");

if(packingList){

packingItems.forEach((item,index)=>{

const li=document.createElement("li");

const checkbox=document.createElement("input");

checkbox.type="checkbox";

checkbox.id=`item-${index}`;

checkbox.checked=localStorage.getItem(`packing-${index}`)==="true";

checkbox.addEventListener("change",()=>{

localStorage.setItem(`packing-${index}`,checkbox.checked);

});

const label=document.createElement("label");

label.htmlFor=checkbox.id;

label.textContent=item;

li.appendChild(checkbox);

li.appendChild(label);

packingList.appendChild(li);

});

}


/* アコーディオン */

document.querySelectorAll(".accordion-header").forEach(header=>{

header.addEventListener("click",()=>{

const content=header.nextElementSibling;

content.classList.toggle("open");

if(content.classList.contains("open")){

content.style.maxHeight=content.scrollHeight+"px";

}else{

content.style.maxHeight=null;

}

});

});