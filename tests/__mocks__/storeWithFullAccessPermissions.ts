jest.mock('../../src/store', () => {
  const fullAccessPermissions = {
    fullAccess: true,
    edit: true,
    delete: true,
    view: true,
    add: true,
  };

  return {
    default: {
      getState: () => ({
        user: {
          permissions: {
            centers: fullAccessPermissions,
            people: fullAccessPermissions,
            assets: fullAccessPermissions,
            assetCategories: fullAccessPermissions,
            permissions: fullAccessPermissions,
            roles: fullAccessPermissions,
          },
        },
      }),
    },
  };
});
