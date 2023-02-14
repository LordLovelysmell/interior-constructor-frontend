type UserData = {
  username: string;
  password: string;
};

type CreatedUser = {
  message: string;
  token: string;
  status: number;
};

const apiUrl = process.env.API_URL || 'http://localhost:3000/v1';

const createUser = async (userData: UserData): Promise<CreatedUser> => {
  try {
    const response = await fetch(`${apiUrl}/users/sign-up`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseBody = await response.json();

    return {
      ...responseBody,
      status: response.status,
    };
  } catch (err) {
    console.error(err);
  }
};

const signInUser = async (userData: UserData): Promise<CreatedUser> => {
  try {
    const response = await fetch(`${apiUrl}/users/sign-in`, {
      method: "POST",
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseBody = await response.json();

    return {
      ...responseBody,
      status: response.status,
    };
  } catch (err) {
    console.error(err);
  }
};

export { UserData, createUser, signInUser };
