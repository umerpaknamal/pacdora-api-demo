async function editProjectName(id) {
  const name = document.querySelector(".rename-input").innerText;
  if (name !== "") {
    await Pacdora.rename(name, id);
    getProjectList();
    cancelEdit();
  } else {
    alert("Please enter project name");
  }
}
function cancelEdit() {
  const maskEle = document.querySelector(".mask");
  maskEle.parentNode.removeChild(maskEle);
  const renameDialogEle = document.querySelector(".rename-dialog");
  renameDialogEle.parentNode.removeChild(renameDialogEle);
}
async function openDesignDialog(ele, id) {
  const loadingEle = document.createElement("div");
  ele.style.display = "flex";
  ele.style.alignItems = "center";
  ele.style.justifyContent = "center";
  loadingEle.className = "pac-loading";
  loadingEle.style.display = "inline-block";
  loadingEle.style.border = "solid 3px #fff";
  loadingEle.style.width = "24px";
  loadingEle.style.height = "24px";
  loadingEle.style.marginLeft = "4px";
  loadingEle.style.borderTopColor = "transparent";
  ele.appendChild(loadingEle);
  const scene = await Pacdora.createScene({
    id: id,
    doneBtn: "Save",
  });
  Pacdora.openEditor(
    () => {
      getProjectList();
    },
    () => {},
    {
      screenshotWidth: 400,
      saveScreenshot: "true",
    }
  );
  loadingEle.parentNode?.removeChild(loadingEle);
}
function onEditProjectName(id, name) {
  const mask = document.createElement("div");
  mask.className = "mask";
  const dialog = document.createElement("div");
  dialog.className = "rename-dialog";
  document.body.appendChild(mask);
  document.body.appendChild(dialog);
  dialog.innerHTML = `
    <i class="iconfont icon-ico-qingkong"></i>
    <div class="rename-title">Rename</div>
    <div class="rename-input" contenteditable="true">${name}</div>
    <div class="btn-group">
        <div class="btn outline" onclick="cancelEdit()">Cancel</div>
        <div class="btn ml20" onclick="editProjectName(${id})">Confirm</div>
    </div>
  `;
}

async function pollingExport(taskId) {
  return new Promise(async (resolve, reject) => {
    const result = await fetch(`/export?taskId=${taskId}`).then((res) =>
      res.json()
    );
    if (result.data.status === 2) {
      resolve(result.data.filePath);
    } else if (result.data.status === 3) {
      reject("error");
    } else {
      setTimeout(async () => {
        try {
          const file = await pollingExport(taskId);
          resolve(file);
        } catch (err) {
          reject(err);
        }
      }, 1000);
    }
  });
}
const getSuffix = (filePath) => {
  return filePath.substring(filePath.lastIndexOf(".") + 1).toLowerCase();
};
async function downloadFile(path, rename, isSuffix = true) {
  let filename = "";
  if (isSuffix) {
    filename = `${rename}.${getSuffix(path)}`;
  } else {
    filename = `${rename}`;
  }
  let downloadUrl = path;

  const a = document.createElement("a");
  a.href = downloadUrl;
  a.click();
  a.remove();
}
async function onDownload(ele, id) {
  const loadingEle = document.createElement("div");
  ele.style.display = "flex";
  ele.style.alignItems = "center";
  ele.style.justifyContent = "center";
  loadingEle.className = "pac-loading";
  loadingEle.style.display = "inline-block";
  loadingEle.style.border = "solid 3px #333";
  loadingEle.style.borderTopColor = "transparent";
  loadingEle.style.width = "24px";
  loadingEle.style.height = "24px";
  loadingEle.style.marginLeft = "4px";
  ele.appendChild(loadingEle);
  const result = await fetch(`/export`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ projectId: id }),
  }).then((res) => res.json());
  console.log("result===>", result);
  const taskId = result.data[0].taskId;
  const file = await pollingExport(taskId);
  await downloadFile(file);
  loadingEle.parentNode?.removeChild(loadingEle);
}

async function onDelProject(id) {
  const result = await fetch(`/project/${id}`, {
    method: "delete",
  });
  getProjectList();
}
async function getProjectList() {
  const userName = localStorage.getItem("username");
  const result = await fetch(`/projects?userId=${userName}`).then((res) =>
    res.json()
  );
  let html = "";
  for (let i = 0; i < result.data.length; i++) {
    const item = result.data[i];
    html += `
        <div class="list-item">
            <div class="list-left">
                <div class="project-screenshot">
                    <img src="${item.screenshot}" />
                </div>
            </div>
            <div class="list-right">
                <i class="iconfont icon-shanchu delete-icon" onclick="onDelProject(${
                  item.id
                })" ${i === 0 ? 'data-ui-tip="delete"' : ""}></i>
                <h4 class="project-name">${
                  item.name
                }<i class="iconfont icon-pencil" onclick="onEditProjectName(${
      item.id
    }, '${item.name}')" ${i === 0 ? 'data-ui-tip="rename"' : ""}></i></h4>
                <div class="project-info-item mb20">
                    <div class="info-label">Dimension:</div>
                    <div class="info-value">${item.width}x${item.height}x${
      item.length
    }mm</div>
                </div>
                <div class="project-info-item mb20">
                    <div class="info-label">Material:</div>
                    <div class="info-value">${item.scienceName}</div>
                </div>
                <div class="project-info-item">
                    <div class="info-label">Thickness:</div>
                    <div class="info-value">${item.thickness}mm</div>
                </div>
                <div class=" mt40 flex-start">
                    <div class="btn flex1" onclick="openDesignDialog(this, ${
                      item.id
                    })" ${
      i === 0 ? 'data-ui-tip="my-editor"' : ""
    }>Return to Design</div>
                    <div class="ml20 flex1">
                      <div class="btn  outline" onclick="onDownload(this, ${
                        item.id
                      })" ${
      i === 0 ? 'data-ui-tip="my-download"' : ""
    }>Download</div>
                      <div class="tip">
                        With Pdf/Ai/DXF format
                      </div>
                    </div>
                    
                </div>
                
            </div>
        </div>
      `;
  }
  document.getElementById("list").innerHTML = html;
  const tipEles = document.querySelectorAll("[data-ui-tip]");
  for (let i = 0; i < tipEles.length; i++) {
    const ele = tipEles[i];
    const style = getComputedStyle(ele);
    if (style.position !== "absolute" && style.position !== "fixed") {
      ele.style.position = "relative";
    }
    const tipUIEle = document.createElement("div");
    tipUIEle.className = "api-tip";
    if (ele.dataset.tipPosition === "center") {
      tipUIEle.style.left = "55%";
      tipUIEle.style.top = "45%";
    }
    const tipInner = document.createElement("div");
    tipInner.className = "api-tip-inner";
    tipUIEle.appendChild(tipInner);
    ele.appendChild(tipUIEle);
    tipUIEle.onclick = (e) => {
      e.stopPropagation();
      e.preventDefault();
      showApiTip(ele.dataset.uiTip);
    };
    tipUIEle.onmouseenter = (e) => {
      e.stopPropagation();
      e.preventDefault();
      showApiToast(tipUIEle, ele.dataset.uiTip, true);
    };
    tipUIEle.onmouseleave = (e) => {
      showApiToast(tipUIEle, ele.dataset.uiTip, false);
    };
  }
}
(async () => {
  const userName = localStorage.getItem("username");
  Pacdora.init({
    userId: userName,
    appId: window.appId,
    isDelay: true,
    theme: "#333333",
  });
  getProjectList();
  setHeaderUser();
})();
