const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
const motionPreference = "conceptor-motion";
const motionQuery = matchMedia("(prefers-reduced-motion: reduce)");
let motionEnabled = localStorage.getItem(motionPreference) !== "off" && !motionQuery.matches;
document.documentElement.dataset.motion = motionEnabled ? "on" : "off";
const palette = ["#365ef5","#13b8a6","#8b72e8","#d99a24","#477baf"];
const concepts = [
  {id:"states",number:"01",title:"Process states",type:"DIAGRAM",source:"TEXTBOOK REF · P. 21",subtitle:"A process changes state as it is admitted, scheduled, paused or completed.",kind:"states"},
  {id:"pcb",number:"02",title:"Process control block",type:"DIAGRAM",source:"TEXTBOOK REF · P. 20",subtitle:"A process control block stores the information the operating system needs to manage a process.",kind:"pcb"},
  {id:"context",number:"03",title:"Context switching",type:"ANIMATED SEQUENCE",source:"TEXTBOOK REF · P. 23",subtitle:"See how the CPU saves one process context and restores another.",kind:"context"},
  {id:"scheduling",number:"04",title:"CPU scheduling",type:"INTERACTIVE MODEL",source:"TEXTBOOK REF · PP. 25–28",subtitle:"Change the scheduling algorithm and workload to see how execution order changes.",kind:"schedule"},
  {id:"criteria",number:"05",title:"Scheduling criteria",type:"NOTES",source:"TEXTBOOK REF · P. 26",subtitle:"Compare the goals used to evaluate CPU scheduling algorithms.",kind:"criteria"},
  {id:"algorithms",number:"06",title:"Scheduling algorithms",type:"COMPARISON",source:"TEXTBOOK REF · PP. 27–30",subtitle:"Understand how common algorithms choose the next process.",kind:"algorithms"}
];
const conceptDetails = {
  New:["New","The process is being created. The operating system builds its initial process representation before admitting it to the ready queue."],
  Ready:["Ready","The process has everything it needs except CPU time. It waits in the ready queue until the scheduler selects it."],
  Running:["Running","The CPU is executing the process. A timer interrupt, blocking event or completion can move it to another state."],
  Waiting:["Waiting","The process cannot continue until an event occurs, commonly the completion of an I/O operation."],
  Terminated:["Terminated","The process has finished or has been stopped. The operating system can reclaim its resources."]
};
const questions = [
  {q:"Which scheduling algorithm can cause starvation when shorter jobs keep arriving?",a:["First Come, First Served","Shortest Job First","Round Robin","Multilevel Feedback Queue"],correct:1,why:"A long process can wait indefinitely if shorter jobs continue to arrive. This is the starvation risk associated with SJF.",topic:"Scheduling algorithms",source:"Textbook p. 27"},
  {q:"What does the ready state indicate?",a:["The process is executing on the CPU","The process is waiting for an I/O event","The process is waiting for CPU allocation","The process has completed"],correct:2,why:"A ready process can run, but it is waiting for the scheduler to allocate CPU time.",topic:"Process states",source:"Textbook p. 21"},
  {q:"What is the main purpose of a context switch?",a:["To change the CPU clock speed","To save one process context and restore another","To permanently terminate a process","To allocate disk space"],correct:1,why:"The operating system saves the currently running process state and restores the state of the next process.",topic:"Context switching",source:"Textbook p. 23"},
  {q:"Which metric measures the time from submission until completion?",a:["Waiting time","Response time","Turnaround time","Throughput"],correct:2,why:"Turnaround time is the total time from process arrival/submission to completion.",topic:"Scheduling criteria",source:"Textbook p. 26"}
];
let currentConcept = concepts[0];
let selectedAnswer = null;
let questionIndex = 0;
let score = 0;
let answered = false;
let library = loadLibrary();
let currentFilter = "all";
let anime = null;

function loadLibrary(){try{return JSON.parse(localStorage.getItem("conceptor-library")||"[]")}catch{return []}}
function persistLibrary(){localStorage.setItem("conceptor-library",JSON.stringify(library))}
function toast(message){const node=$("#toast");node.textContent=message;node.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>node.classList.remove("show"),2400)}
function animate(selector,options={}){if(!anime||!motionEnabled)return;try{anime.animate(selector,{opacity:[0,1],y:[8,0],duration:420,ease:"outCubic",delay:anime.stagger(45),...options})}catch{}}
import("animejs").then(module=>{anime=module;animate(".panel",{opacity:[0,1],y:[10,0],duration:420,delay:anime.stagger(45)})}).catch(()=>{});

function navigate(route){
  $$(".page-section").forEach(section=>section.hidden=section.id!==route+"Page");
  $$(".nav-item").forEach(button=>button.classList.toggle("active",button.dataset.route===route));
  $("#breadcrumbs").innerHTML=route==="library"?"Visual Library":route==="practice"?"Notes &amp; Quizzes":"My Chapters <span>/</span> Operating Systems";
  $("#sidebar").classList.remove("open");$("#mobileOverlay").classList.remove("show");
  if(route==="library")renderLibrary();
  if(route==="overview")renderOverview();
  animate("#"+route+"Page .panel",{opacity:[0,1],y:[12,0],duration:360,delay:anime?anime.stagger(35):0});
}
function renderConceptList(){
  $("#conceptList").innerHTML=concepts.map((c,i)=>'<button class="concept-row '+(c.id===currentConcept.id?"active":"")+'" data-concept="'+c.id+'"><span class="concept-number">'+c.number+'</span><span class="concept-name">'+c.title+'</span><span class="concept-status">'+(i<3?"✓":i===3?"•":"—")+'</span></button>').join("");
}
function renderConcept(id){
  currentConcept=concepts.find(c=>c.id===id)||concepts[0];
  $("#visualTitle").textContent=currentConcept.title;
  $("#visualSubtitle").textContent=currentConcept.subtitle;
  $("#visualType").textContent=currentConcept.type;
  $("#visualSource").textContent=currentConcept.source;
  $("#visualFootnote").textContent="Prepared example for demonstration. Check the original textbook section when using this material for study.";
  const canvas=$("#visualCanvas"),controls=$("#interactiveControls");
  controls.hidden=true;controls.innerHTML="";
  if(currentConcept.kind==="states")renderStates(canvas);
  if(currentConcept.kind==="pcb")renderPCB(canvas);
  if(currentConcept.kind==="context")renderContext(canvas,controls);
  if(currentConcept.kind==="schedule")renderSchedule(canvas,controls);
  if(currentConcept.kind==="criteria")renderCriteria(canvas);
  if(currentConcept.kind==="algorithms")renderAlgorithms(canvas);
  $("#detailTitle").textContent="Explore "+currentConcept.title.toLowerCase();
  $("#detailText").textContent="Select an element in the visual explanation to reveal a concise explanation and its learning context.";
  $("#saveCurrent").setAttribute("aria-pressed",String(library.some(item=>item.id===currentConcept.id)));
  $("#saveCurrent").innerHTML=library.some(item=>item.id===currentConcept.id)?"♥ <span>Saved</span>":"♡ <span>Save</span>";
  renderConceptList();
  animate("#visualCanvas > *",{opacity:[0,1],y:[8,0],duration:450,delay:anime?anime.stagger(70):0});
}
function renderStates(canvas){
  canvas.innerHTML='<div class="visual-orbit" aria-hidden="true"><i></i><i></i><i></i></div><div class="state-flow">'+
    stateNode("New","Created")+ '<span class="flow-arrow">→</span>'+
    stateNode("Ready","Waiting for CPU")+ '<span class="flow-arrow">→</span>'+
    stateNode("Running","On the CPU")+ '<span class="flow-arrow">→</span>'+
    stateNode("Terminated","Finished")+
    '</div><div class="state-waiting"><button class="state-node" data-state="Waiting"><strong>Waiting</strong><small>I/O or event</small></button><span class="flow-arrow">↗</span><small>Event complete returns process to Ready</small></div>';
}
function stateNode(name,caption){return '<button class="state-node" data-state="'+name+'"><strong>'+name+'</strong><small>'+caption+'</small></button>'}
function renderPCB(canvas){
  const fields=[["Process state","Current lifecycle state"],["Program counter","Address of the next instruction"],["CPU registers","Saved processor register values"],["Scheduling information","Priority and queue pointers"],["Memory information","Address-space and allocation details"],["I/O status","Open files and assigned devices"]];
  canvas.innerHTML='<div class="pcb-layout"><div class="pcb-core"><strong>PROCESS CONTROL BLOCK</strong><small>One record per process</small></div><div class="pcb-fields">'+fields.map((f,i)=>'<button class="pcb-field" data-field="'+i+'"><strong>'+f[0]+'</strong><small>'+f[1]+'</small></button>').join("")+'</div></div>';
  $$(".pcb-field",canvas).forEach((b,i)=>b.addEventListener("click",()=>{$("#detailTitle").textContent=fields[i][0];$("#detailText").textContent=fields[i][1]+". The PCB lets the operating system pause and later resume a process."}));
}
function renderContext(canvas,controls){
  const steps=[["Save context","Store the running process program counter, registers and state in its PCB."],["Select next process","The scheduler chooses a ready process to receive CPU time."],["Restore context","Load the selected process state and register values from its PCB."],["Resume execution","The CPU continues from the restored process instruction." ]];
  let step=0;
  controls.hidden=false;
  const draw=()=>{const [title,body]=steps[step];canvas.innerHTML='<div class="context-demo"><div class="cpu-box"><small>CPU</small><strong>'+(["P1","Scheduler","P2","P2"][step])+'</strong></div><div class="context-arrow">⇄</div><div class="pcb-stack"><div class="pcb-mini '+(step===0?"active":"")+'">PCB · P1</div><div class="pcb-mini '+(step>0?"active":"")+'">PCB · P2</div></div><div class="context-caption"><strong>Step '+(step+1)+' / 4 · '+title+'</strong><p>'+body+'</p></div></div>';
  controls.innerHTML='<div class="stepper"><button class="button button-secondary" id="previousStep" '+(step===0?"disabled":"")+'>← Previous</button><button class="button button-primary" id="nextStep">'+(step===3?"Replay":"Next step →")+'</button></div>';
  $("#previousStep",controls).addEventListener("click",()=>{step=Math.max(0,step-1);draw()});
  $("#nextStep",controls).addEventListener("click",()=>{step=step===3?0:step+1;draw();animate(".cpu-box,.pcb-mini",{scale:[.96,1],duration:360})});
  };
  draw();
}
function renderSchedule(canvas,controls){
  controls.hidden=false;
  controls.innerHTML='<div class="control-row"><label for="algorithm">Algorithm</label><select id="algorithm"><option value="fcfs">FCFS</option><option value="sjf">Shortest Job First</option><option value="rr">Round Robin</option></select><label for="quantum">Time quantum</label><input id="quantum" type="number" min="1" max="10" value="3" style="width:58px"></div><div class="control-row">'+[1,2,3].map((n)=>'<label>P'+n+' burst <input class="burst-input" data-p="'+n+'" type="number" min="1" max="12" value="'+[6,3,8][n-1]+'" style="width:55px"></label>').join("")+'</div>';
  const calculate=()=>{
    const jobs=[1,2,3].map(n=>({name:"P"+n,burst:Math.max(1,Math.min(12,Number($('.burst-input[data-p="'+n+'"]',controls).value)||1)),remaining:0,waiting:0,turnaround:0}));
    const quantum=Math.max(1,Math.min(10,Number($("#quantum",controls).value)||3));
    const algo=$("#algorithm",controls).value;
    let blocks=[],time=0;
    if(algo==="fcfs"||algo==="sjf"){
      const ordered=algo==="fcfs"?jobs:[...jobs].sort((a,b)=>a.burst-b.burst);
      ordered.forEach(job=>{blocks.push({name:job.name,start:time,end:time+job.burst});time+=job.burst;job.turnaround=time;job.waiting=job.turnaround-job.burst});
    }else{
      const queue=jobs.map(j=>({...j,remaining:j.burst}));
      while(queue.some(j=>j.remaining>0)&&blocks.length<100){
        queue.forEach(job=>{if(job.remaining<=0)return;const duration=Math.min(quantum,job.remaining);blocks.push({name:job.name,start:time,end:time+duration});time+=duration;job.remaining-=duration;if(job.remaining===0){job.turnaround=time;job.waiting=time-job.burst}});
      }
      jobs.forEach(j=>{const done=queue.find(q=>q.name===j.name);j.waiting=done.waiting;j.turnaround=done.turnaround});
    }
    const avgWait=jobs.reduce((s,j)=>s+j.waiting,0)/jobs.length;
    const avgTurn=jobs.reduce((s,j)=>s+j.turnaround,0)/jobs.length;
    const colors={P1:"#365ef5",P2:"#13b8a6",P3:"#8b72e8"};
    canvas.innerHTML='<div class="schedule-wrap"><div class="schedule-chart">'+blocks.map(b=>'<div class="schedule-block" style="flex:'+((b.end-b.start))+' 1 0;background:'+colors[b.name]+'"><strong>'+b.name+'</strong><small>'+b.start+'–'+b.end+'</small></div>').join("")+'</div><div class="timeline-labels"><span>0</span><span>'+time+' time units</span></div><div class="metrics-grid"><div class="metric"><small>Average waiting</small><strong>'+avgWait.toFixed(1)+'</strong></div><div class="metric"><small>Average turnaround</small><strong>'+avgTurn.toFixed(1)+'</strong></div><div class="metric"><small>CPU busy time</small><strong>100%</strong></div></div><p class="small-copy">Assumption: all processes arrive at time zero. The chart is a simplified teaching model.</p></div>';
    $("#detailTitle").textContent=algo==="fcfs"?"First Come, First Served":algo==="sjf"?"Shortest Job First":"Round Robin";
    $("#detailText").textContent=algo==="fcfs"?"Processes execute in their listed arrival order.":algo==="sjf"?"The shortest available CPU burst is selected first.":"Each ready process receives up to "+quantum+" time units before the scheduler moves to the next process.";
    animate(".schedule-block",{opacity:[0,1],scaleX:[.7,1],duration:400,delay:anime?anime.stagger(65):0});
  };
  controls.addEventListener("input",calculate);controls.addEventListener("change",calculate);calculate();
}
function renderCriteria(canvas){
  const items=[["CPU utilisation","Keep the processor busy."],["Throughput","Complete more processes per unit time."],["Turnaround time","Reduce total time from submission to completion."],["Waiting time","Reduce time spent in the ready queue."],["Response time","Reduce time until the first response." ]];
  canvas.innerHTML='<div class="criteria-grid">'+items.map((x,i)=>'<article class="criteria-card"><span>0'+(i+1)+'</span><strong>'+x[0]+'</strong><p>'+x[1]+'</p></article>').join("")+'</div>';
}
function renderAlgorithms(canvas){
  const items=[["FCFS","Arrival order","Simple, but a long job can delay short jobs."],["SJF","Shortest burst","Can reduce average waiting time, but risks starvation."],["Round Robin","Time quantum","Shares CPU time and supports responsive time-sharing."],["Priority","Priority rank","Important work can run earlier; low-priority work may starve."]];
  canvas.innerHTML='<div class="algorithm-grid">'+items.map(x=>'<article class="algorithm-card"><strong>'+x[0]+'</strong><span>'+x[1]+'</span><p>'+x[2]+'</p></article>').join("")+'</div>';
}
function saveCurrent(){
  const exists=library.some(x=>x.id===currentConcept.id);
  if(exists){library=library.filter(x=>x.id!==currentConcept.id);toast("Removed from your library")}
  else{library.unshift({id:currentConcept.id,title:currentConcept.title,type:currentConcept.type.toLowerCase().includes("interactive")?"interactive":"diagram",source:currentConcept.source,subtitle:currentConcept.subtitle,savedAt:new Date().toISOString()});toast("Saved to your learning library")}
  persistLibrary();renderConcept(currentConcept.id);updateCounts();renderLibrary();
}
function resourceCard(item){
  return '<article class="resource-card"><div class="resource-thumb"><div class="thumb-graph"><span class="thumb-node">'+(item.type==="interactive"?"P1 · P2 · P3":"Concept")+'</span><span class="thumb-bar" style="background:#365ef5;width:36px"></span><span class="thumb-node">'+(item.type==="interactive"?"Timeline":"Visual")+'</span></div></div><div class="resource-copy"><span class="resource-type">'+item.type.toUpperCase()+'</span><h3>'+escapeHtml(item.title)+'</h3><p>'+escapeHtml(item.subtitle||"Saved learning resource")+'</p><div class="resource-actions"><small>'+escapeHtml(item.source||"Conceptor library")+'</small><button class="text-button" data-open-resource="'+item.id+'">Open →</button></div></div></article>';
}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function renderLibrary(){
  const query=($("#resourceSearch")?.value||"").toLowerCase();
  const items=library.filter(item=>(currentFilter==="all"||item.type===currentFilter)&&(item.title+" "+item.subtitle+" "+item.source).toLowerCase().includes(query));
  $("#resourceGrid").innerHTML=items.map(resourceCard).join("");
  $("#libraryEmpty").hidden=items.length>0;
  $("#libraryCount").textContent=library.length+" saved resources";
  updateCounts();
}
function renderOverview(){$("#savedCountOverview").textContent=library.length;$("#overviewResources").innerHTML=library.slice(0,3).map(resourceCard).join("")||'<div class="panel empty-state"><p>Save a visual explanation to see it here.</p></div>'}
function updateCounts(){$("#savedCountOverview").textContent=library.length;$("#outlineSavedCount").textContent=library.length+" resources saved"}
function openResource(id){const item=library.find(x=>x.id===id);if(!item)return;const concept=concepts.find(x=>x.id===id);if(concept){navigate("chapters");renderConcept(id)}else{toast("This saved resource is a sample card.")}}
function renderNotes(format="short"){
  const content={
    short:["CPU Scheduling — Quick revision","CPU scheduling selects a ready process for execution. Key goals include CPU utilisation, throughput, turnaround time, waiting time and response time.","FCFS follows arrival order. SJF selects the shortest available burst. Round Robin allocates a fixed time quantum."],
    detailed:["CPU Scheduling — Detailed notes","The short-term scheduler selects one process from the ready queue and allocates the CPU. Different algorithms balance throughput, fairness and response time.","FCFS is non-preemptive and follows arrival order. SJF selects the smallest next CPU burst. Round Robin is preemptive and cycles through ready processes using a time quantum."],
    exam:["CPU Scheduling — Exam-ready answer","CPU scheduling is the process of selecting a ready process for CPU execution. Its objectives include high CPU utilisation and throughput, and low waiting, turnaround and response time.","Common algorithms: FCFS (arrival order), SJF (shortest CPU burst), and Round Robin (fixed time quantum)."]
  }[format];
  $("#notesView").innerHTML='<div class="panel note-formats"><button class="note-format '+(format==="short"?"active":"")+'" data-note-format="short">Quick revision</button><button class="note-format '+(format==="detailed"?"active":"")+'" data-note-format="detailed">Detailed notes</button><button class="note-format '+(format==="exam"?"active":"")+'" data-note-format="exam">Exam-ready</button></div><article class="panel note-content"><span class="chip chip-mint">PREPARED SAMPLE · P. 25–28</span><h2>'+content[0]+'</h2><p>'+content[1]+'</p><h3>Key points</h3><p>'+content[2]+'</p><h3>Check the source</h3><p>Compare these notes with the original textbook section before using them for an assessment.</p><button class="button button-primary" id="saveNotes">Save these notes</button></article>';
  $$(".note-format").forEach(b=>b.addEventListener("click",()=>renderNotes(b.dataset.noteFormat)));
  $("#saveNotes").addEventListener("click",()=>{if(!library.some(x=>x.id==="notes-"+format)){library.unshift({id:"notes-"+format,title:content[0],type:"notes",source:"Textbook pp. 25–28",subtitle:"Prepared sample notes"});persistLibrary();updateCounts();toast("Notes saved to your library")}else toast("These notes are already saved")});
}
function renderQuestion(){
  const q=questions[questionIndex];selectedAnswer=null;answered=false;
  $("#questionCount").textContent="QUESTION "+(questionIndex+1)+" OF "+questions.length;
  $("#quizPercent").textContent=Math.round((questionIndex+1)/questions.length*100)+"%";
  $("#quizProgressFill").style.width=((questionIndex+1)/questions.length*100)+"%";
  $("#questionText").textContent=q.q;$("#questionHint").textContent="Choose the best answer. Feedback links to the relevant chapter section.";
  $("#answerList").innerHTML=q.a.map((answer,i)=>'<button class="answer-option" data-answer="'+i+'"><span class="answer-key">'+String.fromCharCode(65+i)+'</span><span>'+answer+'</span></button>').join("");
  $("#feedbackBox").hidden=true;$("#nextQuestion").hidden=true;$("#submitAnswer").hidden=false;$("#submitAnswer").disabled=true;
  $$(".answer-option").forEach(b=>b.addEventListener("click",()=>{if(answered)return;selectedAnswer=Number(b.dataset.answer);$$(".answer-option").forEach(x=>x.classList.toggle("selected",x===b));$("#submitAnswer").disabled=false}));
}
function submitAnswer(){
  if(selectedAnswer===null||answered)return;
  answered=true;const q=questions[questionIndex],correct=selectedAnswer===q.correct;
  if(correct)score++;
  $$(".answer-option").forEach((b,i)=>{b.disabled=true;if(i===q.correct)b.classList.add("correct");else if(i===selectedAnswer)b.classList.add("wrong")});
  const fb=$("#feedbackBox");fb.hidden=false;fb.classList.toggle("wrong",!correct);
  fb.innerHTML='<strong>'+(correct?"Correct — well done.":"Not quite — review this concept.")+'</strong><p>'+q.why+'<br><strong>Source:</strong> '+q.source+'</p>';
  $("#submitAnswer").hidden=true;$("#nextQuestion").hidden=false;$("#nextQuestion").textContent=questionIndex===questions.length-1?"See results →":"Next question →";
  $("#scoreCircle").textContent=Math.round(score/(questionIndex+1)*100)+"%";$("#scoreLabel").textContent=score+" correct so far";
  renderWeakness();
}
function renderWeakness(){
  const missed=questions.slice(0,questionIndex+1).filter((q,i)=>answers[i]===false);
  $("#weaknessList").innerHTML=missed.length?missed.map(q=>'<div class="weakness-item"><span class="weak-dot red-dot"></span><div><strong>'+q.topic+'</strong><small>Review suggested · '+q.source+'</small></div></div>').join(""):'<div class="weakness-item"><span class="weak-dot amber-dot"></span><div><strong>Keep practising</strong><small>Complete the quiz to see review suggestions.</small></div></div>';
}
let answers=[];
function nextQuestion(){
  if(questionIndex===questions.length-1){$("#questionText").textContent="Practice complete";$("#questionHint").textContent="You scored "+score+" out of "+questions.length+". Review any missed concepts and retry the session.";$("#answerList").innerHTML="";$("#nextQuestion").hidden=true;$("#submitAnswer").hidden=false;$("#submitAnswer").disabled=true;$("#submitAnswer").textContent="Restart quiz";$("#quizProgressFill").style.width="100%";$("#quizPercent").textContent="100%";return}
  questionIndex++;renderQuestion();
}
function restartQuiz(){questionIndex=0;score=0;answers=[];$("#submitAnswer").textContent="Check answer";$("#scoreCircle").textContent="—";$("#scoreLabel").textContent="Not started";renderWeakness();renderQuestion()}
document.addEventListener("click",event=>{
  const route=event.target.closest("[data-route]");if(route){navigate(route.dataset.route);return}
  const concept=event.target.closest("[data-concept]");if(concept){renderConcept(concept.dataset.concept);return}
  const state=event.target.closest("[data-state]");if(state){const d=conceptDetails[state.dataset.state];$("#detailTitle").textContent=d[0];$("#detailText").textContent=d[1];$$(".state-node").forEach(n=>n.classList.toggle("selected",n===state));return}
  const filter=event.target.closest("[data-filter]");if(filter){currentFilter=filter.dataset.filter;$$(".filter-chip").forEach(b=>b.classList.toggle("selected",b===filter));renderLibrary();return}
  const open=event.target.closest("[data-open-resource]");if(open){openResource(open.dataset.openResource);return}
  const note=event.target.closest("[data-note-format]");if(note){renderNotes(note.dataset.noteFormat);return}
  const practice=event.target.closest("[data-practice]");if(practice){const notes=practice.dataset.practice==="notes";$("#notesView").hidden=!notes;$("#quizView").hidden=notes;$$(".practice-tab").forEach(b=>b.classList.toggle("active",b===practice));if(notes)renderNotes();return}
  const nav=event.target.closest("[data-toast]");if(nav){toast(nav.dataset.toast);return}
});
$("#saveCurrent").addEventListener("click",saveCurrent);
$("#uploadChapter").addEventListener("click",()=>$("#chapterFile").click());
$("#chapterFile").addEventListener("change",event=>{if(event.target.files?.length)toast("PDF upload is a visual prototype only; sample chapter remains active.")});
$("#resourceSearch").addEventListener("input",renderLibrary);
$("#globalSearch").addEventListener("input",event=>{const q=event.target.value.trim();if(q){navigate("library");$("#resourceSearch").value=q;renderLibrary()}});
$("#mobileMenu").addEventListener("click",()=>{$("#sidebar").classList.toggle("open");$("#mobileOverlay").classList.toggle("show")});
$("#mobileOverlay").addEventListener("click",()=>{$("#sidebar").classList.remove("open");$("#mobileOverlay").classList.remove("show")});
function updateMotionToggle(){const button=$("#motionToggle");button.setAttribute("aria-pressed",String(motionEnabled));button.innerHTML='<span aria-hidden="true">'+(motionEnabled?"✦":"○")+'</span> Motion '+(motionEnabled?"on":"off")}
$("#motionToggle").addEventListener("click",()=>{motionEnabled=!motionEnabled;localStorage.setItem(motionPreference,motionEnabled?"on":"off");document.documentElement.dataset.motion=motionEnabled?"on":"off";updateMotionToggle();toast(motionEnabled?"Motion enabled":"Motion paused")});
motionQuery.addEventListener("change",event=>{if(event.matches){motionEnabled=false;document.documentElement.dataset.motion="off";updateMotionToggle()}});
$("#submitAnswer").addEventListener("click",()=>{if($("#submitAnswer").textContent==="Restart quiz"){restartQuiz();return}const before=score;submitAnswer();answers[questionIndex]=score>before});
$("#nextQuestion").addEventListener("click",nextQuestion);
$("#reviewWeak").addEventListener("click",()=>{const missed=questions.slice(0,questionIndex+1).filter((q,i)=>answers[i]===false);if(missed.length){const target=concepts.find(c=>c.title.toLowerCase().includes(missed[0].topic.split(" ")[0].toLowerCase()))||concepts[3];navigate("chapters");renderConcept(target.id)}else toast("Complete a few questions to build a revision path.")});
renderConcept("states");renderQuestion();renderLibrary();updateCounts();updateMotionToggle();
