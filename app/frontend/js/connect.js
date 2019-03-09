// Web3 - класс, который мы импортировали с библиотекой web3
// window.web3 - прокси, созданный Метамаском. Из него мы сможем достать так нужного нам провайдера.

var w3, myAddress, myContract;

$(document).ready(() => {
  w3 = checkAndInstantiateWeb3();
  connect();

  w3.eth.net.getNetworkType().then((networkName) => {
    shitTokens[networkName].forEach(function (item) {
      $('#slcBurnToken').append($('<option value="' +
        item.address + '">' +
        item.tiker + '</option>'
      ));
    });
  });


  $("#unlockBtn").click(function () {

    const accounts = await w3.eth.getAccounts();
    window.myAddress = accounts[0]; // Получаем адрес кошелька, выбранного в Метамаске
    window.spender = furanceData.networks["4"].address;

    window.fuelToken = new w3.eth.Contract(fuelTokenData.abi, fuelTokenData.networks["4"].address, {from: myAddress});

    var token =
    increaseAllowance()
      .then(() => {
        console.log("Allowance was increased")
      })
  });

  $("#burnBtn").click(function () {
    burnAmountInEther
    burn();
  })
});

async function burn(burnAmountInEther) {
  const toBN = w3.utils.toBN;
  const toWei = w3.utils.toWei;
  const fromWei = w3.utils.fromWei;

  //let estimated = await furance.methods.estimateMintAmount(fuel.options.address, burnAmount).call();
  // console.log(estimated);
  let fuel = fuelToken;
  let burnAmount = toWei(burnAmountInEther);
  let estimated = toBN(0);
  await furanceToken.methods.burn(fuel.options.address, burnAmount, toBN(estimated).mul(toBN("9")).div(toBN("10")).toString()).send();
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
  try {
    const accounts = await w3.eth.getAccounts();
    window.myAddress = accounts[0]; // Получаем адрес кошелька, выбранного в Метамаске
    window.spender = furanceData.networks["4"].address;

    window.fuelToken = new w3.eth.Contract(fuelTokenData.abi, fuelTokenData.networks["4"].address, {from: myAddress});
    window.furanceToken = new w3.eth.Contract(furanceData.abi, furanceData.networks["4"].address, {from: myAddress});

    if (!myAddress) {
      alert('Кошелёк не найден, войдите в Метамаск и создайте кошелёк!');
    }

    // checkAllowance();
    // increaseAllowance();

  } catch (err) {
    console.error(err);
  }
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
