
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  fullName: string;
  urlImage: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await fetch('https://todoapp-uit.vercel.app/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};

export const register = async (data: RegisterData) => {
  const response = await fetch('https://todoapp-uit.vercel.app/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }

  return response.json();
};
