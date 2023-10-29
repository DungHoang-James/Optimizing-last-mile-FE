export const removeNullUndefined = (obj: any) => {
  if (!obj) return;
  return Object.entries(obj).reduce(
    (a: any, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    {}
  );
};
