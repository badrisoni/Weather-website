


const weatherForm= document.querySelector('form');
const search=document.querySelector('input');
const msg_one=document.querySelector('#msg-1');
const msg_two=document.querySelector('#msg-2');
 


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();  
    msg_one.textContent="Loading...";
    msg_two.textContent="";
    fetch('/weather?address='+ search.value).then((response)=>{
          response.json().then((data)=>{
              if(data.error)
              msg_one.textContent=data.error;
              else
              {
                msg_one.textContent=data.location;
                msg_two.textContent='The Temperature is : '+data.forecast.temperature +'degrees out there. '+data.forecast.summary;
              }
          })
})
    
});