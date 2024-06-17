<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Home</title>
  <link rel="stylesheet" href="./css/general.css">
  <link rel="stylesheet" href="./css/index.css">
  <script src="./js/index.js" defer></script>
  <script src="./js/d3_local.js" defer></script>
</head>
<body>
<?php require_once "./header.php"; ?>


<div id="container">
  <div id="left">
    <div id="time_line">
      <div id="task_time_line"></div>
    </div>
    <div id="list">
      <div id="task_list"></div>
    </div>
  </div>
  <div id="right">
    <div id="graphs"></div>
    <div id="history">
      <svg id="history_svg"></svg>
    </div>
    <div id="task_notes">
      <textarea id="task_text" name="task_text" placeholder="task notes..."></textarea>
    </div>
    <div id="daily_notes">
      <textarea id="daily_text" name="daily_text" placeholder="daily notes..."></textarea>
    </div>
  </div>
</div>
  
</body>
</html>
