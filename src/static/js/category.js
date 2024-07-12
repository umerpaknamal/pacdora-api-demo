(async () => {
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
  const list = result.data;
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
