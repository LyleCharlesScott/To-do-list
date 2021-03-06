'use strict';

if (localStorage.Tasklist) {
  var Tasklist = JSON.parse(localStorage.Tasklist);
} else {
  Tasklist = {
    list: []
  };
}

var Item = function (task) {
 this.task = task;
 this.flag = false;
};

var flag = function(index) {
  $('#flag-button' + index).on({'click': function() {
    if (Tasklist.list[index].flag === false) {
      Tasklist.list[index].flag = true;
      $('#item' + index).css('background-color', '#D3D9EE').css('color', '#75AEA7').css('font-weight', 'bold');
      $('#box' + index).css('background-color', '#D3D9EE');
      $('#save' + index).css('background-color', '#C79DB4').css('border', '5px solid #F9FDEF');
      $('#flag' + index).css('visibility', 'visible');
    } else {
      $('#item' + index).css('background-color', '#75AEA7').css('color', '#F9FDEF').css('font-weight', 'normal');
      $('#box' + index).css('background-color', '#75AEA7');
      $('#save' + index).css('background-color', '#C79DB4').css('border', '5px solid #F9FDEF');
      $('#flag' + index).css('visibility', 'hidden');
      Tasklist.list[index].flag = false;
    }
  }});
};

var save = function(index) {
  $('#save' + index).on({'click': function() {
    $.each(Tasklist.list, function (j) {
      Tasklist.list[j].task = ($('#item' + j).val());
    });
    listTasks();
  }});
};

var store = function() {
    var session = JSON.stringify(Tasklist);
    localStorage.Tasklist = session;
};

var deleteTask = function(index) {
  $('#delete' + index).on({'click': function() {
    Tasklist.list.splice(index, 1);
    $.each(Tasklist.list, function (j) {
      Tasklist.list[j].task = ($('#item' + j).val());
    });
    store();
    listTasks();
  }});
};

var fadeButton = function(button, index) {
  $(button + index).css({opacity: 0.5});
  $(button + index).mouseenter(function() {
    $(button + index).fadeTo('slow', 1);
  });
  $(button + index).mouseleave(function() {
    $(button + index).fadeTo('slow', 0.5);
  });
};

var listTasks = function() {
  $('#tasks').empty();
  $.each(Tasklist.list, function(i) {
    $('#tasks').prepend('<div class=\"to-do-item\" id=\"box' + i + '\"><textarea id=\"item' + i + '\">' + Tasklist.list[i].task + '</textarea><button type=\"button\" id=\"save' + i + '\">SAVE</button><button type=\"button\" id=\"flag-button' + i + '\">FLAG</button><button type=\"button\" id=\"delete' + i + '\">DELETE</button><image id=\"flag' + i + '\"class=\"flag\"src=img/flag.png/></div>');
      if (Tasklist.list[i].flag) {
        $('#item' + i).css('background-color', '#D3D9EE').css('color', '#75AEA7').css('font-weight', 'bold');
        $('#box' + i).css('background-color', '#D3D9EE');
        $('#flag' + i).css('visibility', 'visible');
      }
      $('#item' + i).change(function() {
        if (Tasklist.list[i].flag === false) {
          $('#item' + i).css('color', '#D3D9EE');
        }
        $('#save' + i).css('background-color', '#C79DB4').css('border', '5px solid #F9FDEF');
        $('#flag' + i).css('visibility', 'hidden');
      });
      $('#new-task').change(function() {
        $('#submit-task').css('color', '#D3D9EE').css('background-color', '#C79DB4').css('border', '5px solid #F9FDEF');
      });
      fadeButton('#save', i);
      fadeButton('#flag-button', i);
      fadeButton('#delete', i);
      save(i);
      flag(i);
      deleteTask(i);
      store();
      $('#box' + i).slideDown('fast', function () {
      });
  });
};

if (localStorage.Tasklist) {
  Tasklist = JSON.parse(localStorage.Tasklist);
  listTasks();
}

$('#submit-task').on({'click': function() {
  $('#submit-task').css('color', '#75AEA7').css('background-color', '#BEF2DC').css('border', '1px solid #F9FDEF');
  $.each(Tasklist.list, function (j) {
    Tasklist.list[j].task = ($('#item' + j).val());
  });
  store();
  if ($('#new-task').val() !== '') {
    var input = new Item($('#new-task').val());
    Tasklist.list.push(input);
    $('#new-task').val('');
    listTasks();
  }
}});

fadeButton('#submit-task', '');
$('#new-task').focus();
