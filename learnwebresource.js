function sayHelloOnFormLoad(executionContext,firstName,lastName)
{
    var formContext = executionContext.getFormContext();
    var accountName = formContext.getAttribute("name").getValue();
    var accountPhone = formContext.getAttribute("telephone1").getValue();
    Xrm.Navigation.openAlertDialog({ text: "Hello! "+firstName+" "+lastName+". "+"Please call customer: "+" "+accountName+" on: "+accountPhone });
}