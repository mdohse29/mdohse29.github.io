<html>
<head>
   <meta charset="utf-8"/>
   	<script type="text/javascript">
		window.location.href = "construction.html";
	</script>
  <script src="pickerScript.js">
  </script>
   <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

  <style>
    #text{
      text-align: center;
      font-size: 36px;
      color: red;
    }
    #results{
      border: solid 5px;
    }
  </style>
  <title>Gift Picker</title>
</head>
<body>
  <h1>Gift Picker</h1>
  <div>
    <input type="text" id="name" placeholder="Name of Gift Giver"/>
    <button id="submit" onclick="chooseName()" type="button">Submit</button>
    <button id="reset" type="button" onclick="reset()">Reset</button>
  </div>
  <div id="display">
    
  </div>
  <div id="results">
    <table id="resultTBL">

    </table>
  </div>
</body>
</html>
