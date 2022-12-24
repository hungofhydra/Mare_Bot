export const commandList = [
  {
    name: 'vn_search',
    description: 'Search a Visual Novel by name',
    options: [
      {
        name: 'name',
        description: `Visual Novel's name`,
        type: 3,
        required: true,
      },
    ],
  },
  {
    name: 'vn_user_search',
    description: 'Search a user in vndb by username',
    options: [
      {
        name: 'name',
        description: `User's name`,
        type: 3,
        required: true,
      },
    ],
  },
];
