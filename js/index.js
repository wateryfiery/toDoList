var tasks = {};

function addWord() {
  console.log("--addWord");
  const word = document.getElementById("word_input").value;
  const description = document.getElementById("description_input").value;
  if (word === "" || description === "") {
    return;
  }
  let data = { word: word, description: description }
  data = "data="+JSON.stringify(data);
  let request = new XMLHttpRequest();
  request.open("POST", "./operations/mp/add_word.php", true);
  request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  request.onreadystatechange = function() {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        console.log("done");
        getVersesAndWords();
      } else {
        console.error(request);
      }
    }

  }
  request.send(data);
  //updateWordAndVerses();
}
function getVersesAndWords() {
  let request = new XMLHttpRequest();
  request.open("GET", "./db_json/mp.json");
  request.send();
  request.onload = function() {

    response = JSON.parse(request.responseText);
    words = response["words"];
    verses = response["verses"];

    fillInVerses()
  }
}

function getTasks() {
  let request = new XMLHttpRequest();
  request.open("GET", "./getTasks.php", true);
  request.send();
  request.onload = function() {
    response = JSON.parse(request.responseText);
    tasks = response["tasks"];
    showTasks();
  }
}
getTasks();


function showTasks() {
  //console.log(tasks);
  const size = document.getElementById("time_line").getBoundingClientRect();
  document.getElementById("task_time_line").style.maxWidth = size.width +"px";

  const size1 = document.getElementById("list").getBoundingClientRect();
  document.getElementById("task_list").style.maxHeight = size1.height +"px";

  for (let i = 0; i < 100; i++) {
  for (const [task, data] of Object.entries(tasks)) {
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    div.innerHTML = task;
    div2.innerHTML = task;

    div.name = task;
    div2.name = task;

    div2.addEventListener("click", function() {
      taskFocus(task);
    });
    document.getElementById("task_list").appendChild(div2);
    document.getElementById("task_time_line").appendChild(div);
  }
  }
}

function taskFocus(name) {
  console.log(name);

  const data = [];
  for (const [key, value] of Object.entries(tasks[name]["history"]["attended"])) {
    const new_value = {
      date: key,
      quantity: value["quantity"]
    };
    data.push(new_value);
  }

  updateHistory(data);
}

function updateHistory(data) {
  console.log(data);
  //return;
  // Sample data (replace with your actual data)
  /*
  data = [
    { date: '2024-01-01', quantity: 5 },
    { date: '2024-02-01', quantity: 10 },
    { date: '2024-03-01', quantity: 8 },
    { date: '2024-04-01', quantity: 15 },
    { date: '2024-05-01', quantity: 12 }
  ];
  */

  // Parse the date/time
  const parseDate = d3.timeParse('%Y-%m-%d %H:%M:%S');

  // Set up margins and dimensions for the graph
  //const margin = { top: 20, right: 30, bottom: 30, left: 50 };
  const margin = { top: 10, right: 10, bottom: 20, left: 20 };

  const size = document.getElementById("history").getBoundingClientRect();
  console.log(size);
  const width = size.width - margin.left - margin.right;
  const height = size.height - margin.top - margin.bottom;
  //const width = 200 - margin.left - margin.right;
  //const height = 200 - margin.top - margin.bottom;


  // Create scales
  const x = d3.scaleTime()
    .domain(d3.extent(data, d => parseDate(d.date)))
    .range([margin.left, width - margin.right]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.quantity)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  // Create line generator
  const line = d3.line()
    .x(d => x(parseDate(d.date)))
    .y(d => y(d.quantity));

  // Create SVG element
  const svg = d3.select('#history_svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  // Add X axis
  svg.append('g')
    .attr('transform', `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  // Add Y axis
  svg.append('g')
    .attr('transform', `translate(${margin.left},0)`)
    .call(d3.axisLeft(y));

  // Add the line
  svg.append('path')
    .datum(data)
    .attr('class', 'line')
    .attr('d', line)
    .attr("fill", "none")
    .attr("stroke", "white");


}
