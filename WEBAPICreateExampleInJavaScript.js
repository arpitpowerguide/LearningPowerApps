function createAccountUisngWEBAPI()
{
// define the data to create new account
var data =
    {
        "name": "Arpit Power Guide",
        "description": "This is the sample account",
        "revenue": 5000000,
    }

// create account record
Xrm.WebApi.createRecord("account", data).then(
    function success(result) {
        console.log("Account is created in Dataverse with ID: " + result.id);
        // perform operations on record creation
    },
    function (error) {
        console.log(error.message);
        // handle error conditions
    }
);
}