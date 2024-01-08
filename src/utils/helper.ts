export const removeNullUndefined = (obj: any) => {
  if (!obj) return;
  return Object.entries(obj).reduce(
    (a: any, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );
};

export const convertSearchParams = (params: any) => {
  if (!params) return;

  const urlParams = new URLSearchParams();
  Object.entries(params).reduce((_: any, [k, v]) => {
    if (v && typeof v !== "object" && !Array.isArray(v)) {
      urlParams.append(k, v as any);
    } else if (Array.isArray(v) && v.length > 0) {
      for (const value of v) {
        urlParams.append(k, value);
      }
    }
  }, {});

  return urlParams;
};

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
