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

async function Create(input: BlogTag): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${PUBLIC_API_CHI_URL}/api/blog/tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: input.name }),
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

async function Update(input: BlogTag): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${PUBLIC_API_CHI_URL}/api/blog/tags`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: input.id, name: input.name }),
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during Update:", error);
    return {
      data: {} as BlogTag,
      message: ApiMessage.UPDATE_FAILED,
    };
  }
}

async function Delete(id: string): Promise<ApiResponse<any>> {
  try {
    const response = await fetch(`${PUBLIC_API_CHI_URL}/api/blog/tags/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during Delete:", error);
    return {
      data: {} as string,
      message: ApiMessage.DELETE_FAILED,
    };
  }
}

export default { Count, GetAll, Create, Update, Delete };
