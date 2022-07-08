let cl=console.log;


const studentform=document.getElementById("studentform")
const title=document.getElementById("title")
const information=document.getElementById("information");
const info=document.getElementById("info");
const update=document.getElementById("update");
const submit=document.getElementById("submit");




let apiurl="http://jsonplaceholder.typicode.com/posts";

let postarray=[];

function fetchdata(methodname, baseurl, tempfun, data){
    let xhr=new XMLHttpRequest();

    xhr.open(methodname, baseurl);

    xhr.onload =function(){
        cl(xhr.status);

        // cl(xhr.response);

        if(xhr.status===200 || xhr.status===201 && xhr.readystate===4){

            if(methodname ==="GET"){
                 postarray=JSON.parse(xhr.response);
                tempfun(postarray)
            }
            

        }
        if(xhr.status===404){
            alert("page not found");
        }
    }
    xhr.send(postarray)
}


const onEdithandler= (ele) =>{
        // cl(ele.closest('.card').dataset.id);
        let getid=+(ele.closest('.card').dataset.id);
        localStorage.setItem('setid', getid)
       let getobj= postarray.find( o => getid ===  o.id)
    //    cl(getobj);
       title.value =getobj.title;
       information.value= getobj.body;
       update.classList.remove('d-none');
       submit.classList.add('d-none')

}


const ondelethandler =(e) =>{
    // cl(e)
    let getid= +e.closest('.card').dataset.id;
    // cl(getid)
    let deleteurl =`${apiurl}}/${getid}`
    fetchdata("DELETE",deleteurl);
    postarray=postarray.filter(ele =>{
       return  ele.id !==getid
    })
    templating(postarray)
}

fetchdata("GET",apiurl,templating);




function templating(arr){
    let result="";
    arr.forEach((ele) => {
        result +=`<div class="card mb-3" data-id="${ele.id}" >
                        <div class="card-body">
                            <h3>
                                ${ele.title}
                            </h3>
                            <p>
                                ${ele.body}
                            </p>
                            <p class="text-right">
                                <button class="btn btn-success"  onclick="onEdithandler(this)">Edit</button>
                                <button class="btn btn-danger" onclick="ondelethandler(this)" >Delet</button>
                            </p>
                        </div>
                  </div>`
    });

    info.innerHTML=result;

}


const onstudentsubmit =(e)=>{
    e.preventDefault();

    let obj={
        title:title.value,
        body:information.value,

    }
    studentform.reset();
    postarray.unshift(obj);
    fetchdata("POST", apiurl,JSON.stringify(obj));
    postarray.shift
    templating(postarray);


}

const onstudentupdate =(eve) =>{
    let getid=localStorage.getItem('setid');
    let updateurl=`${apiurl}/${getid}`

    let obj={
        title:'title.value',
        body:'information.value',
    }
    postarray.forEach(o =>{
        if(o.id== getid){
            o.title=title.value,
            o.body=information.value
        }
    })
    templating(postarray)
    studentform.reset()
    update.classList.add('d-none')
    submit.classList.remove('d-none')
    fetchdata("PATCH", updateurl,JSON.stringify(obj))
}
studentform.addEventListener("submit",onstudentsubmit);
update.addEventListener("click",onstudentupdate);