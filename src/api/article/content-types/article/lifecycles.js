const appendedSlug = (slug, locale) => {
  return slug.endsWith(`-${locale}`) ? slug : `${slug}-${locale}`;
};

const getBeforeUpdateLocale = async (id, modelUid) => {
  const entity = await strapi.service(modelUid).findOne(id);

  return entity ? entity.locale : null;
};

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;

    if (data.slug) {
      data.slug = appendedSlug(data.slug, data.locale);
    }
  },

  async beforeUpdate(event) {
    const { data, where } = event.params;
    if (data.slug) {
      const locale = await getBeforeUpdateLocale(where.id, event.model.uid);

      if (locale) {
        data.slug = appendedSlug(data.slug, locale);
      }
    }
  },
};
