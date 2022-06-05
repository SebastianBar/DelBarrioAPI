import omitDeep from 'omit-deep';

/**
 * Funciones para filtrar datos de los retornos JSON
 */
export const filter = {
  GETall: (entities) => {
    const omit = ['IDEN_CATEGORIA_PADRE'];
    return omitDeep(entities.toJSON(), omit);
  },
  GETsingle: (entity) => {
    const omit = ['IDEN_CATEGORIA', 'FLAG_VIGENTE'];
    return omitDeep(entity.toJSON(), omit);
  },
};
