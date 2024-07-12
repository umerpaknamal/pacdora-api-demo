// Transition animation method for the slide switch component
function onSwitch2DAnd3D(type) {
  const switchItems = document.querySelectorAll(".switch-item");
  const boxInfo = document.querySelector(".box-info-slider");
  if (type === "3d") {
    switchItems[0].className = "switch-item active";
    switchItems[1].className = "switch-item";
    switchItems[2].className = "switch-item";
    boxInfo.style.transform = "translateX(0)";
  } else if (type === "dieline") {
    switchItems[0].className = "switch-item";
    switchItems[1].className = "switch-item active";
    switchItems[2].className = "switch-item";
    boxInfo.style.transform = "translateX(-100%)";
  } else {
    switchItems[0].className = "switch-item";
    switchItems[1].className = "switch-item";
    switchItems[2].className = "switch-item active";

    boxInfo.style.transform = "translateX(-200%)";
  }
}

function openPacdora(ratio) {
  Pacdora.collapse("d3", ratio);
  const pointer = document.querySelector(".pointer");
  pointer.style.left = `${ratio * 100}%`;
  const selected = document.querySelector(".slider-selecter");
  selected.style.width = `${ratio * 100}%`;
}

// Control methods for the Slider component
function onSliderDown(e) {
  const parentBounding = e.parentNode.getBoundingClientRect();
  document.onpointermove = (ev) => {
    ev.preventDefault();
    const { clientX } = ev;
    const len = clientX - parentBounding.left;
    let ratio = len / parentBounding.width;
    if (ratio < 0) {
      ratio = 0;
    }
    if (ratio > 1) {
      ratio = 1;
    }
    Pacdora.collapse("d3", ratio);
    e.style.left = `${ratio * 100}%`;
    const selected = e.parentNode.querySelector(".slider-selecter");
    selected.style.width = `${ratio * 100}%`;
  };
  document.onpointerup = () => {
    document.onpointermove = null;
    document.onpointerup = null;
  };
}

/**
 * The callback function triggered by the dimension change event
 * updates the project via the Pacdora.setSize method.
 * @param {*} e
 * @returns
 */
function onChangeDimension(e) {
  let value = e.value;
  if (value === "") {
    return;
  }

  if (value === "customize") {
    const number = prompt(
      "Please input your dimension in the format of 315*202*62",
      "315*202*62"
    );
    const sizes = number.split("*");
    if (sizes.length !== 3) {
      return;
    }

    const length = Number(sizes[0]);
    const width = Number(sizes[1]);
    const height = Number(sizes[2]);
    if (!isNumber(length) || !isNumber(width) || !isNumber(height)) {
      e.selectedIndex = 0;
      return;
    }

    const newOption = document.createElement("option");
    newOption.value = number;
    newOption.text = number + "mm";

    e.add(newOption, e.options[1]);
    e.selectedIndex = 1;
    value = number;
  }

  const size = value.split("*");
  Pacdora.setSize({
    length: Number(size[0]),
    width: Number(size[1]),
    height: Number(size[2]),
    async: true,
  });
  makeQuotation();
}

/**
 * The callback function triggered by the Material change event
 * updates the project via the Pacdora.setMaterial method.
 * @param {*} e
 */
function onChangeMaterial(e) {
  const value = e.value;
  if (value !== "") {
    switch (value) {
      case "White card board":
        Pacdora.setMaterial({
          name: "White card board",
          image:
            "//cdn.pacdora.com/science/image/94e8078a-9931-42cd-97ed-57883bd88085.png",
          async: true,
        });
        break;
      case "E-flute paper":
        Pacdora.setMaterial({
          name: "E-flute paper",
          image:
            "//cdn.pacdora.com/science/image/00e45c0b-9cf7-4d39-bdc8-82bb202909d9.png",
          async: true,
        });
        break;
      case "Kraft paper":
        Pacdora.setMaterial({
          name: "Kraft paper",
          image: "//cdn.pacdora.com/science/image/material_kraft.png",
          async: true,
        });
        break;
    }
  }
  makeQuotation();
}

/**
 * The callback function triggered by the Thickness change event
 * updates the project via the Pacdora.setThickness method.
 * @param {*} e
 */
function onChangeThickness(e) {
  const value = e.value;
  if (value !== "") {
    Pacdora.setThickness({
      value: Number(value),
      async: true,
    });
  }
  makeQuotation();
}

function onChangePrint(e) {
  makeQuotation();
}

function onChangeFinishing(e) {
  makeQuotation();
}

function onChangeNumber(e) {
  const value = e.value;
  if (value === "customize") {
    const number = prompt("Please input your number");
    if (!isNumber(number) || !number) {
      e.selectedIndex = 0;
      return;
    }

    const newOption = document.createElement("option");
    newOption.value = number;
    newOption.text = number;

    e.add(newOption, e.options[1]);
    e.selectedIndex = 1;
  }

  makeQuotation();
}

function onBuyClick() {
  makeQuotation();
  const message = document.querySelector(".toast-message");
  if (message) {
    message.className = "toast-message active";
    setTimeout(() => {
      message.className = "toast-message";
    }, 2000);
  }
}

function onStep(count) {
  const cur = Number(document.getElementById("count").innerText);
  if (cur + count <= 0) {
    return;
  }
  document.getElementById("count").innerText = cur + count;
}

function isNumber(content) {
  return !isNaN(content);
}
