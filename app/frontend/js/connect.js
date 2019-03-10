// Web3 - класс, который мы импортировали с библиотекой web3
// window.web3 - прокси, созданный Метамаском. Из него мы сможем достать так нужного нам провайдера.

var w3, myAddress, myContract;

const furanceAddresses = {
  main: "0x22f298b0c4d7bd8b939bc703a365b704df45e3a1",
  rinkeby: "0x3d5726c8CFd711788605078C2B9b87D5BC7161A8",
};

const pyroAddresses = {
  main: "0x54ed6d05b6ade0b39d0913ac6876e6cf16ae89a0",
  rinkeby: "0x5efC080ADc2e14285D7FA1DD551aC4088cc64d8f",
};

const tokens = {
  // address : tokenObj
  // Here we put tokens objects that we will initialize using addresses
};

// Leave as it .ready can't handle properly function that returns Promise
$(document).ready(() => {
  onInit()
});

async function onInit() {
  w3 = checkAndInstantiateWeb3();

  try {
    const networkName = await w3.eth.net.getNetworkType();
    const accounts = await w3.eth.getAccounts();
    window.myAddress = accounts[0];
    window.spender = furanceAddresses[networkName];
    window.pyro = furanceAddresses[networkName];

    window.toBN = w3.utils.toBN;
    window.toWei = w3.utils.toWei;
    window.fromWei = w3.utils.fromWei;


    window.furanceToken = new w3.eth.Contract(furanceData.abi, furanceAddresses[networkName], {from: myAddress});
    window.pyroToken = new w3.eth.Contract(pyroTokenData.abi, pyroAddresses[networkName], {from: myAddress});

    if (!myAddress) {
      alert('Can\'t find metamask, or wallet not exist');
    }

    shitTokens[networkName].forEach((item) => {
      $('#slcBurnToken').append($(`<option value="${item.address}">${item.tiker}</option>`));
      tokens[item.address] = new w3.eth.Contract(fuelTokenData.abi, item.address, {from: myAddress});
    });

  } catch (err) {
    console.error(err);
    return
  }

  updateLockAndBurnButtonsState();
  $("#slcBurnToken").on('change', () => {

    $("#status").clearQueue().queue(function (next) {
      $(this).addClass("alert"); next();
    }).delay(500).queue(function (next) {
      $(this).removeClass("alert"); next();
    });

    updateLockAndBurnButtonsState();
  });
  setInterval(updateLockAndBurnButtonsState, 1000);

  $("#unlockBtn").click(function () {

    const tokenAddress = $('#slcBurnToken').val();
    const token = tokens[tokenAddress];

    // Use this to mint pyro tokens
    // var x = token.methods
    //   .transfer("0x9A75BCcb9046827A9Ee9C5038b9aF16E3044b629", "0")
    //   .send().then(
    //     (result) => {
    //       debugger
    //     }
    //   );

    increaseAllowance(token)
      .then(() => {
        console.log("Allowance was increased")
      })
  });

  $("#burnBtn").click(function () {
    const tokenAmount = $('#iptResToken').val();
    const tokenAddress = $('#slcBurnToken').val();
    const token = tokens[tokenAddress];

    burn(token, tokenAmount).then(() => {
      console.log("was burned")
    });
  })

  startPyroTokenPolling();
}

async function updateLockAndBurnButtonsState() {
  const tokenAddress = $('#slcBurnToken').val();
  const token = tokens[tokenAddress];

  const tokenIsUnlocked = await isUnlocked(token, myAddress, spender);
  const unlockBtn = $("#unlockBtn");
  const burnBtn = $("#burnBtn");

  unlockBtn.prop('disabled', tokenIsUnlocked);
  burnBtn.prop('disabled', !tokenIsUnlocked);
  unlockBtn.html(tokenIsUnlocked ? "Unlocked &#128275;" : "Unlock");
  console.log(tokenIsUnlocked);
}

function renewPyroBalance() {
  pyroToken.methods.balanceOf(myAddress).call().then((balance) => {
    $("#pyroBalance").text(`${web3.fromWei(balance, 'ether')} Pyro`)
  });
}

function startPyroTokenPolling() {
  renewPyroBalance();
  setInterval(renewPyroBalance, 1000);
}

async function isUnlocked(token, owner, spender) {
  const allowance = await token.methods.allowance(owner, spender).call();
  return toBN(allowance).gte(toBN("57896044618658097711785492504343953926634992332820282019728792003956564819968"));
}

async function burn(token, burnAmountInEther) {

  //let estimated = await furance.methods.estimateMintAmount(fuel.options.address, burnAmount).call();
  // console.log(estimated);
  //let fuel = fuelToken;
  let burnAmount = toWei(burnAmountInEther);
  let estimated = toBN(0);

  await furanceToken.methods
    .burn(token.options.address, burnAmount, toBN(estimated).mul(toBN("9")).div(toBN("10")).toString())
    .send();
}


async function increaseAllowance(token) {
  await token.methods.increaseAllowance(spender, "57896044618658097711785492504343953926634992332820282019728792003956564819968").send();
}


async function checkAllowance() {
  const allowance = await fuelToken.methods.allowance(myAddress, spender).call();
  console.log(allowance);
}


// $("#slcBurnToken").change((a, b) => {
//   console.log($("#slcBurnToken").val());
// });

// DEPLOY NEW CONTRACT0xfcb83a35971680335626287a87B2d10B4234B6Ed
// $('#deployBtn').click(() => {
//   try {
//     resetContractData();                                          // Очищаем старые данные
//     $('#deployBtn')[0].disabled = true;                           // Блокируем кнопку
//     const transaction = myContract.deploy({ data: bytecode  });   // Подгатавливаем транзакцию
//     const promiEvent = transaction.send({from: myAddress});       // Отправляем транзакцию на запись в Блокчейн
//     promiEvent.on('transactionHash', onTransactionHashReceived);  // Вешаем на промивент обработчик события 'transactionHash'
//     promiEvent.on('error', resetVisualEffects);                   // Сбрасываем блокировки, если пользователь отменил транзакцию
//     promiEvent.then(newContractInstance => {
//       myContract = newContractInstance;                                   // Обновляем нашу абстракцию контракта
//       $('#contractAddress a')[0].innerText = myContract.options.address;  // Показываем адрес задеплоенного контракта в сети
//       $('#contractAddress a')[0].href = 'https://rinkeby.etherscan.io/address/' + myContract.options.address;
//       $('._saveAddressToLocalStorage').css('display','inline');   // Показать кнопку сохранения адреса в local storage
//       resetVisualEffects();
//     });
//   } catch (err) {
//     resetVisualEffects();
//     console.error(err);
//     alert(err.message);
//   }
// })

// INITIALISATION
async function connect() {

}

function checkAndInstantiateWeb3() {
  try {
    if (window.ethereum !== 'undefined') {
      console.log("Using Metamask's web3 provider");
      return new Web3(window.ethereum);
    } else {
      console.warn('No web3 detected. Falling back to http://localhost:8545.');
      return new Web3(new this.Web3.providers.HttpProvider('http://localhost:8545'));
    }
  } catch (e) {
    console.error("Sorry, can't find any web3 provider:", e.message)
  }
}


// function onTransactionHashReceived(hash) {
//   $('#deploySpinner')[0].classList.add('spin'); // Показываем спиннер
//   $('#deployHash a')[0].innerText = hash; // Показываем идентификатор транзакции
//   $('#deployHash a')[0].href = 'https://rinkeby.etherscan.io/tx/' + hash;
// }
//
// function resetVisualEffects() {
//   $('#deploySpinner')[0].classList.remove('spin'); // Убираем спинер
//   $('#deployBtn')[0].disabled = false; // Разблокируем кнопку
// }
//
// function resetContractData() {
//   $('#contractAddress a')[0].innerText = '';
//   $('#contractAddress a')[0].href = '#';
//   $('#deployHash a')[0].innerText = '';
//   $('#deployHash a')[0].href = '#';
// }
