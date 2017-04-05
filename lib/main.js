import Hls from 'hls.js';
import HlsProvider from './HlsProvider';

const SOURCE_SUPPORT = {
  MAYBE: 'maybe',
  NONE: '',
  PROBABLY: 'probably',
};

 if (Hls.isSupported()) {
    videojs.getComponent('Html5').registerSourceHandler({
      canHandleSource(source) {
        const hlsTypeRgxp = /^application\/x-mpegURL$/i;
        const hlsExtRgxp = /\.m3u8/i;

        if (hlsTypeRgxp.test(source.type)) {
          return SOURCE_SUPPORT.PROBABLY;
        } else if (hlsExtRgxp.test(source.src)) {
          return SOURCE_SUPPORT.MAYBE;
        }

        return SOURCE_SUPPORT.NONE;
      },

      handleSource(source, tech) {
        if (tech.hlsProvider) {
          tech.hlsProvider.dispose();
        }

        tech.hlsProvider = new HlsProvider(source, tech, Hls);
        return tech.hlsProvider;
      }
    });
  } else {
    console.error('hls.js is not supported by your browser');
  }

videojs.HlsProvider = HlsProvider;
