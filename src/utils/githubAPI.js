import fetch from "node-fetch";
import { UnauthorizedError } from "../errors";

export const fetchFromGithub = async (url, access_token) => {
  const response = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${access_token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (!response.ok) {
    throw new UnauthorizedError(
      `GitHub API에서 가져올 수 없습니다. URL: ${url}`,
      "login"
    );
  }

  return await response.json();
};
