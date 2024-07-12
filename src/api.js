const Router = require("koa-router");
const https = require("https");
const config = require("./config.json");
const router = new Router();
function httpsDelete(url, params, headers) {
  const queryParams = new URLSearchParams(params);
  return new Promise((resolve) => {
    const req = https.request(
      {
        path: url,
        host: "api.pacdora.com",
        headers: {
          ...headers,
          "Transfer-Encoding": "chunked",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
        method: "DELETE",
      },
      (res) => {
        let chunk = "";
        res.on("data", (data) => {
          chunk += data;
        });
        res.on("end", () => {
          resolve(JSON.parse(chunk));
        });
      }
    );
    req.useChunkedEncodingByDefault = true;
    req.write(JSON.stringify(params));
    req.end();
  });
}
function httpsPost(url, body, headers) {
  return new Promise((resolve) => {
    let chunk = "";
    const req = https.request(
      {
        path: url,
        method: "POST",
        host: "api.pacdora.com",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
      (res) => {
        res.on("data", (data) => {
          console.log("data===>", data);
          chunk += data;
        });
        res.on("end", () => {
          console.log(chunk);
          resolve(JSON.parse(chunk));
        });
        res.on("error", (err) => {
          console.log("error===>", err);
        });
      }
    );
    req.useChunkedEncodingByDefault = true;
    req.write(JSON.stringify(body));
    req.end();
  });
}
function httpsGet(url, headers) {
  return new Promise((resolve) => {
    let chunk = "";
    https.get(
      {
        path: url,
        host: "api.pacdora.com",
        headers,
      },
      (res) => {
        res.on("data", (data) => {
          chunk += data;
        });
        res.on("end", () => {
          resolve(JSON.parse(chunk));
        });
      }
    );
  });
}
/**
 * Get model classifications
 */
router.get("/ctree", async (ctx) => {
  const result = await httpsGet("/open/v1/models/class/home", {
    appId: config.appId,
    appKey: config.appKey,
  });
  ctx.response.body = JSON.stringify(result);
});
/**
 * Retrieve a list of models.
 */
router.get("/models", async (ctx) => {
  const { mockupNameKey, current, pageSize } = ctx.request.query;
  const result = await httpsGet(
    `/open/v1/models?mockupNameKey=${mockupNameKey}&current=${current}&pageSize=${pageSize}`,
    {
      appId: config.appId,
      appKey: config.appKey,
    }
  );
  ctx.response.body = JSON.stringify(result);
});
/**
 * Retrieve a list of templates.
 */
router.get("/templates", async (ctx) => {
  const result = await httpsGet("/open/v1/templates?pageSize=8&current=1", {
    appId: config.appId,
    appKey: config.appKey,
  });
  ctx.response.body = JSON.stringify(result);
});
/**
 * Obtain the user's design projects
 */
router.get("/projects", async (ctx) => {
  const userId = ctx.request.query.userId;
  const result = await httpsGet(`/open/v1/user/projects?userId=${userId}`, {
    appId: config.appId,
    appKey: config.appKey,
  });
  ctx.response.body = JSON.stringify(result);
});

/**
 * Delete the user's design project
 */
router.delete("/project/:id", async (ctx) => {
  const projectId = ctx.request.params.id;
  const result = await httpsDelete(
    `/open/v1/user/projects`,
    { projectIds: [projectId] },
    {
      appId: config.appId,
      appKey: config.appKey,
    }
  );
  ctx.response.body = JSON.stringify(result);
});

/**
 * Submit export PDF request
 */
router.post("/export", async (ctx) => {
  const { projectId } = ctx.request.body;
  const result = await httpsPost(
    "/open/v1/user/projects/export/pdf",
    {
      projectIds: [projectId],
    },
    {
      appId: config.appId,
      appKey: config.appKey,
    }
  );
  ctx.response.body = JSON.stringify(result);
});

/**
 * Query export character list
 */
router.get("/export", async (ctx) => {
  const { taskId } = ctx.request.query;
  const result = await httpsGet(
    `/open/v1/user/projects/export/pdf?taskId=${taskId}`,
    {
      appId: config.appId,
      appKey: config.appKey,
    }
  );
  ctx.response.body = JSON.stringify(result);
});
module.exports = router;
