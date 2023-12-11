# AwTube L Sample Project

This repository contains the starter code for the AwTube L project. This application is deployed to the Raspberry Pi
on port 4000 and started automatically on boot.

If you want to run and develop this application locally, you can do so by running the following commands:

```bash
pnpm install
pnpm start
```

Once the application is running you can connect it to GBC on the Raspberry Pi using URL `ws://rpi-aw:9001/ws`.

If you make changes and want to deploy them to the Raspberry Pi, you can do so by running the following command:

```bash
pnpm run dist
```

This will create a `dist` folder containing a single bash script `awtube-install.sh`. This script will unpack and install the new version. Copy
this script to the Raspberry Pi and run it to perform the update.

Note that this update mechanism is temporary and not the "end state" for application updates!