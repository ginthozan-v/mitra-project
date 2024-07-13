export default {
  stringify: (json: any) => {
    const keys = Object.keys(json);
    let params = '';
    for (const key of keys) {
      params += `&${key}=${json[key]}`;
    }
    return params.substring(1);
  },
};
