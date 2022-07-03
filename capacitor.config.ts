import { CapacitorConfig } from '@capacitor/cli';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

const config: CapacitorConfig = {
  appId: 'br.com.bebelpratas.app',
  appName: 'bebelpratas',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins:
   {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '793712988829-ammf2i5g7bmv12ger41kuj8phih0f35q.apps.googleusercontent.com',
      forceCodeForRefreshToken: true
    }
  }
};

export default config;
