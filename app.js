const shifts={S:{h:12,d:1.5},L:{h:12,d:1.5},J:{h:8,d:1},R:{h:8,d:1},V:{h:8,d:1},LC:{h:12,d:1.5},D:{h:0,d:0},SPr:{h:12,d:1.5,he:true},LPr:{h:12,d:1.5,he:true}};
const yearSel=document.getElementById('year'),monthSel=document.getElementById('month');
const targetInput=document.getElementById('targetDays'),priceInput=document.getElementById('priceHE');
const calendar=document.getElementById('calendar'),countBox=document.getElementById('countByShift');
for(let y=2026;y<=2035;y++)yearSel.add(new Option(y,y));for(let m=1;m<=12;m++)monthSel.add(new Option(m,m-1));
function render(){const y=yearSel.value,m=monthSel.value;targetInput.value=loadTargetDays(y,m);priceInput.value=loadPrice(y,m);
const data=loadMonthData(y,m);calendar.innerHTML="";let totalH=0,days=0,heH=0,counts={};Object.keys(shifts).forEach(k=>counts[k]=0);
const dim=new Date(y,Number(m)+1,0).getDate();const first=(new Date(y,m,1).getDay()+6)%7;
for(let i=0;i<first;i++)calendar.appendChild(document.createElement('div'));
for(let d=1;d<=dim;d++){const date=new Date(y,m,d);const cur=data[d]||'';
 if(shifts[cur]){counts[cur]++;totalH+=shifts[cur].h;days+=shifts[cur].d;if(shifts[cur].he)heH+=shifts[cur].h;}
 const div=document.createElement('div');div.className='day '+((date.getDay()==0||date.getDay()==6)?'weekend ':'')+'shift-'+cur;
 div.innerHTML=`<div class='day-number'>${d}</div>`;
 const sel=document.createElement('select');['',...Object.keys(shifts)].forEach(v=>{const o=document.createElement('option');o.value=v;o.text=v||'-';if(v===cur)o.selected=true;sel.appendChild(o);});
 sel.onchange=()=>{data[d]=sel.value;saveMonthData(y,m,data);render();};div.appendChild(sel);calendar.appendChild(div);} 
 const objective=(targetInput.value||0)*8,constPrice=(priceInput.value||0);
 document.getElementById('objective').innerText=objective;
 document.getElementById('workedHours').innerText=totalH;
 document.getElementById('difference').innerText=totalH-objective;
 document.getElementById('heHours').innerText=heH;
 document.getElementById('heTurno').innerText=(heH*constPrice).toFixed(2);
 document.getElementById('heRefuerzo').innerText=((totalH-objective)*constPrice).toFixed(2);
 document.getElementById('workedDays').innerText=days.toFixed(1);
 countBox.innerHTML=Object.entries(counts).filter(e=>e[1]>0).map(e=>`${e[0]}: ${e[1]}`).join(' · ');} 
targetInput.oninput=()=>{saveTargetDays(yearSel.value,monthSel.value,targetInput.value);render();};priceInput.oninput=()=>{savePrice(yearSel.value,monthSel.value,priceInput.value);render();};yearSel.onchange=render;monthSel.onchange=render;render();