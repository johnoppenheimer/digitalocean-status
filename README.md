# digitalocean-status
[BitBar](https://github.com/matryer/bitbar) Plugin that check the status of your digital ocean droplets.

### Install the plugins
```
git clone https://github.com/johnoppenheimer/digitalocean-status.git
cd digitalocean-status
npm install
```

### Adding API Keys
Just get your digitalocean token [https://cloud.digitalocean.com/settings/api/tokens](https://cloud.digitalocean.com/settings/api/tokens).

No write rights needed. Then create a config.js file next to `dostatus.1m.js` where to store your tokens:
```javascript
module.exports = {
    tokens: [
        '<your_token>'
    ]
}

```
You can add key from different accounts, that's the use case.

### Configuration with BitBar
BitBar will try to read files that won't work (like a nice package.json), so to avoid that you can create a folder in your home, and create symbolic link to `dostatus.1m.js` like
```
ln -s /path/to/the/repo/dostatus.1m.js ~/.bitbar/plugins
```

Then you need to set the plugins path to BitBar
```
defaults write com.matryer.BitBar pluginsDirectory "~/.bitbar/plugins"
```

Quit and relaunch BitBar and you should be good!

### LICENSE
MIT
