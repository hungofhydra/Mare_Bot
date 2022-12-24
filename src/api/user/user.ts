import axios from 'axios';

export const queryUserByName = async (userName: string) => {
  const response = await axios({
    url: `${process.env.VNDB_URL}/user?q=${userName}&fields=lengthvotes,lengthvotes_sum`,
    method: 'get',
  });
  return response.data[userName];
};

export const queryUserListByUserId = async (userId: string) => {
  const response = await axios({
    url: `${process.env.VNDB_URL}/ulist`,
    method: 'post',
    data: {
      user: userId,
      fields: 'id, vote, vn.title',
      filters: ['label', '=', 7],
      sort: 'vote',
      reverse: true,
      results: 100,
    },
  });
  return response.data.results;
};
