const ApiTips = {
  "model-list": {
    name: "Listing all the models/boxes by category ID",
    tips: [
      {
        title: "Overview",
        content:
          "This is an Advanced feature which will cost an additional fee and need to sign a noncompetition agreement. However this API is really convenient to list all the models and boxes by passing a Pacdora category ID.",
      },
      {
        title: "API Request Interface",
        content: [
          {
            type: "code",
            codeLang: "nohighlight",
            value: `
    -------------------------- Request path --------------------------

    GET  https://api.pacdora.com/open/v1/models

    -------------------------- Request Content ------------------------
    `,
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "code",
            codeLang: "language-javascript",
            value: `
              const https = require("https");
              let chunk = "";
              https.get(
                  {
                      path: "/open/v1/models?mockupNameKey=box-mockups&current=1&pageSize=50",
                      host: "api.pacdora.com",
                      headers: {
                          appId: "Your app ID",
                          appKey: "Your app Key",
                      },
                  },
                  (res) => {
                      res.on("data", (data) => {
                          chunk += data;
                      });
                      res.on("end", () => {
                          console.log(JSON.parse(chunk));
                      });
                  }
              );
            `,
          },
        ],
      },
    ],
  },
  "cate-tree": {
    name: "Listing all the categories from Pacdora library",
    tips: [
      {
        title: "API Request Interface",
        content: [
          {
            type: "code",
            codeLang: "nohighlight",
            value: `
        -------------------------- Request path --------------------------

        GET  https://api.pacdora.com/open/v1/models/ctree

        -------------------------- Request Content ------------------------
        `,
          },
        ],
      },
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "To be noted first: This is an Advanced feature which will cost an additional fee and need to sign a noncompetition agreement. However this API is really convenient to list all the mockup categories from Pacdora library on your own website.",
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "code",
            codeLang: "language-javascript",
            value: `
            const https = require("https");
            let chunk = "";
            https.get(
                {
                    path: "/open/v1/models/ctree",
                    host: "api.pacdora.com",
                    headers: {
                        appId: "Your app ID",
                        appKey: "Your app key",
                    },
                },
                (res) => {
                    res.on("data", (data) => {
                        chunk += data;
                    });
                    res.on("end", () => {
                        console.log(JSON.parse(chunk));
                    });
                }
            );
          `,
          },
        ],
      },
    ],
  },
  "create-blank": {
    name: "Listing a blank model/box",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "Pacdora has a model library with over 5000 mockups, each with a unique ID that can be used to display the model in your SKU lists. We also provide the modeling service for your own unique model that cannot be searched from our Library.",
          },
        ],
      },
    ],
  },
  "create-template": {
    name: "Listing a pre-designed model/box as a template",
    tips: [
      {
        title: "API Request Interface",
        content: [
          {
            type: "code",
            codeLang: "nohighlight",
            value: `
      -------------------------- Request path --------------------------

      GET  https://api.pacdora.com/open/v1/templates

      -------------------------- Request Content ------------------------
      `,
          },
        ],
      },
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "Most of the time, providing pre-designed templates can make it easier for customers to start designing. Pacdora API can use the designed projects in your Pacdora account as templates for your customers to further customize based on them.",
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "code",
            codeLang: "language-javascript",
            value: `
              const https = require("https");
              let chunk = "";
              https.get(
                  {
                      path: "/open/v1/templates",
                      host: "api.pacdora.com",
                      headers: {
                          appId: "Your app ID",
                          appKey: "Your app key",
                      },
                  },
                  (res) => {
                      res.on("data", (data) => {
                          chunk += data;
                      });
                      res.on("end", () => {
                          console.log(JSON.parse(chunk));
                      });
                  }
              );
            `,
          },
        ],
      },
    ],
  },
  dimension: {
    name: "Setting the custom Dimensions",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "Although Pacdora has a powerful size editing function that allows your customers to input any size, as a printing factory, we believe you would prefer customers to choose specific dimensions. This API allows you to pre-define some dimensions for customers to choose from.",
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "code",
            value: `
            <select onchange="onChangeDimension(this)" id="dimension">
                <option value="">Choose the dimension</option>
                <option value="315*202*62">315*202*62mm</option>
                <option value="150*100*50">150*100*50mm</option>
                <option value="360*240*40">360*240*40mm</option>
            </select>
            <script>
                function onChangeDimension(e) {
                    const value = e.value;
                    if (value !== "") {
                    const size = value.split("*");
                    Pacdora.setSize({ß
                        length: Number(size[0]),
                        width: Number(size[1]),
                        height: Number(size[2]),
                        async: true,
                    });
                    }
                }
            </script>
            `,
          },
        ],
      },
    ],
  },
  material: {
    name: "Setting the custom materials",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "In addition to the two default materials provided by Pacdora, you can also configure your unique material options through this API.",
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "code",
            value: `
            <select onchange="onChangeMaterial(this)" id="material">
                <option value="">Choose the material</option>
                <option value="White card board">White card board</option>
                <option value="E-flute paper">E-flute paper</option>
                <option value="Kraft paper">Dark kraft paper</option>
            </select>
            <script>
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
                }
            </script>
            `,
          },
        ],
      },
    ],
  },
  thickness: {
    name: "Setting the custom thickness",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "Each Material has a default thickness, But you still can give more thickness options for your customer to choose from.",
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "code",
            value: `
            <select onchange="onChangeThickness(this)" id="thickness">
                <option value="">Choose the thickness</option>
                <option value="1.5">1.5mm</option>
                <option value="1">1mm</option>
                <option value="2">2mm</option>
            </select>
            <script>
                function onChangeThickness(e) {
                    const value = e.value;
                    if (value !== "") {
                    Pacdora.setThickness({
                        value: Number(value),
                        async: true,
                    });
                    }
                }
            </script>
            `,
          },
        ],
      },
    ],
  },
  editor: {
    name: "Adding the Core Editor button",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "This is absolutely the Core feature of Pacdora API, you can add this starting button on any page of your own website with any style and button text. After the user clicks it, the editor will be displayed in a popup window.",
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "code",
            value: `
            <div
                class="btn design-btn"
                data-pacdora-ui="design-btn"
                data-save-screenshot="false"
                data-screenshot-width="800"
                data-ui-tip="editor"
            >
                Design online
            </div>
            `,
          },
        ],
      },
    ],
  },
  download: {
    name: "Downloading a template/dieline file",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "The Pacdora API allows your customer to download the template/dieline file directly in the Ai/pdf format. Of course you can hide this button and use this export function only in your backend.",
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "code",
            value: `
            <div
            class="download-text"
            data-pacdora-ui="download"
            data-app-key="app_key123"
            data-pacdora-id="download"
            data-ui-tip="download"
          >
            Download the Dieline
          </div>
            `,
          },
        ],
      },
    ],
  },
  locale: {
    name: "Multilingual feature",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "To be noted first: This is an Advanced feature which will cost an additional fee. The Pacdora API provides the function to configure your locale file for different languages.",
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "code",
            value: `
          (async () => {
            await Pacdora.init({
                userId: "Your customer user id",
                appId: "Your APP ID",
                isDelay: true,
                theme: "#333333",
                doneBtn: "Save",
                localeResource: {
                  "Upload & Design":"Diseño en línea"
                }
            });
          })()
          `,
          },
        ],
      },
    ],
  },
  "editor-save": {
    name: "Changing the Theme color and button text",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "Pacdora API can allow you to change the editor’s theme color and also the button text.",
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "code",
            codeLang: "language-javascript",
            value: `
          (async () => {
            await Pacdora.init({
                userId: "Your customer user id",
                appId: "Your APP ID",
                isDelay: true,
                theme: "#333333",
                doneBtn: "Save",
            });
          })()
        `,
          },
        ],
      },
    ],
  },
  "editor-size": {
    name: "Disable the size editing feature",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              " If you do not want your customers to input arbitrary dimensions here, you can disable the editing function and only display the dimensions.",
          },
        ],
      },
      {
        title: "Code example",

        content: [
          {
            type: "code",
            codeLang: "language-javascript",
            value: `
            await Pacdora.createScene({
                doneBtn: 'Save',
                modelId: '100010',
                showSize: false,
            })
          `,
          },
        ],
      },
    ],
  },
  "editor-material": {
    name: "Disable the material editing feature",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "In addition to the two default materials provided by Pacdora, you can also configure your unique material options through this API.",
          },
        ],
      },
      {
        title: "Code example",

        content: [
          {
            type: "code",
            codeLang: "language-javascript",
            value: `
              await Pacdora.createScene({
                  doneBtn: 'Save',
                  modelId: '100010',
                  showMaterial: false,
              })
            `,
          },
        ],
      },
    ],
  },
  "editor-recommend": {
    name: "Adding custom colors",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              " In addition to the two default colors provided by Pacdora, you can also configure your unique color options through this API.",
          },
        ],
      },
      {
        title: "Code example",

        content: [
          {
            type: "code",
            codeLang: "language-javascript",
            value: `
              await Pacdora.createScene({
                  doneBtn: 'Save',
                  modelId: '100010',
                  packagingColors: ['#ff0000', '#00ff00', '#0000ff', '#893829']
              })
            `,
          },
        ],
      },
    ],
  },
  "editor-white-label": {
    name: "White label feature",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "To be noted first: This is an Advanced feature which will cost an additional fee.",
          },
        ],
      },
    ],
  },
  delete: {
    name: "Delete project",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value: "The Pacdora API allows you to delete user's projects",
          },
        ],
      },
    ],
  },
  "save-project-list": {
    name: "Saving projects to your own server",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "The Pacdora API allows you to save every user’s projects in your own server with the designing information including dimensions, material, thickness, graphic design, elements and dieline data which can be used in your next business steps like quotation or producing.",
          },
        ],
      },
    ],
  },
  "projects-list": {
    name: "Project list",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "The Pacdora API allows you to list, re-edit, and delete user’s projects.",
          },
        ],
      },
    ],
  },
  rename: {
    name: "Rename",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value: "",
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "code",
            codeLang: "language-javascript",
            value: "await Pacdora.rename('Your desired name', 'Project id');",
          },
        ],
      },
    ],
  },
  "my-editor": {
    name: "Open design",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "The Pacdora API allows you to reload a user’s design and let the user redesign his/her project.",
          },
        ],
      },
    ],
  },
  "my-download": {
    name: "My download",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "The Pacdora API allows you export the dieline and graphic design in pdf/ai format.",
          },
        ],
      },
    ],
  },
  switch: {
    name: "Switching the box’s display mode.",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "The Pacdora API allows you to showcase any box or model in three ways: dieline, 2D flat view, and 3D simulator. Once any modifications are made in the editor, the content displayed in these three modes will be immediately updated.",
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "p",
            value: "Creating a 3D preview component",
          },
          {
            type: "code",
            value: `<div class="d3" data-pacdora-ui="3d" data-pacdora-id="d3"></div>`,
          },
          {
            type: "p",
            value: "Creating a dieline preview component",
          },
          {
            type: "code",
            value: `<div class="dieline" data-pacdora-ui="dieline"></div>`,
          },
          {
            type: "p",
            value: "Creating a 2D preview component",
          },
          {
            type: "code",
            value: `<div class="dieline" data-pacdora-ui="3d-preview"></div>`,
          },
        ],
      },
    ],
  },
  collapse: {
    name: "Open & Close component",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "The Pacdora API Provide an open & close component for you to add to your own layout. And you can change the style of the component.",
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "code",
            value: `
            <div class="d3" data-pacdora-ui="3d" data-pacdora-id="d3"></div>
            <script>
                Pacdora.collapse("d3", 0.5)
            </script>
            `,
          },
        ],
      },
    ],
  },
  "create-project": {
    name: "How to authorize calling the Editor API",
    tips: [
      {
        title: "Overview",
        content: [
          {
            type: "p",
            value:
              "This method allows you to calling Pacdora API on your own website, and also, you can pass your userID when calling the editor so that the user’s design work will be connected to the user ID you passed.",
          },
        ],
      },
      {
        title: "Code example",
        content: [
          {
            type: "code",
            codeLang: "language-javascript",
            value: `
          (async () => {
            await Pacdora.init({
                userId: "Your customer user id",
                appId: "Your APP ID",
                isDelay: true,
                theme: "#333",
                doneBtn: "Save",
                localeResource: {
                    "Upload & Design": "Online design",
                },
            });
            await Pacdora.createScene({
                id: id,
                modelId: modelId,
                templateId,
                isShowLoading: false,
                doneBtn: "Save",
            });
          })()
        `,
          },
        ],
      },
    ],
  },
};
