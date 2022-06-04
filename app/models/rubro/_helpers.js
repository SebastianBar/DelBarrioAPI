import omitDeep from 'omit-deep';

/**
 * Funciones para filtrar datos de los retornos JSON
 */
export const filter = {
  GETsingle: (entity) => {
    const omit = ['IDEN_RUBRO', 'FLAG_VIGENTE'];
    return omitDeep(entity.toJSON(), omit);
  },
};
