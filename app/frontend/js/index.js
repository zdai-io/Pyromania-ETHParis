$(document).ready(function() {


  UpdateListOfBurned();
  UpdateFreeSlots(100);
});

// (async () => {
//   const accounts = await web3.eth.getAccounts();
//   const netid = await web3.eth.net.getId();

//ABI
//   const furanceData = JSON.parse(fs.readFileSync("eth/contracts/Furance.json", "utf8"));
//   const fuelData = JSON.parse(fs.readFileSync("eth/contracts/FuelToken.json", "utf8"));

//
//   async function isUnlocked(token, owner, spender) {
//     const allowance = await token.methods.allowance(owner, spender).call();
//     return toBN(allowance).gte(toBN("57896044618658097711785492504343953926634992332820282019728792003956564819968"));
//   }
//
//   async function unlock(token, spender) {
//     await token.methods.increaseAllowance(spender, "57896044618658097711785492504343953926634992332820282019728792003956564819968").send();
//   }
//
//
//
//   const furance = new web3.eth.Contract(furanceData.abi, furanceData.networks[netid].address, { from: accounts[0] });
//   const fuel = new web3.eth.Contract(fuelData.abi, fuelData.networks[netid].address, { from: accounts[0] });
//
//   let unlocked = await isUnlocked(fuel, accounts[0], furance.options.address);
//   if (unlocked) {
//     console.log("Fuel token is unlocked!");
//   } else {
//     console.log("Unlocking fuel token...");
//     await unlock(fuel, furance.options.address);
//     unlocked = await isUnlocked(fuel, accounts[0], furance.options.address);
//     if (unlocked) {
//       console.log("Unlocked!");
//     } else {
//       console.log("Something goes wrong!");
//     }
//
//   }
//
// })();
//   process.exit();

async function CheckAllowance(){
  const tokenAddress = $('#slcBurnToken').val();

  var spender = '';
  const allowance = await fuelToken.methods.allowance(myAddress, spender).call();
}

async function Unlock(){
  try {
    const tokenAddress = $('#slcBurnToken').val();
    const tokenAmount = $('#iptBurnToken').val();

    // var x = fuelTokenAbi;
    // var y = furanceAbi;

    const token = new w3.eth.Contract(fuelTokenData.abi);
    const accounts = await w3.eth.getAccounts();
    myAddress = accounts[0];
    const owner = myAddress;
    const spender = myAddress;

    const allowance = await token.methods.allowance(owner, spender).call();
    return toBN(allowance).gte(toBN("57896044618658097711785492504343953926634992332820282019728792003956564819968"));

    // Call Approve on SC

    // After some logic
    UpdateResultAmount(1000);

  } catch (err) { alert(err.message);  }
}

function UpdateResultAmount(amount) {
    $('#iptResToken').val(amount);
}


function UpdateListOfBurned(){
  burnResults.forEach(function (item) {
    var tokenName =GetTiketByAddress(item.tokenAddress);
    $('#tableContent').append($('<tr>'+

    '<td>'+tokenName+'</td>'+
    '<td>'+item.burnCount+'</td>'+
    '<td>'+item.totalCount+'</td>'+
    '<td>'+item.blockHeight+'</td>'+
  '</tr>'
    ));
  });
}

function UpdateFreeSlots(amount){
  $("#freeSlotsCount").text(amount);
}

function GetTiketByAddress(address){
  for (var i = 0; i < shitTokens.length; i++){
    // look for the entry with a matching `code` value
    if (shitTokens[i].address == address){
       // we found it
      // obj[i].name is the matched result
      return shitTokens[i].tiker
    }
  }
}

function BuyOn0x(){
  window.open("./0x.html");
  //  zeroExInstant.render({
  //   orderSource: 'https://api.radarrelay.com/0x/v2/',
  //   availableAssetDatas: ['0xf47261b00000000000000000000000005ca9a71b1d01849c0a95490cc00559717fcf0d1d'],
  //   defaultSelectedAssetData: '0xf47261b00000000000000000000000005ca9a71b1d01849c0a95490cc00559717fcf0d1d',
  //   }, 'body');
}
