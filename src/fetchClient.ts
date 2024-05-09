type FetchMethod = "GET" | "POST" | "DELETE";
function reviveDate(key: string, value: string) {
  // Matches strings like "2022-08-25T09:39:19.288Z"
  const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
  return typeof value === "string" && isoDateRegex.test(value)
    ? new Date(value)
    : value;
}
export const client = async <T>(
  url: string,
  method: FetchMethod,
  body?: unknown,
  returnType?: T,
  errorMsg = "Une erreur est survenue"
) => {
  let fetchParam: RequestInit | undefined = undefined;
  if (method === "POST" || method === "DELETE") {
    fetchParam = {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }
  const response = await fetch(url, fetchParam);
  if (!response.ok) {
    const msg = await response.text();
    console.log(msg);
    throw new Error(errorMsg);
  }
  const result = await response.json();
  if (result && returnType) {
    return JSON.parse(result, reviveDate) as T;
  }
  return null;
};
