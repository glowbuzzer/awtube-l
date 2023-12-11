// assumes that you have already run `npm build` and `npm vite build site` to create all the dist files
// noinspection JSVoidFunctionReturnValueUsed

import tar from "tar"
import fs from "fs"

// Create the tarball
tar.c(
    {
        gzip: true,
        file: 'dist.tar.gz',
        cwd: process.cwd()+"/build/",
    },
    ["awtube"]
).then(() => {
    // Convert the tarball to a Base64 encoded string
    const tarballContent = fs.readFileSync('dist.tar.gz');
    const base64Data = tarballContent.toString('base64');

    // Construct the install.sh content
    const installScriptContent = `
    #!/bin/bash

    set -e
    set -o pipefail
   
    NODE_PATH=$(which node || true)
    
    if [ -z "$NODE_PATH" ]; then
        echo "Node.js is not installed. Installation aborted."
        exit 1
    else
        echo "Node.js is installed at $NODE_PATH."
    fi 
   
    # Decode and unpack the application using a heredoc
    echo "Installing AwTube application..."
    mkdir -p /opt/awtube
    base64 -d << EOF | tar -xzf - -C /opt
    ${base64Data}
    EOF
    
    # Create a systemd service
    echo "Configuring service..."
    echo "[Unit]
    Description=Glowbuzzer AwTube Application
    After=network.target
    
    [Service]
    ExecStart=/usr/bin/node /opt/awtube/server.js /etc/opt/awtube/config.json
    WorkingDirectory=/opt/awtube
    StandardOutput=inherit
    StandardError=inherit
    Restart=always
    User=root
    
    [Install]
    WantedBy=multi-user.target" > /etc/systemd/system/awtube.service
    
    # Reload systemd, enable and start the service
    systemctl daemon-reload
    systemctl enable awtube.service

    echo "Installation complete!"
    echo ""
    echo "To start the service, run: "
    echo ""
    echo "    sudo systemctl start awtube"
    `.toString().split("\n").map(s => s.trim()).join('\n') + '\n';

    // Write the install.sh file
    fs.mkdirSync('dist', { recursive: true })
    fs.writeFileSync('dist/awtube-install.sh', installScriptContent);
    console.log("Packaging complete!");
}).catch((error) => {
    console.error("Error packaging app:", error);
});

