var functionIsRunning = false;

function sendData(){
     let search = document.getElementById("search")

     let sessionSearch = sessionStorage.getItem("mySearch");
    
     if(sessionSearch == null){
         searchArr = [];
     }else{
         searchArr = JSON.parse(sessionSearch);
     }
    
     searchArr.push(search.value);
    
     sessionStorage.setItem("mySearch", JSON.stringify(searchArr));
    
     location.href ="/"
     functionIsRunning = true;

    //  if (!functionIsRunning) {
    //     functionIsRunning = true;
    //     //do stuff
    //     functionIsRunning = false;
    // }
     
     
 }

//  if (window.sendData) {
//     sessionStorage.clear()
//  }