onload = function() {

    textFoo();

    function textFoo() {
        let divText = document.createElement('div');
        divText.id = 'text';
        divText.append('Начать игру');
        document.body.appendChild(divText);
        text.addEventListener('click', start);
    }

    let width = 10, height = 10;

    let arrDiv = [];
    function start() {
        let divGame = document.createElement('div');
        divGame.id = 'game';
        document.body.appendChild(divGame);

        arrDiv = createDiv(height, width);
        shipsChoise();

        addEventClic(ship1, ship1Choose);
        addEventClic(ship2, ship2Choose);
        addEventClic(ship3, ship3Choose);
        addEventClic(ship4, ship4Choose);
        addEventClic(shipVertical, shipVerticalFoo);
        text.textContent = 'Выставте флот';
        text.removeEventListener('click', start);

        addMarker();

    }

    let arrDivCont = [];
    function createDiv(x, y) {
        let arr =[];
        for (let i = 0; i < x; i++) {
            arr[i]=[];
            let divCont = document.createElement('div');
            divCont.className = `divCont`;
            arrDivCont[i] = divCont;
            game.appendChild(arrDivCont[i]);
            for (let j = 0; j < y; j++) {
                let div = document.createElement('div');
                div.className = `pole`;
                arr[i][j] = div;
                arrDivCont[i].appendChild(arr[i][j]);
            }
        }
        return arr;
    }

    function shipsChoise() {
        let div = document.createElement('div');
        div.id = `ships`;
        document.body.appendChild(div);

        let divs = document.createElement('div');
        divs.id = `shipCh`;
        ships.appendChild(divs);

        createButtonShip();

        let divV = document.createElement('div');
        divV.className = 'ship';
        divV.id = `shipVertical`;
        ships.appendChild(divV);


        shipCh.textContent =`Всего нужно расположить судов:`;
        ship1.textContent = `4-х палубных:  ${1}`;
        ship2.textContent = `3-х палубных:  ${2}`;
        ship3.textContent = `2-х палубных:  ${3}`;
        ship4.textContent = `1-х палубных:  ${4}`;
        shipVertical.textContent = `Распологать по вертикали`;
    }

    function createButtonShip() {
        for (let i = 0; i < 4; i++) {
            let div = document.createElement('div');
            div.className = 'ship';
            div.id = `ship${i + 1}`;
            ships.appendChild(div);
        }
    }

    function addEventClic(id, foo) {
        id.addEventListener('click', foo);
        addEventMouseover(id);
        addEventMouseout(id);
    }

    function addEventMouseover(id) {
        id.addEventListener('mouseover', yellowMarker);
    }

    function addEventMouseout(id) {
        id.addEventListener('mouseout', greenMarker);
    }

    function yellowMarker() {
        if (event.target.className === 'ship') {
            event.target.style.backgroundColor = ('#ff0');
        }
    }

    function greenMarker() {
        if (event.target.className === 'ship') {
            event.target.style.backgroundColor = ('#4ecc4c');
        }
    }

    let verticalFlag = false;
    function shipVerticalFoo() {
        verticalFlag = !verticalFlag;
        if (shipVertical.style.backgroundColor !== 'rgb(145, 166, 255)') {
            RemoveEventCol(shipVertical);
        } else {
            eddEventCol(shipVertical);
        }
    }

    function ship4Choose() {
        num = 1;
        inc = inc4;
        changeColorButton(ship4, instulShipDeck);
        eddEventCol(ship3);
        eddEventCol(ship2);
        eddEventCol(ship1);

    }

    function ship3Choose() {
        num = 2;
        inc = inc3;
        changeColorButton(ship3, instulShipDeck);
        eddEventCol(ship4);
        eddEventCol(ship2);
        eddEventCol(ship1);
    }

    function ship2Choose() {
        num = 3;
        inc = inc2;
        changeColorButton(ship2, instulShipDeck);
        eddEventCol(ship3);
        eddEventCol(ship4);
        eddEventCol(ship1);
    }

    function ship1Choose() {
        num = 4;
        inc = inc1;
        changeColorButton(ship1, instulShipDeck);
        eddEventCol(ship3);
        eddEventCol(ship2);
        eddEventCol(ship4);
    }


    function changeColorButton(id, name) {
        let style = getComputedStyle(id);
        if (style.backgroundColor !== 'rgb(145, 166, 255)') {
            RemoveEventCol(id);
            onShipInstal(name);
        } else {
            eddEventCol(id);
            offShipInstal(name);
            num = 0;
        }
    }

    function eddEventCol(id) {
        id.style.backgroundColor = ('#4ecc4c');
        addEventMouseover(id);
        addEventMouseout(id);
    }

    function RemoveEventCol(id) {
        id.style.backgroundColor = ('#91a6ff');
        id.removeEventListener('mouseout', greenMarker);
        id.removeEventListener('mouseover', yellowMarker);
    }

    function onShipInstal(name) {
        game.addEventListener('click', name);
    }

    function offShipInstal(name) {
        game.removeEventListener('click', name);
    }


    let inc4 = 4, inc3 = 3, inc2 = 2, inc1 = 1;
    let num, inc ;

    function instulShipDeck() {
        checkPoleClick();
    }


    function addMarker() {
        game.addEventListener('mouseover' , addMarkerOver);
        game.addEventListener('mouseout' , addMarkerOut);
    }

    function addMarkerOver() {
        marker('#ffa315')
    }
    function addMarkerOut() {
        marker('#4ecc4c')
    }

    function marker(collor) {
        ttt(event);
        if (event.target.className.substr(0, 4) === 'pole'  && arrDiv[x][y].textContent !== 'X' && checkAround() > 0 && (verticalFlag === false && y < 10+1 || verticalFlag === true && x < 10+1 )){
            ttt(event);
            for (let i = 0; i < num; i++) {
                if (getComputedStyle(arrDiv[x][y]).backgroundColor !== 'rgb(1, 0, 204)') {
                    arrDiv[x][y].style.backgroundColor = (collor);
                    if (verticalFlag === false) {   y += 1;  } else {  x += 1;  }
                }
            }
        }
    }


    let y, x;
    function ttt(e) {
        x = ([...e.target.parentNode.parentNode.children].indexOf(e.target.parentNode));
        y = ([...e.target.parentNode.children].indexOf(e.target));
    }


    function checkPoleClick() {
        ttt(event);
        if (event.target.className.substr(0, 4) === 'pole' && (verticalFlag === false && y < 10-num+1 || verticalFlag === true && x < 10-num+1 ) && arrDiv[x][y].textContent !== 'X' && checkAround() && inc > 0)   ifShipPlace();
    }

    function checkAround() {
        let flag = true;

        for (let a = 0; a < num; a++) {
            let s1=0, s2=0, e1=3, e2=3;
            switch (x){
                case 0:
                    s1 = 1;
                    break;
                case 9:
                    e1 = 2;
                    break;
            }
            switch (y){
                case 0:
                    s2 = 1;
                    break;
                case 9:
                    e2 = 2;
                    break;
            }
            for (let i = s1; i < e1; i++){
                for (let j = s2; j < e2; j++) {
                    if (arrDiv[x + i - 1][y + j - 1].textContent === 'X') {
                        flag = false;
                    }
                }
            }
            if (verticalFlag === false) {   y += 1;  } else {  x += 1;  }
        }
        return flag;
    }

    function  ifShipPlace( ) {
        ttt(event);


            for (let i = 0; i < num; i++) {
                arrDiv[x][y].textContent = 'X';
                arrDiv[x][y].style.backgroundColor = ('#4ecc4c');
                // around(x, y);
                endSet++;
                if (verticalFlag === false) { y+=1;} else { x+=1;}

            }
            switch (num){
                case 1:
                    --inc4;
                    inc = inc4;
                    break;
                case 2:
                    --inc3;
                    inc = inc3;
                    break;
                case 3:
                    --inc2;
                    inc = inc2;
                    break;
                case 4:
                    --inc1;
                    inc = inc1;
                    break;
            }

            if ( endSet === 20) endSetFoo();
    }

    function around() {
        let s1=0, s2=0, e1=3, e2=3;
        switch (x){
            case 0:
                s1 = 1;
                break;
            case 9:
                e1 = 2;
                break;
        }
        switch (y){
            case 0:
                s2 = 1;
                break;
            case 9:
                e2 = 2;
                break;
        }

        for (let i = s1; i < e1; i++){
            for (let j = s2; j < e2; j++) {
                if (arrDiv[x + i - 1][y + j - 1].textContent !== 'X') {
                    arrDiv[x + i - 1][y + j - 1].style.backgroundColor = ('#0100cc');
                } else {arrDiv[x + i - 1][y + j - 1].style.backgroundColor = ('#ff0010');}
            }
        }

    }
    let endSet=0;
    let arrCheckShot = [];
    function endSetFoo() {
        arrCheckShot = arrDiv;
        text.textContent = 'Начать уничтожение';
        text.addEventListener('click', startKill);
    }

    function RemoveEventColEnd(id) {
        id.style.backgroundColor = ('#4ecc4c');
        id.removeEventListener('mouseout', greenMarker);
        id.removeEventListener('mouseover', yellowMarker);
    }
    
    function startKill() {
        shipCh.textContent =`Всего нужно утопить судов:`;
        while (game.firstChild) {
            game.removeChild(game.firstChild);
        }

        arrDiv = createDiv(height, width);


        RemoveEventColEnd(ship1);
        RemoveEventColEnd(ship2);
        RemoveEventColEnd(ship3);
        RemoveEventColEnd(ship4);
        RemoveEventColEnd(shipVertical);

        game.removeEventListener('mouseover' , addMarkerOver);
        game.removeEventListener('mouseout' , addMarkerOut);

        ship1.removeEventListener('click', ship1Choose);
        ship2.removeEventListener('click', ship2Choose);
        ship3.removeEventListener('click', ship3Choose);
        ship4.removeEventListener('click', ship4Choose);
        shipVertical.removeEventListener('click', shipVerticalFoo);

        shipVertical.remove();

        text.textContent = 'Kill';
        game.addEventListener('click', shot);
        text.removeEventListener('click', startKill);

    }

    let vin = 0, countStep = 0;
    function shot() {
        ttt(event);
        if (event.target.className.substr(0, 4) === 'pole' && arrDiv[x][y].textContent !== 'X' && arrDiv[x][y].textContent !== '0' && getComputedStyle(arrDiv[x][y]).backgroundColor !== 'rgb(1, 0, 204)') {
            if (arrCheckShot[x][y].textContent === 'X') {


                arrDiv[x][y].textContent = 'X';
                arrDiv[x][y].style.backgroundColor = ('#ff0010');
                fooooo();
                countStep += 1;
                vin += 1;
            } else {
                arrDiv[x][y].textContent = '0';
                arrDiv[x][y].style.backgroundColor = ('#0100cc');
                countStep += 1;
            }
        }
        if (vin === 20) vinFoo() ;
    }



    function fooooo() {
        if (fooTop() || fooBottom()) {
            vertical();
        } else if (fooLeft() || fooRight()) {
            horizont();
        } else {
            around();
        }
    }

    function horizont() {
        let a = x, b = y, c = 1, flag = true;
        let mas = [];
        while (true) {

            if (b >=0 && b < width  && arrCheckShot[a][b].textContent === 'X') {
                if (arrDiv[a][b].textContent === 'X') {
                    mas.push([a, b]);
                } else {
                    flag = false;
                    break;
                }
            } else {
                if(c === 1) {
                    a = x;
                    b = y;
                    c = -1;
                } else {
                    break;
                }
            }
            b += c;
        }
        if (flag === true) {
            for ( let i = 0 ; i < mas.length ; i++) {
                x = mas[i][0];
                y = mas[i][1];
                around()
            }
        }
    }

    function vertical() {
        let a = x, b = y, c = 1, flag = true;
        let mas = [];
        while (true) {

            if (a >=0 && a < height && arrCheckShot[a][b].textContent === 'X') {
                if (arrDiv[a][b].textContent === 'X') {
                    mas.push([a, b]);
                } else {
                    flag = false;
                    break;
                }
            } else {
                if(c === 1) {
                    a = x;
                    b = y;
                    c = -1;
                } else {
                    break;
                }
            }
            a += c;
        }
        if (flag === true) {
            for ( let i = 0 ; i < mas.length ; i++) {
                x = mas[i][0];
                y = mas[i][1];
                around()
            }
        }
    }

    function fooLeft() {
        if (y - 1 >= 0) {
            if (arrCheckShot[x][y - 1].textContent === 'X') {
                return true;
            } else {
                return false;
            }
        }  else {
            return false;
        }
    }
    function fooRight() {
        if (y + 1 < width) {
            if (arrCheckShot[x][y + 1].textContent === 'X') {
                return true;
            } else {
                return false;
            }
        }  else {
            return false;
        }
    }
    function fooTop() {
        if ( x - 1  >= 0) {
            if (arrCheckShot[x - 1][y].textContent === 'X') {
                return true;
            } else {
                return false;
            }
        }  else {
            return false;
        }
    }
    function fooBottom() {
        if (x + 1 < height) {
            if (arrCheckShot[x + 1][y].textContent === 'X') {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }


    function vinFoo() {
        text.textContent = `Вы победили за -${countStep}- ходов`;
        game.removeEventListener('click', shot);
        refresh();
    }


    function refresh() {
        let divText = document.createElement('div');
        divText.id = 'textRefresh';
        divText.append('Начать игру заново');
        document.body.appendChild(divText);
        textRefresh.addEventListener('click', refreshFoo);
    }

    function refreshFoo() {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        num = null;
        inc = null;
        endSet=0;
        arrCheckShot = [];
        verticalFlag = false;
        inc4 = 4;
        inc3 = 3;
        inc2 = 2;
        inc1 = 1;
        vin = 0;
        countStep = 0;
        textFoo();
    }





};