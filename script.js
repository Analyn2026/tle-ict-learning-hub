/* TLE-ICT Learning Hub - Hybrid-ready offline-first build
 * Local data is stored on this device. Cross-device sync requires a configured secure backend.
 */
const weekOneDays = [
 {day:"Day 1",id:"W1_01",title:"Programming Trends, Careers, Opportunities, and Skills",description:"Explore programming trends, related careers, business opportunities, and useful skills.",resources:[["Lesson Discussion","discussion"],["Learner Notes","notes"],["Activity Sheet","activity"],["Multiple-Choice Quiz","quiz"]]},
 {day:"Day 2",id:"W1_02",title:"My Future Programmer Self",description:"Connect a programming trend with a possible career goal and identify skills to develop.",resources:[["Lesson Discussion","discussion"],["Learner Notes","notes"],["Activity Sheet","activity"],["Multiple-Choice Quiz","quiz"]]},
 {day:"Day 3",id:"W1_03",title:"Computer Ergonomics: Working Safely and Comfortably",description:"Learn healthy computer-use practices and safer workstation habits.",resources:[["Lesson Discussion","discussion"],["Learner Notes","notes"],["Activity Sheet","activity"],["Multiple-Choice Quiz","quiz"]]},
 {day:"Day 4",id:"W1_04",title:"Spot the Risk! Ergonomics Detective",description:"Identify workstation risks, possible effects, and practical corrections.",resources:[["Lesson Discussion","discussion"],["Learner Notes","notes"],["Activity Sheet","activity"],["Multiple-Choice Quiz","quiz"]]},
 {day:"Day 5",id:"W1_05",title:"Build a Healthy Workstation",description:"Apply ergonomic practices by planning or demonstrating a safer workstation.",resources:[["Lesson Discussion","discussion"],["Learner Notes","notes"],["Activity Sheet","activity"],["Multiple-Choice Quiz","quiz"]]}
];
const weekTitles={2:"HTML Structure, Elements, Attributes, and HTML Editors",3:"HTML Headings, Paragraphs, Styles, and Formatting",4:"HTML Multimedia, Lists, and Tables",5:"HTML Forms and Links",6:"Developing a Website",7:"CSS Syntax, Selectors, Colors, Backgrounds, Fonts, and Text",8:"CSS Borders, Spacing, Icons, Links, Lists, Tables, Animation, and Transition",9:"CSS Box Model, Box Shadow, and Transform",10:"Creating an Interactive Website"};
const weekFiles={};
for(let w=2;w<=10;w++){const n=String(w).padStart(2,"0");weekFiles[w]=[
 {label:"Lesson Discussion",file:`Week_${n}/W${n}_Lesson_Discussion.docx`},
 {label:"Learner Notes",file:`Week_${n}/W${n}_Learner_Notes.docx`},
 {label:"Activities",file:`Week_${n}/W${n}_Activities.docx`},
 {label:"Practice Quiz",file:`Week_${n}/W${n}_Quiz.docx`}
];}
let currentLearnerDetails=null;
const defaultTopicCodes=weekOneDays.map((d,i)=>({grade:"Both",term:"All Terms",sector:"Computer Programming",topicId:d.id,code:["PTCOS-482","MFP-2026","CE-2026","SRED-2026","BHW-2026"][i],active:true}));
const dailyTopicCodes={"W2_D1": "UHHDS-2026", "W2_D2": "HEAHE-2026", "W2_D3": "BHSFBWP-2026", "W2_D4": "FHWP-2026", "W2_D5": "EID-2026", "W3_D1": "HHP-2026", "W3_D2": "TFE-2026", "W3_D3": "SDIPP-2026", "W3_D4": "DIP-2026", "W3_D5": "FSWP-2026", "W4_D1": "EIM-2026", "W4_D2": "COUL-2026", "W4_D3": "CHT-2026", "W4_D4": "AMLT-2026", "W4_D5": "MFI-2026", "W5_D1": "IHFFE-2026", "W5_D2": "CISF-2026", "W5_D3": "ATIBEL-2026", "W5_D4": "CSFLWP-2026", "W5_D5": "FEFL-2026", "W6_D1": "UPW-2026", "W6_D2": "BHP-2026", "W6_D3": "BSPN-2026", "W6_D4": "PBYW-2026", "W6_D5": "RIYW-2026", "W7_D1": "ICCS-2026", "W7_D2": "TC-2026", "W7_D3": "SCBFT-2026", "W7_D4": "SWP-2026", "W7_D5": "FOC-2026", "W8_D1": "CBMP-2026", "W8_D2": "SLLTI-2026", "W8_D3": "CAT-2026", "W8_D4": "IPLVE-2026", "W8_D5": "SDC-2026", "W9_D1": "UCBM-2026", "W9_D2": "ABMP-2026", "W9_D3": "BST-2026", "W9_D4": "CBMM-2026", "W9_D5": "PPPSPTI-2026", "W10_D1": "UWI-2026", "W10_D2": "PIW-2026", "W10_D3": "GPBTOI-2026", "W10_D4": "IW-2026", "W10_D5": "IWM-2026"};
for(let w=2;w<=10;w++)for(let d=1;d<=5;d++){const topicId=`W${w}_D${d}`;defaultTopicCodes.push({grade:"Both",term:"All Terms",sector:"Computer Programming",topicId,code:dailyTopicCodes[topicId],active:true});}
function getTopicCodes(){try{
 const saved=JSON.parse(localStorage.getItem("tleTopicCodes"))||[];
 const legacy={"W1_02":{"CE-731":"MFP-2026","CE-2026":"MFP-2026"},"W1_03":{"SRED-926":"CE-2026"},"W1_04":{"BHW-584":"SRED-2026"},"W1_05":{"BHW-2026":"BHW-2026"}};
 const approvedWeek1={"W1_01":"PTCOS-482","W1_02":"MFP-2026","W1_03":"CE-2026","W1_04":"SRED-2026","W1_05":"BHW-2026"};
 saved.forEach(x=>{const replacement=legacy[x.topicId]?.[x.code];if(replacement)x.code=replacement;if(approvedWeek1[x.topicId]&&["CE-731","SRED-926","BHW-584","PTCOS-482","MFP-2026","CE-2026","BHW-2026"].includes(x.code))x.code=approvedWeek1[x.topicId];});
 const merged=[...saved];
 for(const item of defaultTopicCodes){const existing=merged.find(x=>x.topicId===item.topicId&&x.grade===item.grade&&x.term===item.term&&x.sector===item.sector);if(!existing)merged.push({...item});else if(/^W([2-9]|10)_D[1-5]$/.test(item.topicId)&&/^CPW\d+D\d+-2026$/i.test(existing.code||""))existing.code=item.code;}
 return merged;
 }catch{return defaultTopicCodes.map(x=>({...x}));}}
function saveTopicCodes(list){localStorage.setItem("tleTopicCodes",JSON.stringify(list));}
function startLearning(){
 const grade=document.getElementById("grade").value,section=document.getElementById("section").value.trim(),term=document.getElementById("term").value,sector=document.getElementById("sector").value;
 if(!grade||!section||!term||!sector){alert("Please complete all the required information.");return;}
 currentLearnerDetails={grade,section,term,sector};localStorage.setItem("tleLearnerDetails",JSON.stringify(currentLearnerDetails));
 document.getElementById("welcome-section").hidden=true;document.getElementById("student-form").hidden=true;
 document.getElementById("learner-summary").textContent=`${grade} • ${section} • ${term} • ${sector}`;
 document.getElementById("topic-search").hidden=false;document.getElementById("topic-name").value="";document.getElementById("topic-search-message").textContent="";
 document.getElementById("materials-content").hidden=true;document.getElementById("materials-content").replaceChildren();document.getElementById("resource-viewer").hidden=true;document.getElementById("learner-materials").hidden=false;
}
function unlockTopic(){
 const typed=document.getElementById("topic-name").value.trim(),message=document.getElementById("topic-search-message");
 if(!typed){message.textContent="Please enter the topic code given by your teacher.";return;}
 if(!currentLearnerDetails){try{currentLearnerDetails=JSON.parse(localStorage.getItem("tleLearnerDetails"));}catch{}}
 if(!currentLearnerDetails){message.textContent="Please return to Home and enter your learner details.";return;}
 if(currentLearnerDetails.sector!=="Computer Programming"){message.textContent="Materials for this sector have not yet been added. Please ask your teacher.";return;}
 const config=getTopicCodes().filter(x=>x.active&&x.sector===currentLearnerDetails.sector&&(x.grade==="Both"||x.grade===currentLearnerDetails.grade)&&(x.term==="All Terms"||x.term===currentLearnerDetails.term)&&x.code.toLowerCase()===typed.toLowerCase()).sort((a,b)=>((b.grade!=="Both")+(b.term!=="All Terms"))-((a.grade!=="Both")+(a.term!=="All Terms")))[0];
 if(!config){message.textContent="Code not found or topic is not available for your Grade, Term, and Sector. Please check with your teacher.";return;}
 if(config.topicId.startsWith("W1_")){const i=weekOneDays.findIndex(d=>d.id===config.topicId);if(i<0){message.textContent="Topic not found.";return;}showWeekOne(i);}
 else{const match=config.topicId.match(/^W(\d+)_D(\d+)$/);if(!match){const legacy=config.topicId.match(/^W(\d+)$/);if(legacy){showWeekDay(Number(legacy[1]),1);}else{message.textContent="Please use the daily topic code provided by your teacher.";return;}}else{const w=Number(match[1]),day=Number(match[2]);if(!weekFiles[w]||day<1||day>5){message.textContent="Daily topic not found.";return;}showWeekDay(w,day);}}
 document.getElementById("topic-search").hidden=true;message.textContent="";
}
function showWeekOne(i){const day=weekOneDays[i],container=document.getElementById("materials-content");container.innerHTML=`<article class="day-card"><h3>${day.day}: ${escapeHTML(day.title)}</h3><p>${escapeHTML(day.description)}</p><div class="material-links">${day.resources.map((r,j)=>`<button type="button" class="material-link" onclick="openResource(${i},${j})">${escapeHTML(r[0])}</button>`).join("")}</div><button type="button" class="secondary-button back-button" onclick="searchAnotherTopic()">SEARCH ANOTHER TOPIC</button></article>`;container.hidden=false;markProgress(`W1_${i+1}`);}
function showWeekDay(w,dayNumber){
 const data=window.week2to10Content?.[String(w)];
 const day=data?.days?.find(x=>Number(x.day)===dayNumber);
 const record=window.dailyMaterials?.[`W${w}D${dayNumber}`];
 const container=document.getElementById("materials-content");
 if(!data||!day||!record){
   container.innerHTML=`<article class="day-card"><h3>Daily lesson unavailable</h3><p>The daily learning materials for Week ${w}, Day ${dayNumber} could not be loaded. Please check that daily-materials.js is present and up to date.</p><button type="button" class="secondary-button" onclick="searchAnotherTopic()">BACK</button></article>`;
   container.hidden=false;
   document.getElementById("resource-viewer").hidden=true;
   return;
 }
 const title=String(day.title||"").replace(/^Day\s*\d+\s*[–-]\s*/i,"");
 const resources=[
   ["Lesson Discussion","discussion"],
   ["Learner Notes","notes"],
   ["Activity Sheet","activity"],
   ["Practice Quiz","quiz"]
 ];
 if(record.handsOn&&record.handsOn.length) resources.push(["Hands-on Task","handsOn"]);
 const buttons=resources.map(([label,type])=>
   `<button type="button" class="material-link" onclick="openDailyMaterial(${w},${dayNumber},'${type}')">${label}</button>`
 ).join("");
 container.innerHTML=`<article class="day-card">
   <p class="small-note">WEEK ${w} • DAY ${dayNumber}</p>
   <h3>${escapeHTML(title)}</h3>
   <div class="material-links">${buttons}</div>
   <button type="button" class="secondary-button back-button" onclick="searchAnotherTopic()">BACK TO TOPIC SEARCH</button>
 </article>`;
 container.hidden=false;
 document.getElementById("resource-viewer").hidden=true;
 markProgress(`W${w}_D${dayNumber}`);
 // Open the discussion first, while retaining this daily materials menu for the Back button.
 openDailyMaterial(w,dayNumber,"discussion");
}
function showWeekFile(w){
 const data=window.week2to10Content?.[String(w)],container=document.getElementById("materials-content");
 if(!data){container.textContent="Daily lessons are not available. Please contact your teacher.";container.hidden=false;return;}
 let html=`<article class="day-card week-overview"><h3>Week ${w}: ${escapeHTML(data.title)}</h3><h4>Learning Competencies</h4><p>${escapeHTML(data.competencies).replace(/\n/g,"<br>")}</p><p class="small-note">Each day is designed for one 45-minute session. Days 4 and 5 include practical computer rotations and completion time.</p></article>`;
 data.days.forEach(d=>{html+=`<article class="day-card daily-lesson"><h3>Day ${d.day}: ${escapeHTML(d.title.replace(/^Day \d+\s*[–-]\s*/i,""))}</h3><div class="material-links"><button type="button" class="material-link" onclick="openDailyMaterial(${w},${dayNumber},'discussion')">Full Lesson Discussion</button><button type="button" class="material-link" onclick="openDailyMaterial(${w},${dayNumber},'notes')">Learner Notes</button><button type="button" class="material-link" onclick="openDailyMaterial(${w},${dayNumber},'activity')">Activity Sheet</button><button type="button" class="material-link" onclick="openDailyMaterial(${w},${dayNumber},'quiz')">Multiple-Choice Quiz</button>${window.dailyMaterials?.[`W${w}D${dayNumber}`]?.handsOn?`<button type="button" class="material-link" onclick="openDailyMaterial(${w},${dayNumber},'handsOn')">Hands-on Task</button>`:""}</div></article>`;});
 html+=`<article class="day-card"><h3>Practical Assessment Guide</h3><p>${escapeHTML(data.assessmentScale)}</p><p>Every learner must personally complete the computer-based task. Paper planning while waiting is preparation only and does not replace the individual computer demonstration.</p><button type="button" class="secondary-button" onclick="searchAnotherTopic()">SEARCH ANOTHER TOPIC</button></article>`;
 container.innerHTML=html;container.hidden=false;document.getElementById("resource-viewer").hidden=true;markProgress(`W${w}`);window.scrollTo({top:0,behavior:"smooth"});
}
function openWeekResource(w,type){const data=window.week2to10Content?.[String(w)],labels={notes:"Learner Notes",activities:"Weekly Activities",quiz:"Practice Quiz"};if(!data||!data.resources[type])return;document.getElementById("materials-content").hidden=true;const viewer=document.getElementById("resource-viewer");viewer.hidden=false;document.getElementById("resource-title").textContent=`Week ${w} • ${labels[type]}`;document.getElementById("resource-subtitle").textContent=data.title;const body=document.getElementById("resource-body");body.replaceChildren();data.resources[type].split(/\n+/).forEach((line,i)=>{const el=document.createElement(i===0?"h3":"p");el.textContent=line;body.appendChild(el);});markProgress(`W${w}_${labels[type]}`);window.scrollTo({top:0,behavior:"smooth"});}
function searchAnotherTopic(){document.getElementById("resource-viewer").hidden=true;document.getElementById("materials-content").hidden=true;document.getElementById("topic-search").hidden=false;document.getElementById("topic-name").value="";document.getElementById("topic-search-message").textContent="";window.scrollTo({top:0,behavior:"smooth"});}
function renderDailyBlocks(blocks){const body=document.getElementById("resource-body");body.replaceChildren();(blocks||[]).forEach(block=>{let el;if(block.type==="table"){el=document.createElement("div");el.className="content-table-wrap";const table=document.createElement("table");table.className="content-table";(block.rows||[]).forEach((row,ri)=>{const tr=document.createElement("tr");row.forEach(cell=>{const td=document.createElement(ri===0?"th":"td");td.textContent=cell;tr.appendChild(td);});table.appendChild(tr);});el.appendChild(table);}else if(block.type==="code"){el=document.createElement("pre");el.className="lesson-code";el.textContent=block.text||"";}else{el=document.createElement(block.type==="h1"?"h2":block.type==="h2"?"h3":block.type==="h3"?"h4":block.type==="title"?"h2":"p");el.textContent=block.text||"";if(block.type==="title")el.className="resource-document-title";}body.appendChild(el);});}
function showDailyResource(title,subtitle,blocks,progressKey){if(!blocks||!blocks.length){alert("This material is not available in the Learning Hub. Please inform your teacher.");return;}document.getElementById("materials-content").hidden=true;const viewer=document.getElementById("resource-viewer");viewer.hidden=false;document.getElementById("resource-title").textContent=title;document.getElementById("resource-subtitle").textContent=subtitle;renderDailyBlocks(blocks);markProgress(progressKey);window.scrollTo({top:0,behavior:"smooth"});}
function openResource(dayIndex,resourceIndex){const day=weekOneDays[dayIndex],resource=day?.resources?.[resourceIndex];if(!day||!resource){alert("The selected Week 1 material button is not configured correctly.");return;}const record=window.dailyMaterials?.[`W1D${dayIndex+1}`];const blocks=record?.[resource[1]];if(!blocks||!blocks.length){alert(`The ${resource[0]} for ${day.day} could not be found. Please check that daily-materials.js is in the same folder as index.html and is loading correctly.`);return;}showDailyResource(`${day.day} • ${resource[0]}`,day.title,blocks,`${day.id}_${resource[0]}`);}
function openDailyMaterial(week,day,type){const record=window.dailyMaterials?.[`W${week}D${day}`],labels={discussion:"Lesson Discussion",notes:"Learner Notes",activity:"Activity Sheet",quiz:"Multiple-Choice Quiz",handsOn:"Hands-on Task"};if(!record)return;showDailyResource(`Week ${week} • Day ${day} • ${labels[type]||"Learning Material"}`,`TLE–ICT Computer Programming`,record[type],`W${week}_D${day}_${type}`);}
function backToMaterials(){document.getElementById("resource-viewer").hidden=true;document.getElementById("materials-content").hidden=false;window.scrollTo({top:0,behavior:"smooth"});}
function backToStudentForm(){backToHome();}
function backToHome(){document.getElementById("learner-materials").hidden=true;document.getElementById("topic-search").hidden=false;document.getElementById("materials-content").hidden=true;document.getElementById("resource-viewer").hidden=true;document.getElementById("welcome-section").hidden=false;document.getElementById("student-form").hidden=false;document.getElementById("topic-name").value="";document.getElementById("topic-search-message").textContent="";window.scrollTo({top:0,behavior:"smooth"});}
function markProgress(item){const key="tleProgress",list=JSON.parse(localStorage.getItem(key)||"[]");const identity=currentLearnerDetails?`${currentLearnerDetails.grade}|${currentLearnerDetails.section}|${currentLearnerDetails.term}|${currentLearnerDetails.sector}`:"local";if(!list.some(x=>x.identity===identity&&x.item===item)){list.push({identity,item,completedAt:new Date().toISOString()});localStorage.setItem(key,JSON.stringify(list));}}
function escapeHTML(v){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]);}
if("serviceWorker" in navigator){window.addEventListener("load",()=>{if(location.protocol==="https:"||location.hostname==="localhost"){navigator.serviceWorker.register("./service-worker.js").catch(e=>console.error("Service worker registration failed",e));}});}
