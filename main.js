const idsEnum = {
    chname: "chname",
    cnumber: "cnumber",
    cexpdatemm: "cexpdatemm",
    cexpdateyy: "cexpdateyy",
    ccvc: "ccvc"
}

window.onload = function () {
    setInitialCard();

    let inputs = Array.from(document.querySelectorAll("input[type=text]"));
    inputs.forEach(function (input) {
        input.addEventListener("change", function (e) {
            let target = e.target;
            let id = target.id;
            let value = target.value;
            let isValid = validations(id, value);
            let cardText = `c-${id}`;
            let errorText = `e-${id}`;
            if (isValid) {
                cardText == "c-cnumber" ? setStyleCardNumber(cardText, value) : document.getElementById(cardText).innerText = value;
                document.getElementById(errorText).classList.add('d-none')
                document.getElementById(id).classList.remove('b-danger');
            } else {
                document.getElementById(id).classList.add('b-danger');
                document.getElementById(errorText).classList.remove('d-none');
            }
        })
    })

    document.getElementById("cardForm").addEventListener("submit", function (e) {
        e.preventDefault();
        let ids = ["chname", "cnumber", "cexpdatemm", "cexpdateyy", "ccvc"]
        let valid = ids.map(id => {
            let value = document.forms["cardForm"][id].value;
            return validations(id, value);
        }).filter(b => b == false).length == 0;
        if (valid) {
            document.getElementById('success').classList.remove('d-none')
            document.getElementById('formSection').classList.add('d-none');
        }
    })
}

function validations(id, value) {
    switch (id) {
        case 'chname': {
            return value.length > 0 && value.length <= 25;
        }
        case 'cnumber': {
            return value.length == 16 && !isNaN(Number(value));
        }
        case 'cexpdatemm': {
            return value.length == 2 && !isNaN(Number(value));
        }
        case 'cexpdateyy': {
            return value.length == 2 && !isNaN(Number(value));
        }
        case 'ccvc': {
            return value.length == 3 && !isNaN(Number(value));
        }

    }
}

function onSuccessContinue() {
    let cardIds = Object.values(idsEnum).map(id => `c-${id}`);
    cardIds.forEach(ci => document.getElementById(ci).innerText = "");
    document.getElementById("cardForm").reset();
    document.getElementById('success').classList.add('d-none')
    document.getElementById('formSection').classList.remove('d-none');
    setInitialCard();
}

function setStyleCardNumber(id, value) {
    document.getElementById(id).innerHTML = `
    <span><b>${value.slice(0, 4)}</b></span>
    <span><b>${value.slice(4, 8)}</b></span>
    <span><b>${value.slice(8, 12)}</b></span>
    <span><b>${value.slice(12)}</b></span>`
}

function setInitialCard() {
    document.getElementById(`c-${idsEnum.chname}`).innerText = "Jane Appleseed"
    setStyleCardNumber(`c-${idsEnum.cnumber}`, "0000000000000000");
    document.getElementById(`c-${idsEnum.cexpdatemm}`).innerText = "00"
    document.getElementById(`c-${idsEnum.cexpdateyy}`).innerText = "00"
    document.getElementById(`c-${idsEnum.ccvc}`).innerText = "000"
}