/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper} wrapper - Enzyme ShallowWrapper.
 * @param {string} attrVal - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
export const findByTestAttr = (wrapper, attrVal) =>
  wrapper.find(`[data-test="${attrVal}"]`);
