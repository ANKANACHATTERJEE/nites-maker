let add=document.getElementById('addBtn');
let search=document.getElementById('searchText');
showNotes();
add.addEventListener('click',function(){
    let obj=localStorage.getItem('notes');
    if(obj==null){
        obj=[];
    }
    else{
        obj=JSON.parse(obj);
    }
    textarea=document.getElementById('textarea');
    if(textarea!=null){
        obj.push(textarea.value);
        localStorage.setItem('notes',JSON.stringify(obj));
    }
    textarea.value="";
    showNotes();
});
function showNotes(){
    let obj=localStorage.getItem('notes');
    let notes=document.getElementById('notes');
    if(obj!=null){
        obj=JSON.parse(obj);
        let html=``;
        obj.forEach(function(element,index){
            console.log(element,index);
                
                html+=`
                <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Note ${index + 1}</h5>
                        <p class="card-text"> ${element}</p>
                        <button id="${index}"onclick="del(this.id)" class="btn btn-primary">Delete Note</button>
                    </div>
                </div>
                `;      
        })
        if(obj.length==0){
            html+=`<p>Nothing to show! Use "Add a Note" section above to add notes.</p>`;
        }
            notes.innerHTML=html;
    }
}
function del(index){
    let obj=JSON.parse(localStorage.getItem('notes'));
    obj.splice(index,1);
    localStorage.setItem('notes',JSON.stringify(obj));
    showNotes();
}
search.addEventListener('input',function(){
    let text=search.value.toLowerCase();
    let noteCards=document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardText=element.getElementsByTagName('p')[0].innerText;
        if(cardText.includes(text)){
            console.log(element);
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    })
})