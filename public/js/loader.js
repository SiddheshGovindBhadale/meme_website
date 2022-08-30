let main = document.querySelector("#mains")
	  
		let timesRun = 0
		function loade(){
		main.style.display="block"
		const myInterval = setInterval(preloader, 1000);
	   	
	   	function preloader(){
		    timesRun += 1;
	     	if(timesRun === 3){
	     	    main.style.display="none"
	        	clearInterval(myInterval);
	        	timesRun=0
		    }
		}}
		
// notification
function Display(type, displayMessage) {
    let message = document.getElementById('message');
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <span><strong>Messge:</strong> ${displayMessage}</span>
                            <button type="button" class="close btn" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>`;
    setTimeout(function () {
        message.innerHTML = ''
    }, 4000);

}