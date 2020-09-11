# Logger

Just playing around with TypeScript

```bash
> npm run compile       # compile typescript
> npm run compile:watch # compile typescript in watch mode
```

```javascript
var logger = new (require('./logger.js')).default(['LOG']))
logger.log(['Hello World'],'THIS IS A KEY')                   // [THIS IS A KEY] Hello World
logger.debug(['Hello World'],'THIS IS A KEY')                 //
logger.isLogTypeEnabled('DEBUG')                              //  false
logger.enableLogType = 'DEBUG'                                //
logger.isLogTypeEnabled('DEBUG')                              //  true
logger.debug(['Hello World'],'THIS IS A KEY')                 //  [THIS IS A KEY] Hello World
```
