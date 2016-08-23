export default ops => ({
  // TODO Handle files
  sendMutation: async function sendMutation(request) {
    const result = await ops.request('query', {
      query: request.getQueryString(),
      variables: request.getVariables(),
    })
    if (result.errors) return request.reject(result.errors.join(['\n']))
    request.resolve({ response: result.data })
  },
  sendQueries: async function sendQueries(requests) {
    const results = await ops.request('query', {
      queries: requests.map(request => request.getQueryString()),
    })

    results.forEach((result, i) => {
      if (result.hasOwnProperty('errors')) {
        return requests[i].reject(result.errors.join('\n'))
      }

      requests[i].resolve({ response: result.data })
    })
  },
  supports: () => false,
})
