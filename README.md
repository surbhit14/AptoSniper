# AptoSniper: Cross-Chain Automated Trading Bot

## Overview

AptoSniper is a cutting-edge cross-chain trading bot designed to automate cryptocurrency trading between EVM-based chains and the Aptos testnet. Utilizing the secure Wormhole protocol, AptoSniper facilitates seamless asset transfers and ensures timely trade execution based on user-defined parameters, all within a user-friendly Telegram interface.

## Features

- **Cross-Chain Functionality**: Secure asset transfers between EVM-based blockchains and Aptos using the Wormhole protocol.
- **Automated Sniping**: Trades executed automatically when token prices hit user-defined targets.
- **Real-Time Monitoring**: Continuous tracking of token prices on the Aptos testnet.
- **User-Friendly Interface**: Simple setup and management via Telegram bot.
- **Secure Transactions**: Robust security measures for all transactions.
- **Multi-Token Support**: Trade a wide range of tokens across EVM-based chains and Aptos.

## Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/AptoSniper.git
   cd AptoSniper
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Run the bot:**
   ```sh
   node index.js
   ```

## Usage

1. **Start the bot on Telegram:**
   - Open Telegram and search for the AptoSniper bot.
   - Start a conversation with the bot.

2. **Set up your trading parameters:**
   - Define the ERC20 token you wish to trade on the Aptos testnet.
   - Set your target price for the token (e.g., 20 GARI per AVAX).

3. **Monitor and execute trades:**
   - The bot will continuously monitor token prices.
   - When the target price is reached, the bot will automatically execute the trade.

## How It Works

1. **User Setup:** Define the ERC20 token and target price using the Telegram bot interface.
2. **Price Monitoring:** The bot continuously monitors the token prices on the Aptos testnet.
3. **Price Trigger:** When the token price reaches the user-defined target, the bot prepares to execute the trade.
4. **Cross-Chain Transfer:** Transfers AVAX from the user's Avalanche account to the Aptos network using Wormhole.
5. **Token Swapping:** Swaps wrapped AVAX (wAVAX) for the desired token on Aptos.
6. **Acquired Tokens:** The user receives the purchased tokens in their Aptos wallet.

By integrating advanced technology and a user-friendly interface, AptoSniper aims to revolutionize cross-chain trading, making it more accessible, efficient, and secure for all users.
