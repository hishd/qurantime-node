import PieSocket from 'piesocket-nodejs'

class Socket {
  constructor() {
    this.socket = new PieSocket({
      clusterId: 'free3',
      apiKey: '8P8P43ZfLgHwl292VADLCJxlaRc48Z6ubEG8gBTO',
      secret: '7cpbpyGDG7KXa3bixJDgBT8KCrkaGfvf',
    })
  }

  publishLatestData = (data, channelID) => {
    this.socket.publish(channelID, data)
    console.log('Pushing data')
  }
}

export { Socket }
