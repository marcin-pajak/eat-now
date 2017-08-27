import realFetch from 'node-fetch';

export const mockResponse = (status, statusText, response) => {
  if (!global.Response) {
    global.Response = realFetch.Response;
  }
  return new global.Response(response, {
    status: status,
    statusText: statusText,
    headers: {
      'Content-type': 'application/json'
    }
  });
};

export const mockResolve = (response) => {
  return jest.fn().mockImplementation(() => Promise.resolve(mockResponse(200, null, response)));
};

export const mockReject = (error) => {
  return jest.fn().mockImplementation(() => Promise.resolve(mockResponse(409, null, error)));
};