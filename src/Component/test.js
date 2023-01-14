const handleRemove = (item) => () => {
    APIService.getMemberTime(3).then((res) => {
        console.log(res.data);
        //setTimeStartOptions(res.data);
        const filteredProducts = timeStartOptionTemplate.filter((itemTmp) => {
            let var2 = [];
                return !res.data.map((item2)=>{ 
                    
                    let var1 = timeConvert(item2.end_time) - timeConvert(item2.start_time)
                   

                    for(let i = 0 ; i <= var1-1 ; i++ ){
                        var2.push(timeDeconvert(timeConvert(item2.start_time)+(var1-1-i)))
                    }

                    return var2;   
                
                }).map((item3) => item3)[0].includes(itemTmp.value)
            });
            console.log("pin1",filteredProducts);
        setPeople(filteredProducts);



    })
};

const timeConvert = (timeEndOptions_Number) => {
    let time;
    switch (timeEndOptions_Number) {
        case '08:00:00':
            time = 1;
            break;
        case '09:00:00':
            time = 2;
            break;
        case '10:00:00':
            time = 3;
            break;
        case '11:00:00':
            time = 4;
            break;
        case '12:00:00':
            time = 5;
            break;
        case '13:00:00':
            time = 6;
            break;
        case '14:00:00':
            time = 7;
            break;
        case '15:00:00':
            time = 8;
            break;
        case '16:00:00':
            time = 9;
            break;
        case '17:00:00':
            time = 10;
            break;
        case '18:00:00':
            time = 11;
            break;
        case '19:00:00':
            time = 12;
            break;
        case '20:00:00':
            time = 13;
            break;
        case '21:00:00':
            time = 14;
            break;
        case '22:00:00':
            time = 15;
            break;
    }
    return time;
}

const timeDeconvert = (timeEndOptions_Number) => {
    let time;
    switch (timeEndOptions_Number) {
        case 1 :
            time = '08:00:00';
            break;
        case 2:
            time = '09:00:00';
            break;
        case 3:
            time = '10:00:00';
            break;
        case 4:
            time = '11:00:00';
            break;
        case 5:
            time = '12:00:00';
            break;
        case 6:
            time = '13:00:00';
            break;
        case 7:
            time = '14:00:00';
            break;
        case 8:
            time = '15:00:00';
            break;
        case 9:
            time = '16:00:00';
            break;
        case 10:
            time = '17:00:00';
            break;
        case 11:
            time = '18:00:00';
            break;
        case 12:
            time = '19:00:00';
            break;
        case 13:
            time = '20:00:00';
            break;
        case 14:
            time ='21:00:00';
            break;
        case 15:
            time = '22:00:00';
            break;
    }
    return time;
}