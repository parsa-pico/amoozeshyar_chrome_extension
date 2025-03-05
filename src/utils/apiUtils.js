export async function ApiFetch(
  url,
  method = 'GET',
  body,
  headers = {},
  bTransformError = true
) {
  const response = await fetch(url, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  if (bTransformError) await transformAndRaiseError(response);

  return await response.json();
}
async function transformAndRaiseError(response) {
  if (!response.ok) {
    const result = await response.json();
    if (result.detail) {
      if (typeof result.detail == 'string')
        throw new GeneralApiException(result.detail);
      else if (Array.isArray(result.detail))
        throw new GeneralApiException(result.detail[0].msg);
      //TODO:based on status code, have some pre defined messages
      else throw new GeneralApiException('یه مشکلی پیش اومده');
    }
  }
}
export class GeneralApiException extends Error {
  constructor(message) {
    super(message);
  }
}
export function handleApiError(error) {
  console.error(error);
  if (!navigator.onLine) {
    alert('اینترنتت رو چک کن');
  } else if (error instanceof GeneralApiException) {
    alert(error.message);
  } else {
    alert('یه مشکلی پیش اومده');
  }
}
