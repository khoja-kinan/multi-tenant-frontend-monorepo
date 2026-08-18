/** Thrown for any failed request, mocked or real, so every caller handles one shape. */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly data: unknown,
    message = "Request failed",
  ) {
    super(message);
    this.name = "ApiError";
  }
}
