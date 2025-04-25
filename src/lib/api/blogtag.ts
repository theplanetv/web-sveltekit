import { PUBLIC_API_CHI_URL } from "$env/static/public";
import type { BlogTag } from "$lib/types";


async function Count(search: string): Promise<number> {
  try {
    const response = await fetch(`${PUBLIC_API_CHI_URL}/api/blog/tags/count?search=${search}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error during Count:", error);
    return 0;
  }
}

async function GetAll(limit: number, page: number, search: string): Promise<BlogTag[]> {
  try {
    const response = await fetch(`${PUBLIC_API_CHI_URL}/api/blog/tags?limit=${limit}&page=${page}&search=${search}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error during GetAllTags:", error);
    return [];
  }
}

export default { Count, GetAll };
