## github 認証

[ここにアクセス](https://github.com/login/oauth/authorize?client_id=96debf93bb96b490a3b8)

認証後以下のようなリンクに飛ぶので code=xxxxxxxxxxxx をメモる。
http://localhost:3000/?code=xxxxxxxxxxxxxxxx

mutation githubAuth()の引数に code を含ませると認証情報が取れる。

トークンを header に乗せる

```
{
  "Authorization": "2936aba366d2b26c1fd07c77bc7b82fxxxxxxxxxx"
}
```
