import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "in.itsdope.app",
  appName: "Dope",
  webDir: "out",
  bundledWebRuntime: false,
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
