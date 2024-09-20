(async () => {
  setHeaderUser();
  const mockupKey = getQueryValue("key");
  const name = getQueryValue("name");
  document.getElementById("title").innerText = `All the ${name.toLowerCase()}`;
  const menus = document.querySelectorAll(".header-menu-item");
  if (mockupKey === "box-mockups") {
    menus[1].classList.add("active");
  } else if (mockupKey === "bottle-mockups") {
    menus[2].classList.add("active");
  } else if (mockupKey === "pouch-and-sachet-and-bag--mockups") {
    menus[3].classList.add("active");
  }
  // Get models list
  const result = await fetch(
    `/models?current=1&pageSize=50&mockupNameKey=${mockupKey}`
  ).then((res) => res.json());
  const backupData = {
    Boxes: [
      {
        image: "https://cdn.pacdora.com/render/20240115/102709970001.jpg",
        showName: "Flip top boxes mailer all-in-one mockup 150010",
        modelId: 150010,
      },
      {
        image: "https://cdn.pacdora.com/render/20240522/104332490001.jpg",
        showName:
          "Tuck end boxes double tray reverse mortise lock mockup 100010",
        modelId: 100010,
      },
    ],
    Bottles: [
      {
        image: "https://cdn.pacdora.com/render/20240104/102624380001.jpg",
        showName: "Cans aluminum bottles tin mockup 500010",
        modelId: 500010,
      },
      {
        image: "https://cloud.pacdora.com/render/20230625/101102260001.jpg",
        showName: "Plastic bottles product label mockup 500340",
        modelId: 500340,
      },
    ],
    Pouches: [
      {
        image: "https://cdn.pacdora.com/render/20231122/102304880001.jpg",
        showName:
          "Flexible packaging stand up zipper pouches mylar bag mockup 600040",
        modelId: 600040,
      },
      {
        image: "https://cdn.pacdora.com/render/20231122/102305580001.jpg",
        showName:
          "Flexible packaging paper bags stand up pouches mockup 600060",
        modelId: 600060,
      },
    ],
  };
  const category = new URLSearchParams(
    new URL(window.location.href).search
  ).get("name");
  console.log("category", category);
  const list = result.code === 422 ? backupData[category] : result.data;
  let html = "";
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    html += `
        <a class="list-item" href="/detail.html?modelId=${item.modelId}">
            <img src="${item.image.replace(
              "cdn.pacdora.com/",
              "cdn.pacdora.com/image-resize/650xauto_outside/"
            )}" />
            <p>${item.showName}</p>
        </a>
    `;
  }
  document.querySelector("#list").innerHTML = html;
})();
