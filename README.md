# digitralocean-status
[BitBar](https://github.com/matryer/bitbar) Plugin that check the status of your digital ocean droplets.

### Install the plugins
```
git clone https://git.036.ninja/oppenheimer/digitalocean-status
cd digitalocean-status
npm install async request bitbar --save
```

Then add the plugin in BitBar

### Adding API Keys
Just get your digitalocean token [https://cloud.digitalocean.com/settings/api/tokens](https://cloud.digitalocean.com/settings/api/tokens).

No write rights needed. Then add your key here:
```javascript
const APIKeys = [
    '<yourToken>'
];
```

You can add key from different accounts, that's the use case.
