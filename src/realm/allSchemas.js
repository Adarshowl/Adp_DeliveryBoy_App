export const SAVE_OFFER_SCHEMA = 'save_offer';

export const SaveOfferSchema = {
  name: SAVE_OFFER_SCHEMA,
  properties: {
    id: 'string',
    listID: 'string',
  },
  primaryKey: 'id',
};
