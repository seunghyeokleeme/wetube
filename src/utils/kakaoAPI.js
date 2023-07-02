import fetch from "node-fetch";

export const fetchFromKakao = async (access_token, property) => {
  const apiUrl = "https://kapi.kakao.com/v2/user/me";
  const property_keys = `["kakao_account.${property}"]`;
  const encodedPropertyKeys = encodeURIComponent(property_keys);

  const response = await fetch(
    `${apiUrl}?property_keys=${encodedPropertyKeys}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    }
  );

  if (!response.ok) {
    throw new UnauthorizedError(
      `KaKao API에서 가져올 수 없습니다. URL: ${url}`,
      "login"
    );
  }

  return await response.json();
};
