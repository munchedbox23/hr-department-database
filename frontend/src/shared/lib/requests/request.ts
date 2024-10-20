export const checkResponse = <T>(response: Response): Promise<T> => {
  return response.ok
    ? response.json()
    : response.json().then((err) => Promise.reject(err));
};

export const request = async <T>(
  url: string,
  options: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);
  return checkResponse<T>(response);
};
