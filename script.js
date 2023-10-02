//This is the default data that we have loaded in our file
let student = [
    {
      ID: 1,
      name: 'Alice',
      email: 'alice@example.com',
      age: 21,
      grade: 'A',
      degree: 'Btech',
    
    },
    {
      ID: 2,
      name: 'Bob',
      email: 'bob@example.com',
      age: 22,
      grade: 'B',
      degree: 'MBA',
     
    },
    {
      ID: 3,
      name: 'Charlie',
      email: 'charlie@example.com',
      age: 20,
      grade: 'C',
      degree:'Arts',
     
    }
  ]; 

  let form = document.getElementById("student-form");
  form.addEventListener("submit", (Event)=>{
    Event.preventDefault();
  }
  )

  let name12 = document.getElementById("name");
  let email12 = document.getElementById("email");
  let gpa12 = document.getElementById("gpa");
  let age12 = document.getElementById("age");
  let degree12 = document.getElementById("degree");
  
  let tbody = document.getElementById("tablebody");
  
  //Following function is used to load default data automatically
  
   function studentsinfo(liststudents){

    tbody.innerHTML="";
    
    liststudents.forEach((data,index)=>{
      let rowcell = tbody.insertRow(index);
      let srno = index+1;
      
      for(let i in data){
        let tdcell = document.createElement("td");
        tdcell.innerHTML = data[i];
        // ADDED THE FOLLOWIUNG IF JUST FOR SRNO OF TABLE
        if(i =="ID"){  
          tdcell.innerHTML = srno;
        }

        rowcell.appendChild(tdcell);
       
      }
      let actioncell = document.createElement("td");

      let editbtn = document.createElement("button");
      let deletebtn = document.createElement("button");

      editbtn.textContent="Edit";
      deletebtn.textContent="Delete"; 
      
      editbtn.onclick = function(){editstudent(data.ID)};
      deletebtn.onclick = function(){deletestudent(data.ID)};
      
      actioncell.append(editbtn,deletebtn);
      rowcell.appendChild(actioncell);

  })
}

 // Following function is there to add data which is inputed in our table

function inputdata(){
 
  let name1 = document.getElementById("name").value;
  let email1 = document.getElementById("email").value;
  let gpa1 = document.getElementById("gpa").value;
  let age1 = document.getElementById("age").value;
  let degree1 = document.getElementById("degree").value;
  
  // THIS IF BLOCK IS ADDDED TO SEE WHETHER THE DATA WE ARE EDITING IS ALREADY
  // THERE IN OUR OBJECT ARRAY

  // if(studentdisplay){
    
  //   let matchst = student.filter((s,ind)=>{
  //      indexval = ind;
  //     s.ID==studentdisplay
  //   });

  //   matchst[0].name = name1;
  //   matchst[0].email = email1;
  //   matchst[0].age = age1;
  //   matchst[0].gpa = gpa1;
  //   matchst[0].degree = degree1;
  // }
  // else{

  let newinput = {
    ID: student.length + 1,
    name: name1,
    email: email1,
    age: age1,
    grade: gpa1,
    degree: degree1   
  }
    student.push(newinput);
  // }
  document.getElementById("student-form").reset();
  studentsinfo(student);
}



// ADDING THE SEARCH FUNCTIONALITY
function searchlist(){
  let infogh = document.getElementById("textnameclicked").value;
  infogh = infogh.toLowerCase();
 
  let filtered = student.filter((stud)=>{
    return(stud.name.toLowerCase().includes(infogh)||
           stud.email.toLowerCase().includes(infogh)||
           stud.degree.toLowerCase().includes(infogh)
       )
  })
  studentsinfo(filtered);
}


// functionality of delete
function deletestudent (rowindex){

  console.log(rowindex);
  let rowdeletetr = student.filter((s,index)=>{
    if(rowindex==s.ID){
      student.splice(index,1);
      studentsinfo(student);
    }
  })
  
}


// FUNCTIONALITY OF EDIT
function editstudent(rowindex){
  
 let upname = student.filter((s)=>rowindex == s.ID)
   
 name12.value = upname[0].name;
 email12.value = upname[0] .email;
 gpa12.value =  upname[0].grade;
 age12.value =  upname[0].age;
 degree12.value =  upname[0].degree;


 let arrobj = upname[0];


 document.getElementById("addstudent").style.display="none";
 let updtbtn = document.getElementById("editstudentbtn");
 updtbtn.style.display="block";
 updtbtn.onclick = function(){updatestudent(arrobj)};

}
// ADDING THE EDITING FUNCTIONALITY BY PROVIDING A DIFFERENT FUNCTION
function updatestudent(arrobj){

 document.getElementById("addstudent").style.display="none";
 let updtbtn = document.getElementById("editstudentbtn");
 updtbtn.style.display="block";
 
 let editablev = student.filter((s)=>arrobj==s);
 let editobj = editablev[0];

 editobj.name = name12.value;
 editobj.age = age12.value;
 editobj.email = email12.value;
 editobj.grade = gpa12.value;
 editobj.degree =degree12.value;


 document.getElementById("addstudent").style.display="block";
 updtbtn.style.display="none";
 studentsinfo(student);
 document.getElementById("student-form").reset();
}
