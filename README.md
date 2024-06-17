
## Pre Requirements

1.create account in (https://unsplash.com/)

2.create new application

Since this project is based on [unspalsh API](https://unsplash.com/documentation) you need to have an application. Follow [this link](https://unsplash.com/oauth/applications/new) to create a new application. You need to set these permissions.

```
public
read_photos
write_likes
read_collections
write_collections
```

> NOTE: You must add in Redirect URI field for youre ((https://unsplash.com/oauth/applications/id)) :`http://localhost:3000/` or your `window.location.href` and save.

2. create a file with `.env.local` name in your project to set environment variables like `.env`.

REACT_APP_CLIENT_SECRET=XXXXXXXXXXXXX


#### Start App in Development Mode
```
npm run start
```

#### Build Project in Production Mode

```
npm run build
```
