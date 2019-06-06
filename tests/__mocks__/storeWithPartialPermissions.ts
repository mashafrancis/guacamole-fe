jest.mock('../../src/store', () => ({
  default: {
    getState: () => ({
      user: {
        permissions: {
          centers: {
            fullAccess: true,
            edit: true,
            delete: true,
            view: true,
            add: true,
          },
          people: {
            fullAccess: false,
            edit: false,
            delete: false,
            view: false,
            add: false,
          },
          assets: {
            fullAccess: false,
            edit: true,
            delete: false,
            view: true,
            add: false,
          },
          assetCategories: {
            fullAccess: false,
            edit: false,
            delete: false,
            view: true,
            add: true,
          },
          permissions: {
            fullAccess: false,
            edit: false,
            delete: false,
            view: true,
            add: true,
          },
          roles: {
            fullAccess: false,
            edit: false,
            delete: false,
            view: true,
            add: true,
          },
        },
      },
    }),
  },
}));
