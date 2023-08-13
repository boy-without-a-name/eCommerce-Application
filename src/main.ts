import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

// тест husky
let test=function ():           void        {
              console.log('тест хаски')      ;
              console.log('test')
};
test();
