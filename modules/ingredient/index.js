module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Ingredient',
    pluralLabel: 'Ingredients'
  },

  fields: {
    add: {
      title: {
        type: 'string',
        required: true,
        label: 'Ingredient Name'
      },
      quantityUnit: {
        type: 'string',
        label: 'Quantity Unit (eg: kg)'
      },
      defaultQty: {
        type: 'float',
        label: 'Default quantity (eg: 1)',
        def: 1
      }
    },
    group: {
      basics: {
        label: 'Basic Details',
        fields: [ 'title', 'quantityUnit', 'defaultQty' ]
      }
    }
  },

  // this allows me to 'generate' test ingredients
  extendMethods(self, options) {
    return {
      generate(_super, i) {
        const piece = _super(i);
        const units = [ 'kg', 'can', 'handful', 'g', 'bag', 'bottle' ];
        piece.quantityUnit = units[Math.floor(Math.random() * units.length)];
        piece.defaultQty = Math.floor(Math.random() * 10);
        return piece;
      }
    };
  }
};
