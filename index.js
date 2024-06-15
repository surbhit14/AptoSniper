const TelegramBot = require('node-telegram-bot-api');
const { generatePrivateKey } = require('./generatePvtKeyFromText')
const Wallet = require('ethereumjs-wallet');
const { privateToAddress, toChecksumAddress } = require('ethereumjs-util');
const { Web3 } = require('web3');

const {
    Chain,
    Network,
    TokenId,
    TokenTransfer,
    Wormhole,
    amount,
    isTokenId,
    wormhole,
  } = require("@wormhole-foundation/sdk");
  
  // Import the platform-specific packages
  
  const evm = require("@wormhole-foundation/sdk/evm");
  const solana = require("@wormhole-foundation/sdk/solana");
  const { SignerStuff, getSigner, waitLog } = require("./helpers/helpers");

const token = '7358302887:AAHO3xhotPMptXA7nHiHrqjmurVz1_a78_U';
const avalancheNodeUrl = 'https://avalanche-fuji.infura.io/v3/c2ceda8b46dc45aeaf81e289cd43dbe5'; 

const bot = new TelegramBot(token, { polling: true });
let intervalId;

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  let privateKey = generatePrivateKey(msg.chat.username, "lol")
  console.log(privateKey);
  const privateKeyBuffer = Buffer.from(privateKey, 'hex');
  const web3 = new Web3(avalancheNodeUrl);

  const wallet = Wallet['default'].fromPrivateKey(privateKeyBuffer);

    // Get Ethereum address from wallet
  const address = wallet.getAddressString();
  const balanceInAVAX = 0;

  web3.eth.getBalance(address)
    .then(balance => {
        // Convert wei to Ether
        balanceInAVAX = web3.utils.fromWei(balance, 'ether');
        console.log(`Balance of ${address}: ${balanceInAVAX} AVAX`);
    })
    .catch(err => console.error('Error:', err));

  let options = msg.text.split(" ");
  if (options[0] == "-tradingstart") {
    let upperboundrate = 0.9;
    let lowerboundrate = 0.8;
    let amt1 = 0.05;
    let amt2 = 0.05;
    // if (balanceInAVAX == 0) {
    //     bot.sendMessage(chatId, 'Cannot start trading, you have 0 AVAX. Send some AVAX to ' + address + ' to start trading');
    //     return;
    // }
    if (options.length < 2) {
        bot.sendMessage(chatId, 'Token address missing: required');
        return;
    }
    if (options.length > 2) {
        upperboundrate = options[2];
    }
    if (options.length > 3) {
        amt1 = options[3];
    }
    if (options.length > 4) {
        lowerboundrate = options[4];
    }
    if (options.length > 5) {
        amt2 = options[5];
    }
    intervalId = setInterval(() => {
        placeorder(upperboundrate, amt1, lowerboundrate, amt2);
    }, 5000);

  } else if (options[0] == "-tradingstop") {
    clearInterval(intervalId)
    bot.sendMessage(chatId, 'Trading stopped');
  } else {
    bot.sendMessage(chatId, 'Hey, I am fulltos, a telegram trading bot which you can use to trade AVAX with any token of your choice on '
        + 'aptos chain. Send some AVAX to ' + address + ' to get started. (Only send a little amount, which you are fine with bot trading for you.'
        + 'Make sure you understand all the risks of trading.\n' + 'Here are some commands you can run\n\n'
        );
    
        bot.sendMessage(chatId, 
        '-tradingstart tokenaddress {upperratebound} {amt1} {lowerratebound} {amt2}: This command can be used to instruct bot to start trading.\n'
        + 'command takes 5 parameters, 1 required and 4 optional'
        + 'tokenaddress: address of token you want to trade against\n'
        + 'upperratebound: For you to earn profit, you should be able to buy as much other token as you can with less AVAX\n'
        + 'upperratebound is actually price(other token) / price(AVAX) at which you prefer to buy\n'
        + 'amt1: amount of AVAX you prefer to buy when upperboundrate is hit\n'
        + 'lowerboundrate: For you to earn profit, you should be able to sell less token for as much AVAX as you can\n'
        + 'lowerboundrate is actually price(other token) / price(AVAX) at which you prefer to sell\n'
        + 'amt2: amount of AVAX you prefer to sell when lowerboundrate is hit\n'
        + 'example: -tradingstart af1vVhrEaOSQ9erO17E8OJeVWzryN5FXfN6Fw5RIsu7Q3Ht8nF5c1 0.9 0.04 0.8 0.04\n'
        + 'if you are a beginner, you can simply skip other 4 options\n'
        + 'example: -tradingstart af1vVhrEaOSQ9erO17E8OJeVWzryN5FXfN6Fw5RIsu7Q3Ht8nF5c1'
            );
  }

  function placeorder(upperboundrate, amt1, lowerboundrate, amt2) {
    if (price_up_down() > upperboundrate) {
        const sendChain = wh.getChain("Avalanche");
        const rcvChain = wh.getChain("Aptos");
        const token = Wormhole.tokenId(sendChain.chain, "native");

        bot.sendMessage(chatId, 'Selling ' + amt1 + ' AVAX');
    } else if (price_up_down() < lowerboundrate) {
        bot.sendMessage(chatId, 'Buying ' + amt2 + ' AVAX');
    }
  }
});

function price_up_down() {
    return Math.random() * (0.92 - 0.78) + 0.78;
}

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1]; 

  bot.sendMessage(chatId, resp);
});

console.log('Bot is running...');
