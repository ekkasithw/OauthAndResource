



module.exports.oauth = {

  responseTypes: ['code', 'token'],
  grantTypes: ['authorizationCode', 'refreshToken'],
  authCodeLife: 10, // minutes
  accessTokenLife: 60 * 3, // minutes
  refreshTokenLife: 60 * 12, // minutes

  scopes: [
    // --------------------------
    // List of all scopes
    //
    // Example
    //
    // 'Administer product backlogs'

    'Manage Trip'

  ],

  actionScopes: {
    // --------------------------------------------------------------------
    //
    // Tell 'hasScope' policies the required scopes of a controller action
    //
    // Example
    //
    // 'BacklogController': {
    //   'find': ['Administer product backlogs', 'Read product backlogs'],
    //   'findOne': ['Administer product backlogs', 'Read product backlogs'],
    //   'create': ['Administer product backlogs'],
    //   'update': ['Administer product backlogs'],
    //   'destroy': ['Administer product backlogs']
    // }

    '*': ['Manage Trip']
  }

};
