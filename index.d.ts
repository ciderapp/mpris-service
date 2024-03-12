declare module "mpris-service";

declare interface PlayerOptions {
  name: string;
  identity: string;
  supportedInterfaces: string[];
}

type Events = {
  quit: void;
  raise: void;
  activatePlaylist: string;
  next: void;
  previous: void;
  pause: void;
  playpause: void;
  stop: void;
  play: void;
  seek: number;
  position: number;
  open: string;
  volume: number;
  loopStatus: string;
  shuffle: boolean;
};

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

type PlaybackStatus =
  | "PLAYBACK_STATUS_PLAYING"
  | "PLAYBACK_STATUS_PAUSED"
  | "PLAYBACK_STATUS_STOPPED";

declare class Player {
  constructor(options: PlayerOptions);

  /**
   * The current playback status.
   */
  playbackStatus: PlaybackStatus;

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
   */
  seek(position: number): void;

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
  on(event: keyof Events, listener: (arg: Events[keyof Events]) => void): void;
}

declare class TrackList {
  /**
   * The track list
   */
  tracks: number;
}
