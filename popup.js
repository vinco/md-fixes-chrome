$(function() {
    
    var urlTask;
    var titleTask;

    if (chrome.tabs) {

        //Get title
        $(function() {
            chrome.runtime.onMessage.addListener(function(request, sender) {
              if (request.action == "getSource") {
                titleTask = request.source;
              }
            });

            function onWindowLoad() {
                chrome.tabs.executeScript(null, {
                    file: "getPagesSource.js"
                }, function() {
                    if (chrome.extension.lastError) {
                      console.log('There was an error injecting script : \n' + chrome.extension.lastError.message);
                    }
                });
            }
            window.onload = onWindowLoad;
        });

        //Get url task
        chrome.tabs.query({active:true}, function(tabs){
            urlTask = tabs[0].url;
        });

        //Event click popup
        $('#pullrequest').click(function(){
            document.execCommand('copy');
        });
        $('#reference-task').click(function(){
            document.execCommand('copy');
        });

        document.getElementById('pullrequest').addEventListener('copy', function (e) {
            e.preventDefault();
            var pullRequestText = "### Task related \n["+titleTask+"]("+urlTask+")\n\n# Problem \n\n# Solution \n\nBefore:\n\nNow:\n\n# Test\nTests in local environment.";
            e.clipboardData.setData('text/plain', pullRequestText);
            window.close();
        });
        document.getElementById('reference-task').addEventListener('copy', function (e) {
            e.preventDefault();
            var pullRequestText = "+ " + titleTask + "\n" + urlTask;
            e.clipboardData.setData('text/plain', pullRequestText);
            window.close();
        });
    }
});
