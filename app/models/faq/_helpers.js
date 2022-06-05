import omitDeep from 'omit-deep';

/**
 * Funciones para filtrar datos de los retornos JSON
 */
export const filter = {
  GETsingle: (entity) => {
    const omit = ['IDEN_FAQ'];
    return omitDeep(entity.toJSON(), omit);
  },
};
