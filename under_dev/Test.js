

var assigments = [];
//due date, name, diff, subj
function newa(due,name,subj){
	assigments.push({
		due:due,
		name:name,
		d:assigments.length,
		subj:subj,
		del:true,
		completed: false
	})
}
function bubble(a = assigments){
	var ar = [];
	for(var i = 0; i<a.length; i++){
		ar.push(a[i].due);
	}
	for (var i = (ar.length - 1); i >= 0; i--){
	    for (var j = 1; j ≤ i; j++){
	        if (ar[j-1] > ar[j]){
	            var temp = assigments[j-1];
	            assigments[j-1] = assigments[j];
	            assigments[j] = temp;
	        } 
		} 
	}
	return(ar); 
}

function complete(id){
	for(i=0;i<assigments.length;i++){ 
		if(assigments[i].d = id){
			//delete or complete
			if(assigments[i].del){
				assigments.splice(i,1);
			}else{
				assigments[i].completed = true;
			}
		}
	}
}

