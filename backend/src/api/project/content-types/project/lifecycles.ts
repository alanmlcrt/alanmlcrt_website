
export default {
  beforeCreate(event: any) {
    const { data } = event.params;
    if (data.slug) {
      if (!data.seo) data.seo = {};
      if (!data.seo.canonicalURL) {
        data.seo.canonicalURL = `https://alanmlcrt.fr/projects/${data.slug}`;
      }
    }
  },
  beforeUpdate(event: any) {
    const { data } = event.params;
    if (data.slug) {
      if (!data.seo) data.seo = {};
      if (!data.seo.canonicalURL) {
        data.seo.canonicalURL = `https://alanmlcrt.fr/projects/${data.slug}`;
      }
    }
  },
};
