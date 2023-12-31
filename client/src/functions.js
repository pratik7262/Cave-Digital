export const signUp = async (name, email, contactNumber, password, checked) => {
  const response = await fetch("http://localhost/api/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      contactNumber: contactNumber,
      password: password,
      checked,
    }),
  });

  // console.log(response)

  const json = await response.json();

  return json;
};

export const login = async (email, password) => {
  const response = await fetch("http://localhost/api/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  const json = await response.json();

  return json;
};
