var hardware_list;
getJson();
console.log('js');
function getJson() {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
       hardware_list = JSON.parse(xhttp.response);
       console.log('response ', hardware_list);
       renderMenuLeft(hardware_list);
       if (hardware_list.length > 0) {
           renderDetail(hardware_list[0]);
       }
   }
 };
 xhttp.open("GET", "http://localhost/api/hardware_list.json", true);
 xhttp.send();
}

function renderMenuLeft(items) {
   var ul = document.querySelector('#left-menu ul');
   for (var i=0; i<items.length; i++)
       {
           var li = document.createElement('li');
           li.id = items[i].id;
           li.textContent = items[i].name;
           li.onclick = function() {
               console.log('Clicked ' + this.id);
               var hardwareIndex = document.getElementById(this.id);
               var foundHardware = hardware_list.find(function(hardware){
                   return hardware.id == hardwareIndex.id;
               });
               renderDetail(foundHardware);
           };   
           ul.appendChild(li);
       }
}

function renderDetail(item) {
   document.querySelector('#article h3').textContent = item.name;
   document.getElementById('description').textContent = item.description;
   var ul = document.querySelector('#article ul');
   var ulTextContent = '';
   for(var key in item.parameters) {
       ulTextContent += '<li>' + key + ': ' + item.parameters[key] + '</li>';
   }
   ul.innerHTML = ulTextContent;
}

function showModal() {
   document.getElementById('myModal').style.display = '';
}

function closeModal() {
   document.getElementById('myModal').style.display = 'none';
}

function addOffer()
{
   /*copy template*/
   var comment = document.getElementById('commentExample').cloneNode(true);
   comment.id = 'comment-' + document.querySelectorAll('.comment').length;
   /*add to HTML copied template*/
   var allComments = document.getElementById('comments');
   allComments.insertBefore(comment, allComments.firstChild);
   /*fullfill template*/
   comment.querySelector('.user').textContent = "USER";
   var now = new Date();
   comment.querySelector('.date').textContent = now.toISOString();
   var price = document.querySelector('input[name=price]').value;   
   comment.querySelector('.price').textContent = price;
   /*close modal*/
   closeModal();
}


