// Load transfers history in to the table
$('#transfersBtn').click(async(e) => {
  const transfers = await getTokenTransfers(myAddress);
  transfers.forEach(transfer => {
    const event = transfer.returnValues;
    const tr = $(`<tr><td>${event.from}</td><td>${event.to}</td><td>${event.value/1e18}</td></tr>`);
    $("#transferTable").append(tr);
  });
})

// SMART-CONTRACT REQUESTS

// Read token transfers history using smart-contract events
async function getTokenTransfers(address) {
  try {
    const [from, to] = await Promise.all([
      myContract.getPastEvents('Transfer', { fromBlock: 0, filter: { from: address }}),
      myContract.getPastEvents('Transfer', { fromBlock: 0, filter: { to: address }})
    ]);                           // получаем ивенты исходящих и входящих переводов
    return to.concat(from);       // и объединяем их в один массив
  } catch (err) { alert(err.message) }
}
