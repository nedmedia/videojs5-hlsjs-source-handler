import Hls from 'hls.js';
import attachVideojsStreamrootProvider from './videojs5-hlsjs-source-handler';

attachVideojsStreamrootProvider(window, dwindow.videojs, Hls);
