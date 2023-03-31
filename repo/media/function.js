$(document).ready(function(){

  $('input').attr('disabled', 'disabled');
  $('select').attr('disabled', 'disabled');
  $('#spreadSheet').append('<h1 style="text-align: center;">If you are seeing this message contact <a href="mailto:michael.dohse@imaginelearning.com">michael.dohse@imaginelearning.com</a></h1>');

  var item;
  if ($('#searchType').val() == 'course_code'){
    $('#repocheck').show();
  }else if ($('#searchType').val() == 'ctr'){
    $('#listrepos').show();
  }else if ($('#searchType').val() == 'all'){
    $('#listretired').show();
  }else{
    $('#repocheck').hide();
    $('#listrepos').hide();
    $('#listretired').hide();
  }


  var retireCourse = function(data){
    var isRetired;
    for (var re in retire){
      if (retire[re] == data) {
        isRetired = true;
        break;
      }else{isRetired = false;}
    }
    return isRetired;
  };


  var courseToRepoCompare = function(cc){
    if (cc === ''){
      cc = null;
    }

    if ($('#repolist').prop('checked')) {
      //finds the course code
      var repos;
      var row = 0;
      var uuid = [];
      for (var z in course_data){
        uuid.push(z);
      }

      for (multi = 0; multi < uuid.length; multi++){
        var repoCC = [];
        var unique  = [];
        var assignments = [];
        //finds all assignments that belong to the course code
        for (a = 0; a < assignment_data.length; a++){
          for (b = 0; b < assignment_data[a].length; b++){
            if (assignment_data[a][3] == uuid[multi]){
              assignments.push(assignment_data[a]);
              b = assignment_data[a].length;
            }
          }
        }

        //gets all repo course codes that belong to the assignments and puts them into seperate array
        for (a = 0; a < assignments.length; a++){
          repos = assignments[a][2];
          repos = repos.split(',');
          for (b = 0; b < repos.length; b++){
            repoCC.push(repos[b]);
          }
        }

        //dedups the array to only allow a single instance of each repo course code.
        for (a = 0; a < repoCC.length; a++){
          if(unique.indexOf(repoCC[a]) == -1){
            unique.push(repoCC[a]);
          }
        }

        //creates the output
        if (unique.length > 0) {
          //code
          $('#data-table').append('<tr id="' + (row+1) + '"></tr>');
          if (retireCourse(course_data[uuid[multi]])) {
            $('#' + (row+1)).append('<td class="retired">' + course_data[uuid[multi]] + '</td>');
          }else{
            $('#' + (row+1)).append('<td>' + course_data[uuid[multi]] + '</td>');
          }
          unique = retiredRepo(unique);
          $('#' + (row+1)).append('<td>' + unique.join('<br/>') + '</td>');
          row += 1;
        }
      }
    }else{
      var repos;
      var row = 0;
      var repoCC = [];
      var unique  = [];
      var uuid;
      var assignments = [];

      //finds the course code
      for (var z in course_data){
        if (course_data[z] == cc){
          uuid = z;
          break;
        }
      }
      //finds all assignments that belong to the course code
      for (a = 0; a < assignment_data.length; a++){
        for (b = 0; b < assignment_data[a].length; b++){
          if (assignment_data[a][3] == uuid){
            assignments.push(assignment_data[a]);
            b = assignment_data[a].length;
          }
        }
      }
      //gets all repo course codes that belong to the assignments and puts them into seperate array
      for (a = 0; a < assignments.length; a++){
        repos = assignments[a][2];
        repos = repos.split(',');
        for (b = 0; b < repos.length; b++){
          repoCC.push(repos[b]);
        }
      }
      //dedups the array to only allow a single instance of each repo course code.
      for (a = 0; a < repoCC.length; a++){
        if(unique.indexOf(repoCC[a]) == -1){
          unique.push(repoCC[a]);
        }
      }
      //creates the output
      if (cc != null && unique.length > 0) {
        //code
        $('#data-table').append('<tr id="' + (row+1) + '"></tr>');
        if (retireCourse(cc)) {
          $('#' + (row+1)).append('<td class="retired">' + cc + '</td>');
        }else{
          $('#' + (row+1)).append('<td>' + cc + '</td>');
        }
        unique = retiredRepo(unique);
        $('#1').append('<td>' + unique.join('<br/>') + '</td>');
      }
      if (cc === null || unique.length === 0){
        $('#spreadSheet').append('<p id="error">no search results found.</p>');
      }
    }
  };
  var ALL = function(){
    var repos;
    for (a = 0; a < assignment_data.length; a++){
      $('#data-table').append('<tr id="' + (a+1) + '"></tr>');
      for (b = 0; b < assignment_data[a].length; b++){
        if (b === 3){
          repos = assignment_data[a][b-1];
          repos = repos.split(',');
          repos = retiredRepo(repos);
          $('#' + (a+1)).append('<td>' + repos.join('<br/>') + '</td>');
        }else if (b === 0){
          if (retireCourse(course_data[assignment_data[a][3]])) {
            $('#' + (a+1)).append('<td class="retired">' + course_data[assignment_data[a][3]] + '</td>');
          }else{
            $('#' + (a+1)).append('<td>' + course_data[assignment_data[a][3]] + '</td>');
          }
          
        }else{
          $('#' + (a+1)).append('<td>' + assignment_data[a][b-1] + '</td>');
        }
      }
    }
  };
  
  var RETIRED = function(){
    var coursesForChecking = [];
    for (co in course_data){
      coursesForChecking.push(co);
    }
    for (a = 0; a < coursesForChecking.length; a++){
      if (retireCourse(course_data[coursesForChecking[a]])) {
        var repo;
        var repoCC = [];
        var unique = [];
        $('#data-table').append('<tr id="' + (a+1) + '"></tr>');
        $('#' + (a+1)).append('<td class="retired">' + course_data[coursesForChecking[a]] + '</td>');
        for (rep = 0; rep < assignment_data.length; rep++){
          if (coursesForChecking[a] == assignment_data[rep][3]) {
            repo = assignment_data[rep][2];
            repo = repo.split(',');
            for (repAdd = 0; repAdd < repo.length; repAdd++) {
              repoCC.push(repo[repAdd]);
            }
          }
        }
        for (z in repoCC){
          if(unique.indexOf(repoCC[z]) == -1){
            unique.push(repoCC[z]);
          }
        }
        $('#' + (a+1)).append('<td>' + unique.join('<br/>') + '</td>');
      }
    }
  };
  var retiredRepo = function(courses){
    for (x in courses){
      if (retireCourse(courses[x])) {
        //repos.splice(a, 1, "<span class=\"retired\">" + repos[x] + "</span>");
        courses[x] = "<span class=\"retired\">" + courses[x] + "</span>";
      }
    }
    return courses;
  }
  var searchCourse = function(cc){
    var repoCheck = $('#allrepos').prop('checked');
    var repos;
    var uuid;
    var courses = [];
    var row = 0;
    cc = cc.split(',');
    for (multi = 0; multi < cc.length; multi++){
      for (var z in course_data){
        if (course_data[z] == cc[multi]){
          uuid = z;
          break;
        }
      }
      for (a = 0; a < assignment_data.length; a++){
        for (b = 0; b < assignment_data[a].length; b++){
          if (assignment_data[a][3] == uuid){
            courses.push(assignment_data[a]);
            b = assignment_data[a].length;
          }
        }
      }
      if (repoCheck) {  //THis is only a test for the moment.
        for (a = 0; a < courses.length; a++){
          repos = courses[a][2];
          repos = repos.split(',');
          var test = [];
          test.push(courses[a][0]);
          test.push(courses[a][1]);
          test.push(course_data[courses[a][3]]);
          for (b = 0; b < repos.length; b++){
            $('#data-table').append('<tr id="' + (row+1) + '"></tr>');
            if (retireCourse(repos[b])) {
              $('#' + (row+1)).append('<td class="retired">' + repos[b] + '</td>');
            }else{
              $('#' + (row+1)).append('<td>' + repos[b] + '</td>'); //where repo course is, need if retired
            }
            $('#' + (row+1)).append('<td>' + test[0] + '</td>');
            $('#' + (row+1)).append('<td>' + test[1] + '</td>');
            if (retireCourse(test[2])) {
              $('#' + (row+1)).append('<td class="retired">' + test[2] + '</td>');
            }else{
              $('#' + (row+1)).append('<td>' + test[2] + '</td>');
            }
            row += 1;
          }
        }
      }else{
        for (a = 0; a < courses.length; a++){
          $('#data-table').append('<tr id="' + (row+1) + '"></tr>');
          for (b = 0; b < courses[a].length; b++){
            if (b === 3){
              repos = courses[a][b-1];
              repos = repos.split(',');
              repos = retiredRepo(repos);
              $('#' + (row+1)).append('<td>' + repos.join('<br/>') + '</td>');
            }else if (b === 0){
              if (retireCourse(course_data[courses[a][3]])) {
                $('#' + (row+1)).append('<td class="retired">' + course_data[courses[a][3]] + '</td>');
              }else{
                $('#' + (row+1)).append('<td>' + course_data[courses[a][3]] + '</td>');
              }
            }else{
              $('#' + (row+1)).append('<td>' + courses[a][b-1] + '</td>');
            }
          }
          row += 1;
        }
      }
      }
    if (courses.length === 0){
      $('#spreadSheet').append('<p id="error">no search results found.</p>');
    }
  };
  var searchAssignmentUUID = function(ass){
    var repos;
    var assignments = [];
    ass = ass.split(',');
    for (multi = 0; multi < ass.length; multi++){
      for (a = 0; a < assignment_data.length; a++){
        for (b = 0; b < assignment_data[a].length; b++){
          if (assignment_data[a][0] == ass[multi]){
            assignments.push(assignment_data[a]);
            b = assignment_data[a].length;
          }
        }
      }
    }
    for (a = 0; a < assignments.length; a++){
      $('#data-table').append('<tr id="' + (a+1) + '"></tr>');
      for (b = 0; b < assignments[a].length; b++){
        if (b === 3){
          repos = assignments[a][b-1];
          repos = repos.split(',');
          repos = retiredRepo(repos);
          $('#' + (a+1)).append('<td>' + repos.join('<br/>') + '</td>');
        }else if (b === 0){
          if (retireCourse(course_data[assignments[a][3]])) {
            $('#' + (a+1)).append('<td class="retired">' + course_data[assignments[a][3]] + '</td>');
          }else{
            $('#' + (a+1)).append('<td>' + course_data[assignments[a][3]] + '</td>');
          }
        }else{
          $('#' + (a+1)).append('<td>' + assignments[a][b-1] + '</td>');
        }
      }
    }
    if (assignments.length === 0){
      $('#spreadSheet').append('<p id="error">no search results found.</p>');
    }
  };
  var searchRepoCourseCode = function(rep){
    var repos;
    var expres = new RegExp("\\W" + rep + "\\W");
    var reporefs = [];
    if (rep === '') {
      rep = null;
    }
    for (a = 0; a < assignment_data.length; a++){
      for (b = 0; b < assignment_data[a].length; b++){
        if (assignment_data[a][2].search(expres) != -1){
          reporefs.push(assignment_data[a]);
          b = assignment_data[a].length;
        }
      }
    }
    for (a = 0; a < reporefs.length; a++){
      $('#data-table').append('<tr id="' + (a+1) + '"></tr>');
      for (b = 0; b < reporefs[a].length; b++){
        if (b === 3){
          repos = reporefs[a][b-1];
          repos = repos.split(',');
          repos = retiredRepo(repos);
          $('#' + (a+1)).append('<td>' + repos.join('<br/>') + '</td>');
        }else if (b === 0){
          if (retireCourse(course_data[reporefs[a][3]])) {
            $('#' + (a+1)).append('<td class="retired">' + course_data[reporefs[a][3]] + '</td>');
          }else{
            $('#' + (a+1)).append('<td>' + course_data[reporefs[a][3]] + '</td>');
          }
        }else{
          $('#' + (a+1)).append('<td>' + reporefs[a][b-1] + '</td>');
        }
      }
    }
    if (reporefs.length === 0){
      $('#spreadSheet').append('<p id="error">no search results found.</p>');
    }
  };
  var headers = function(){
    var repoCheck = $('#allrepos').prop('checked');
    var type = $('#searchType').val();
    if (repoCheck && type == 'course_code'){
      $('#data-table').append('<tr> <th>Repo Course</th> <th>Assignment UUID</th> <th>Assignment Title</th> <th>Course Code</th> </tr>');
    }else if (type == 'ctr' || (type == 'all' && $('#retiredList').prop('checked'))){
      $('#data-table').append('<tr> <th>Parent Course</th> <th>Repo Course(s)</th></tr>');
    }else{
      $('#data-table').append('<tr> <th>Course Code</th> <th>Assignment UUID</th> <th>Assignment Title</th> <th>Repo Course(s)</th> </tr>');
    }
  };
  var input = document.getElementById('searchData');
  input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      //event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("submit").click();
    }
  });
  $('option').click(function(){
    if ($('#searchType').val() == 'course_code'){
      $('#repocheck').show();
      $('#listrepos').hide();
      $('#listretired').hide();
    }else if ($('#searchType').val() == 'ctr'){
      $('#listrepos').show();
      $('#repocheck').hide();
      $('#listretired').hide();
    }else if ($('#searchType').val() == 'all'){
      $('#listrepos').hide();
      $('#repocheck').hide();
      $('#listretired').show();
    }else{
      $('#repocheck').hide();
      $('#listrepos').hide();
      $('#listretired').hide();
    }
  });
  $('#submit').click(function(){
    $('#data-table').empty();
    $('#error').remove();
    var type = $('#searchType').val();
    var data = $('#searchData').val();
    headers();
    switch (type) {
      case 'all':
        if ($('#retiredList').prop('checked')) {
          RETIRED();
        }else{
          ALL();
        };
        break;
      case 'course_code':
        searchCourse(data);
        break;
      case 'assignment_uuid':
        searchAssignmentUUID(data);
        break;
      case 'repo_cc':
        searchRepoCourseCode(data);
        break;
      case 'ctr':
        courseToRepoCompare(data);
        break;
    }
    $('.retired').hover(function(){
      $(this).append('<span class="popup">This course is retired.</span>');
    });
    $('.retired').mouseleave(function(){
      $('.popup').remove();
    });
  });


});