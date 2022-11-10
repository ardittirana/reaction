/**
 * @summary returns an auto-incrementing integer id for a specific entity
 * @param {Object} context - The application context
 * @param {String} shopId - The shop ID
 * @param {String} entity - The entity (normally a collection) that you are tracking the ID for
 * @return {Promise<Number>} - The auto-incrementing ID to use
 */
export default async function getNextSequence(context, shopId, entity) {
  const { collections: { Sequences } } = context;
  const { value: { value } } = await Sequences.findOneAndUpdate({ shopId, entity }, { $inc: { value: 1 } }, { returnDocument: "after" });
  if (!value) {
    await Sequences.insert({
      shopId,
      entity,
      value: 1
    });
    return 1;
  }
  return value;
}
