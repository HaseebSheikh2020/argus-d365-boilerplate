// let Xrm: Xrm<Form.account.Main.Account>;
let Form: Form.account.Main.Account;

export async function onLoad(executionContext: Xrm.ExecutionContext<never, never>) {
  try {
    console.log("loaded");
    Form = <Form.account.Main.Account>executionContext.getFormContext();

    const accountName = Form.getAttribute("name").getValue();

    console.log("accountnameV9", accountName);

    console.log("context", executionContext);

    await printPrimaryContactDetails();

    // const accountNameXrmPage = Xrm.Page.getAttribute("name").getValue();
    // console.log("accountNameV8", accountNameXrmPage);

    registerEvents();
  } catch (error) {
    console.error(error);
  }
}

function registerEvents() {
  return;
}

async function printPrimaryContactDetails() {
  const primaryContact = Form.getAttribute("primarycontactid").getValue();

  if (!primaryContact) return;

  const result = await XrmQuery.retrieve((x) => x.contacts, primaryContact[0].id)
    .select((x) => [x.firstname, x.lastname])
    .promise();

  console.log(result);
}
