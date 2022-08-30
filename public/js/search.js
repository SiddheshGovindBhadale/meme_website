let search = document.getElementById("search")
    
    search.addEventListener("input" , function(){
      Search()
    })
    
    function Search(){
         let searchVal = search.value.toLowerCase();
         console.log(searchVal)
    
         let box = document.getElementsByClassName("video-container")
     
         Array.from(box).forEach(function(element){
              let title = element.children[1].children[0].children[0].innerText.toLowerCase();
              let discretion = element.children[1].children[2].innerText.toLowerCase();
              if(title.includes(searchVal) || discretion.includes(searchVal)){
                 element.classList.remove("hide");
                 element.classList.add("show");
              }
              else{
                 element.classList.add("hide");
                 element.classList.remove("show");
              }
    
         })
     }
     
     
     
// get data from session storage

let sessionSearch = sessionStorage.getItem("mySearch");
   
   if(sessionSearch == null){
     searchArr = [];
   }else{
     searchArr = JSON.parse(sessionSearch);
   }
   
   if(searchArr.length > 0){
     let eleIndex = searchArr.length - 1
     let lastEle = searchArr[eleIndex]
     search.value = lastEle
     Search()
     sessionStorage.clear()
   }
   
