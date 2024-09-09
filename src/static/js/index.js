(async () => {
  try {
    // Request to obtain Pacdora categories and display them on the page
    const result = await fetch(`/ctree`).then((res) => res.json());
    let html = "";
    const backupData = [
      {
        mockupNameKey: "box-mockups",
        name: "Boxes",
        homeConfig: {
          imgSrc:
            "//cdn.pacdora.com/ui/home/mockups/b1f218f2-257b-4bee-9129-531875dcb52d.webp",
        },
      },
      {
        mockupNameKey: "pouch-mockups",
        name: "Pouches",
        homeConfig: {
          imgSrc:
            "//cdn.pacdora.com/ui/home/mockups/39fb8a76-b8af-49ee-928d-5abf79123227.webp",
        },
      },
    ];
    const list = result.code === 422 ? backupData : result.data;
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      html += `
        <a class="category-item" href="/category.html?key=${item.mockupNameKey}&name=${item.name}">
            <div class="category-name">${item.name}</div>
            <img src="${item.homeConfig.imgSrc}" class="category-image"/>
        </a>
    `;
    }
    const box = document.getElementById("category-box");
    box.innerHTML = html;
    // Pacdora categories GUI end

    // Request to obtain the list of pre-designed templates and display them on the page
    const templateResult = await fetch("/templates").then((res) => res.json());
    let templateHtml = "";
    const templateBackupData = [
      {
        templateId: 20110771,
        cover: "https://cdn.pacdora.com/preview/cover-156210.jpg",
      },
      {
        templateId: 20110755,
        cover: "https://cdn.pacdora.com/preview/cover-150020.jpg",
      },
    ];
    const templateList =
      templateResult.code === 422 ? templateBackupData : templateResult.data;
    for (let i = 0; i < templateList.length; i++) {
      const item = templateList[i];
      templateHtml += `
      <a class="list-item" href="/detail.html?templateId=${item.templateId}">
        <img
          src="${item.cover.replace(
            "cdn.pacdora.com/",
            "cdn.pacdora.com/image-resize/650xauto_outside/"
          )}"
        />
      </a>
    `;
    }
    const templateBox = document.getElementById("templates-box");
    templateBox.innerHTML = templateHtml;
    // Pre-designed templates GUI end
  } catch (e) {}
})();
