
var ajaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";

class ModelStart {
    constructor() {
        this.info = {};
        this.stringName = 'NOGOVITSYNA_Trello';
        this.updatePassword = null;   
        this.key = null;
        this.password  = null;
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

    start(login, password) {   
        this.key = login;
        this.info[login] = password; 

        this.updatePassword = Math.random();
            
        $.ajax(
            {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'LOCKGET', n : this.stringName, p: this.updatePassword },
                success :  this.AddValueReady.bind(this), error : this.errorHandler.bind(this)
            }            
        );

        return this.key        
    }
    
    AddValueReady() {
        var info = this.info;
        let newState = 'decks';

        $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'UPDATE', n : this.stringName, v : JSON.stringify(info), p : this.updatePassword },
            success : (e) => console.log(e, this.info), error : this.errorHandler.bind(this)
            }
        );
    }

    enter(login, password) {
        this.key = login;
        this.password = password;

        $.ajax(
            {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : this.stringName },
                success : this.getValueReady.bind(this), error : this.errorHandler.bind(this)
            }
        );

        return this.key;
    }
    
    getValueReady(callresult) {
        let newState = 'decks';
        var info = JSON.parse(callresult.result); 
        if ( info[this.key] && info[this.key] == this.password ) {
            location.hash = encodeURIComponent(newState);
           
        } else {
            alert("Пользователь с именем " + this.login + " не зарегестрирован");
        }
    }

    errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
    }

}

export default ModelStart;