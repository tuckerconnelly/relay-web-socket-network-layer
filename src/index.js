export default ops => ({
  // TODO Handle files
  async sendMutation(request) {
    const result = await ops.request('query', {
      query: request.getQueryString(),
      variables: request.getVariables(),
    })

    if (result.errors) return request.reject(result.errors.join(['\n']))
    request.resolve({ response: result.data })
  },
  async sendQueries(requests) {
    const results = await ops.request('query', {
      queries: requests.map(request => request.getQueryString()),
    })

    results.forEach((result, i) => {
      if (result.errors) return requests[i].reject(result.errors.join('\n'))
      requests[i].resolve({ response: result.data })
    })
  },
  supports: () => false,
})
