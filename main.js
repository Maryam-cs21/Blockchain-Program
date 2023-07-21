// hash function used to produce the hash.
const SHA256 = require('crypto-js/sha256');

class Block {
    // constructor to recieve the properiries of the block.
    constructor(index, timestamp, data, previousHash = '') { // index: block number, timestamp: when the block created.
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash(); // the hash of the block 
        this.nonce = 0;
    }

    //Take the properites of the block and produce hash value.
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

    }
    //proof of work 
    miningBlock(difficulty) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined:" + this.hash);

    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];// array of blocks
        this.difficulty = 2;
    }

    createGenesisBlock() {
        return new Block(0, "21/2/2001", "Genesis Block", "0");//create the first block
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;// previous hash of new block= the hash of the last block
        newBlock.miningBlock(this.difficulty);//calc the hash of the new block with difficulty value 
        this.chain.push(newBlock);//push th enew block to the chain

    }

    // check if the blockchain valid or not 
    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];


            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }

}

let myBlockchain = new Blockchain();

console.log('Mining block 1...');
myBlockchain.addBlock(new Block(1, "20/1/2023", "{amount:4}"));

console.log('Mining block 2...');
myBlockchain.addBlock(new Block(2, "4/5/2023", "{amount:20}"));

console.log(myBlockchain.chain);






















