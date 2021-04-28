////////// SINGLE-LINE FIELD REST CALL //////////
function array_from_sharepoint_list(listName, Selection, SortName) {
  var arr = [];
  var arr2 = [];
  var appWebUrl = _spPageContextInfo.webAbsoluteUrl;

  $.ajax({
    url: appWebUrl + "/_api/web/lists/getbyTitle('" + listName + "')/items?$select=" + Selection + "&$top=5000&$orderby=" + SortName,
    type: "GET",
    async: false,
    headers: {
      "accept": "application/json;odata=verbose"
    },
    success: function(data) {
      arr = data.d.results;
      for (var i = 0; i < arr.length; i++) {
        arr2[i] = arr[i][Selection];
      }

    },
    error: function(err) {
      console.log(err);
    }
  });
  return arr2;
}

////////// LOOKUP FIELD REST CALL //////////
function array_from_sharepoint_lookup_list(listName, Selection, lookup, SortName) {
  var arr = [];
  var arr2 = [];
  var appWebUrl = _spPageContextInfo.webAbsoluteUrl;

  $.ajax({
    url: appWebUrl + "/_api/web/lists/getbyTitle('" + listName + "')/items?$select=" + lookup + "/" + Selection + "&$expand=" + lookup + "&$top=5000&$orderby=" + SortName,
    type: "GET",
    async: false,
    headers: {
      "accept": "application/json;odata=verbose"
    },
    success: function(data) {
      arr = data.d.results;
      for (var i = 0; i < arr.length; i++) {
        arr2[i] = arr[i][lookup][Selection];
      }

    },
    error: function(err) {
      console.log(err);
    }
  });
  return arr2
}

////////// FILTER BY FIELD REST CALL //////////
function array_from_sharepoint_list_with_filter(listName, filter, field) {
  var arr = [];
  var arr2 = [];
  var appWebUrl = _spPageContextInfo.webAbsoluteUrl;
  var url = appWebUrl + "/_api/web/lists/getbyTitle('" + listName + "')/items?$filter=(" + field + " eq '" + filter + "')";

  $.ajax({
    url: url,
    type: "GET",
    async: false,
    headers: {
      "accept": "application/json;odata=verbose"
    },
    success: function(data) {
      arr = data.d.results;
      for (var i = 0; i < arr.length; i++) {
        arr2[i] = arr[i][Selection];
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
  return arr2;
}

////////// PUSH DATA TO SP LIST //////////
function push_data_to_sharepoint_list(listname, internalListName){
  var appWebUrl = _spPageContextInfo.webAbsoluteUrl;

  $.ajax ({
    url:appWebUrl + "/_api/web/lists/getByTitle('" + listname + "')/items",
    type: "POST",
    headers:
      {
        "Accept": "application/json;odata=verbose",
        "Content-Type": "application/json;odata=verbose",
        "X-RequestDigest": $("#__REQUESTDIGEST").val()
      },
    data: JSON.stringify({
      "__metadata":
        {
          "type": "SP.Data." + internalListName + "ListItem" // Internal List Name is the list name with _x0020_ instead of a space
        },
          "FIELD": "VALUE"  // Change FIELD to desired List field, and value to desired variable or text value (no quotes if using variable, quotes if using text)
    }),
      success: function(data, status, xhr) {
        console.log("Success");
      },
      error: function(error) {
        console.log(JSON.stringify(error));
      }
    });
}
