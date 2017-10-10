var hardware_list;

getJson();
function getJson() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
//       console.log("response", xhttp.response);
       hardware_list = JSON.parse(xhttp.response);
       console.log("response", hardware_list);
       renderMenuLeft(hardware_list);
       if(hardware_list.length > 0) {
       renderDetail(hardware_list[0]);
       }
    }
    };
    xhttp.open("GET", "http://localhost/api/hardware_list.json", true);
   xhttp.send();
  };
  function renderMenuLeft(items){
      var ul = document.querySelector("#left-menu ul");
      var innerUl = "";
      for (var i=0; i < items.length; i++) {
          var li = document.createElement("li");
          li.id = items[i].id;
          li.textContent = items[i].name;
         
          li.onclick = function(){
          console.log("Clicked" + this.id);
          var hardwareIndex = document.getElementById(this.id);
          var foundHardware = hardware_list.find(function(hardware){
              return hardware.id == hardwareIndex.id;
          });    
          console.log("foundHardware", foundHardware);
          renderDetail(foundHardware);
          };
          ul.appendChild(li);
      }
      
  }
  function renderDetail(item){
      document.querySelector("#article h3").textContent = item.name;
      document.getElementById("description").textContent = item.description;
      var ul = document.querySelector("#article ul");
      var ulTextContent = "";
      for (var key in item.parameters){
          ulTextContent += "<li>" + key + ":" + item.parameters[key] + "<li>";
          
      }
      ul.innerHTML = ulTextContent;
  }
