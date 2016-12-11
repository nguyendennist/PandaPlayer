import ReactPlayer from 'react-player'
import Duration from './duration.jsx'

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userAdmin: true,
      url: '',
      loggedIn: false,
      playing: false,
      loaded: false
    }
  }

  load = url => {
    this.setState({
      url,
      played: 0,
      loaded: 0
    })
  }
  playPause = () => {
    this.setState({ playing: !this.state.playing })
  }
  stop = () => {
    this.setState({ url: null, playing: false })
  }
  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  onSeekMouseDown = e => {
    this.setState({ seeking: true })
  }
  onSeekChange = e => {
    this.setState({ played: parseFloat(e.target.value) })
  }
  onSeekMouseUp = e => {
    this.setState({ seeking: false })
    this.player.seekTo(parseFloat(e.target.value))
  }
  onProgress = state => {
    // We only want to update time slider if we are not currently seeking
    if (!this.state.seeking) {
      this.setState(state)
    }
  }
  onClickFullscreen = () => {
    screenfull.request(findDOMNode(this.player))
  }

  render() {
    const {
      volume, playing, url,
      played,duration,
      soundcloudConfig,
      vimeoConfig,
      youtubeConfig,
      fileConfig
    } = this.state;

    return (
      <div>
        <ReactPlayer
          ref={player => { this.player = player }}
          className='react-player'
          width={480}
          height={270}
          url={this.state.url}
          playing={this.state.playing}
          volume={volume}
          youtubeConfig={youtubeConfig}
          soundcloudConfig={soundcloudConfig}
          vimeoConfig={vimeoConfig}
          fileConfig={fileConfig}
          onReady={() => console.log('video is ready')}
          onError={e => console.log('onError', e)}
          onEnded={() => this.setState({playing: false})}
        />
        <span className="bold">Video URL  </span>
        <input ref={input => { this.urlInput = input }} type='text' size='50' placeholder='Enter URL' />
        <button onClick={() => this.setState({ url: this.urlInput.value })}>Load</button>
        <table><tbody>
        <tr>
          <th>duration</th>
          <td><Duration seconds={duration} /></td>
          <th>remaining</th>
          <td><Duration seconds={duration * (1 - played)} /></td>
        </tr>
        <tr>
          <th>Controls</th>
          <td>
            <button onClick={this.stop}>Stop</button>
            <button onClick={this.playPause}>{playing ? 'Pause' : 'Play'}</button>
            <button onClick={this.onClickFullscreen}>Fullscreen</button>
          </td>
          <th>Played</th>
          <td><progress max={1} value={played} /></td>
        </tr>
        <tr>
          <th>Volume</th>
          <td>
            <input type='range' min={0} max={1} step='any' value={volume} onChange={this.setVolume} />
          </td>
          <th>Seek</th>
          <td>
            <input
              type='range' min={0} max={1} step='any'
              value={played}
              onMouseDown={this.onSeekMouseDown}
              onChange={this.onSeekChange}
              onMouseUp={this.onSeekMouseUp}
            />
          </td>
        </tr>
        </tbody></table>
      </div>
    );
  }
}

