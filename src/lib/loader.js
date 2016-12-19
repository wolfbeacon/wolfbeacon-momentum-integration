'use strict';

/** For additional feature: WolfBeacon's Hackathon integration */

const config = require('./config.json');
const dateUtil = require('./date-util');

module.exports = {
    /** Forms a URL for WolfBeacon's endpoints. */
    formUrl: async function() {
        let str = config.baseUrl + config.apiUrl;
        str += '?start-date=' + dateUtil.getDate();
        str += '&end-date=' + dateUtil.getDate(config.futureDays);
        str += '&sort-by=date';

        return getCoords().then((crd) => {
            str += '&latitude=' + crd.latitude; //
            str += '&longitude=' + crd.longitude; //
            return str;
        });
    },
    /** Gets browser coordinates. */
    /** MOMENTUM NOTE: Replace with Momentum's location function. */
    getCoords: async function() {
        return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
    },
    /** Main function. */
    load: async function() {
        return this.formUrl().then(window.fetch).then(response => response.json());
    }
};