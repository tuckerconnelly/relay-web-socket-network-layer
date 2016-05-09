import enhanceNetworkLayer from 'relay-enhance-network-layer'

export default wsrr => enhanceNetworkLayer({
  // TODO Handle files
  sendMutation: request => wsrr.request('query', request.getQueryString()),
  sendQueries: requests =>
    wsrr.request('query', requests.map(request => request.getQueryString())),
  supports: () => false,
})
