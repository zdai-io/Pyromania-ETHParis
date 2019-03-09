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
