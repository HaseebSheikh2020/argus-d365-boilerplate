// Includes the dg.xrmquery.web.js (XrmQuery) in the package
import "script-loader!dg.xrmquery.web.promise";
import "script-loader!dg.xrmquery.web";

// Forms
import * as AccountFormMain from "./account/form-logic-main";

// General Ribbon
import * as EntityRibbons from "./entity-ribbons/ribbon-logic";

// Ribbons
import * as AccountRibbons from "./account/ribbon-logic";

// Session.setjQueryAjaxSetup($, Xrm.Page);

declare global {
  interface Window {
    attachEvent(event: string, listener: EventListener): boolean;

    App: {
      Entities: {
        // Forms
        AccountFormMain: unknown;

        // General Ribbons
        EntityRibbons: unknown;

        // Ribbons
        AccountRibbons: unknown;
      };
    };
  }
}

window.App = {
  Entities: {
    //!!! please insert in alphabetical order to category

    // Forms
    AccountFormMain: AccountFormMain,

    // General Ribbons
    EntityRibbons: EntityRibbons,

    // Ribbons
    AccountRibbons: AccountRibbons,
  },
};

// e.g for Form Onload: add following as form Event --> App.Entities.AccountFormMain.onLoad
// e.g for Ribbons: App.Entities.AccountRibbons.anythingCommand

/*
For webressource the Xrm.Page can be used as following:
<script src="../../ClientGlobalContext.js.aspx" type="text/javascript"></script> 
Then you can use Parent.Xrm.Page or GetGlobalContext()
*/
