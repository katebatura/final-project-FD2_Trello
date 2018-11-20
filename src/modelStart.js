
var ajaxHandlerScript="http://fe.it-academy.by/AjaxStringStorage2.php";

class ModelStart {
    constructor() {
        this.info = {};
        this.stringName = 'NOGOVITSYNA_Trello';
        this.updatePassword = null;   
        this.key = null;
        this.password  = null;
        
    }

    start(login, password) {    

        this.info[login] = password;

        this.updatePassword = Math.random();
            
        $.ajax(
            {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'LOCKGET', n : this.stringName, p: this.updatePassword },
                success :  this.AddValueReady.bind(this), 
                error : this.errorHandler.bind(this)
            }            
        );

        
    }
    
    AddValueReady() {
        var info = this.info;
        let newState = 'decks';

        $.ajax( {
            url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
            data : { f : 'UPDATE', n : this.stringName, v : JSON.stringify(info), p : this.updatePassword },
            success : (e) => location.hash = encodeURIComponent( newState ), 
            error : this.errorHandler.bind(this)
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
                success : this.getValueReady.bind(this),
                error : this.errorHandler.bind(this)
            }
        );
    }
    
    getValueReady(callresult) {
        let newState = encodeURIComponent(this.key);
        var info = JSON.parse(callresult.result); 
        if ( info[this.key] && info[this.key] == this.password ) {
            return newState ;
        } else {
            console.log("Информации о " +  this.key + " нет")
        }
    }

    errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
    }

}

export default ModelStart;