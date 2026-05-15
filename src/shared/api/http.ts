import { httpInstance } from "./instance";

type Params = Record<string, string | number | boolean | undefined | null>;

export async function httpGet<TResponse>(
  url: string,
  params?: Params,
): Promise<TResponse> {
  const { data } = await httpInstance.get<TResponse>(url, { params });
  return data;
}

export async function httpPost<TBody, TResponse>(
  url: string,
  body: TBody,
): Promise<TResponse> {
  const { data } = await httpInstance.post<TResponse>(url, body);
  return data;
}

export async function httpPut<TBody, TResponse>(
  url: string,
  body: TBody,
): Promise<TResponse> {
  const { data } = await httpInstance.put<TResponse>(url, body);
  return data;
}

export async function httpPatch<TBody, TResponse>(
  url: string,
  body: TBody,
): Promise<TResponse> {
  const { data } = await httpInstance.patch<TResponse>(url, body);
  return data;
}

export async function httpDelete<TResponse>(url: string): Promise<TResponse> {
  const { data } = await httpInstance.delete<TResponse>(url);
  return data;
}
