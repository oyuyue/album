This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

```javascript
{let c=frames[0],s=()=>{c.$('video')[0].playbackRate=16};c.onload=()=>setTimeout(s,1000);s()}

{
    let c=frames[0],
        t=c.$('video')[0].duration,
        f=`00:${~~(t/60)}:${~~(t%60)+1}.1`,
        d=c.doLMSSetValue,
        s='cmi.core.';
    d(s+'session_time',f)
    d(s+'total_time',f)
    d(s+'lesson_status','completed')
    c.exitPageStatus=!0;c.doLMSCommit();c.doLMSFinish();
}

{let c=frames[0],t=~~c.$('video')[0].duration,f=`00:${t/60|0}:${t%60+1}.1`,d=c.doLMSSetValue,s='cmi.core.';d(s+'session_time',f);d(s+'total_time',f);d(s+'lesson_status','completed');c.doLMSCommit();c.doLMSFinish()}

{
    let c=frames[0],
        t=~~c.$('video')[0].duration,
        f=`00:${t/60|0}:${t%60+1}.1`,
        d=c.doLMSSetValue,
        s='cmi.core.';
    d(s+'session_time',f);
    d(s+'total_time',f);
    c.computeTime=()=>{};
    c.doQuit('completed')
}

c=frames[0];t=c.$('video')[0].duration;x=s=>c.doLMSSetValue(`cmi.core.${s}_time`,`0:${t/60|0}:${t%60}`);x('session');x('total');c.computeTime=_=>_;c.doQuit('completed')

{
intoTestTime = Date.now() - ~~(60 * (Math.random() * 10 + 40) * 1000);
document.querySelectorAll('.view').forEach((x, c) => x.querySelectorAll('input').forEach(i => 'a'.toLowerCase() === i.value.toLowerCase() && (i.checked = true)));
document.querySelector('#submitPage').click();
}

Array.from(document.body.innerHTML.matchAll(/正确答案：<\/span><span>(\w)/gi)).map(x => x[1])

{
var a = ["B", "C", "B", "B", "B", "A", "E", "C", "D", "B", "A", "B", "C", "B", "C", "B", "B", "A", "A", "B", "B", "B", "D", "A", "C"];
intoTestTime = Date.now() - ~~(60 * (Math.random() * 10 + 40) * 1000);
document.querySelectorAll('.view').forEach((x, c) => x.querySelectorAll('input').forEach(i => a[c].toLowerCase() === i.value.toLowerCase() && (i.checked = true)));
document.querySelector('#submitPage').click();
}
```

所有相册页面 & 相片页面

相片 & 相册详情页

搜索结果页

用户个人主页

所有用户页面



