import Stream from '../Types/Stream';
import Buy from '../Types/Buy'; /* eslint-disable-line no-unused-vars */
import Sell from '../Types/Sell'; /* eslint-disable-line no-unused-vars */
import Monetary from '../Types/Monetary'; /* eslint-disable-line no-unused-vars */

/**
 * @typedef {Object} ContractsParam
 * @property {String} contractType
 * @property {Number} amount
 * @property {String} barrier
 * @property {String} barrier2
 * @property {Number|Date} dateExpiry - epoch in seconds or {@link Date}
 * @property {Number|Date} dateStart - epoch in seconds or {@link Date}
 * @property {String=} Currency - Default is the account currency
 * @property {String} basis - stake or payout
 * @property {Number|String} duration - duration with unit or duration in number
 * @property {String=} durationUnit - duration unit, required if duration is number
 * @property {String=} productType - 'multi_barrier' or 'basic'
 * @property {Account=} account - The account that has this contract
 */

/**
 * Abstract class for contracts
 *
 * @example
 * const contract = account.contract({ contractType: 'CALL', ...options })
 *
 * const buy = await contract.buy();
 *
 * contract.onUpdate().subscribe(console.log)
 *
 * @param {DerivAPI} api
 * @param {ContractsParam} options
 */
export default class Contract extends Stream {
    // Called by the API to initialize the instance
    async init() {
        return this;
    }

    /**
     * Buys this contract
     *
     * @param {BuyParam} buy
     * @returns {Buy}
     */
    async buy({ maxPrice: price }) {
        return this.api.buy({ buy: this.contractId, price });
    }

    /**
     * Sells this contract
     *
     * @param {SellParam} sell
     * @returns {Sell}
     */
    async sell({ maxPrice: price }) {
        return this.api.sell({ sell: this.contractId, price });
    }

    /** @returns {Boolean} */
    get isExpired() {
        return this._data.isExpired;
    }

    /** @returns {String} - Current status of the contract */
    get status() {
        return this._data.status;
    }

    /** @returns {Monetary} - Price at which the contract was sold */
    get sellPrice() {
        return this._data.sellPrice;
    }

    /** @returns {Monetary} - Price at which the contract was bought */
    get buyPrice() {
        return this._data.buyPrice;
    }

    /** @returns {String} - contract type */
    get type() {
        return this.contractType;
    }

    /** @returns {Monetary} - The payout value before the contract was sold */
    get potentialPayout() {
        return this._data.potentialPayout;
    }

    /** @returns {Monetary} - The payout after selling the contract */
    get payout() {
        return this._data.payout;
    }

    /** @returns {Number} - The contract ID after purchase */
    get contractId() {
        return this._data.contractId;
    }

    /** @returns {CustomDate} - Time of purchase */
    get purchaseTime() {
        return this._data.purchaseTime;
    }

    /** @returns {Boolean} */
    get isOpen() {
        return this.status === 'open';
    }
}