// check field value is matching to regex
function isValid(regexPattern, fieldValue) {
    return regexPattern.test(fieldValue);
}

function MakeChanges(condition,textField,errorMsg) {
    changeTextFieldColors(textField, condition);
    displayErrorText(errorMsg,condition);
}

// text field border color change
function changeTextFieldColors(field,condition) {
    if (condition) {
        field.removeClass('border-danger').addClass('border-success');
        field.css('border-width', '2px');
    } else {
        field.removeClass('border-success').addClass('border-danger');
        field.css('border-width', '2px');
    }
}

function displayErrorText(messageLabel, condition) {
    if(condition){
        messageLabel.hide();
    }else {
        messageLabel.show();
    }
}

function changeTextFieldColorsToBack(fields) {
    for (let i=0; i<fields.length; i++){
        fields[i].removeClass('border-success');
        fields[i].removeClass('border-danger');
    }
}