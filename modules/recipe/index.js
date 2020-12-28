module.exports = {
  extend: '@apostrophecms/piece-type',
  options: {
    label: 'Recipe',
    pluralLabel: 'Recipes'
  },

  fields: {
    add: {
      title: {
        type: 'string',
        required: true,
        label: 'Recipe Name'
      },
      _featuredPhoto: {
        type: 'relationship',
        label: 'Featured Photo',
        max: 1,
        required: true,
        withType: '@apostrophecms/image'
      },
      method: {
        type: 'area',
        label: 'Method',
        options: {
          widgets: {
            '@apostrophecms/rich-text': {
              toolbar: [
                'bold',
                'italic',
                'link',
                '|',
                'bullet_list',
                'ordered_list',
                '|',
                'undo',
                'redo'
              ]
            }
          }
        }
      },
      ingredients: {
        label: 'Ingredients',
        type: 'array',
        fields: {
          add: {
            _ingredient: {
              label: 'Ingredient',
              type: 'relationship',
              withType: 'ingredient',
              max: 1,
              required: true
            },
            quantity: {
              label: 'Quantity',
              type: 'integer',
              required: true
            }
          }
        }
      }
    },
    group: {
      details: {
        label: 'Recipe Details',
        fields: [ 'title', '_featuredPhoto', 'method', 'ingredients' ]
      }
    }
  }
};
