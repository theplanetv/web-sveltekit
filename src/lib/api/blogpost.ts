import { PUBLIC_API_CHI_URL } from "$env/static/public";
import type { BlogPost } from "$lib/types";

async function Count(search: string): Promise<number> {
  try {
    const response = await fetch(`${PUBLIC_API_CHI_URL}/api/blog/posts/count?search=${search}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error during Count:", error);
    return 0;
  }
}

async function GetAll(limit: number, page: number, search: string): Promise<BlogPost[]> {
  try {
    const response = await fetch(`${PUBLIC_API_CHI_URL}/api/blog/posts?limit=${limit}&page=${page}&search=${search}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error during GetAllPosts:", error);
    return [];
  }
}

export default { Count, GetAll };