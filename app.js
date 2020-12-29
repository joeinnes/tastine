require('dotenv').config();

const path = require('path');

require('apostrophe')({
  shortName: 'tastine',

  modules: {

    // Apostrophe module configuration

    // Note: most configuration occurs in the respective
    // modules' directories. See lib/@apostrophecms/assets/index.js for an example.

    // However any modules that are not present by default in Apostrophe must at
    // least have a minimal configuration here to turn them on: `moduleName: {}`

    // If a template is not found somewhere else, serve it from the top-level
    // `views/` folder of the project

    '@apostrophecms/db': {
      options: {
        uri: process.env.MONGO_URI
      }
    },

    '@apostrophecms/attachment': {
      options: {
        uploadfs: {
          backend: 's3',
          secret: process.env.S3_SECRET,
          key: process.env.S3_KEY,
          bucket: process.env.S3_BUCKET,
          region: process.env.S3_REGION,
          endpoint: process.env.S3_ENDPOINT,
          style: 'path'
        }
      }
    },

    '@apostrophecms/template': {
      options: {
        viewsFolderFallback: path.join(__dirname, 'views')
      }
    },

    // Custom CSS classes for standard apostrophe widgets
    '@apostrophecms/rich-text-widget': {},
    '@apostrophecms/image-widget': {},
    '@apostrophecms/video-widget': {},
    // Manages apostrophe's overall asset pipeline
    '@apostrophecms/asset': {
      // When not in production, refresh the page on restart
      options: {
        refreshOnRestart: true
      }
    },

    '@apostrophecms/express': {
      options: {
        session: {
          // If this still says `undefined`, set a real secret!
          secret: process.env.EXPRESS_SECRET || 'WellABadSecretIsBetterThanNoSecretSurely?!'
        }
      }
    },

    // A home for our own project-specific javascript and SASS assets
    asset: {},
    'default-page': {},

    // My Pieces
    ingredient: {},
    recipe: {},
    'recipe-page': {}
  }
});
