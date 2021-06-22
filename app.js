'use strict';

let form =document.getElementById('form');
let table = document.getElementById('table');

let Student =function(name ,course){
    this.name =name;
    this.course=course;
    this.grade=this.randomGene(0,100);
    Student.all.push(this);

};
Student.all=[];


Student.prototype.randomGene=function(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
};

Student.prototype.addtolocalstorage=function(){
    localStorage.setItem('student',JSON.stringify(Student.all));
};

let Submit=function(event){
    event.preventDefault();
    let name= event.target.name.value;
    let course=event.target.course.value;

    let student=new Student(name,course);

    student.addtolocalstorage();

    tableRander();
    form.reset();
};



let Header=function(){
    let Head=document.createElement('thead');

    let HeadRow=document.createElement('tr');
    Head.appendChild(HeadRow);

    let HeadRowH1=document.createElement('th');
    HeadRowH1.textContent="student name";
    HeadRow.appendChild(HeadRowH1);

    let HeadRowH2=document.createElement('th');
    HeadRowH2.textContent="student Grade";
    HeadRow.appendChild(HeadRowH2);


    let HeadRowH3=document.createElement('th');
    HeadRowH3.textContent="Course";
    HeadRow.appendChild(HeadRowH3);

    let HeadRowH4=document.createElement('th');
    HeadRowH4.textContent="Status";
    HeadRow.appendChild(HeadRowH4);

    table.appendChild(Head);
};



let tableRander=function(){
    if(localStorage.student) {
        Student.all=JSON.parse(localStorage.getItem('student'));
        table.style.display='block';
    }else{
        table.style.display='none';
        Student.all=[];
    }
    table.innerHTML='';

    Header();


    let tableBody =document.createElement('tbody');

    for (let index = 0; index < Student.all.length; index++) {
      let BodyRow=document.createElement('tr');


      let BodyRowB1=document.createElement('td');
      BodyRowB1.textContent=`${Student.all[index].name}`;
      BodyRow.appendChild(BodyRowB1);

      let BodyRowB2=document.createElement('td');
      BodyRowB2.textContent=`${Student.all[index].grade}`;
      BodyRow.appendChild(BodyRowB2);
        

      let BodyRowB3=document.createElement('td');
      BodyRowB3.textContent=`${Student.all[index].course}`;
      BodyRow.appendChild(BodyRowB3);


if (Number(Student.all[index].grade)<50) {
    let BodyRowB4=document.createElement('td');
      BodyRowB4.textContent="Fail";
      BodyRowB4.style.color='red';
      BodyRow.appendChild(BodyRowB4);
}else{
    let BodyRowB4=document.createElement('td');
      BodyRowB4.textContent="Pass";
      BodyRowB4.style.color='green';
      BodyRow.appendChild(BodyRowB4);
}


      tableBody.appendChild(BodyRow);

    }
    table.appendChild(tableBody);
};

tableRander();



// eventlistener
form.addEventListener('submit',Submit);