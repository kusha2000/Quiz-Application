let level=1;
let sec=0;
let min=0;
let interval=null;
let operators=['+','-','*','/','%'];
let fNumber;
let lNumber;
let selectedOperator;
let correctAnswer;
let insertedAnswer;
let answerData=[];
let qNumber=0;


//--------------
const selectElement=document.getElementById('level-select');

const secElement=document.getElementById('sec');
const minElement=document.getElementById('min');

const fNumElement=document.getElementById('f-number');
const lNumElement=document.getElementById('l-number');
const opElement=document.getElementById('op');

const answerElement=document.getElementById('answer');

const qNumberElement=document.getElementById('qNumber');

const cElement=document.getElementById('c');
const wElement=document.getElementById('w');
const sElement=document.getElementById('s');


const btnStartElement=document.getElementById('btn-start');

const tBodyElement=document.getElementById('answer-body');

//--------------
selectElement.addEventListener('change',function(){
    level=parseInt(selectElement.value);
});

//--------------




//--------------------
const start=()=>{
    btnStartElement.disabled=true;
    manageTime();
}

const manageTime=()=>{

    qNumber++;
    if(qNumber>10){
        while(tBodyElement.firstChild){
            tBodyElement.removeChild(tBodyElement.firstChild);
        }
        finalize();
        return;
    }else{
        qNumberElement.textContent=qNumber;
        min=0;
        sec=0;

        secElement.textContent='00';
        minElement.textContent='00';

        generateQuestions(level);

        clearInterval(interval);
        
        interval=setInterval(()=>{
            //console.log(new Date().toISOString().split('T')[1]);
            sec++;
            if(sec<10){
                secElement.textContent='0'+sec;
            }else{
                secElement.textContent=sec+'';
            }

            if(sec==60){
                sec=0;
                min++;
                minElement.textContent='0'+min;
            }

            if(min==3){
                min=0;
                skipQizz();
            }

        },1000);
    }

    
}

const generateQuestions=(selectedLevel)=>{

    let maxNumber=10;

    if(selectedLevel==2){
        maxNumber=50;
    }else if(selectedLevel==3){
        maxNumber=100;
    }

    fNumber=Math.floor(Math.random()*maxNumber)+1;
    lNumber=Math.floor(Math.random()*maxNumber)+1;

    fNumElement.textContent=fNumber;
    lNumElement.textContent=lNumber;

    selectedOperator=operators[Math.floor(Math.random()*5)];
    opElement.textContent=selectedOperator;
} 


const submitData=()=>{

    insertedAnswer=parseInt(answerElement.value);
    

    if(fNumber && lNumber && selectedOperator && insertedAnswer){
        switch(selectedOperator){
            case '+':
                correctAnswer=fNumber+lNumber;
                break;
            case '-':
                correctAnswer=fNumber-lNumber;
                break;
            case '*':
                correctAnswer=fNumber*lNumber;
                break;
            case '/':
                correctAnswer=fNumber/lNumber;
                break;
            case '%':
                correctAnswer=fNumber%lNumber;
                break;
            default:
                alert("Something went wrong");
                return;
        }

        if(correctAnswer==insertedAnswer){
            let obj={
                'q number':1,
                'time':min+':'+sec,
                'correctAnswer':correctAnswer,
                'userAnswer':insertedAnswer,
                'operator':selectedOperator,
                'firstNumber':fNumber,
                'lastNumber':lNumber,
                'isCorrect':true,
                'isskipped':false
            }
            answerData.push(obj);
        }else{
            let obj={
                'qnumber':1,
                'time':min+':'+sec,
                'correctAnswer':correctAnswer,
                'userAnswer':insertedAnswer,
                'operator':selectedOperator,
                'firstNumber':fNumber,
                'lastNumber':lNumber,
                'isCorrect':false,
                'isskipped':false
            }
            answerData.push(obj);
        }

        answerElement.value='';
        manageTime();
        console.log(answerData);
        

    }else{
        alert('Try again');
    }

    setStatisticsForLables();
    while(tBodyElement.firstChild){
        tBodyElement.removeChild(tBodyElement.firstChild);
    }
    finalize()
}
const skipQizz=()=>{
    if(qNumber>10){
        while(tBodyElement.firstChild){
            tBodyElement.removeChild(tBodyElement.firstChild);
        }
        finalize();
        return;
    }else{
        let obj={
            'qnumber':1,
            'time':min+':'+sec,
            'correctAnswer':'**',
            'userAnswer':'**',
            'operator':selectedOperator,
            'firstNumber':fNumber,
            'lastNumber':lNumber,
            'isCorrect':false,
            'isskipped':true
        }
        answerElement.value='';
        answerData.push(obj);
        manageTime();
        setStatisticsForLables();
        while(tBodyElement.firstChild){
            tBodyElement.removeChild(tBodyElement.firstChild);
        }
        finalize()
    }
    
}

const setStatisticsForLables=()=>{

    let c=0;
    let w=0;
    let s=0;

    for(let x=0; x<answerData.length; x++){
        let temp=answerData[x];
        
        if(temp.isCorrect){
            c++;
        }else if(temp.isskipped){
            s++;
        }else{
            w++;
        }

        
    }

    cElement.textContent=c;
    wElement.textContent=w; 
    sElement.textContent=s;
}

const reset=()=>{
    btnStartElement.disabled=false;
    qNumber=0;
    qNumberElement.textContent=qNumber;
    answerData=[];
    selectedOperator=undefined;
    setStatisticsForLables();
    clearInterval(interval);
    minElement.textContent='0'+min;
    secElement.textContent='0'+min;
    opElement.textContent='?';
    fNumElement.textContent='?';
    lNumElement.textContent='?';

    while(tBodyElement.firstChild){
        tBodyElement.removeChild(tBodyElement.firstChild);
    }
}

const finalize=()=>{
     answerData.forEach(data=>{
        const row=document.createElement("tr");

        const cell1=document.createElement("td");
        cell1.textContent=data.firstNumber;
        row.appendChild(cell1);

        const cell2=document.createElement("td");
        cell2.textContent=data.lastNumber;
        row.appendChild(cell2);

        const cell3=document.createElement("td");
        cell3.textContent=data.operator;
        row.appendChild(cell3);

        const cell4=document.createElement("td");
        cell4.textContent=data.correctAnswer;
        row.appendChild(cell4);

        const cell5=document.createElement("td");
        cell5.textContent=data.userAnswer;
        row.appendChild(cell5);

        const cell6=document.createElement("td");
        cell6.textContent=data.isCorrect;
        row.appendChild(cell6);

        const cell7=document.createElement("td");
        cell7.textContent=data.isskipped;
        row.appendChild(cell7);

        const cell8=document.createElement("td");
        cell8.textContent=data.time;
        row.appendChild(cell8);

        tBodyElement.appendChild(row);


     });

}


//--------------------