window.addEventListener("DOMContentLoaded", function () {
   document.querySelector("#fetchQuotesBtn").addEventListener("click", function () {

      // Get values from drop-downs
      const topicDropdown = document.querySelector("#topicSelection");
      const selectedTopic = topicDropdown.options[topicDropdown.selectedIndex].value;
      const countDropdown = document.querySelector("#countSelection");
      const selectedCount = countDropdown.options[countDropdown.selectedIndex].value;
   
      // Get and display quotes
      fetchQuotes(selectedTopic, selectedCount);	   
   });
});

// TODO: Modify to use Fetch API
async function fetchQuotes(topic, count) {
   // URL
   let url = "https://wp.zybooks.com/quotes.php?topic=" + topic + "&count=" + count;
   let response = await fetch(url);


   // Verfiying response code is 200
   if (response.status === 200) {
      let quotes = await response.json();

      let html = "<ol>";
      for (let quote of quotes) {
         html += "<li>" + quote.quote + " - " + quote.source + "</li>";
      }
      html += "</ol>";

      document.querySelector("#quotes").innerHTML = html;
   }
   else {
      let failed = await response.json();

      let html =  failed.error;
      document.querySelector("#quotes").innerHTML = html;
   }
}
