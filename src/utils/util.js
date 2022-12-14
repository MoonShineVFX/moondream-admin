import axios from 'axios';
import { Modal } from 'antd';
import moment from 'moment';

const util = {
    /**
     * @author Betty
     * @param  {object{} || string} service - 如果是字串，則為 service.url
     *   @param {string} service.url
     *   @param {string} [service.method = 'post']
     *   @param {string} [service.dataType = 'json']
     * @param  {object{}} reqData
     * @param  {object{}} option
     * @returns {promise}
     */
    serviceProxy: (service, reqData = {}, option) => {

        // method, url 與環境設定
        const showErrorMesg = (message, callback) => {

            Modal.error({
                title: '發生錯誤',
                content: message || '出了些狀況，請找後台管理員',
                ...callback && {
                    onOk: () => {

                        if (callback) callback();

                    },
                },
            });

        };

        // 回傳 promise
        return new Promise((resolve, reject) => {

            axios({
                baseURL: (process.env.NODE_ENV === 'development') ? `https://${process.env.REACT_APP_HOST}/api` : '/api',
                url: service,
                method: 'post',
                withCredentials: true,
                data: reqData,
                ...service,
                ...option,
            })
            .then(
                // result: 1
                ({ data }) => {

                    resolve(option ? data : data.data);

                },
                // result: 0
                ({ response }) => {

                    const {
                        data: { errors },
                        status,
                    } = response;

                    // 未登入則導去登入頁
                    if (status === 401) {

                        reject(status);

                    }
                    else {

                        reject(showErrorMesg(
                            Object.keys(errors).map((key) => `${key}: ${errors[key]}`)
                        ));

                    }

                },
            );

        });

    },

    /**
     * @author Betty
     * @param {string} value - 字串或元件
     * @return {string}
     */
    renderWithoutValue: (value) => value ? value : '--',

    /**
     * @author Betty
     * @param {string} date - 日期
     * @return {string}
     */
    renderDateTime: (date) => date ? moment(date).format('YYYY-MM-DD HH:mm') : '--',

    /**
     * @author Betty
     * @param {number} bytes
     * @param {number} decimals
     * @return {number} - 小數兩位
     */
    renderBytesConvert: (bytes, decimals = 2) => {

        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${sizes[i]}`;

    },
};

export default util;
