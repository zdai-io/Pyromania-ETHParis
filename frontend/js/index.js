

$(document).ready(function() {
  shitTokens.forEach(function (item) {
    $('#slcBurnToken').append($('<option value="'+
        item.address+'">'+
        item.tiker+'</option>'
    ));
  });
})

function Unlock(){
  try {
    var tokenAddress= $('#slcBurnToken').val();
    var tokenAmount = $('#iptBurnToken').val();

  } catch (err) { alert(err.message);  }
}

function UpdateResultAmount(amount) {
    $('#iptResToken').val(amount);
}

function Burn() {
  try {
    var tokenAddress= $('#iptResToken').val();

  } catch (err) { alert(err.message);  }
}

function UpdateListOfBurned(){

}
