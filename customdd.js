((window)=>{
	this.customDD = (ele,data=[])=>{
		let elem = ele;
		let dataInner = data;
	    if(elem instanceof Element){
	    	elem.innerHTML = `<div class="dropdown">
	            <div onclick="myFunction(this)" class="dropbtn">
	                
	                <i class="fa fa-caret-down" aria-hidden="true"></i>
	                <div id="myResults${elem.getAttribute('id')}" class="myResultBox"></div>  
	                <input  type="text" 
	                    id="myInput${elem.getAttribute('id')}" 
	                    autofocus
	                    class="mySearchBox" 
	                    onkeyup="filterFunction(this)" 
	                    placeholder="Search for names..">
	                
	            </div>
	            <ul id="myDropdown${elem.getAttribute('id')}" class="dropdown-content">
	            </ul>
	        </div>`;
	        var checkedIcons = [], checkedIconList=[];
		    this.myFunction = function(event) {
		    	event.parentNode.lastElementChild.classList.toggle("show");
		        event.children[0].classList.remove("fa-caret-down");
		        event.children[0].classList.add("fa-caret-up");
		        event.children[1].classList.toggle("hide");
		        event.children[2].classList.toggle("show");
		        event.children[2].focus();
		    }
		    this.filterFunction = function(event,clearAll){
		    	var filter, ul, li, a, i;
		        filter = event.value.toUpperCase();
		        ul = event.parentNode.parentNode.children[1];
		        li = ul.getElementsByTagName("li");
		        for (i = 0; i < li.length; i++) {
		            a = li[i].getElementsByTagName("span")[0];
		            if (a.innerHTML.toUpperCase().indexOf(filter) > -1 || clearAll) {
		                li[i].style.display = "";
		            } else {
		                li[i].style.display = "none";

		            }
		        }
		    }
		    this.checkBoxClicked = function(event){
		    	let value = '';
		        let ckName = [];
		        if(event.target.value){
		            value = event.target.value;
		        }else{
		            value = event.target.attributes["data-value"].value;
		        }
		        if(checkedIcons.indexOf(value)!==-1){
		            checkedIcons.splice(checkedIcons.indexOf(value),1);
		            document.getElementById(value).checked = false;
		        }else{
		            checkedIcons.push(value);
		            document.getElementById(value).checked = true; 
		        }
		        checkedIconList=input.filter((cb)=>{
		                            if(checkedIcons.indexOf(cb.value)!==-1){
		                                ckName.push(cb.name)
		                                return true;
		                            }
		                        });
		        if(event.target.nodeName === 'LI')
		        	event.target.parentNode.parentNode.children[0].children[1].innerHTML= `<div>${ckName.join(", ")}</div>`;
		        else
		        	event.target.parentNode.parentNode.parentNode.children[0].children[1].innerHTML= `<div>${ckName.join(", ")}</div>`;

		    }
		    this.appendCheckBox = function(){
		        return dataInner.map((i)=>{
		            return(
		                `<li data-value="${i.value}" class="cb" name="${i.name}">
		                    <input type="checkbox" id="${i.value}" value="${i.value}" name="${i.name}">
		                    <span data-value="${i.value}" name="${i.name}">${i.name}</span>
		                </li>`
		            )
		        })
		    }
		    document.getElementById(`myDropdown${elem.getAttribute('id')}`).innerHTML = appendCheckBox().join(''); 
		    var el = document.getElementsByClassName("cb");
		    for(let i=0;i<el.length;i++){
		        el[i].addEventListener("click", checkBoxClicked);
		    }

		    // Close the dropdown if the user clicks outside of it
		    this.onclick = function(event) {
		      if (event.target.closest(".dropdown")==null) {
		      	var dropdowns = document.getElementsByClassName("dropdown-content");
		        var i;
		        for (i = 0; i < dropdowns.length; i++) {
		          var openDropdown = dropdowns[i];
		          if (openDropdown.classList.contains('show')) {
		            openDropdown.classList.remove('show');
		          }
		        }
		        var ele = document.querySelector('input.mySearchBox.show');
		        if(ele){
			        ele.classList.remove("show");
			        ele.parentNode.children[0].classList.remove("fa-caret-up");
			        ele.parentNode.children[0].classList.add("fa-caret-down");
			        ele.parentNode.children[1].classList.remove("hide");
			        ele.value='';
			        this.filterFunction(ele,true);
			    }
		      }
		      
		    }
	    }
	    return this;
	};
})(window);
    