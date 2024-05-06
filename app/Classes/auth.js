import {ToastAndroid, Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {Keys} from './Keys';
import {MyUrls} from './MyUrls';
import messaging from '@react-native-firebase/messaging';
import MyStrings from './MyStrings';


export const USER_KEY = 'auth-key';
export const USER = 'user-key';


export const console_log = (message, isProduction = false) => {
    if (!isProduction) {
        console.log(message);
    }
};
export const console_log_message = (text, message, isProduction = false) => {
    if (!isProduction) {
        console.log(text + ' : ' + message);
    }
};

export const successAlert = (message) => {
    Alert.alert('Success', message);
};
export const errorAlert = (message) => {
    Alert.alert('Error', message);
};
export const simpleAlert = (message) => {
    Alert.alert('Alert', message);
};


export const showAlertMethod = (title, message, setShow, setAlertTitle, setAlertMessage) => {
    setShow(true);
    setAlertTitle(title);
    setAlertMessage(message);

};

export const actionAlert = (message, okayPress,okayText) => {
    Alert.alert(
        'Success',
        message,
        [
            {
                text: okayText?okayText:'Okay',
                onPress: () => okayPress(),
            },

        ],
        {cancelable: false});
};


export const getLocalizedDate = (str) => {
    // var str = "2019-08-02 05:50:00";

    var year = str.substring(0, 4);
    var month = str.substring(5, 7);
    var day = str.substring(8, 10);
    var hour = str.substring(11, 13);
    var minute = str.substring(14, 16);
    var second = str.substring(17, 19);

    // 2019-01-01T00:00:00
    // var ns = year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second

    var date = Date.UTC(year, month - 1, day, hour, minute, second);


    // console.log('Date String: ' + ns)
    // console.log('Date utc seconds: ' + date)
    // console.log('Date from seconds: ' + new Date(date).toString())

    return new Date(date);

};
export const getLocalizedDate2 = (str) => {
    // var str = "2019-08-02 05:50:00";
    // 2019-08-03T14:24:06.000000Z

    var year = str.substring(0, 4);
    var month = str.substring(5, 7);
    var day = str.substring(8, 10);
    var hour = str.substring(11, 13);
    var minute = str.substring(14, 16);
    var second = str.substring(17, 19);

    var date = Date.UTC(str);


    // console.log('Date String: ' + ns)
    // console.log('Date utc seconds: ' + date)
    // console.log('Date from seconds: ' + new Date(date).toString())

    return new Date(date);

};

export const strip_html_tags = (str) => {
    if ((str === null) || (str === '')) {
        return false;
    } else {
        str = str.toString();
    }
    return str.replace(/<[^>]*>/g, '');
};


export const saveMainObject = (key, object) => {
    return new Promise((resolve, reject) => {

        AsyncStorage.setItem(key, object)
            .then(() => {
                // console.log(object)
                resolve(true);
            })
            .catch(() => {
                reject(false);
            });

    });
};
export const getSavedObject = (key) => {
    // console.log('calling')
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key)
            .then(res => {
                // console.log(JSON.stringify(res))
                if (res !== null) {
                    resolve(res);
                } else {
                    // console.log("data not found")
                    resolve(false);
                }
            })
            .catch(err => {
                console.log('Error fetching saved item: ' + err);
                reject(err);
            });
    });
};


export const isNetConnected = () => {
    return new Promise((resolve, reject) => {
        NetInfo.fetch().then(state => {
            // console_log(state.isConnected);
            if (state.isConnected) {
                resolve(true);
            } else {
                // errorAlert(general_network_error);

                ToastAndroid.show(MyStrings.internet_error, ToastAndroid.SHORT);
                console_log('then');

                reject(false);
            }
        }).catch(() => {
            console_log('catch');
            // errorAlert(general_network_error);
            ToastAndroid.show(MyStrings.internet_error, ToastAndroid.SHORT);

            reject(false);
        });

    });
};

export const setShowAlert = (title, message) => {

};


export const saveObject = (key, object) => {
    let str = JSON.stringify(object);
    return new Promise((resolve, reject) => {
        AsyncStorage.setItem(key, str)
            .then(() => {
                resolve(true);
            })
            .catch((err) => {
                console_log('error while saving' + err);
                reject(false);
            });
    });
};
export const getObject = (key) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key)
            .then(res => {
                if (res !== null) {
                    resolve({status: true, data: JSON.parse(res)});
                } else {
                    resolve({status: false});
                }
            })
            .catch(err => {
                console_log(err);
                reject(err);
            });
    });
};
export const isCustomerLoggedIn = () => {
    return new Promise((resolve, reject) => {
        getObject(Keys.user_type_key)
            .then(res => {
                if (!res) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
            .catch(err => resolve(false));

    });
};
export const clearAllData = () => {
    return new Promise((resolve, reject) => {

        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            .then(() => {
                // console_log('success');
                resolve();
            })
            .catch(() => reject);
    });
};
export const clearKey = (key) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.removeItem(key)
            .then(res => resolve(res))
            .catch(err => reject(err));
    });
};

export const clearObject = (key) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.removeItem(key)
            .then(() => {
                resolve(true);
            })
            .catch((err) => {
                reject(false);
            });
    });
};

export const getAds = (setAds) => {
    getObject(Keys.ads_key)
        .then((res) => {
            if (!res) {
                setAds([]);
            } else {
                setAds(res);
            }
        });
};

export const getCities = (city, setCity, setIsLoading) => {
    return new Promise((resolve, reject) => {

        isNetConnected()
            .then(() => {
                setIsLoading(true);
                getDataWithoutToken(MyUrls.get_all_cities_url, 'GET', '', setIsLoading)
                    .then((response) => {
                        if (response.length > 0) {
                            const c = response.map((i, j) => {
                                return {'id': i.id, 'title': i.name};
                            });
                            setCity(c);
                        } else {
                            setCity([]);
                            // errorAlert('No city found.');
                        }
                        resolve(true);

                    })
                    .catch((err) => {
                        resolve(false);
                        console_log('error: ' + err);
                    });
            });

    });

};

export const getAreasOfCity = (selectedCity, area, setArea, setIsLoading) => {
    isNetConnected()
        .then(() => {
            let formData = new FormData();
            formData.append('city_id', selectedCity.id);
            getDataWithoutToken(MyUrls.get_sub_area_by_city_url, 'POST', formData, setIsLoading)
                .then((response) => {
                    // console_log(response)
                    // console_log(response.length)
                    if (response.length > 0) {
                        const c = response.map((i, j) => {
                            return {'id': i.id, 'title': i.name};
                        });
                        setArea(c);
                    } else {
                        // console_log('setArea')
                        // console_log(area)
                        setArea([]);
                        // errorAlert('No area found.');
                    }

                })
                .catch((err) => {
                    console_log('error: ' + err);
                });
        });
};

export const parseError = (error) => {
    var m = error;
    var keys = [];
    for (var k in m) {
        keys.push(k);
    }

    var mforuser = '';
    // console.log('key 0 ' + (m[keys[0]]))

    for (var k in keys) {
        mforuser = mforuser + m[keys[k]] + '\n';
    }

    return mforuser;
};

export const getAndSaveFcm = () => {
    messaging().getToken().then((token) => {
        saveFcmToken(token);
    });

};

export const saveFcmToken = (fcmToken) => {
    isNetConnected().then(() => {
        let data = (new FormData());
        data.append('fcm_token', fcmToken);
        getDataWithToken(MyUrls.save_fcm_url, 'POST', data,
            () => {
            })
            .then(res => {
                console_log(res);
            })
            .catch(err => console_log(err));
    });
};

export const getDataWithToken = (url, method, formData, setLoader) => {

    console.log('Url: ' + url);
    console.log('Url: ' + JSON.stringify(formData));

    setLoader(true);

    return new Promise((resolve, reject) => {
        let s = 404;
        getObject(Keys.token_key).then(token => {

            let header = {
                'Authorization': 'Bearer ' + (token.data),
                'Accept': 'application/json',
            };

            fetch(url, {
                method: method,
                body: formData,
                headers: header,
            })
                .then((response) => {
                        setLoader(false);

                        const statusCode = response.status;
                        var data = response.json();

                        console.log('Status code: ' + statusCode);
                        // console.log("Status data: "+ JSON.stringify(data));
                        s = statusCode;
                        return Promise.all([statusCode, data]);
                    },
                ).then(([status, data]) => {
                setLoader(false);

                if (status === 500) {
                    reject('Server Error');
                } else if (status === 422) {
                    resolve(data);
                } else if (status === 401) {
                    clearAllData();
                    resolve(data);
                }
                resolve(data);

            })
                .catch((error) => {
                    setLoader(false);

                    if (s === 200) {
                        resolve({'status': true});
                        s = 401;
                    } else if (s === 401) {
                        resolve({'status': true});
                        // clearAllData();
                        // console.log('API Error: ' + error);
                        s = 401;
                    } else {
                        console.log('Status Code: ' + s);
                        console.log('API Error: ' + error);
                        if (error === 'TypeError: Network request failed') {
                            reject('Network request failed. Try again.');
                        } else {
                            reject(error);
                        }
                    }
                });
        })
            .catch(err => {
                setLoader(false);

                console.log('user not found ' + err);
                reject('User logged out');
            });


    });

};
export const getDataWithoutToken = (url, method, formData, setLoader) => {
    console.log('Url: ' + url);
    console_log(formData);
    setLoader(true);
    return new Promise((resolve, reject) => {
        let s = 404;
        fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
            },
            body: formData,

        })
            .then((response) => {
                setLoader(false);

                const statusCode = response.status;
                let data = response.json();
                console.log('Status code: ' + statusCode);
                // console.log('Status code: ' + data);
                s = statusCode;
                return Promise.all([statusCode, data]);
            })
            .then(([status, data]) => {
                setLoader(false);

                if (status === 500) {
                    reject('Server Error');
                } else if (status === 422) {
                    resolve(data);
                } else if (status === 404) {
                }

                resolve(data);
            })
            .catch((error) => {
                setLoader(false);

                if (s === 200) {
                    resolve({'status': true});
                    s = 401;
                } else if (s === 401) {
                    resolve({'status': true});
                    // clearAllData();
                    s = 401;
                } else {
                    console.log('Status Code: ' + s);
                    console.log('API Error: ' + error);
                    if (error === 'TypeError: Network request failed') {
                        reject('Network request failed. Try again.');
                    } else {
                        reject(error);
                    }
                }
                console.log('API Error: ' + error);
                reject(error);
            }).catch(err => {
            setLoader(false);
            console_log(err)

        });

    });

};










