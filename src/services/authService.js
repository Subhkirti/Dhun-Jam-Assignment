import api from "./apiUrl";

const userKey = "user";

function setCurrentUser(data) {
  localStorage.setItem(userKey, JSON.stringify(data));
}

function getCurrentUser() {
  try {
    const userStr = localStorage.getItem("user");
    return JSON.parse(userStr);
  } catch (ex) {
    return null;
  }
}
async function signInApi(reqBody) {
  const { data } = await fetch(api.signIn, {
    method: "POST",
    body: JSON.stringify(reqBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}

async function userDetailsApi(userId) {
  const { data } = await fetch(api.userDetail + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}
async function updatePriceApi({ userId, songAmount }) {
  const { data } = await fetch(api.userDetail + userId, {
    method: "PUT",
    body: JSON.stringify({ amount: songAmount } || {}),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((response) => {
      return response;
    });
  return data;
}

export {
  setCurrentUser,
  getCurrentUser,
  signInApi,
  userDetailsApi,
  updatePriceApi,
};
