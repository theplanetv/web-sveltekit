import { PUBLIC_API_CHI_URL } from "$env/static/public";
import type { ApiResponse, BlogTag } from "$lib/types";
import { ApiMessage } from "./message";

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

async function Create(name: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${PUBLIC_API_CHI_URL}/api/blog/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during Create:", error);
    return {
      data: {} as BlogTag,
      message: ApiMessage.CREATE_FAILED,
    };
  }
}

async function Update(id: string, name: string): Promise<boolean> {
  try {
    const response = await fetch(`${PUBLIC_API_CHI_URL}/api/blog/tags/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
      credentials: 'include',
    });
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error during Update:", error);
    return false;
  }
}

export default { Count, GetAll, Create, Update };
