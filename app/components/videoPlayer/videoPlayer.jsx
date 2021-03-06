import ReactPlayer from 'react-player'
import Duration from './duration'

export default class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userAdmin: true,
      url: '',
      loggedIn: false,
      loaded: false
    }
  }

  setVolume = e => {
    this.setState({ volume: parseFloat(e.target.value) })
  }
  
  stop = () => {
    this.setState({ url: null, playing: false })
    this.props.stopEmitter();
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
          ref={player => { this.props.player = player }}
          className='react-player'
          width={480}
          height={270}
          url={this.props.currentVideo}
          playing={this.props.playing}
          volume={volume}
          youtubeConfig={youtubeConfig}
          soundcloudConfig={soundcloudConfig}
          vimeoConfig={vimeoConfig}
          fileConfig={fileConfig}
          onReady={() => console.log('video is ready')}
          onError={e => console.log('onError', e)}
          onEnded={() => this.props.playPause()}
        />
        <span className="bold">Video URL  </span>
        <input ref={input => { this.urlInput = input }} type='text' size='50' placeholder='Enter URL' />
        <button onClick={() => this.props.emitLoadUrl(this.urlInput.value)}>Load</button>
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
            <button onClick={this.props.emitStop}>Stop</button>
            <button onClick={this.props.emitPlayPause}>{this.props.playing ? 'Pause' : 'Play'}</button>
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

