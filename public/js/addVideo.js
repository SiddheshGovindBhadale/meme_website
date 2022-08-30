
    let url = "/video"
    let change = document.getElementById("change")
    let changeBtn = document.querySelector(".changeBtn")
    let tbody = document.querySelector("tbody")
    showData()
    function allVideo(){
      loade()
      changeBtn.children[1].classList.remove('active')
      changeBtn.children[0].classList.add('active')
      document.location.reload(true)
    }
    
    function addVideo(){
      loade()
      change.innerHTML = `
            <form action="/video" method="POST" id="addProduct" enctype="multipart/form-data">
                  <div class="product-card my-4" >
                       <div class=" mb-3 imag">
                            <input type="file" class="form-control image" id="file" multiple name="image">
                       </div>
                       <div>
                            <div class="mb-3 input">
                                 <input type="text" class="form-control title" id="title"  placeholder="Enter Title" name="title"  >
                            </div> 
                            <div class="mb-3 input">
                                 <input type="text" class="form-control categary" placeholder="Enter Category" name="category"  >
                            </div> 
                            <div class="mb-3 input">
                                 <input type="text" class="form-control keys" placeholder="Enter Keys" name="keys" >
                            </div>
                            <div class="mb-3 input">
                                 <input type="text" class="form-control time" placeholder="Enter Play Time" name="time" >
                            </div>
                            <div class="mb-3 input">
                                 <textarea class="form-control discretion" rows="5" placeholder="Enter Discretion" name="discretion" ></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary mb-3" id="upload" >Upload</button>
                      </div>
                 </div>
            </form>
      `
      changeBtn.children[0].classList.remove('active')
      changeBtn.children[1].classList.add('active')
    }
    
    
    // show services in page
    function showData(){
       let VideoData = ""
       loade()
       /*get request*/
       fetch(url)
       .then(res => res.json())
       .then(data => {
             data.forEach(function(item,index){
                  VideoData += `
                        <tr class="myrow">
                           <td>${String(index + 1).padStart(2,'0')}</td>
                           <td>${item.date}</td>
                           <td><img src="/product/${item.image[item.image[0].mimetype == "image/png" || item.image[0].mimetype == "image/jpg" ? 0 : 1].filename}" alt="" style="height: 35px; border-radius: 0%;"></td>
                           <td>${item.title}</td>
                           <td>${item.category}</td>
                           <td>${item.keys}</td>
                           <td>${item.time}</td>
                           <td>${item.discretion}</td>
                           <td>
                              <span class="action_btn">
                                    <a href="#!" onclick="sendData(${index})">Edit</a>
                                    <a href="#!" id="${item._id}" onclick="remove(this.id)">Remove</a>
                              </span>
                           </td>
                        </tr>
                  `
             }) 
             tbody.innerHTML = VideoData
        })
        .catch((e)=>{
             console.log(e)
        })
     }
    
    
    
    /*function sendData(index){
        let obj = {}
        let check = confirm("Do you want create admin")
        if(check == true){
        loade()
        fetch(url)
        .then(res => res.json())
        .then(data => {
               let Data = data[index]
               console.log(Data.name)
               
               obj = {
                 "name":Data.name,
                 "username":Data.username,
                 "isAdmin":"true",
                 "password":Data.password
               }
    
              fetch(url + "/" + Data._id , {
                   method: 'PATCH',
                   headers:{
                           'Content-Type': 'application/json'
                   },
                   body: JSON.stringify(obj),
              })
              .then(res => res.json())
              .then(data => {
                    showData()
              })
              .catch(error => {
                    console.log(error);
              });
            
           showData()
         })
    
    .catch((e)=>{
       console.log(e)
    })
    Display('success', 'Admin Created')
    showData()
    }
}*/
    
    
    
    
    
    
    // delete function
    function remove(id){
       let check = confirm("Do you really want delete admin")
       if(check == true){
       fetch(url + "/" + id, {
           method: 'DELETE'
       })
       .then(() => {showData()})
       .catch(err => {
           console.error(err)
       });
       Display('success', 'Deleted Successful')
       showData()
       }
    }
    
    
    let search = document.getElementById("search")
    
    search.addEventListener("input" , function(){
    
        let searchVal = search.value.toLowerCase();
    //console.log(searchVal)
    
        let row = document.getElementsByClassName("myrow")
     
        Array.from(row).forEach(function(element){
    //let cardTxt = element.getElementsByTagName("h6")[0].innerText
             let td1 = element.children[0].innerText.toLowerCase();
             let td2 = element.children[1].innerText.toLowerCase();
             let td3 = element.children[3].innerText.toLowerCase();
             let td4 = element.children[4].innerText.toLowerCase();
             let td5 = element.children[5].innerText.toLowerCase();
             let td6 = element.children[6].innerText.toLowerCase();
             let td7 = element.children[7].innerText.toLowerCase();
    
             if(td1.includes(searchVal) || td2.includes(searchVal) || td3.includes(searchVal) || td4.includes(searchVal) || td5.includes(searchVal) || td6.includes(searchVal) || td7.includes(searchVal)){
                  element.classList.remove("hide");
                  element.classList.add("show");
             }
             else{
                  element.classList.add("hide");
                  element.classList.remove("show");
             }
    
       })
    })