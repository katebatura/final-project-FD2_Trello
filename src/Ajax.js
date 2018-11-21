
var ajaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";

class Ajax {
    constructor() {
        this.info = {};
        this.stringName = 'NOGOVITSYNA_TRELLO_USERS';
        this.updatePassword = null;   
        this.key = null;
        this.value = null;
        this.getKeys();
       
    }
    getKeys() {

        $.ajax(
            {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : this.stringName },
                success : this.getKeysReady.bind(this), error : this.errorHandler.bind(this)
            }
        );
    }

    getKeysReady(callresult) {
        
        var info = JSON.parse(callresult.result);

        this.info = info || {};
    }
        
    addValue(key, value) {       
        
            this.info[key] = value;

            this.updatePassword = Math.random();
            
            $.ajax(
                {
                    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'LOCKGET', n : this.stringName, p: this.updatePassword },
                    success :  this.AddValueReady.bind(this), error : this.errorHandler.bind(this)
                }            
            );
        
    }

    AddValueReady() {
        var info = this.info;
        $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'UPDATE', n : this.stringName, v : JSON.stringify(info), p : this.updatePassword },
            success : (e) => console.log(e, this.info), error : this.errorHandler.bind(this)
            }
        );
    }

    getValue(key) {
        this.key = key;

        $.ajax(
            {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : this.stringName },
                success : this.getValueReady.bind(this), error : this.errorHandler.bind(this)
            }
        );

        return this.value;
    }

    getValueReady(callresult) {
        var info = JSON.parse(callresult.result); 
        if (info[this.key]) {
            this.value = info[this.key];
        } else {
            console.log("Информации о " +  this.key + " нет")
        }
    }


    errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
    }

}

export default Ajax;