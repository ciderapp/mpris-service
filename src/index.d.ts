declare module "mpris-service";

// The player creation options
// @see https://specifications.freedesktop.org/mpris-spec/latest/Media_Player.html
declare interface PlayerOptions {
  name: string;
  identity: string;
  supportedInterfaces: string[];
}

interface Events {

  /**
   * Brings the media player's user interface to the front using any appropriate mechanism available.
   */
  raise: void;

  /**
   * Causes the media player to stop running.
   */
  quit: void;

  /**
   * Skips to the next track in the tracklist
   */
  next: void;


  /**
   * Skips to the previous track in the tracklist.
   */
  previous: void;

  /**
   * Pauses playback.
   */
  pause: void;

  /**
   * Pauses playback.  If playback is already paused, resumes playback. If playback is stopped, starts playback.
   */
  playpause: void;

  /**
   * Stops playback.
   */
  stop: void;

  /**
   * Starts or resumes playback.
   */
  play: void;

  /**
   * Seeks forward in the current track by the specified number of microseconds. With event data `offset`.
   */
  seek: number;

  /**
   * Sets the current track position in microseconds. With event data `{ trackId, position }`.
   */
  position: { trackId: string, position: number }

  /**
   * Opens the Uri given as an argument. With event data `{ uri }`.
   */
  open: string;

  /**
   * Sets the volume of the player. With event data `volume` (between 0.0 and 1.0).
   */
  volume: number

  /**
   * Sets whether shuffle is enabled on the player. With event data `shuffleStatus` (boolean).
   */
  shuffle: boolean;

  /**
   * Sets the playback rate of the player. A value of 1.0 is the normal rate. With event data `rate`.
   */
  rate: number;

  /**
   * Sets the loop status of the player to either 'None', 'Track', or 'Playlist'. With event data `loopStatus`.
   */
  loopStatus: 'None' | 'Track' | 'Playlist'

  /**
   * Starts playing the given playlist. With event data `playlistId`.
   */
  activatePlaylist: { playlistId: string };

}

type Playlist = {
  Id: string;
  Name: string;
  Icon: string;
};

type Track = {
    'mpris:trackid': string;
    'mpris:length': number;
    'mpris:artUrl': string;
    'xesam:title': string;
    'xesam:album': string;
    'xesam:artist': string;
}

declare class Player {
  constructor(options: PlayerOptions);

  /**
   * The current playback status.
   */
  playbackStatus: 'Playing' | 'Paused' | 'Stopped';

  /**
   * The status of the loop
   */
  loopStatus: string;

  /**
   * The playback rate.
   */
  rate: number;

  /**
   * The current shuffle status.
   */
  shuffle: boolean;

  /**
   * The current volume.
   */
  volume: number;

  /**
   * Media player metadata.
   * @see http://www.freedesktop.org/wiki/Specifications/mpris-spec/metadata/
   */
  metadata: {
    "mpris:trackid"?: string;
    "mpris:length"?: number;
    "mpris:artUrl"?: string;
    "xesam:title"?: string;
    "xesam:album"?: string;
    "xesam:artist"?: string[];
    "xesam:genre"?: string[];
  };

  /**
   * The minimum rate.
   */
  minimumRate: number;

  /**
   * The maximum rate.
   */
  maximumRate: number;

  /**
   * The can go next status.
   */
  canGoNext: boolean;

  /**
   * The can go previous status.
   */
  canGoPrevious: boolean;

  /**
   * The can play status.
   */
  canPlay: boolean;

  /**
   * The can pause status.
   */
  canPause: boolean;

  /**
   * The can seek status.
   */
  canSeek: boolean;

  /**
   * The can control status.
   */
  canControl: boolean;

  /**
   * The can edit track list status.
   */
  tracks: Track[];

  /**
   * Seek to a position
   * Clients can request to set position using the `Seek` and `SetPosition`
   * methods of the `org.mpris.MediaPlayer2.Player` interface. These requests are
   * implemented as events on the Player similar to the other requests.
   * 
   * 
   */
  seek(position: number): void;

  /**
   * Seek to a position in the player
   * 
   * @param position - positionInMicroseconds
   */
  seeked(position: number): void;

  /**
   * Get the current position
   * Clients can get the position of your player by getting the `Position`
   * property of the `org.mpris.MediaPlayer2.Player` interface. Since position
   * updates continuously, {@link Player#getPosition} is implemented as a getter
   * you can override on your Player. This getter will be called when a client
   * requests the position and should return the position of your player for the
   * client in microseconds.
   */
  getPosition(): number;

  /**
   * Get a valid object path with the `subpath` as the basename which is suitable
   * for use as an id.
   *
   * @name Player#objectPath
   * @function
   * @param {String} subpath - The basename of this path
   * @returns {String} - A valid object path that can be used as an id.
   */
  objectPath(subpath: string): string;

  /**
   * Set the active playlist
   * @param playlist The playlist id to set as active
   */
  setActivePlaylist(playlist: string): void;

  /**
   * Set Playlists
   * @param playlists The playlists to set
   */
  setPlaylists(playlists: Playlist[]): void;

  /**
   * Emit an event
   * @param event The event to listen to
   * @param listener The listener to call when the event is emitted
   */
  on<T extends keyof Events>(event: T, listener: (data: Events[T]) => void): void;
}

declare class TrackList {
  /**
   * The track list
   */
  tracks: number;
}
